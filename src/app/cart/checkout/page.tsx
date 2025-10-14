"use client";

import Link from "next/link";
import { RxCaretRight } from "react-icons/rx";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/service/RTK/store";
// enum GenderEnum {
//   female = "female",
//   male = "male",
//   other = "other",
// }

interface IForminput {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  contact: string;
  country: string;
  city: string;
  zipCode: string;
  note: string;
  paymentMethod: string;
}

const MyCheckout: React.FC = () => {
  const [active, setActive] = useState<string>("");
  const cartAll = useSelector((state: RootState) => state.cart.carts);

const {
  register,
  handleSubmit,
  watch,
  setValue,
  formState: { errors },
} = useForm<IForminput>();
const actives = watch("paymentMethod");
  const onSubmit: SubmitHandler<IForminput> = (data) => console.log(data);
  const buttons = [
    { label: "Credit Card", value: "credit" },
    { label: "Cash on delivery", value: "Cash on delivery" },
  ];

  const shipment = 15;
  const tax = 10;
const subTotal = cartAll.reduce((sum, item)=> {
  return sum + item.price * item.quantity
}, 0)
  const totalPrice = cartAll.reduce((sum, item) => {
    return (sum + item.price * item.quantity) + shipment + tax;
  }, 0);

  const handlepaymentmethod = () => {

  }
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
      <div></div>
      {/* cart ites */}
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className=" flex justify-between gap-8 checkoutpage">
          <div className=" w-8/12">
            <h3 className=" font-pop font-medium text-lg text-dark-black">
              Buyer Info
            </h3>
            <hr className=" my-8 text-hover-social" />
            <div className="flex flex-wrap">
              {/* First Name */}
              <div className="w-1/2 mb-4">
                <label className="font-pop font-normal text-lg text-dark-black">
                  First Name
                </label>
                <input
                  placeholder="Enter Your First Name"
                  className="w-[95%] border border-dark-black rounded-lg h-[45px] outline-none indent-4"
                  {...register("firstName", {
                    required: "First Name is required",
                    maxLength: {
                      value: 20,
                      message: "Max length is 20 characters",
                    },
                  })}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div className="w-1/2 mb-4">
                <label className="font-pop font-normal text-lg text-dark-black">
                  Last Name
                </label>
                <input
                  placeholder="Enter Your Last Name"
                  className="w-[95%] border border-dark-black rounded-lg h-[45px] outline-none indent-4"
                  {...register("lastName", {
                    required: "Last Name is required",
                    maxLength: {
                      value: 20,
                      message: "Max length is 20 characters",
                    },
                  })}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">
                    {errors.lastName.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="w-1/2 mb-4">
                <label className="font-pop font-normal text-lg text-dark-black">
                  Email
                </label>
                <input
                  placeholder="Enter Your Email"
                  className="w-[95%] border border-dark-black rounded-lg h-[45px] outline-none indent-4"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email format",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Address */}
              <div className="w-1/2 mb-4">
                <label className="font-pop font-normal text-lg text-dark-black">
                  Address
                </label>
                <input
                  placeholder="Enter Your Address"
                  className="w-[95%] border border-dark-black rounded-lg h-[45px] outline-none indent-4"
                  {...register("address", {
                    required: "Address is required",
                  })}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">
                    {errors.address.message}
                  </p>
                )}
              </div>

              {/* Contact */}
              <div className="w-1/2 mb-4">
                <label className="font-pop font-normal text-lg text-dark-black">
                  Contact
                </label>
                <input
                  placeholder="Enter Your Contact"
                  className="w-[95%] border border-dark-black rounded-lg h-[45px] outline-none indent-4"
                  {...register("contact", {
                    required: "Contact is required",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Contact must be a number",
                    },
                  })}
                />
                {errors.contact && (
                  <p className="text-red-500 text-sm">
                    {errors.contact.message}
                  </p>
                )}
              </div>

              {/* Country */}
              <div className="w-1/2 mb-4">
                <label className="font-pop font-normal text-lg text-dark-black">
                  Country
                </label>
                <input
                  placeholder="Enter Your Country"
                  className="w-[95%] border border-dark-black rounded-lg h-[45px] outline-none indent-4"
                  {...register("country", {
                    required: "Country is required",
                  })}
                />
                {errors.country && (
                  <p className="text-red-500 text-sm">
                    {errors.country.message}
                  </p>
                )}
              </div>

              {/* City */}
              <div className="w-1/2 mb-4">
                <label className="font-pop font-normal text-lg text-dark-black">
                  City
                </label>
                <input
                  placeholder="Enter Your City"
                  className="w-[95%] border border-dark-black rounded-lg h-[45px] outline-none indent-4"
                  {...register("city", {
                    required: "City is required",
                  })}
                />
                {errors.city && (
                  <p className="text-red-500 text-sm">{errors.city.message}</p>
                )}
              </div>

              {/* ZipCode */}
              <div className="w-1/2 mb-4">
                <label className="font-pop font-normal text-lg text-dark-black">
                  Zip Code
                </label>
                <input
                  placeholder="Enter Your Zip Code"
                  className="w-[95%] border border-dark-black rounded-lg h-[45px] outline-none indent-4"
                  {...register("zipCode", {
                    required: "Zip Code is required",
                    pattern: {
                      value: /^[0-9]{4,6}$/,
                      message: "Enter valid Zip Code",
                    },
                  })}
                />
                {errors.zipCode && (
                  <p className="text-red-500 text-sm">
                    {errors.zipCode.message}
                  </p>
                )}
              </div>

              {/* Note */}
              <div className="w-1/2 mb-4">
                <label className="font-pop font-normal text-lg text-dark-black">
                  Note
                </label>
                <textarea
                  placeholder="Additional Note"
                  className="w-[195%] mt-6 py-3 border border-dark-black rounded-lg h-[45px] outline-none indent-4"
                  {...register("note")}
               
                />
              </div>
            </div>
          </div>
          <div className="w-5/12 py-8 pl-[27px] pr-[26px] border border-dark-black rounded-lg">
            <div>
              <h4 className=" font-pop font-semibold text-2xl text-dark-black mb-6">
                Your Order Summary
              </h4>
              {cartAll.length !== 0 ? (
                
            <div>
              {cartAll.map((item , i)=> (
                 <div key={i} className="  font-pop font-medium text-lg text-dark-black flex justify-between py-6 last:pb-0">
                  <div className=" flex gap-x-6">
                    <p className="w-[37.17px] text-right">{item.quantity}x</p>
                    <p className=" font-normal">{item.title}</p>
                  </div>
                  <p>${item.price}</p>
                </div>
              ))}
                 
            </div>
              ) : (
               ""
              )}
              {/* <div className="  font-pop font-medium text-lg text-dark-black flex justify-between py-6 last:pb-0">
                <div className=" flex gap-x-6">
                  <p className="w-[37.17px] text-right">521x</p>
                  <p className=" font-normal">USB Speaker Portable</p>
                </div>
                <p>$100.00</p>
              </div> */}
              <hr className="my-8 text-dark-black" />
              <div className="font-pop font-medium text-lg text-dark-black flex items-center justify-between py-4">
                <p>Subtotal</p>
                <p className=" text-right">${subTotal}</p>
              </div>
              <div className="font-pop font-medium text-lg text-dark-black flex items-center justify-between py-4">
                <p>Shipping</p>
                <p className=" text-right">$15.00</p>
              </div>
              <div className="font-pop font-medium text-lg text-dark-black flex items-center justify-between py-4">
                <p>Tax</p>
                <p className=" text-right">$10.00</p>
              </div>
              <hr className="my-8 text-dark-black" />
              <div className="font-pop font-medium text-lg text-dark-black flex items-center justify-between py-4">
                <p>Total</p>
                <p className=" text-right text-2xl text-hover-social">
                  ${totalPrice}
                </p>
              </div>
              <hr className="my-8 text-dark-black" />
              <div>
                <h4 className=" font-pop font-semibold text-2xl text-dark-black mb-8">
                  Payment
                </h4>
                <div className=" flex items-center justify-start gap-2">
                  {buttons.map((btn) => (
                    
                    <button
                      key={btn.value}
                    onChange={()=> setActive(btn.value)}
                      onClick={() => {setValue("paymentMethod", btn.value); setActive(btn.value);}}
                      className={`py-[10px] px-[9px] last:px-[16px] font-pop font-normal text-lg border border-dark-black rounded-lg transition-colors duration-200
            ${
              active === btn.value
                ? "bg-dark-black text-white"
                : "bg-white text-dark-black"
            }
          `}
           
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
                <button
                  className="w-full bg-hover-social rounded-lg py-[18.5px] text-white mt-6"
                  type="submit"
                >
                  Checkout
                </button>
                {/* <input type="submit"  /> */}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MyCheckout;
