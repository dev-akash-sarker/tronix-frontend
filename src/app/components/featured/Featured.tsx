"use client";
import Image from "next/image";
import "./style.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { slugify } from "@/app/utility/slugify";

interface Feature {
  featureId: string;
  featureName: string;
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
const FeaturedProduct: React.FC = () => {
  const [features, setFeatures] = useState<Feature[]>([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await axios.get<Feature[]>(
          "http://localhost:3000/api/featured"
        );
        setFeatures(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchFeatured();
  }, []);

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
        {features.map((item, i) => (
          <div key={i}>
            <div className=" flex gap-8 flex-col justify-center md:flex-row md:justify-between items-center mt-16 mb-14 ">
              <div className=" flex gap-x-8 items-center">
                <h4 className=" font-mont font-bold text-black text-lg md:text-3xl lg:text-[56px]">
                  {item.featureName}
                </h4>
                <div className="block md:hidden">
                  <Link
                    href={`/campaign/${slugify(item.featureName)}`}
                    className=" font-pop font-normal text-2xl text-hover-social hover:underline"
                  >
                    View All
                  </Link>
                </div>
              </div>
              <div className=" hidden md:block">
                <Link
                  href={`/campaign/${slugify(item.featureName)}`}
                  className=" font-pop font-normal text-2xl text-hover-social hover:underline"
                >
                  View All
                </Link>
              </div>
            </div>

            <div className=" flex justify-start gap-x-8 flex-wrap lg:flex-nowrap items-center">
              {item.products.slice(0, 3).map((product, index) => (
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
                  <div
                    className={
                      product.stock === 0
                        ? "absolute top-8 right-8 bg-black inline-block px-6 py-2.5 text-lg font-pop font-medium text-white rounded-lg"
                        : "absolute top-8 right-8 bg-purple inline-block px-6 py-2.5 text-lg font-pop font-medium text-white rounded-lg"
                    }
                  >
                    {product.stock === 0
                      ? "Stock Out"
                      : product.persentage
                      ? product.Offerdiscount + " %"
                      : product.Offerdiscount + " Off"}
                  </div>
                  <div className="bg-white w-[312px] mx-auto">
                    <h4 className=" text-center text-2xl font-pop font-normal mt-8 mb-2">
                      {product.title}
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
export default FeaturedProduct;
