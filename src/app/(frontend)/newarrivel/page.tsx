"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";

export interface NewArrivalType {
  id: number;
  _id: string;
  title: string;
  description: string;
  categoryname: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: string;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: {
    rating: number;
    comment: string;
    date: string; // ISO string
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
  thumbnail: string;
}

const fetchNewArrivals = async (): Promise<NewArrivalType[]> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/product/viewproducts`,
  );
  const products: NewArrivalType[] = response.data;

  // Sort by newest first using meta.createdAt
  return products.sort(
    (a, b) =>
      new Date(b.meta.createdAt).getTime() -
      new Date(a.meta.createdAt).getTime(),
  );
};

const ViewNewArrivals: React.FC = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 9;

  const {
    data: newArrivals = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["newArrivals"],
    queryFn: fetchNewArrivals,
    staleTime: 1000 * 60 * 5, // optional: cache for 5 minutes
  });

  function slugify(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  const handleHeartClick = (productId: number) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = newArrivals.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );
  const totalPages = Math.ceil(newArrivals.length / productsPerPage);

  if (isLoading) return <p>Loading new arrivals...</p>;
  if (isError) return <p>Failed to load products.</p>;

  return (
    <div>
      <h3 className="font-mont text-4xl font-bold mb-4">New Arrivals</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentProducts.map((product) => (
          <div className="border border-gray-300 rounded-md" key={product._id}>
            <div className="m-4 w-auto h-78.25 rounded-md bg-gray-400 overflow-hidden">
              <Image
                src={product.thumbnail}
                width={313}
                height={313}
                priority
                fetchPriority="high"
                className="w-full h-full"
                alt={product.title}
              />
            </div>
            <div className="text-center my-4">
              <p className="text-2xl font-pop font-normal">
                <Link
                  href={`/category/${slugify(product.categoryname)}/${product._id}`}
                >
                  {product.title.slice(0, 20)}...
                </Link>
              </p>
              <p className="text-2xl text-hover-social font-bold font-pop">
                ${product.price}
              </p>

              <div className="flex items-center justify-center gap-4 mt-4">
                <div className="text-rating text-xl">★</div>
                <p className="font-bold text-xl">{product.rating.toFixed(1)}</p>
                <p className="text-lg text-social font-mont font-normal border-l pl-4 border-gray-300">
                  Sold 199
                </p>
              </div>

              <div className="flex justify-center items-center gap-7 mt-4">
                <button className="text-sm py-3 px-4 border cursor-pointer border-hover-social rounded-lg hover:bg-transparent bg-hover-social hover:text-black text-white font-bold transition-all">
                  Add to Cart
                </button>
                <button onClick={() => handleHeartClick(product.id)}>
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

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
        >
          Prev
        </button>
        {[...Array(totalPages).keys()].map((_, pageIndex) => (
          <button
            key={pageIndex}
            onClick={() => setCurrentPage(pageIndex + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === pageIndex + 1
                ? "bg-hover-social text-white"
                : "bg-gray-100"
            }`}
          >
            {pageIndex + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ViewNewArrivals;
