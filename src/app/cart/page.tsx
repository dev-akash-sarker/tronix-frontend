"use client";
import Link from "next/link";
import { useState } from "react";
import { ImCheckmark } from "react-icons/im";
import { RxCaretRight } from "react-icons/rx";

const MyCart: React.FC = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div>
      {/* navigation */}
      <div className=" mt-8">
        <ul className=" flex items-center gap-4 font-pop font-medium text-lg">
          <li>
            <Link className=" text-old-gray hover:text-hover-social" href={"/"}>
              Home
            </Link>
          </li>
          <li>
            <RxCaretRight size={20} className=" inline-block" />
          </li>
          <li>
            <Link className=" text-hover-social" href={"/cart"}>
              My Cart
            </Link>
          </li>
        </ul>
      </div>
      {/* Header */}
      <h3 className=" font-mont font-bold text-5xl mt-5 text-center">
        My Cart
      </h3>
      <div className=" w-[804px] mx-auto flex my-[72px] justify-between items-center">
        <div className=" flex items-center gap-x-6">
          <div className=" w-14 h-14 rounded-full border border-hover-social flex justify-center items-center font-pop font-medium text-2xl text-hover-social">
            1
          </div>
          <h3 className=" font-pop font-medium text-2xl text-hover-social">
            My Cart
          </h3>
        </div>
        <div className="w-[304px] h-[2px] bg-dark-black"></div>
        <div className=" flex items-center gap-x-6">
          <div className=" w-14 h-14 rounded-full border border-social flex justify-center items-center font-pop font-medium text-2xl text-social">
            2
          </div>
          <h3 className=" font-pop font-medium text-2xl text-social">
            Checkout
          </h3>
        </div>
      </div>
      {/* cart ites */}
      <div className=" flex items-center gap-x-4">
        <input
          type="checkbox"
          name=""
          id=""
          className=" w-6 h-6 accent-amber-600"
        />
        <label
          htmlFor=""
          className=" font-pop font-medium text-lg text-gray-400 tracking-wide"
        >
          Select All
        </label>
      </div>
    </div>
  );
};

export default MyCart;
