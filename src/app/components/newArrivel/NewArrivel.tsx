"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
export interface NewArrivalType {
  id: number;
  title: string;
  description: string;
  category: string;
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
        const response = await axios.get("https://dummyjson.com/products");
        const products: NewArrivalType[] = response.data.products;

        // ✅ Filter products that have a createdAt field (optional safety)
        const validProducts = products.filter(
          (product) => product.meta?.createdAt
        );

        // ✅ Sort by most recent createdAt
        const sortedByDate = validProducts.sort(
          (a, b) =>
            new Date(b.meta.createdAt).getTime() -
            new Date(a.meta.createdAt).getTime()
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
          <h3 className=" font-mont text-4xl font-bold">New Arrivel</h3>
          <Link
            href="/new-arrivel"
            className="block font-pop text-2xl text-hover-social hover:underline"
          >
            View All
          </Link>
        </div>
        <div className="products flex gap-10 mt-10">
          {newarrivel.map((item) => (
            <div className="flex gap-x-8" key={item.id}>
              <div className=" relative">
                <div className="w-[185px] h-[255px] overflow-hidden">
                  <Image
                    src={item.images[0]}
                    width={235}
                    height={290}
                    className=" w-full h-full aspect-square"
                    alt={item.title}
                  />
                  <div className="absolute inset-0 bg-black/25"></div>
                </div>
                <div className=" absolute z-20 top-5 left-5 xl:w-[64px] xl:h-[64px] rounded-full bg-hover-social text-white font-pop text-[18px] flex justify-center items-center">
                  New
                </div>
              </div>
              <div className=" flex flex-col justify-center gap-4">
                <h5
                  title={item.title}
                  className=" text-xl text-gray-500 font-bold"
                >
                  <Link href={`/newarrivel/${item.id}`}>
                    {item.title.slice(0, 10)}..
                  </Link>
                </h5>
                <p className=" text-xl font-bold">$ {item.price}</p>
                <div className=" flex ">
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
                  <div className=" font-normal pl-4 text-social">sold 99</div>
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
