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

export interface ProductInterface {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: { width: number; height: number; depth: number };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  averageRating: number;
  thumbnail: string;
}

const fetchTopRatedProducts = async (): Promise<ProductInterface[]> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/product/viewproducts`,
  );

  const products: ProductInterface[] = response.data ?? [];

  // Add average rating
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

  // Sort by average rating and take top 3
  return ratedProducts
    .sort((a, b) => b.averageRating - a.averageRating)
    .slice(0, 3);
};

const TopRatedProducts: React.FC = () => {
  const dispatch = useDispatch();
  const allproductcart = useSelector((state: RootState) => state.cart.carts);
  const cartIDS = allproductcart.map((item) => item.id);

  const [favorites, setFavorites] = useState<number[]>([]);

  const {
    data: toprated,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["topRatedProducts"],
    queryFn: fetchTopRatedProducts,
  });

  const handleHeartClick = (productId: number) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  if (isLoading) return <p>Loading top rated products...</p>;
  if (isError) return <p>Failed to load products.</p>;

  return (
    <div>
      <div className="flex justify-between mt-20">
        <h3 className="font-mont text-4xl font-bold mb-4">
          Top Rated Products
        </h3>
        <Link
          href={`/toprated`}
          className="font-pop font-normal text-2xl text-hover-social hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {toprated?.map((product, index) => (
          <div className="border border-gray-300 rounded-md" key={index}>
            <div className="m-4 w-auto h-78.25 rounded-md bg-gray-400 overflow-hidden relative">
              {/* Added relative */}
              <Image
                src={product.thumbnail}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 313px"
                priority
                fetchPriority="high"
                className="object-cover" // This ensures the image covers the area without stretching
                alt={product.title}
              />
            </div>
            <div className="text-center my-4">
              <p className="text-2xl font-pop font-normal">
                <Link href={`/category/${product.category}/${product.id}`}>
                  {product.title.slice(0, 20)}...
                </Link>
              </p>
              <p className="text-2xl text-hover-social font-bold font-pop">
                ${product.price}
              </p>

              <div className="flex items-center justify-center gap-4 mt-4">
                <div className="text-rating text-xl">★</div>
                <p className="font-bold text-xl">
                  {product.averageRating.toFixed(1)}
                </p>
                <p className="text-lg text-social font-mont font-normal border-l pl-4 border-gray-300">
                  Sold 199
                </p>
              </div>

              <div className="flex justify-center items-center gap-7 mt-4">
                {cartIDS.includes(product.id) ? (
                  <Link
                    href={"/cart"}
                    className="text-sm py-3 px-4 border cursor-pointer border-hover-social rounded-lg hover:bg-transparent bg-hover-social hover:text-black text-white font-bold transition-all"
                  >
                    Go to Cart
                  </Link>
                ) : (
                  <button
                    onClick={() => dispatch(addcarts(product))}
                    aria-label="add to cart"
                    className="text-sm py-3 px-4 border cursor-pointer border-hover-social rounded-lg hover:bg-transparent bg-hover-social hover:text-black text-white font-bold transition-all"
                  >
                    Add to Cart
                  </button>
                )}

                <button
                  onClick={() => handleHeartClick(product.id)}
                  aria-label="Add to favorites"
                >
                  <FaHeart
                    className={
                      favorites.includes(product.id)
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

export default TopRatedProducts;
