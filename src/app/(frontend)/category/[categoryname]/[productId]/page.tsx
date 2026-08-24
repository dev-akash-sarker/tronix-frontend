"use client";
import ProductGallery from "@/app/(frontend)/features/ProductGallery";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { RxCaretRight } from "react-icons/rx";
import { Rating } from "@smastrom/react-rating";
import { IoHeartSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { addcarts } from "@/service/RTK/features/add-cart/add_cart_Slice";
import { RootState } from "@/service/RTK/store";
// import styles from "../styles/Home.module.css";
type Props = {
  params: Promise<{ categoryname: string; productId: number }>;
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
  sold: number;
  images: string[];
  reviews: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
};

// export default async function ProductPage({ params }: Props) {<
export default function ProductPage({ params }: Props) {
  const { categoryname, productId } = React.use(params);
  const [product, setProduct] = useState<ProductType | null>(null);
  const [isReview, setIsReview] = useState<boolean | null>(true);
  const [isDescription, setIsDescription] = useState<boolean | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [rating, setRating] = useState<number>(1);

  // const mycart = useSelector((state) => console.log(state));
  const dispatch = useDispatch();
  const allproductcart = useSelector((state: RootState) => state.cart.carts);
  const cartIDS = allproductcart.map((item) => item.id);
  // console.log( "akash",mycart);
  // redux end
  function onChange(newValue: number) {
    console.log(newValue);
    setRating(newValue);
  }
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
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/product/${productId}`
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
  const clickDescription = () => {
    setIsDescription(true);
    setIsReview(false);
    if (isDescription === true) {
      setIsReview(false);
    }
  };
  const clickReview = () => {
    setIsDescription(false);
    setIsReview(true);
  };

  const handleAddToCart = () => {
    dispatch(addcarts({ ...product, quantity: quantity }));
  };
  return (
    <div>
      <div className="p-6 relative">
        {product ? (
          <>
            <div className="flex gap-[104px] flex-col lg:flex-row items-start">
              {/* Main Product Image */}
              <div className="w-full lg:w-2/5 h-[517px] bg-gray-400">
                <ProductGallery images={product.images} />
              </div>

              {/* Product Info */}
              <div className="w-full lg:w-3/5 flex flex-col gap-y-4">
                <h4 className=" -mt-4 text-social">
                  <Link
                    href="/"
                    className=" inline-block hover:text-hover-social transition-all"
                  >
                    Home
                  </Link>
                  <RxCaretRight className=" inline-block" />
                  <Link
                    href={`/category/${categoryname}`}
                    className=" inline-block hover:text-hover-social transition-all"
                  >
                    {categoryname}
                  </Link>
                  <RxCaretRight className=" inline-block" />

                  <Link
                    href={`/viewnewarrivel/newarrivelproduct/${product.id}`}
                    className="text-hover-social font-bold"
                  >
                    {product.title}
                  </Link>
                </h4>

                <h2 className=" text-lg lg:text-2xl">{product.title}</h2>

                {/* Rating, Review, Sold */}
                <div className=" flex gap-x-4">
                  {product.rating == 0.0 ? (
                    <p className="text-lg text-social font-mont font-normal">No Review yet</p>
                  ) : (
                    <>
                      <p className="font-bold text-xl">
                        {product.rating.toFixed(1)}
                      </p>
                      <div className="text-rating text-xl">
                        {"★".repeat(Math.floor(product.rating))}
                        {"☆".repeat(5 - Math.floor(product.rating))}
                      </div>
                      <p className="text-lg text-social font-mont font-normal">
                        Review ({product.reviews?.length || 0})
                      </p>
                    </>
                  )}

                  <p className="text-lg text-social font-mont font-normal border-l pl-4 border-gray-300">
                    Sold {product.sold ? product.sold : 0}
                  </p>

                  <div className=" flex justify-start items-center gap-2">
                    <IoHeartSharp className=" inline-block text-hover-social" />
                    <p className=" hidden md:block font-pop font-normal text-lg">
                      Add to Wishlist
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center gap-4 mt-4 mb-12">
                  <p className="font-bold text-4xl font-pop">
                    Tk {product.price}
                  </p>
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

                <div className="flex justify-start gap-x-10">
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
                  </div>
                  <div className="flex items-end gap-x-4">
                    {cartIDS.includes(product.id) ? (
                      <button className=" text-sm py-3 px-4 border cursor pointer border-hover-social rounded-[8px] hover:bg-transparent bg-hover-social hover:text-black text-white font-bold transition-all">
                        <Link href="/cart">Go to Cart</Link>
                      </button>
                    ) : (
                      <button
                        onClick={handleAddToCart}
                        className=" text-sm py-3 px-4 border cursor pointer border-hover-social rounded-[8px] hover:bg-transparent bg-hover-social hover:text-black text-white font-bold transition-all"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className=" flex lg:gap-x-[140px] items-start flex-wrap lg:flex-nowrap mt-4 lg:mt-0">
              <div className=" w-full lg:w-2/5">
                <ul className=" flex gap-x-4 font-pop text-2xl font-medium">
                  <li
                    onClick={() => clickReview()}
                    className={
                      isReview
                        ? " text-hover-social border-b-2 border-hover-social"
                        : "border-b-2 border-transparent text-social cursor-pointer"
                    }
                  >
                    Reviews ({product.reviews?.length || 0})
                  </li>
                  <li
                    onClick={() => clickDescription()}
                    className={
                      isDescription
                        ? " text-hover-social border-b-2 border-hover-social"
                        : "border-b-2 border-transparent text-social cursor-pointer"
                    }
                  >
                    Description
                  </li>
                </ul>
                <div>
                  <div>
                    {isReview ? (
                      <div>
                        <div className="w-full">
                          <div className=" mt-4 relative">
                            <div className="flex gap-x-4 w-full">
                              <div className=" w-14 h-14 rounded-[4px] bg-old-gray"></div>
                              <div className=" flex flex-col gap-x-4">
                                <p className=" font-pop font-medium text-[18px] capitalize">
                                  Vanila
                                </p>

                                <div className=" flex gap-x-2">
                                  <p className="font-pop font-medium text-[18px] text-red-600">
                                    {product.rating.toFixed(1)}
                                  </p>
                                  <div className="text-rating text-xl">
                                    {"★".repeat(Math.floor(product.rating))}
                                    {"☆".repeat(5 - Math.floor(product.rating))}
                                  </div>
                                  <div className=" font-pop font-normal text-[18px] text-old-gray">
                                    1 month ago
                                  </div>
                                </div>
                              </div>
                            </div>
                            <p className=" w-full mt-8">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua.{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className=" w-full mt-6">{product.description}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className=" w-full lg:w-3/5">
                <div className=" font-pop text-[18px] font-bold text-dark-black my-4">
                  Add Your Review
                </div>
                <div className="  font-pop text-[18px] font-normal text-gray-400 lg:w-[480px] my-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor.{" "}
                </div>
                <div className=" my-4">
                  <label
                    htmlFor="name"
                    className=" font-pop text-[18px] font-normal text-dark-black my-4"
                  >
                    Name *
                  </label>
                  <br />
                  <input
                    type="text"
                    placeholder="Your Name"
                    className=" w-full indent-4  h-[60px] border-2 border-social rounded-[8px] my-4 outline-none"
                  />
                </div>
                <div className=" my-4">
                  <label
                    htmlFor="email"
                    className=" font-pop text-[18px] font-normal text-dark-black my-4"
                  >
                    Email *
                  </label>
                  <br />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className=" w-full indent-4  h-[60px] border-2 border-social rounded-[8px] my-4 outline-none"
                  />
                </div>
                <div className=" my-4">
                  <label
                    htmlFor="review"
                    className=" font-pop text-[18px] font-normal text-dark-black my-4"
                  >
                    Review *
                  </label>
                  <br />
                  <textarea
                    placeholder="Your Review"
                    className=" w-full indent-4 pt-4  h-[119px] border-2 border-social rounded-[8px] my-4 outline-none"
                  />
                </div>
                <div className=" flex gap-x-8 items-center">
                  <p className="font-pop text-xl font-normal text-dark-black">
                    Rating
                  </p>
                  <div>
                    <Rating
                      style={{ maxWidth: 180 }}
                      value={rating}
                      onChange={onChange}
                      halfFillMode="box"
                      transition="zoom"
                    />
                  </div>
                </div>
                <button className="py-[16.5px] px-[57.5px] bg-hover-social text-white text-[18px] font-medium rounded-[8px] mt-10">
                  Submit
                </button>
              </div>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
