"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import "./style.css";
export interface NewArrivalType {
  id: string;
  title: string;
  description: string;
  categoryname: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  sold: number;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: {
    rating: number;
    comment: string;
    date: string; // ISO string
    reviewerName: string;
    reviewerEmail: string;
  }[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
}
const NewArrivel: React.FC = () => {
  const [newarrivel, setNewarrivel] = useState<NewArrivalType[]>([]);
  useEffect(() => {
    const fetchNewArrivel = async () => {
      try {
        //http://localhost:8000/api/v1/product
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/product/viewproducts`,
        );
        const products: NewArrivalType[] = response.data;

        // ✅ Filter products that have a createdAt field (optional safety)
        const validProducts = products.filter(
          (product) => product.meta?.createdAt,
        );

        // ✅ Sort by most recent createdAt
        const sortedByDate = validProducts.sort(
          (a, b) =>
            new Date(b.meta.createdAt).getTime() -
            new Date(a.meta.createdAt).getTime(),
        );

        // ✅ Take top 4
        const top4Newest = sortedByDate.slice(0, 3);

        setNewarrivel(top4Newest);
      } catch (error) {
        console.error("Failed to fetch new arrivel:", error);
      }
    };

    fetchNewArrivel();
  }, []);

  return (
    <>
      <div>
        <div className=" flex justify-between">
          <h3 className=" font-mont text-lg md:text-2xl lg:text-3xl xl:text-4xl font-bold">
            New Arrivel
          </h3>
          <Link
            href="/newarrivel"
            className="block font-pop text-lg lg:text-2xl text-hover-social hover:underline"
          >
            View All
          </Link>
        </div>
        <div className="products flex flex-wrap lg:flex-nowrap gap-y-8 mt-4 lg:mt-10 overflow-hidden">
          {newarrivel.map((item, index) => (
            <div
              className="w-full md:w-1/2 lg:w-1/3 flex gap-x-4 customnewarrivelwidth"
              key={index}
            >
              <div className=" relative w-[46.875%]">
                <Image
                  src={item.images[0]}
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 768px) 47vw, (max-width: 1200px) 33vw, 400px"
                  className=" w-full aspect-square"
                  alt={item.title}
                />
                <div className="w-46.25 h-63.75 overflow-hidden">
                  <div className="absolute inset-0 bg-black/25"></div>
                </div>
                <div className=" absolute z-20 top-5 left-5 xl:w-10 xl:h-10 rounded-full bg-new-hover-social text-white font-pop text-[12px] flex justify-center items-center">
                  New
                </div>
              </div>
              <div className=" w-[53.125%] flex flex-col justify-center gap-4">
                <h5
                  title={item.title}
                  className=" text-xl text-gray-500 font-bold"
                >
                  <Link href={`/category/${item.categoryname}/${item.id}`}>
                    {item.title.slice(0, 10)}..
                  </Link>
                </h5>
                <p className=" text-xl font-bold">Tk {item.price}</p>
                <div className=" flex ">
                  {item.rating === 0 ? (
                    <div className=" font-normal text-social flex items-center pr-4 border-r border-gray-300 gap-2">
                      No review yet
                    </div>
                  ) : (
                    <div className=" font-normal text-social flex items-center pr-4 border-r border-gray-300 gap-2">
                      {1 > item.rating ? (
                        <BsStar color="#FFD687" />
                      ) : 3 > item.rating ? (
                        <BsStarHalf color="#FFD687" />
                      ) : (
                        4 < item.rating && <BsStarFill color="#FFD687" />
                      )}
                      {item.rating}/5
                    </div>
                  )}

                  <div className=" font-normal pl-4 text-social">
                    sold {item.sold ? item.sold : 0}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NewArrivel;
