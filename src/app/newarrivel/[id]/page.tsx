"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RxCaretRight } from "react-icons/rx";

type Props = {
  params: { id: string };
};

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

export default function NewArrivalProductPage({ params }: Props) {
  const { id } = params;
  const [product, setProduct] = useState<ProductType | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div className="p-6">
      {product ? (
        <div className="flex gap-8 flex-col lg:flex-row">
          {/* Main Product Image */}
          <div className="w-full lg:w-[815px] h-auto border border-amber-200">
            <Image
              src={product.thumbnail}
              alt={product.title}
              width={815}
              height={517}
              className="object-cover aspect-[4/5] w-full h-auto"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-y-4">
            <h3 className="flex gap-x-6 items-center -mt-4">
              <Link href="/newarrivel">Newarrivel</Link>
              <RxCaretRight />
              <Link href="#" className="text-hover-social font-bold">
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
            <div className="flex items-center gap-4">
              <p className="font-bold text-4xl font-pop">${product.price}</p>
              <p className="text-3xl font-pop font-normal text-social line-through">
                {Math.round(
                  product.price / (1 - product.discountPercentage / 100)
                )}
                .00
              </p>
              <button className="px-2 py-3 rounded-lg border border-hover-social text-hover-social">
                Save {product.discountPercentage}%
              </button>
            </div>

            {/* Delivery Banner */}
            <div className=" flex items-center gap-x-8">
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
                  width={162}
                  height={32}
                  alt="available"
                />
              </div>
              <div>
                <Image
                  src="/product/stock.svg"
                  width={162}
                  height={32}
                  alt="available"
                />
              </div>
            </div>
            <hr className="my-8 text-hover-social" />
            <p className="my-4 text-2xl font-pop text-black font-medium">
              Description
            </p>
            {/* Description */}
            <p className=" text-xl text-social font-pop font-normal align-top">
              {product.description}
            </p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
