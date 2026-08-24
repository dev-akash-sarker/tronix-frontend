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
import { FaMinus, FaPlus } from "react-icons/fa";
import { RxCaretRight, RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

// Types
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
  const cartAll = useTypedSelector((state: RootState) => state.cart.carts);
  const dispatch = useAppDispatch();

  const handleRemoveFromCart = (itemId: number) => {
    dispatch(removecarts({ id: itemId }));
  };

  const handleClick = (index: number) => {
    dispatch(toggleSelected(index));
  };

  const totalPrice = cartAll.reduce((sum, item) => {
    if (item.selected) return sum + item.price * item.quantity;
    return sum;
  }, 0);

  const allSelected = cartAll.every((item) => item.selected);

  return (
    <div className="pb-24 lg:pb-0">
      {/* Breadcrumb */}
      <div className="mt-8">
        <ul className="flex items-center gap-4 font-pop font-medium text-lg">
          <li>
            <Link className="text-old-gray hover:text-hover-social" href="/">
              Home
            </Link>
          </li>
          <li>
            <RxCaretRight size={20} />
          </li>
          <li>
            <Link className="text-hover-social" href="/cart">
              My Cart
            </Link>
          </li>
        </ul>
      </div>

      {/* Title */}
      <h3 className="font-mont font-bold text-3xl sm:text-5xl mt-5 text-center">
        My Cart
      </h3>

      {/* Steps */}
      <div className="max-w-[804px] mx-auto flex flex-col sm:flex-row my-[40px] lg:my-[72px] justify-between items-center gap-6">
        <div className="flex items-center gap-x-6">
          <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border border-hover-social flex justify-center items-center font-pop font-medium text-xl lg:text-2xl text-hover-social">
            1
          </div>
          <h3 className="font-pop font-medium text-xl lg:text-2xl text-hover-social">
            My Cart
          </h3>
        </div>

        <div className="hidden sm:block w-[304px] h-[2px] bg-dark-black"></div>

        <div className="flex items-center gap-x-6">
          <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border border-social flex justify-center items-center font-pop font-medium text-xl lg:text-2xl text-social">
            2
          </div>
          <h3 className="font-pop font-medium text-xl lg:text-2xl text-social">
            Checkout
          </h3>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        {/* CART LIST */}
        <div className="w-full lg:w-7/12">
          <div className="flex items-center gap-x-4">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={() => dispatch(setAllSelected(!allSelected))}
              className="w-6 h-6 accent-amber-600"
            />
            <label className="font-pop font-medium text-lg text-gray-400">
              Select All
            </label>
          </div>

          <hr className="mt-9" />

          {cartAll.length !== 0 ? (
            <div className="pr-2 py-4">
              {cartAll.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row pb-4 gap-4 border-b-2 border-gray-300 last:border-transparent mt-4 relative"
                >
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={item.selected}
                    onClick={() => handleClick(i)}
                    className="w-6 h-6 accent-amber-600"
                  />

                  {/* Image */}
                  <div className="w-full sm:w-44 h-44 bg-gray-200 rounded-sm overflow-hidden">
                    <Image
                      src={item.thumbnail || "/fallback-image.jpg"}
                      width={180}
                      height={180}
                      alt={item.title}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex flex-col justify-between flex-1">
                    <h3 className="font-pop font-medium text-xl lg:text-2xl">
                      {item.title}
                    </h3>

                    <p className="font-pop text-lg text-hover-social">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>

                    {/* Quantity */}
                    <div className="flex items-center mt-2 gap-2">
                      <button
                        className="w-8 h-8 rounded-sm bg-gray-400 text-white flex items-center justify-center"
                        onClick={() =>
                          item.quantity > 1 &&
                          dispatch(decreaseQuantity({ id: item.id }))
                        }
                      >
                        <FaMinus />
                      </button>

                      <span className="font-pop font-bold">{item.quantity}</span>

                      <button
                        className="w-8 h-8 rounded-sm bg-hover-social text-white flex items-center justify-center"
                        onClick={() =>
                          dispatch(increaseQuantity({ id: item.id }))
                        }
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <div
                    className="sm:absolute sm:top-1/2 sm:right-0 sm:-translate-y-1/2 self-end sm:self-auto mt-2 cursor-pointer"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    <RxCross2 className="text-3xl text-hover-social" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No items in cart.</p>
          )}
        </div>

        {/* SUMMARY */}
        <div className="w-full lg:w-5/12">
          {/* Coupon */}
          <div className="flex flex-col sm:flex-row items-center justify-between border border-hover-social rounded-2xl px-6 py-6 mb-6 mt-4 lg:mt-14 gap-4">
            <div className="w-14 h-14 rounded-2xl bg-hover-social text-white flex items-center justify-center">
              <Image src="/ticket.svg" width={29} height={21} alt="ticket" />
            </div>
            <h3 className="font-pop font-medium text-xl lg:text-2xl">
              Have a coupon code?
            </h3>
            <RxCaretRight size={30} />
          </div>

          {/* Summary Card */}
          <div className="p-6 sm:p-8 border border-hover-social rounded-2xl">
            <p className="font-pop font-medium text-xl text-old-gray text-center">
              Summary
            </p>

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
                className="block my-4 w-full text-center py-4 bg-hover-social rounded-2xl text-white font-pop text-lg"
              >
                Checkout
              </Link>
            ) : (
              <button
                disabled
                className="my-4 w-full py-4 bg-gray-400 rounded-2xl text-white font-pop text-lg"
              >
                Checkout
              </button>
            )}

            <center>
              <Link
                href="/"
                className="inline-block my-4 font-pop text-lg text-hover-social"
              >
                Continue Shopping
              </Link>
            </center>
          </div>
        </div>
      </div>

      {/* 🔥 MOBILE STICKY CHECKOUT BAR */}
      {cartAll.some((item) => item.selected) && (
        <div className="fixed lg:hidden bottom-0 left-0 w-full bg-white border-t p-3 flex justify-between items-center z-50">
          <span className="font-bold text-lg">
            ${totalPrice.toFixed(2)}
          </span>
          <Link
            href="/cart/checkout"
            className="bg-hover-social text-white px-6 py-3 rounded-lg"
          >
            Checkout
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyCart;
