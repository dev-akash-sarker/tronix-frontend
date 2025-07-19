"use client";
import {
  decreaseQuantity,
  increaseQuantity,
  removecarts,
  setAllSelected,
  toggleAllSelected,
  toggleSelected,
} from "@/service/RTK/features/add-cart/add_cart_Slice";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

import { RxCaretRight, RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";

const MyCheckout: React.FC = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const cartLength = useSelector((state) => state.cart.carts.length);
  const cartAll = useSelector((state) => state.cart.carts);

  const dispatch = useDispatch();
  const handleRemoveFromCart = (itemId: number) => {
    dispatch(removecarts({ id: itemId }));
  };
  const handleClick = (index) => {
    dispatch(toggleSelected(index)); // Dispatch action with the index
  };
const totalPrice = cartAll.reduce((sum, item) => {
  if (item.selected) {
    return sum + item.price * item.quantity;
  }
  return sum;
}, 0);

  const allSelected = cartAll.every(item => item.selected);
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
          <li>
            <RxCaretRight size={20} className=" inline-block" />
          </li>
          <li>
            <Link className=" text-hover-social" href={"/cart/checkout"}>
       Checkout
            </Link>
          </li>
        </ul>
      </div>
      {/* Header */}
      <h3 className=" font-mont font-bold text-5xl mt-5 text-center">
Checkout
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
          <div className=" w-14 h-14 rounded-full border border-hover-social flex justify-center items-center font-pop font-medium text-2xl text-hover-social">
            2
          </div>
          <h3 className=" font-pop font-medium text-2xl text-hover-social">
            Checkout
          </h3>
        </div>
      </div>
      {/* cart ites */}
      <div className=" flex justify-between gap-8">
        <div className=" w-7/12">
       <h3>Buyer Info</h3>
          <hr className=" mt-9 text-hover-social" />
       
        </div>
        <div className="w-5/12">
      hello
        </div>
      </div>
    </div>
  );
};

export default MyCheckout;
