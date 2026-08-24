"use client";

import Link from "next/link";
import { RxCaretRight } from "react-icons/rx";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/service/RTK/store";
// import { Router } from "next/router";
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

// interface Buyer {
//   firstName: string;
//   lastName: string;
//   email: string;
//   contact: string;
//   address: string;
//   city: string;
//   country: string;
//   zipCode: string;
//   note: string | null; // Or "" if empty strings are used
// }

// interface OrderItem {
//   productId: string | number; // Adjust based on your item.id type
//   title: string;
//   quantity: number;
//   price: number | string; // Often string for currency precision
// }

// interface Order {
//   item: OrderItem[]; // Array of items from cartAll
//   subtotal: string; // toFixed() returns string
//   shipping: number;
//   tax: number;
//   total: string;
// }

// interface Payment {
//   method: string;
//   status: string;
// }

//

// interface ApiResponse {
//   // If the API wraps your data or adds extras like id/timestamps
//   _id?: string; // Optional if returned
//   buyer: Buyer;
//   order: Order;
//   payment: Payment;
//   message?: string; // e.g., success message
//   orderID?: string;
//   // Add any other top-level fields here, like errors: { code: number, details: string }
// }

const MyCheckout: React.FC = () => {
  const [active, setActive] = useState<string>("");
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false);
  const [ischeckout, setIscheckout] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string | null | undefined>(null);
  const cartAll = useSelector((state: RootState) => state.cart.carts);
  console.log(cartAll);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IForminput>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const actives = watch("paymentMethod");
  const onSubmit: SubmitHandler<IForminput> = async (data) => {
    const alldata = {
      buyer: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        contact: data.contact,
        address: data.address,
        city: data.city,
        country: data.country,
        zipCode: data.zipCode,
        note: data.note === " " ? " " : data.note,
      },
      order: {
        items: cartAll.map((item) => {
          // Return a plain object for each cart item (flat array)
          return {
            productId: item._id,
            title: item.title,
            quantity: item.quantity,
            price: item.price,
            thumbnail: item.thumbnail,
          };
        }),
        subtotal: subTotal.toFixed(),
        shipping: 15.0,
        tax: 10.0,
        total: totalPrice.toFixed(),
      },
      payment: {
        method: data.paymentMethod,
        status: "pending",
      },
    };

    const buyerRegistration = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      contact: data.contact,
      address: data.address,
      city: data.city,
      country: data.country,
      zipCode: data.zipCode,
    };
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const res = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/api/v1/checkout`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(alldata),
  }
)
  .then((res) => res.json())
  .then((result) => {

    // 👉 Online payment (SSLCommerz)
if (result?.url) {
  window.location.href = result.url; // BEST for payment gateway
} else {
  console.error("No redirect URL", result);
  alert("Payment initialization failed");
}

    // 👉 Cash on Delivery
    setIscheckout(true);
    setOrderSuccess(true);
    setOrderId(result.orderID || result._id);

    alert(`✅ Order placed successfully. Order ID: ${result.orderID || result._id}`);

    // OPTIONAL redirect
    // router.push(`/order-success?orderId=${result.orderID || result._id}`);
  })
  .catch((error) => {
    console.error("Error during checkout fetch:", error);
  });

      
      const newres = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/adduserbyorder`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(buyerRegistration),
        }
      );
      // const data: ApiResponse = await res.json();

  await newres.json();
    
    

      console.log("all datas", alldata);
    } catch (error) {
      console.log(error);
    }
  };
  const buttons = [
    { label: "SSLCOMMERZE", value: "SSLCOMMERZE" },
    { label: "Cash on delivery", value: "Cash on delivery" },
  ];

  const shipment = 15;
  const tax = 10;
  const subTotal = cartAll.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
  const totalPrice = cartAll.reduce((sum, item) => {
    return sum + item.price * item.quantity + shipment + tax;
  }, 0);

  return (
    <>
      <div>
        {/* navigation */}
        <div className=" mt-8">
          <ul className=" flex items-center gap-4 font-pop font-medium text-lg">
            <li>
              <Link
                className=" text-old-gray hover:text-hover-social"
                href={"/"}
              >
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
        <div className=" w-201 mx-auto flex my-18 justify-between items-center">
          <div className=" flex items-center gap-x-6">
            <div className=" w-14 h-14 rounded-full border border-hover-social flex justify-center items-center font-pop font-medium text-2xl text-hover-social">
              1
            </div>
            <h3 className=" font-pop font-medium text-2xl text-hover-social">
              My Cart
            </h3>
          </div>
          <div className="w-76 h-0.5 bg-dark-black"></div>
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
                    className="w-[95%] border border-dark-black rounded-lg h-11.25 outline-none indent-4"
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
                    className="w-[95%] border border-dark-black rounded-lg h-11.25 outline-none indent-4"
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
                    className="w-[95%] border border-dark-black rounded-lg h-11.25 outline-none indent-4"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email format",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div className="w-1/2 mb-4">
                  <label className="font-pop font-normal text-lg text-dark-black">
                    Address
                  </label>
                  <input
                    placeholder="Enter Your Address"
                    className="w-[95%] border border-dark-black rounded-lg h-11.25 outline-none indent-4"
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
                    className="w-[95%] border border-dark-black rounded-lg h-11.25 outline-none indent-4"
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
                    className="w-[95%] border border-dark-black rounded-lg h-11.25 outline-none indent-4"
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
                    className="w-[95%] border border-dark-black rounded-lg h-11.25 outline-none indent-4"
                    {...register("city", {
                      required: "City is required",
                    })}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm">
                      {errors.city.message}
                    </p>
                  )}
                </div>

                {/* ZipCode */}
                <div className="w-1/2 mb-4">
                  <label className="font-pop font-normal text-lg text-dark-black">
                    Zip Code
                  </label>
                  <input
                    placeholder="Enter Your Zip Code"
                    className="w-[95%] border border-dark-black rounded-lg h-11.25 outline-none indent-4"
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
                    className="w-[195%] mt-6 py-3 border border-dark-black rounded-lg h-11.25 outline-none indent-4"
                    {...register("note")}
                  />
                </div>
              </div>
            </div>
            <div className="w-5/12 py-8 pl-6.75 pr-6.5 border border-dark-black rounded-lg">
              <div>
                <h4 className=" font-pop font-semibold text-2xl text-dark-black mb-6">
                  Your Order Summary
                </h4>
                {cartAll.length !== 0 ? (
                  <div>
                    {cartAll.map((item, i) => (
                      <div
                        key={i}
                        className="  font-pop font-medium text-lg text-dark-black flex justify-between py-6 last:pb-0"
                      >
                        <div className=" flex gap-x-6">
                          <p className="w-[37.17px] text-right">
                            {item.quantity}x
                          </p>
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
                  <p className=" text-right">${subTotal.toFixed()}</p>
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
                    ${totalPrice.toFixed()}
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
                        type="button"
                        onChange={() => setActive(btn.value)}
                        onClick={() => {
                          setValue("paymentMethod", btn.value);
                          setActive(btn.value);
                        }}
                        className={`py-2.5 px-2.25 last:px-4 font-pop font-normal text-lg border border-dark-black rounded-lg transition-colors duration-200
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
                    className={`w-full rounded-lg py-[18.5px] text-white mt-6 transition
    ${ischeckout ? "bg-gray-400 cursor-not-allowed" : "bg-hover-social"}
  `}
                    type="submit"
                    disabled={ischeckout}
                  >
                    {ischeckout ? "Order Placed" : "Checkout"}
                  </button>
                  {/* <input type="submit"  /> */}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      {orderSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 w-105 text-center">
            <h3 className="text-2xl font-semibold text-green-600 mb-4">
              ✅ Order placed successfully
            </h3>

            <p className="text-lg mb-2">
              Payment Method: <b>Cash on Delivery</b>
            </p>

            <p className="text-lg mb-6">
              Order ID: <b>{orderId}</b>
            </p>

            <button
              onClick={() => setOrderSuccess(false)}
              className="bg-dark-black text-white px-6 py-3 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MyCheckout;
