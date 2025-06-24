"use client";
import Image from "next/image";
import "./style.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { slugify } from "@/app/utility/slugify";
type TimeLeft = {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

interface Campaign {
  campaignId: string;
  campaignName: string;
  OfferStartTime: string;
  OfferEndTime: string;
  products: {
    id: number;
    productID: string;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    sales?: number;
    Offerdiscount: number;
    persentage: boolean;
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
  }[];
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

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get<Campaign[]>(
          "http://localhost:3000/api/campaign"
        );
        setCampaigns(response.data);
        if (response.data.length > 0) {
          initializeTimeLeft(response.data[0].OfferEndTime);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCampaigns();
  }, []);

  const initializeTimeLeft = (endTimeString: string) => {
    const endTime = new Date(endTimeString).getTime();

    const interval = setInterval(() => {
      const diff = endTime - Date.now();

      if (diff <= 0) {
        setTimeLeft({
          years: 0,
          months: 0,
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        years: 0,
        months: 0,
        days,
        hours,
        minutes,
        seconds,
      });
    }, 1000);

    return () => clearInterval(interval);
  };

  if (!timeLeft) {
    return <div>Loading...</div>;
  }

  // campaigns will have a separate database
  // all products have a single database but diffrenet events have different database
  // type CampaignType = {
  //   campaign: string; // campaign identifier
  //   name: string;
  //   startDate: string;
  //   endDate: string;
  //   productsID: number[];
  // };

  // const campaigns: CampaignType[] = [
  //   {
  //     campaign: "durgapuja offer",
  //     name: "sdsd",
  //     startDate: "",
  //     endDate: "",
  //     productsID: [12, 45, 47],
  //   },
  //   {
  //     campaign: "eid offer",
  //     name: "sdsd",
  //     startDate: "",
  //     endDate: "",
  //     productsID: [10, 40, 41],
  //   },
  //   {
  //     campaign: "mary crismas offer",
  //     name: "sdsd",
  //     startDate: "",
  //     endDate: "",
  //     productsID: [13, 48, 49],
  //   },
  // ];
  // const campaigns = [
  //   { id: 1, slug: "durgapuja-offer", title: "Durgapuja Offer" },
  //   { id: 2, slug: "eid-offer", title: "Eid Offer" },
  // ];

  const updatedPrice = (price: number, discount: number) => {
    const originalPrice = price;
    const discountPercentage = discount;
    const discountAmount = (discountPercentage / 100) * originalPrice;
    const updatedPrice = originalPrice - discountAmount;
    return Math.round(updatedPrice);
  };
  return (
    <>
      <div>
        {campaigns.map((item, i) => (
          <div key={i}>
            <div className=" flex gap-8 flex-col justify-center md:flex-row md:justify-between items-center mt-16 mb-14 ">
              <div className=" flex gap-x-8 items-center">
                <h4 className=" font-mont font-bold text-black text-lg md:text-3xl lg:text-[56px]">
                  {item.campaignName}
                </h4>
                <div className="block md:hidden">
                  <Link
                    href={`/campaign/${slugify(item.campaignName)}`}
                    className=" font-pop font-normal text-2xl text-hover-social hover:underline"
                  >
                    View All
                  </Link>
                </div>
                <div className=" hidden md:flex gap-4 md:gap-8 ml-2 md:ml-0">
                  {/* <div className=" w-20 h-20 border border-hover-social rounded-2xl flex flex-col justify-center items-center">
                    <div className=" text-2xl font-pop font-bold text-hover-social">
                      {timeLeft.years}
                    </div>
                    <div className=" font-pop font-normal text-lg text-social">
                      Y
                    </div>
                  </div> */}
                  {/* <div className=" w-20 h-20 border border-hover-social rounded-2xl flex flex-col justify-center items-center">
                    <div className=" text-2xl font-pop font-bold text-hover-social">
                      {timeLeft.months}
                    </div>
                    <div className=" font-pop font-normal text-lg text-social">
                      M
                    </div>
                  </div> */}
                  <div className=" w-16 h-16 md:w-20 md:h-20 border border-hover-social rounded-lg md:rounded-2xl flex flex-col justify-center items-center">
                    <div className="text-xl md:text-2xl font-pop font-bold text-hover-social">
                      {timeLeft.days}
                    </div>
                    <div className=" font-pop font-normal text-base text-social">
                      D
                    </div>
                  </div>
                  <div className=" w-16 h-16 md:w-20 md:h-20 border border-hover-social rounded-lg md:rounded-2xl flex flex-col justify-center items-center">
                    <div className="text-xl md:text-2xl font-pop font-bold text-hover-social">
                      {timeLeft.hours}
                    </div>
                    <div className=" font-pop font-normal text-base text-social">
                      Hrs
                    </div>
                  </div>
                  <div className=" w-16 h-16 md:w-20 md:h-20 border border-hover-social rounded-lg md:rounded-2xl flex flex-col justify-center items-center">
                    <div className="text-xl md:text-2xl font-pop font-bold text-hover-social">
                      {timeLeft.minutes}
                    </div>
                    <div className=" font-pop font-normal text-base text-social">
                      Min
                    </div>
                  </div>
                  <div className=" w-16 h-16 md:w-20 md:h-20 border border-hover-social rounded-lg md:rounded-2xl flex flex-col justify-center items-center">
                    <div className="text-xl md:text-2xl font-pop font-bold text-hover-social">
                      {timeLeft.seconds}
                    </div>
                    <div className=" font-pop font-normal text-base text-social">
                      Sec
                    </div>
                  </div>
                </div>
              </div>
              <div className=" hidden md:block">
                <Link
                  href={`/campaign/${slugify(item.campaignName)}`}
                  className=" font-pop font-normal text-2xl text-hover-social hover:underline"
                >
                  View All
                </Link>
              </div>
              <div className=" flex md:hidden gap-4 md:gap-8 ml-2 md:ml-0">
                {/* <div className=" w-20 h-20 border border-hover-social rounded-2xl flex flex-col justify-center items-center">
                    <div className=" text-2xl font-pop font-bold text-hover-social">
                      {timeLeft.years}
                    </div>
                    <div className=" font-pop font-normal text-lg text-social">
                      Y
                    </div>
                  </div> */}
                {/* <div className=" w-20 h-20 border border-hover-social rounded-2xl flex flex-col justify-center items-center">
                    <div className=" text-2xl font-pop font-bold text-hover-social">
                      {timeLeft.months}
                    </div>
                    <div className=" font-pop font-normal text-lg text-social">
                      M
                    </div>
                  </div> */}
                <div className=" w-16 h-16 md:w-20 md:h-20 border border-hover-social rounded-lg md:rounded-2xl flex flex-col justify-center items-center">
                  <div className="text-xl md:text-2xl font-pop font-bold text-hover-social">
                    {timeLeft.days}
                  </div>
                  <div className=" font-pop font-normal text-base text-social">
                    D
                  </div>
                </div>
                <div className=" w-16 h-16 md:w-20 md:h-20 border border-hover-social rounded-lg md:rounded-2xl flex flex-col justify-center items-center">
                  <div className="text-xl md:text-2xl font-pop font-bold text-hover-social">
                    {timeLeft.hours}
                  </div>
                  <div className=" font-pop font-normal text-base text-social">
                    Hrs
                  </div>
                </div>
                <div className=" w-16 h-16 md:w-20 md:h-20 border border-hover-social rounded-lg md:rounded-2xl flex flex-col justify-center items-center">
                  <div className="text-xl md:text-2xl font-pop font-bold text-hover-social">
                    {timeLeft.minutes}
                  </div>
                  <div className=" font-pop font-normal text-base text-social">
                    Min
                  </div>
                </div>
                <div className=" w-16 h-16 md:w-20 md:h-20 border border-hover-social rounded-lg md:rounded-2xl flex flex-col justify-center items-center">
                  <div className="text-xl md:text-2xl font-pop font-bold text-hover-social">
                    {timeLeft.seconds}
                  </div>
                  <div className=" font-pop font-normal text-base text-social">
                    Sec
                  </div>
                </div>
              </div>
            </div>

            <div className=" flex justify-start gap-x-8 flex-wrap lg:flex-nowrap items-center">
              {item.products.map((product, index) => (
                <div
                  key={index}
                  className=" w-full md:w-1/2 lg:w-1/3 gap-y-4 lg:gap-y-0 relative border border-gray-400 rounded-bl-4xl rounded-br-4xl"
                >
                  <Image
                    src={product.images[0]}
                    width="100"
                    height="100"
                    className=" w-full aspect-square"
                    alt="ok"
                  />
                  <div className=" absolute top-8 right-8 bg-purple inline-block px-6 py-2.5 text-lg font-pop font-medium text-white rounded-lg">
                    {product.persentage
                      ? product.Offerdiscount + " %"
                      : product.Offerdiscount + " Off"}
                  </div>
                  <div className="bg-white w-[312px] mx-auto">
                    <h4 className=" text-center text-2xl font-pop font-normal mt-8 mb-2">
                      <Link
                        href={`/category/${product.category}/${product.id}`}
                      >
                        {product.title}
                      </Link>
                    </h4>
                    <div className=" font-pop text-2xl flex justify-center items-center gap-x-2">
                      <span className=" line-through font-normal text-social">
                        {product.price}
                      </span>
                      <span className=" font-bold text-hover-social">-</span>
                      <span className=" font-bold text-hover-social">
                        {product.persentage
                          ? updatedPrice(product.price, product.Offerdiscount)
                          : product.price - product.Offerdiscount}
                      </span>
                    </div>
                    <div className=" flex justify-between items-center mt-8">
                      <h5 className=" text-lg font-pop font-normal text-black">
                        Available: {product.stock}
                      </h5>
                      <h5 className=" text-lg font-pop font-normal text-black">
                        Sold: {product.sales}
                      </h5>
                    </div>
                    <progress
                      className=" w-full rounded-sm bg-red-300 mt-2 mb-10"
                      id="progress"
                      value={product.sales}
                      max={product.stock}
                    ></progress>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default PromotionCampaign;
