"use client";
import axios from "axios";
import Outsideclick from "@/app/features/ClickOutSide";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { slugify } from "@/app/utility/slugify";
interface Category {
  id: number;
  name: string;
}
const BottomNavbar: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isopen, setIsopen] = useState<boolean>(false);
  const [ismenu, setIsmenu] = useState<boolean>(false);
  const opensearch = () => {
    setIsopen(!isopen);
  };
  const openmenu = () => {
    setIsmenu(!ismenu);
  };
  const closemenu = () => {
    setIsmenu(false);
  };

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3000/api/categories")
  //     .then((response) => {
  //       setCategories(response.data);
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //     });
  // }, []);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>(
          "http://localhost:3000/api/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);
  console.log("cat", categories);
  return (
    <>
      <div className="my-8 relative">
        <div className=" flex justify-between items-center">
          <button className="block md:hidden" onClick={openmenu}>
            <CiMenuBurger fontSize={35} />
          </button>
          <Link href="/" className="">
            <Image
              src="/Tronix.png"
              alt="comes from backend"
              width={112}
              height={54}
            />
          </Link>

          <div className=" flex items-center">
            <div className="block md:hidden">
              <button
                className=" py-2 px-4 -ml-2 rounded-tr-md rounded-br-md"
                onClick={opensearch}
              >
                <Image
                  src="/SearchBlack.svg"
                  width={40}
                  height={40}
                  alt="searchicon"
                  className="w-7 h-7"
                />
              </button>
            </div>
            <div className="mr-8 hidden md:flex">
              <input
                className="md:w-xs py-3 indent-6 rounded-tl-md rounded-bl-md bg-input-background outline-none focus:bg-gray-200"
                type="text"
                placeholder="search here"
              />
              <button className=" bg-hover-social py-2 px-4 -ml-2 rounded-tr-md rounded-br-md">
                <Image
                  src="/Search.svg"
                  width={24}
                  height={24}
                  alt="searchicon"
                />
              </button>
            </div>
            <div className=" flex gap-4">
              <button className=" relative">
                <Image
                  src="/ShoppingBag.svg"
                  width={40}
                  height={40}
                  alt="shopping"
                  className="w-7 h-7 md:w-10 md:h-10"
                />
                <div className=" bg-hover-social w-6 md:w-8 h-6 md:h-8 text-[10px] font-semibold flex justify-center items-center rounded-full text-white absolute -top-[12px] -right-[12px] md:-top-[15px] md:-right-[17px]">
                  99
                </div>
              </button>
              <button>
                <Image
                  src="/Email.svg"
                  width={40}
                  height={40}
                  alt="email"
                  className="w-7 h-7 md:w-10 md:h-10"
                />
              </button>
            </div>
          </div>
        </div>
        <nav className="my-8 mx-2 md:mx-0 hidden md:block">
          <ul className=" flex gap-x-8 py-2 px-2 transition-all border-y-2 border-gray-300">
            <li className="transition-all">
              <Link href="/" className=" hover:text-hover-social">
                Home
              </Link>
            </li>
            {categories.map(
              (
                item,
                index // <-- Changed to parentheses
              ) => (
                <li key={index}>
                  <Link
                    href={`/category/${slugify(item.name)}`}
                    className=" hover:text-hover-social"
                    key={index}
                  >
                    {item.name}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>
        {isopen && (
          <>
            <div className="mx-2 mt-4 flex md:hidden">
              <input
                className="w-full py-3 indent-6 rounded-tl-md rounded-bl-md bg-input-background outline-none focus:bg-gray-200"
                type="text"
                placeholder="search here"
              />
              <button className=" bg-hover-social py-2 px-4 -ml-2 rounded-tr-md rounded-br-md">
                <Image
                  src="/Search.svg"
                  width={24}
                  height={24}
                  alt="searchicon"
                />
              </button>
            </div>
          </>
        )}
      </div>
      {ismenu && (
        <>
          <div className=" absolute top-0 left-0 bg-black w-3/4 sm:w-1/2 h-full z-20 text-white">
            <nav className="my-8 block ">
              <Outsideclick isOpen={ismenu} onClose={closemenu}>
                <ul className=" flex flex-col gap-y-8 py-2 px-8 transition-all relative overflow-hidden">
                  <li className=" hover:ml-4 transition-all">
                    <Link href="/" className=" hover:text-hover-social">
                      Home
                    </Link>
                  </li>
                  {categories.map(
                    (
                      item,
                      index // <-- Changed to parentheses
                    ) => (
                      <>
                        <li className=" hover:ml-4 transition-all">
                          <Link
                            href={`/category/${item.name.trim()}`}
                            className=" hover:text-hover-social"
                            key={index}
                          >
                            {item.name}
                          </Link>
                        </li>
                      </>
                    )
                  )}
                </ul>
                <div className=" absolute -top-5 right-5" onClick={closemenu}>
                  <IoClose fontSize={25} />
                </div>
              </Outsideclick>
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export default BottomNavbar;
