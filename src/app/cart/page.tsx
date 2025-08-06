"use client";
import {
  decreaseQuantity,
  increaseQuantity,
  removecarts,
  setAllSelected,
  toggleSelected,
} from "@/service/RTK/features/add-cart/add_cart_Slice";
import { AppDispatch } from "@/service/RTK/store";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { RxCaretRight, RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";


// Define types
interface CartItem {
  id: number;
  thumbnail: string;
  title: string;
  price: number;
  quantity: number;
  selected: boolean;
}

interface CartState {
  carts: CartItem[];
}

interface RootState {
  cart: CartState;
}

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
const useAppDispatch = () => useDispatch<AppDispatch>();

const MyCart: React.FC = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const cartLength = useTypedSelector((state) => state.cart.carts.length);
  const cartAll = useTypedSelector((state) => state.cart.carts);

  const dispatch = useAppDispatch();

  const handleRemoveFromCart = (itemId: number) => {
    dispatch(removecarts({ id: itemId }));
  };

  const handleClick = (index: number) => {
    dispatch(toggleSelected(index));
  };

  const totalPrice = cartAll.reduce((sum, item) => {
    if (item.selected) {
      return sum + item.price * item.quantity;
    }
    return sum;
  }, 0);

  const allSelected = cartAll.every((item) => item.selected);

  return (
    <div>
      {/* navigation */}
      <div className="mt-8">
        <ul className="flex items-center gap-4 font-pop font-medium text-lg">
          <li>
            <Link className="text-old-gray hover:text-hover-social" href={"/"}>
              Home
            </Link>
          </li>
          <li>
            <RxCaretRight size={20} className="inline-block" />
          </li>
          <li>
            <Link className="text-hover-social" href={"/cart"}>
              My Cart
            </Link>
          </li>
        </ul>
      </div>
      {/* Header */}
      <h3 className="font-mont font-bold text-5xl mt-5 text-center">
        My Cart
      </h3>
      <div className="w-[804px] mx-auto flex my-[72px] justify-between items-center">
        <div className="flex items-center gap-x-6">
          <div className="w-14 h-14 rounded-full border border-hover-social flex justify-center items-center font-pop font-medium text-2xl text-hover-social">
            1
          </div>
          <h3 className="font-pop font-medium text-2xl text-hover-social">
            My Cart
          </h3>
        </div>
        <div className="w-[304px] h-[2px] bg-dark-black"></div>
        <div className="flex items-center gap-x-6">
          <div className="w-14 h-14 rounded-full border border-social flex justify-center items-center font-pop font-medium text-2xl text-social">
            2
          </div>
          <h3 className="font-pop font-medium text-2xl text-social">
            Checkout
          </h3>
        </div>
      </div>
      {/* cart items */}
      <div className="flex justify-between gap-8">
        <div className="w-7/12">
          <div className="flex items-center gap-x-4">
            <input
              type="checkbox"
              id="select-all"
              checked={allSelected}
              onChange={() => dispatch(setAllSelected(!allSelected))}
              className="w-6 h-6 accent-amber-600"
            />
            <label
              htmlFor="select-all"
              onClick={() => dispatch(setAllSelected(true))}
              className="font-pop font-medium text-lg text-gray-400 tracking-wide"
            >
              Select All
            </label>
          </div>
          <hr className="mt-9 text-hover-social" />
          <div>
            {cartAll.length !== 0 ? (
              <>
                <div className="pr-2 py-4">
                  {cartAll.map((item, i) => (
                    <div
                      className="flex pb-4 gap-4 border-b-2 border-gray-300 last:border-transparent mt-4 relative"
                      key={i}
                    >
                      <input
                        type="checkbox"
                        id={`cart-item-${i}`}
                        checked={item.selected}
                        onClick={() => handleClick(i)}
                        className="w-6 h-6 accent-amber-600"
                      />
                      <div className="w-44 h-44 rounded-sm bg-gray-500 relative">
                        <Image
                          src={item.thumbnail || "/fallback-image.jpg"}
                          width={180}
                          height={180}
                          alt={item.title}
                        />
                      </div>
                      <div className="flex flex-col justify-around">
                        <h3 className="font-pop font-medium text-2xl text-black">
                          {item.title}
                        </h3>
                        <p className="font-pop font-normal text-lg text-hover-social">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <div className="quantity flex items-center mt-2">
                          {item.quantity > 1 ? (
                            <div
                              className="minus plus w-8 h-8 rounded-sm bg-gray-400 text-white"
                              onClick={() =>
                                dispatch(decreaseQuantity({ id: item.id }))
                              }
                            >
                              <center className="my-2">
                                <FaMinus className="text-base" />
                              </center>
                            </div>
                          ) : (
                            <div className="minus plus w-8 h-8 rounded-sm bg-gray-400 text-white">
                              <center className="my-2" aria-disabled>
                                <FaMinus className="text-base" />
                              </center>
                            </div>
                          )}
                          <span className="font-pop font-bold mx-2">
                            {item.quantity}
                          </span>
                          <div
                            className="plus w-8 h-8 rounded-sm bg-hover-social text-white"
                            onClick={() =>
                              dispatch(increaseQuantity({ id: item.id }))
                            }
                          >
                            <center className="my-2">
                              <FaPlus className="text-base" />
                            </center>
                          </div>
                        </div>
                      </div>
                      <div
                        className="cursor-pointer absolute top-1/2 -translate-y-1/2 right-0"
                        onClick={() => handleRemoveFromCart(item.id)}
                      >
                        <RxCross2 className="text-4xl text-hover-social mr-0" />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p>You have no items in your shopping bag.</p>
            )}
          </div>
        </div>
        <div className="w-5/12">
          <div className="flex items-center justify-between border border-hover-social rounded-2xl px-6 py-6 mb-6 mt-14">
            <div className="w-14 h-14 rounded-2xl bg-hover-social text-white flex items-center justify-center">
              <Image src={"/ticket.svg"} width={29} height={21} alt="ticket" />
            </div>
            <h3 className="font-pop font-medium text-2xl text-dark-black">
              Have a coupon code?
            </h3>
            <RxCaretRight size={30} className="inline-block" />
          </div>
          <div className="p-8 border border-hover-social rounded-2xl">
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
            {cartAll.some((item) => item.selected) ? (
              <Link
                href="/cart/checkout"
                className="block my-4 w-full text-center py-4 bg-hover-social rounded-2xl text-white font-pop font-normal text-lg"
              >
                Checkout
              </Link>
            ) : (
              <button
                disabled
                className="my-4 w-full text-center py-4 bg-gray-400 rounded-2xl text-white font-pop font-normal text-lg"
              >
                Checkout
              </button>
            )}
            <center>
              <Link
                href="/"
                className="inline-block my-4 font-pop font-normal text-lg text-hover-social hover:text-old-gray"
              >
                Continue Shopping
              </Link>
            </center>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCart;