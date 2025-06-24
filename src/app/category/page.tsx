"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RxCaretRight } from "react-icons/rx";
import { slugify } from "../utility/slugify";

import Image from "next/image";
import { FaHeart } from "react-icons/fa";

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
interface Category {
  id: number;
  name: string;
}
const CategoryPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<NewArrivalType[]>([]);
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
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>(
          "http://localhost:3000/api/categories"
        );
        setCategories(response.data);
        const responsenew = await axios.get("https://dummyjson.com/products");
        const products: NewArrivalType[] = responsenew.data.products;
        setProducts(products);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);
  // Get current page products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(products.length / productsPerPage);
  return (
    <div>
      <p className="flex mt-12 gap-x-2 items-center">
        <Link href="/" className=" hover:text-hover-social transition-all">
          Home
        </Link>
        <RxCaretRight />

        <Link href="/category" className="text-hover-social font-bold">
          All Category
        </Link>
      </p>

      <div className=" text-center">
        <h4 className=" font-mont font-bold text-5xl text-black mt-12">
          All Categories
        </h4>
        <p className=" w-full md:w-[627.6px] font-pop font-normal text-2xl mt-6 text-black mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore.
        </p>
      </div>
      <div className=" flex gap-x-8 mt-20">
        <div className=" w-1/3">
          <div className=" border border-red-500 p-6 rounded-2xl">
            <h5 className=" font-pop font-bold text-lg mb-8">All Categories</h5>
            <nav>
              <ul className=" custom-scroll flex flex-col gap-y-4 overflow-y-scroll h-[300px]">
                {categories.map((item, i) => (
                  <>
                    <li key={i}>
                      <Link
                        href={`/category/${slugify(item.name)}`}
                        className="font-pop font-normal text-lg mb-8 text-black"
                      >
                        {item.name}
                      </Link>
                      <span className=" ml-2 font-pop font-normal text-lg text-social">
                        (null)
                      </span>
                    </li>
                    <li key={i}>
                      <Link
                        href={`/category/${slugify(item.name)}`}
                        className="font-pop font-normal text-lg mb-8 text-black"
                      >
                        {item.name}
                      </Link>
                      <span className=" ml-2 font-pop font-normal text-lg text-social">
                        (null)
                      </span>
                    </li>
                  </>
                ))}
              </ul>
            </nav>
          </div>
        </div>
        <div className=" w-2/3">
          <div className=" border border-red-500 p-6 rounded-2xl">
            <div>
              {products && (
                <div>
                  <div className=" flex justify-between">
                    <h3 className=" font-mont md:text-2xl lg:text-3xl xl:text-4xl font-bold">
                      Product List
                    </h3>
                    <Link
                      href="/newarrivel"
                      className="block font-pop text-lg lg:text-2xl text-hover-social hover:underline"
                    >
                      View All
                    </Link>
                  </div>
                  <div className="products grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                    {currentProducts.map((product, key) => (
                      <div
                        className="border border-gray-300 rounded-md"
                        key={key}
                      >
                        <div className="m-4 w-auto h-[180px] rounded-md bg-gray-400 overflow-hidden">
                          <Image
                            src={product.thumbnail}
                            width={313}
                            height={313}
                            className=" w-full h-full"
                            alt={product.title}
                          />
                        </div>
                        <div className=" text-center my-4">
                          <p className=" text-2xl font-pop font-normal h-[33px] overflow-hidden">
                            <Link
                              href={`/category/${product.category}/${product.id}`}
                            >
                              {product.title.slice(0, 28)}
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
                            <button
                              onClick={() => handleHeartClick(product.id)}
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
              )}
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
        </div>
      </div>
    </div>
  );
};
export default CategoryPage;
