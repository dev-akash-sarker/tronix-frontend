"use client";
// app/campaign/[slug]/page.tsx
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
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
type CampaignSlug = "durgapuja-offer" | "eid-offer";

interface CampaignPageProps {
  params: Promise<{
    slug: CampaignSlug;
  }>;
}

const CampaignPage: React.FC<CampaignPageProps> = ({ params }) => {
  const [mycampaign, setMycampaign] = useState<Campaign[] | null>(null);
  const [countdowns, setCountdowns] = useState<Record<string, TimeLeft>>({});
  // const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const handleHeartClick = (productId: number) => {
    setFavorites(
      (prev) =>
        prev.includes(productId)
          ? prev.filter((id) => id !== productId) // remove
          : [...prev, productId] // add
    );
  };
  const { slug } = React.use(params);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/campaign`);
        setMycampaign(res.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    fetchProduct();
  }, []);

  useEffect(() => {
    if (!mycampaign) return;

    mycampaign.forEach((campaign) => {
      const endTime = new Date(campaign.OfferEndTime).getTime();

      const interval = setInterval(() => {
        const diff = endTime - Date.now();
        if (diff <= 0) {
          setCountdowns((prev) => ({
            ...prev,
            [campaign.campaignId]: {
              years: 0,
              months: 0,
              days: 0,
              hours: 0,
              minutes: 0,
              seconds: 0,
            },
          }));
          clearInterval(interval);
          return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setCountdowns((prev) => ({
          ...prev,
          [campaign.campaignId]: {
            years: 0,
            months: 0,
            days,
            hours,
            minutes,
            seconds,
          },
        }));
      }, 1000);
    });
  }, [mycampaign]);

  if (!mycampaign) {
    return <div>Campaign not found</div>;
  }

  const removehypen: string = slug.replace(/-/g, " ");
  const matchingItem = mycampaign.find(
    (campaign) => campaign.campaignName.toLowerCase().includes(removehypen)
    // initializeTimeLeft(campaign.OfferEndTime);
  );

  return (
    <>
      <div className="p-4">
        <div className=" flex justify-between mt-20">
          <div className=" flex justify-start gap-x-2">
            <h3 className=" font-mont text-4xl font-bold  mb-4">
              {removehypen}
            </h3>
            {matchingItem && countdowns[matchingItem.campaignId] && (
              <div className=" flex md:hidden gap-4 md:gap-8 ml-2 md:ml-0">
                <div className=" w-16 h-16 md:w-20 md:h-20 border border-hover-social rounded-lg md:rounded-2xl flex flex-col justify-center items-center">
                  <div className="text-xl md:text-2xl font-pop font-bold text-hover-social">
                    {countdowns[matchingItem.campaignId]?.days}
                  </div>
                  <div className=" font-pop font-normal text-base text-social">
                    D
                  </div>
                </div>
                <div className=" w-16 h-16 md:w-20 md:h-20 border border-hover-social rounded-lg md:rounded-2xl flex flex-col justify-center items-center">
                  <div className="text-xl md:text-2xl font-pop font-bold text-hover-social">
                    {countdowns[matchingItem.campaignId]?.hours}
                  </div>
                  <div className=" font-pop font-normal text-base text-social">
                    Hrs
                  </div>
                </div>
                <div className=" w-16 h-16 md:w-20 md:h-20 border border-hover-social rounded-lg md:rounded-2xl flex flex-col justify-center items-center">
                  <div className="text-xl md:text-2xl font-pop font-bold text-hover-social">
                    {countdowns[matchingItem.campaignId]?.minutes}
                  </div>
                  <div className=" font-pop font-normal text-base text-social">
                    Min
                  </div>
                </div>
                <div className=" w-16 h-16 md:w-20 md:h-20 border border-hover-social rounded-lg md:rounded-2xl flex flex-col justify-center items-center">
                  <div className="text-xl md:text-2xl font-pop font-bold text-hover-social">
                    {countdowns[matchingItem.campaignId]?.seconds}
                  </div>
                  <div className=" font-pop font-normal text-base text-social">
                    Sec
                  </div>
                </div>
              </div>
              // <div className="countdown">
              //   <div>{countdowns[matchingItem.campaignId]?.days} D</div>
              //   <div>{countdowns[matchingItem.campaignId]?.hours} Hrs</div>
              //   <div>{countdowns[matchingItem.campaignId]?.minutes} Min</div>
              //   <div>{countdowns[matchingItem.campaignId]?.seconds} Sec</div>
              // </div>
            )}
          </div>
        </div>
        {matchingItem ? (
          <div>
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {matchingItem.products.map((product, index) => (
                <div className="border border-gray-300 rounded-md" key={index}>
                  <div className="m-4 w-auto h-[313px] rounded-md bg-gray-400 overflow-hidden">
                    <Image
                      src={product.thumbnail}
                      width={313}
                      height={313}
                      className=" w-full h-full"
                      alt={product.title}
                    />
                  </div>
                  <div className=" text-center my-4">
                    <p className=" text-2xl font-pop font-normal">
                      <Link
                        href={`/category/${product.category}/${product.id}`}
                      >
                        {product.title.slice(0, 20)}
                      </Link>
                      ...
                    </p>
                    <p className=" text-2xl text-hover-social font-bold font-pop">
                      ${product.price}
                    </p>
                    <div className="flex items-center justify-center gap-4 mt-4">
                      <div className="text-rating text-xl">★</div>
                      <p className="font-bold text-xl">
                        {product.rating.toFixed(1)}
                      </p>

                      {/* <p className="text-lg text-social font-mont font-normal">
                      Review ({product.reviews?.length || 0})
                    </p> */}
                      <p className="text-lg text-social font-mont font-normal border-l pl-4 border-gray-300">
                        Sold 199
                      </p>
                    </div>
                    <div className=" flex justify-center items-center gap-7 mt-4">
                      <button className=" text-sm py-3 px-4 border cursor pointer border-hover-social rounded-[8px] hover:bg-transparent bg-hover-social hover:text-black text-white font-bold transition-all">
                        Add to Cart
                      </button>
                      <button onClick={() => handleHeartClick(product.id)}>
                        <FaHeart
                          className={
                            favorites.includes(product.id)
                              ? "w-[23.17px] text-red-500"
                              : "w-[23.17px] text-social"
                          }
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          "Loading"
        )}
      </div>
    </>
  );
};

export default CampaignPage;
