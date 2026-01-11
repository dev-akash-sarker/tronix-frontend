"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { FaMinus, FaPlus } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import {
  decreaseQuantity,
  increaseQuantity,
  removecarts,
} from "@/service/RTK/features/add-cart/add_cart_Slice";
import { RootState } from "@/service/RTK/store";
import Outsideclick from "@/app/(frontend)/features/ClickOutSide";

interface Category {
  id: number;
  name: string;
}

interface Product {
  _id: number;
  title: string;
  price: number;
  thumbnail: string;
  categoryname?: string;
}

const fetchCategories = async (): Promise<Category[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/category/allcategory`
  );
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
};

const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/product/viewproducts`
  );
  if (!res.ok) throw new Error("Failed to fetch products");
  const data = await res.json();
  console.log("Fetched Products:", data);
  return data ?? [];
};

const BottomNavbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);

  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.carts);
  const cartLength = cart.length;

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
console.log("All Products in Navbar:", searchQuery);
  // Safe search filter
const filteredProducts =
  searchQuery.trim().length >= 3
    ? products.filter(
        (product) =>
          product.title &&
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  const handleRemoveFromCart = (id: string) => {
    dispatch(removecarts({ id }));
  };

  return (
    <div className="my-8 relative">
      {/* Top Bar */}
      <div className="flex justify-between items-center">
        <button className="block md:hidden" onClick={() => setIsMenuOpen(true)}>
          <CiMenuBurger fontSize={35} />
        </button>

        <Link href="/" className="w-[112px] h-[54px] relative">
          <Image
            src="/Tronix.png"
            alt="logo"
            fill
            sizes="112px"
            className="object-contain"
          />
        </Link>

        <div className="flex items-center gap-4">
          {/* Desktop Search */}
          <div className="hidden md:flex relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="md:w-xs py-3 indent-6 rounded-tl-md rounded-bl-md bg-input-background outline-none focus:bg-gray-200"
              placeholder="search here"
            />
            <button className="bg-hover-social py-2 px-4 -ml-2 rounded-tr-md rounded-br-md relative">
              <Image
                src="/Search.svg"
                width={24}
                height={24}
                alt="searchicon"
              />
            </button>

            {/* Desktop search results */}
            {searchQuery.trim().length >= 3 && (
              <div className="absolute w-full bg-gray-200 max-h-[400px] z-20 top-14 rounded-md px-2 overflow-y-scroll">
                <div className="py-2 text-right">
                  <button
                    onClick={() => setSearchQuery("")}
                    className="hover:text-hover-social transition-all"
                  >
                    <IoMdClose />
                  </button>
                </div>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product, index) => (
                    <Link
                      key={index}
                      href={`/category/${product.categoryname}/${product._id}`}
                      className="flex gap-x-2 items-center justify-start py-2"
                    >
                    
                      <div className="w-10 h-10 rounded-md bg-gray-500 relative overflow-hidden">
                        <Image
                          src={product.thumbnail}
                          fill
                          alt={product.title}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h6 className="font-pop font-medium">
                          {product.title}
                        </h6>
                        <p>${product.price}</p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-gray-500 p-2">No products found.</p>
                )}
              </div>
            )}
          </div>

          {/* Mobile Search Toggle */}
          <div className="block md:hidden">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="py-2 px-4 -ml-2 rounded-tr-md rounded-br-md"
            >
              <Image
                src="/SearchBlack.svg"
                width={40}
                height={40}
                alt="search"
              />
            </button>
          </div>

          {/* Cart */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative cursor-pointer"
          >
            <Image
              src="/ShoppingBag.svg"
              width={40}
              height={40}
              alt="cart"
              className="w-7 h-7 md:w-10 md:h-10"
            />
            {cartLength > 0 && (
              <div className="bg-hover-social w-6 h-6 md:w-8 md:h-8 text-[10px] font-semibold flex justify-center items-center rounded-full text-white absolute -top-[12px] -right-[12px] md:-top-[15px] md:-right-[17px]">
                {cartLength}
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Search Input (always mounted, toggle visibility) */}
      <div
        className={`mx-2 mt-4 flex flex-col md:hidden transition-all ${
          isSearchOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-3 indent-6 rounded-tl-md rounded-bl-md bg-input-background outline-none focus:bg-gray-200"
            placeholder="search here"
          />
          <button className="bg-hover-social py-2 px-4 -ml-2 rounded-tr-md rounded-br-md">
            <Image src="/Search.svg" width={24} height={24} alt="searchicon" />
          </button>
        </div>

        {searchQuery.trim().length >= 3 && (
          <div className="bg-gray-200 rounded-md mt-2 overflow-y-auto max-h-60">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <Link
                  key={index}
                  href={`/category/${product.categoryname || ""}/${product._id}`}
                  className="flex items-center gap-2 p-2 hover:bg-gray-300"
                >
                  <div className="w-10 h-10 rounded-md bg-gray-500 relative overflow-hidden">
                    <Image
                      src={product.thumbnail}
                      fill
                      alt={product.title}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-pop font-medium">{product.title}</p>
                    <p className="text-sm text-hover-social">
                      ${product.price}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="p-2 text-gray-500">No products found.</p>
            )}
          </div>
        )}
      </div>

      {/* Desktop Navbar */}
      <nav className="hidden md:block my-8 mx-2 md:mx-0">
        <ul className="flex gap-x-8 py-2 px-2 border-y-2 border-gray-300">
          <li>
            <Link href="/" className="hover:text-hover-social capitalize">
              Home
            </Link>
          </li>
          {categories.map((category, index) => (
            <React.Fragment key={index}>
              <li>
                <Link
                  href={`/category/${slugify(category.name)}`}
                  className="hover:text-hover-social capitalize"
                >
                  {category.name}
                </Link>
              </li>
            </React.Fragment>
          ))}
        </ul>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-0 left-0 bg-black w-3/4 sm:w-1/2 h-full z-50 text-white">
          <Outsideclick
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
          >
            <nav className="my-8 block">
              <ul className="flex flex-col gap-y-8 py-2 px-8">
                <li>
                  <Link href="/" className="hover:text-hover-social">
                    Home
                  </Link>
                </li>
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`/category/${slugify(category.name)}`}
                      className="hover:text-hover-social"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <div
                className="absolute -top-5 right-5 cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              >
                <IoClose fontSize={25} />
              </div>
            </nav>
          </Outsideclick>
        </div>
      )}

      {/* Cart Dropdown */}
      {isCartOpen && (
        <div className="absolute w-[500px] h-[600px] z-50 overflow-y-scroll bg-white shadow-2xl top-20 right-0">
          <Outsideclick
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
          >
            {cart.length > 0 ? (
              <>
                <center>
                  <h3 className="font-mont font-bold text-2xl pt-5">My Cart</h3>
                </center>
                <hr className="text-gray-300 my-5" />
                <div className="px-2 py-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center pb-4 gap-4 border-b-2 border-gray-300 mt-4 relative"
                    >
                      <div className="w-25 h-25 rounded-sm bg-gray-500 overflow-hidden relative">
                        <Image
                          src={item.thumbnail as string}
                          width={100}
                          height={100}
                          alt={item.title}
                        />
                      </div>
                      <div>
                        <h3 className="font-pop font-medium text-2xl">
                          {item.title}
                        </h3>
                        <p className="font-pop font-normal text-lg text-hover-social">
                          ${item.price * item.quantity}
                        </p>
                        <div className="flex items-center mt-2 gap-2">
                          <button
                            className="w-8 h-8 bg-gray-400 text-white rounded-sm"
                            onClick={() =>
                              dispatch(
                                decreaseQuantity({ id: item.id.toString() })
                              )
                            }
                            disabled={item.quantity === 1}
                          >
                            <FaMinus className="mx-auto mt-2" />
                          </button>
                          <span className="font-pop font-bold">
                            {item.quantity}
                          </span>
                          <button
                            className="w-8 h-8 bg-hover-social text-white rounded-sm"
                            onClick={() =>
                              dispatch(
                                increaseQuantity({ id: item.id.toString() })
                              )
                            }
                          >
                            <FaPlus className="mx-auto mt-2" />
                          </button>
                        </div>
                      </div>
                      <div
                        className="absolute top-1/2 -translate-y-1/2 right-0 cursor-pointer"
                        onClick={() => handleRemoveFromCart(item.id.toString())}
                      >
                        <RxCross2 className="text-4xl text-hover-social" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-8">
                  <center className="font-pop font-medium text-2xl text-old-gray">
                    Summary
                  </center>
                  <div className="flex justify-between my-4">
                    <h4 className="font-pop font-medium text-lg text-old-gray">
                      Total
                    </h4>
                    <p className="font-pop font-medium text-lg text-hover-social">
                      ${totalPrice.toFixed(2)}
                    </p>
                  </div>
                  <Link
                    href="/cart/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full my-4 block text-center py-4 bg-hover-social rounded-2xl text-white font-pop text-lg"
                  >
                    Checkout
                  </Link>
                  <center>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="my-4 font-pop text-lg text-hover-social hover:text-old-gray"
                    >
                      Continue Shopping
                    </button>
                  </center>
                </div>
              </>
            ) : (
              <p className="p-4">You have no items in your shopping bag.</p>
            )}
          </Outsideclick>
        </div>
      )}
    </div>
  );
};

export default BottomNavbar;
