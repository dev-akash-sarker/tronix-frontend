"use client";

import Image from "next/image";
import "./style.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

interface Product {
  _id: string;
  id?: string;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage?: number;
  rating: number;
  stock: number;
  sales?: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  images: string[];
  thumbnail: string;
}

interface Campaign {
  _id: string;
  title: string;
  description: string;
  discountPercentage: number;
  startDate: string;
  endDate: string;
  products: Product[];
}

export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

const PromotionCampaign: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  function slugify(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  /*
   * Calculate remaining campaign time
   */
  const calculateTimeLeft = (endDate: string): TimeLeft => {
    const diff = new Date(endDate).getTime() - Date.now();

    if (diff <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
      (diff % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );

    const minutes = Math.floor(
      (diff % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    const seconds = Math.floor(
      (diff % (1000 * 60)) / 1000
    );

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  };

  /*
   * Fetch promotions
   */
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get<Campaign[]>(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/promotion/getpromotion`
        );

        console.log(
          "PROMOTION RESPONSE:",
          response.data
        );

        setCampaigns(response.data);
      } catch (error) {
        console.error(
          "Failed to fetch promotions:",
          error
        );
      }
    };

    fetchCampaigns();
  }, []);

  /*
   * Countdown
   *
   * Uses the first campaign's endDate.
   */
  useEffect(() => {
    if (!campaigns.length) {
      return;
    }

    const endDate = campaigns[0].endDate;

    const updateCountdown = () => {
      setTimeLeft(calculateTimeLeft(endDate));
    };

    updateCountdown();

    const interval = setInterval(
      updateCountdown,
      1000
    );

    return () => clearInterval(interval);
  }, [campaigns]);

  /*
   * Calculate discounted price
   */
  const updatedPrice = (
    price: number,
    discount: number
  ) => {
    const discountAmount =
      (discount / 100) * price;

    return Math.round(
      price - discountAmount
    );
  };

  /*
   * Loading state
   */
  if (!timeLeft) {
    return <div>Loading...</div>;
  }

  /*
   * If campaign expired
   */
  const campaignExpired =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  if (campaignExpired) {
    return null;
  }

  return (
    <>
      {campaigns.map((item) => (
        <div key={item._id}>
          {/* ================= HEADER ================= */}

          <div className="flex gap-8 flex-col justify-center md:flex-row md:justify-between items-center mt-24 mb-20">
            <div className="flex gap-x-8 items-center">
              <h4 className="font-mont font-bold text-black text-lg md:text-3xl lg:text-[56px]">
                {item.title}
              </h4>

              {/* Mobile View All */}

              <div className="block md:hidden">
                <Link
                  href={`/campaign/${slugify(
                    item.title
                  )}`}
                  className="font-pop font-normal text-2xl text-hover-social hover:underline"
                >
                  View All
                </Link>
              </div>

              {/* Desktop Countdown */}

              <div className="hidden md:flex gap-4 md:gap-8 ml-2 md:ml-0">
                {/* Days */}

                <div className="w-16 h-16 md:w-20 md:h-20 border border-hover-social rounded-lg md:rounded-2xl flex flex-col justify-center items-center">
                  <div className="text-xl md:text-2xl font-pop font-bold text-hover-social">
                    {timeLeft.days}
                  </div>

                  <div className="font-pop font-normal text-base text-social">
                    D
                  </div>
                </div>

                {/* Hours */}

                <div className="w-16 h-16 md:w-20 md:h-20 border border-hover-social rounded-lg md:rounded-2xl flex flex-col justify-center items-center">
                  <div className="text-xl md:text-2xl font-pop font-bold text-hover-social">
                    {timeLeft.hours}
                  </div>

                  <div className="font-pop font-normal text-base text-social">
                    Hrs
                  </div>
                </div>

                {/* Minutes */}

                <div className="w-16 h-16 md:w-20 md:h-20 border border-hover-social rounded-lg md:rounded-2xl flex flex-col justify-center items-center">
                  <div className="text-xl md:text-2xl font-pop font-bold text-hover-social">
                    {timeLeft.minutes}
                  </div>

                  <div className="font-pop font-normal text-base text-social">
                    Min
                  </div>
                </div>

                {/* Seconds */}

                <div className="w-16 h-16 md:w-20 md:h-20 border border-hover-social rounded-lg md:rounded-2xl flex flex-col justify-center items-center">
                  <div className="text-xl md:text-2xl font-pop font-bold text-hover-social">
                    {timeLeft.seconds}
                  </div>

                  <div className="font-pop font-normal text-base text-social">
                    Sec
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop View All */}

            <div className="hidden md:block">
              <Link
                href={`/campaign/${slugify(
                  item.title
                )}`}
                className="font-pop font-normal text-2xl text-hover-social hover:underline"
              >
                View All
              </Link>
            </div>

            {/* Mobile Countdown */}

            <div className="flex md:hidden gap-4 md:gap-8 ml-2 md:ml-0">
              {/* Days */}

              <div className="w-16 h-16 md:w-20 md:h-20 border border-hover-social rounded-lg md:rounded-2xl flex flex-col justify-center items-center">
                <div className="text-xl md:text-2xl font-pop font-bold text-hover-social">
                  {timeLeft.days}
                </div>

                <div className="font-pop font-normal text-base text-social">
                  D
                </div>
              </div>

              {/* Hours */}

              <div className="w-16 h-16 md:w-20 md:h-20 border border-hover-social rounded-lg md:rounded-2xl flex flex-col justify-center items-center">
                <div className="text-xl md:text-2xl font-pop font-bold text-hover-social">
                  {timeLeft.hours}
                </div>

                <div className="font-pop font-normal text-base text-social">
                  Hrs
                </div>
              </div>

              {/* Minutes */}

              <div className="w-16 h-16 md:w-20 md:h-20 border border-hover-social rounded-lg md:rounded-2xl flex flex-col justify-center items-center">
                <div className="text-xl md:text-2xl font-pop font-bold text-hover-social">
                  {timeLeft.minutes}
                </div>

                <div className="font-pop font-normal text-base text-social">
                  Min
                </div>
              </div>

              {/* Seconds */}

              <div className="w-16 h-16 md:w-20 md:h-20 border border-hover-social rounded-lg md:rounded-2xl flex flex-col justify-center items-center">
                <div className="text-xl md:text-2xl font-pop font-bold text-hover-social">
                  {timeLeft.seconds}
                </div>

                <div className="font-pop font-normal text-base text-social">
                  Sec
                </div>
              </div>
            </div>
          </div>

          {/* ================= PRODUCTS ================= */}

          <div className="flex gap-8 overflow-x-auto overflow-y-hidden pb-4 snap-x snap-mandatory scrollbar-hide ">
            {item.products.map((product) => {
              /*
               * MongoDB normally gives _id.
               * If your API transforms it to id, use that.
               */
              const productId =
                product.id ?? product._id;

              return (
                <div
                  key={productId}
                  className="w-full md:w-1/2 lg:w-1/3 gap-y-4 lg:gap-y-0 relative border border-gray-400 p-5"
                >
                  {/* Product Image */}

                  <Image
                    src={product.images?.[0] || "/placeholder.png"}
                    width={100}
                    height={100}
                    className="w-full aspect-square object-cover"
                    alt={product.title}
                  />

                  {/* Promotion Discount */}

                  <div className="absolute top-8 right-8 bg-purple inline-block px-6 py-2.5 text-lg font-pop font-medium text-white rounded-lg">
                    {item.discountPercentage} %
                  </div>

                  {/* Product Information */}

                  <div className="bg-white w-78 mx-auto">
                    <h4 className="text-center text-2xl font-pop font-normal mt-2 mb-2 w-full h-[66.39px]">
                      <Link
                        href={`/category/${product.category}/${productId}`}
                      >
                        {product.title}
                      </Link>
                    </h4>

                    {/* Price */}

                    <div className="font-pop text-2xl flex justify-center items-center gap-x-2">
                      <span className="line-through font-normal text-social">
                      Tk {product.price}
                      </span>

                      <span className="font-bold text-hover-social">
                        -
                      </span>

                      <span className="font-bold text-hover-social">
                        Tk {updatedPrice(
                          product.price,
                          item.discountPercentage
                        )}
                      </span>
                    </div>

                    {/* Stock / Sales */}

                    <div className="flex justify-between items-center mt-8">
                      <h5 className="text-lg font-pop font-normal text-black">
                        Available:{" "}
                        {product.stock}
                      </h5>

                      <h5 className="text-lg font-pop font-normal text-black">
                        Sold:{" "}
                        {product.sales ?? 5}
                      </h5>
                    </div>

                    {/* Progress */}

                    <progress
                      className="w-full rounded-sm bg-red-300 mt-2"
                      value={product.sales ?? 1}
                      max={product.stock}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
};

export default PromotionCampaign;