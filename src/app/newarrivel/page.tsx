"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { slugify } from "../utility/slugify";

export interface NewArrivalType {
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

const Viewnewarrivel: React.FC = () => {
  const [newarrivel, setNewarrivel] = useState<NewArrivalType[]>([]);

  const [favorites, setFavorites] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 9;
  const handleHeartClick = (productId: number) => {
    setFavorites(
      (prev) =>
        prev.includes(productId)
          ? prev.filter((id) => id !== productId) // remove
          : [...prev, productId] // add
    );
  };

  useEffect(() => {
    const fetchNewArrivel = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        const products: NewArrivalType[] = response.data.products;

        // ✅ Sort by meta.createdAt (newest first)
        const sortedProducts = products.sort((a, b) => {
          return (
            new Date(b.meta.createdAt).getTime() -
            new Date(a.meta.createdAt).getTime()
          );
        });

        setNewarrivel(sortedProducts);
      } catch (error) {
        console.error("Failed to fetch new arrivel:", error);
      }
    };

    fetchNewArrivel();
  }, []);
  // Get current page products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = newarrivel.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(newarrivel.length / productsPerPage);
  console.log(newarrivel);
  return (
    <div>
      <h3 className=" font-mont text-4xl font-bold mb-4">New Arrivel</h3>
      {newarrivel ? (
        <div>
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentProducts.map((product, key) => (
              <div className="border border-gray-300 rounded-md" key={key}>
                <div className="m-4 w-auto h-[313px] rounded-md bg-gray-400 overflow-hidden">
                  <Image
                    src={product.thumbnail}
                    width={313}
                    height={313}
                    className=" w-full h-full"
                    alt={product.title}
                  />
                </div>
                <div className=" text-center my-4">
                  <p className=" text-2xl font-pop font-normal">
                    <Link
                      href={`/category/${slugify(product.category)}/${
                        product.id
                      }`}
                    >
                      {product.title.slice(0, 20)}
                    </Link>
                    ...
                  </p>
                  <p className=" text-2xl text-hover-social font-bold font-pop">
                    ${product.price}
                  </p>
                  <div className="flex items-center justify-center gap-4 mt-4">
                    <div className="text-rating text-xl">★</div>
                    <p className="font-bold text-xl">
                      {product.rating.toFixed(1)}
                    </p>

                    {/* <p className="text-lg text-social font-mont font-normal">
                      Review ({product.reviews?.length || 0})
                    </p> */}
                    <p className="text-lg text-social font-mont font-normal border-l pl-4 border-gray-300">
                      Sold 199
                    </p>
                  </div>
                  <div className=" flex justify-center items-center gap-7 mt-4">
                    <button className=" text-sm py-3 px-4 border cursor pointer border-hover-social rounded-[8px] hover:bg-transparent bg-hover-social hover:text-black text-white font-bold transition-all">
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
          {/* Pagination Buttons */}
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
      ) : (
        "Loading"
      )}
    </div>
  );
};

export default Viewnewarrivel;
