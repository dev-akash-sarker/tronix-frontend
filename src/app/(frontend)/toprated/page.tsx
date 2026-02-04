"use client";

import { addcarts } from "@/service/RTK/features/add-cart/add_cart_Slice";
import { RootState } from "@/service/RTK/store";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

export interface ReviewInterface {
  _id?: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface ProductInterface {
  _id: string;
  title: string;
  description: string;
  categoryId: string;
  subCategoryId: string | null;
  categoryname: string;
  subcategoryname: string;
  price: number;
  discountPercentage: number;
  finalPrice: number;
  rating: number;
  stock: number;
  sold: number;
  tags: string[];
  brand: string;
  sku: string;
  availabilityStatus: "In stock" | "Out of stock" | "Limited";
  reviews: ReviewInterface[];
  minimumOrderQuantity: number;
  images: string[];
  thumbnail: string;
  promotionId: string | null;
  featuredId: string | null;
  meta: { createdAt: string; updatedAt: string };
  __v: number;
  averageRating?: number; // added dynamically
}

const fetchTopRatedProducts = async (): Promise<ProductInterface[]> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/product/viewproducts`,
  );
  const products: ProductInterface[] = response.data;

  // Calculate average rating for each product
  const ratedProducts = products.map((product) => {
    const reviews = product.reviews ?? [];
    const reviewCount = reviews.length;
    const totalReviewSum = reviews.reduce(
      (sum, review) => sum + review.rating,
      0,
    );
    const averageRating = reviewCount > 0 ? totalReviewSum / reviewCount : 0;
    return { ...product, averageRating };
  });

  // Sort by average rating (highest first)
  return ratedProducts.sort(
    (a, b) => (b.averageRating ?? 0) - (a.averageRating ?? 0),
  );
};

const TopRatedView: React.FC = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const dispatch = useDispatch();
  const allproductcart = useSelector((state: RootState) => state.cart.carts);
  const cartIDS = allproductcart.map((item) => item._id);

  const handleAddCart = (item: ProductInterface) => {
    dispatch(addcarts(item));
  };

  const handleHeartClick = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  const {
    data: toprated,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["topRatedProducts"],
    queryFn: fetchTopRatedProducts,
    staleTime: 1000 * 60 * 5, // optional: cache for 5 min
  });

  if (isLoading) return <p>Loading top rated products...</p>;
  if (isError) return <p>Failed to load products.</p>;

  return (
    <div>
      <div className="flex justify-between mt-20">
        <h3 className="font-mont text-4xl font-bold mb-4">
          Top Rated Products
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {toprated?.map((product) => (
          <div className="border border-gray-300 rounded-md" key={product._id}>
            <div className="m-4 w-103.25 h-78.25 rounded-md overflow-hidden">
              <Image
                src={product.thumbnail}
                width={342}
                height={313}
                priority
                fetchPriority="high"
                className="h-auto"
                alt={product.title}
              />
            </div>

            <div className="text-center my-4">
              <p className="text-2xl font-pop font-normal">
                <Link href={`/category/${product.categoryname}/${product._id}`}>
                  {product.title.slice(0, 20)}...
                </Link>
              </p>
              <p className="text-2xl text-hover-social font-bold font-pop">
                ${product.price}
              </p>

              <div className="flex items-center justify-center gap-4 mt-4">
                <div className="text-rating text-xl">★</div>
                <p className="font-bold text-xl">
                  {(product.averageRating ?? 0).toFixed(1)}
                </p>
                <p className="text-lg text-social font-mont font-normal border-l pl-4 border-gray-300">
                  Sold {product.sold || 0}
                </p>
              </div>

              <div className="flex justify-center items-center gap-7 mt-4">
                {cartIDS.includes(product._id) ? (
                  <Link
                    href="/cart"
                    className="text-sm py-3 px-4 border cursor-pointer border-hover-social rounded-lg hover:bg-transparent bg-hover-social hover:text-black text-white font-bold transition-all"
                  >
                    Go to Cart
                  </Link>
                ) : (
                  <button
                    onClick={() => handleAddCart(product)}
                    className="text-sm py-3 px-4 border cursor-pointer border-hover-social rounded-lg hover:bg-transparent bg-hover-social hover:text-black text-white font-bold transition-all"
                  >
                    Add to Cart
                  </button>
                )}

                <button onClick={() => handleHeartClick(product._id)}>
                  <FaHeart
                    className={
                      favorites.includes(product._id)
                        ? "w-[23.17px] text-red-500"
                        : "w-[23.17px] text-social"
                    }
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRatedView;
