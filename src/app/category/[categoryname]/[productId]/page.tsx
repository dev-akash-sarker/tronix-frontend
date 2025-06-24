"use client";
import ProductGallery from "@/app/features/ProductGallery";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { RxCaretRight } from "react-icons/rx";

interface Props {
  params: {
    categoryname: string;
    productId: number;
  };
}

type ProductType = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  thumbnail: string;
  images: string[];
  reviews: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
};
// export default async function ProductPage({ params }: Props) {
export default function ProductPage({ params }: Props) {
  const { categoryname, productId } = params;
  const [product, setProduct] = useState<ProductType | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const plusquantity = () => {
    setQuantity(quantity + 1);
  };
  const minusquantity = () => {
    setQuantity(quantity - 1);
    if (quantity === 1 || quantity < 1) {
      setQuantity(1);
    }
  };
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `https://dummyjson.com/products/${productId}`
        );
        setProduct(res.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  // fetch specific product
  // const data = await fetchProduct(categoryName, productId)

  return (
    <div>
      <div className="p-6">
        {product ? (
          <div className="flex gap-[104px] flex-col lg:flex-row items-start">
            {/* Main Product Image */}
            <div className="w-full lg:w-[54.55%] h-[517px] bg-gray-400">
              <ProductGallery images={product.images} />
            </div>

            {/* Product Info */}
            <div className="w-full lg:w-[45.45%] flex flex-col gap-y-4">
              <h3 className="flex gap-x-2 items-center -mt-4 text-social">
                <Link
                  href="/"
                  className=" hover:text-hover-social transition-all"
                >
                  Home
                </Link>
                <RxCaretRight />
                <Link
                  href={`/category/${categoryname}`}
                  className=" hover:text-hover-social transition-all"
                >
                  {categoryname}
                </Link>
                <RxCaretRight />

                <Link
                  href={`/viewnewarrivel/newarrivelproduct/${product.id}`}
                  className="text-hover-social font-bold"
                >
                  {product.title}
                </Link>
              </h3>

              <h2 className="text-2xl">{product.title}</h2>

              {/* Rating, Review, Sold */}
              <div className="flex items-center gap-4">
                <p className="font-bold text-xl">{product.rating.toFixed(1)}</p>
                <div className="text-rating text-xl">
                  {"★".repeat(Math.floor(product.rating))}
                  {"☆".repeat(5 - Math.floor(product.rating))}
                </div>
                <p className="text-lg text-social font-mont font-normal">
                  Review ({product.reviews?.length || 0})
                </p>
                <p className="text-lg text-social font-mont font-normal border-l pl-4 border-gray-300">
                  Sold 199
                </p>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mt-4 mb-12">
                <p className="font-bold text-4xl font-pop">${product.price}</p>
                <p className="text-3xl font-pop font-normal text-social line-through">
                  {Math.round(
                    product.price / (1 - product.discountPercentage / 100)
                  )}
                  .00
                </p>
                <button className="px-2 py-3 rounded-lg border cursor-pointer border-hover-social text-hover-social">
                  Save {product.discountPercentage}%
                </button>
              </div>

              {/* Delivery Banner */}
              <div className=" m-0 flex items-center gap-x-8 relative">
                <div>
                  <Image
                    src="/product/delivery.svg"
                    width={162}
                    height={32}
                    alt="free delivery"
                  />
                </div>
                <div>
                  <Image
                    src="/product/avail.svg"
                    width={212}
                    height={32}
                    alt="available"
                  />
                </div>
                {product.stock > 1 && (
                  <div>
                    <Image
                      src="/product/instoke.svg"
                      width={118}
                      height={32}
                      alt="available"
                    />
                  </div>
                )}
              </div>
              <hr className="my-8 text-hover-social" />
              <p className="mb-4 text-xl font-pop text-black font-medium">
                Description
              </p>
              {/* Description */}
              <p className=" text-xl text-social font-pop font-normal align-top">
                {product.description}
              </p>

              <div className="">
                <div className=" flex flex-col gap-y-4 items-start md:flex-row md:items-center">
                  <p className="my-4 mr-2 text-xl font-pop text-social font-medium">
                    Quantity
                  </p>
                  <div className=" flex gap-x-4 items-center">
                    <button
                      onClick={minusquantity}
                      className="py-4 px-5 rounded-lg bg-social hover:bg-hover-social text-white"
                    >
                      <FaMinus />
                    </button>
                    <span className=" font-bold text-[18px] font-pop text-hover-social">
                      {quantity}
                    </span>
                    <button
                      onClick={plusquantity}
                      className="py-4 px-5 rounded-lg bg-social hover:bg-hover-social text-white"
                    >
                      <FaPlus />
                    </button>
                  </div>
                  <div className=" flex ml-0  md:ml-8 gap-x-4">
                    <button className=" text-base py-4 px-5 border cursor pointer border-hover-social rounded-[8px] hover:bg-transparent bg-hover-social hover:text-black text-white font-bold transition-all">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
