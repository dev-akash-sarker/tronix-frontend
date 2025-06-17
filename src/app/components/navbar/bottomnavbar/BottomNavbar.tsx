"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { IoClose } from "react-icons/io5";

const BottomNavbar: React.FC = () => {
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
        <nav className="my-8 hidden md:block">
          <ul className=" flex gap-x-8 py-2 px-2 transition-all">
            <li>
              <Link href="/" className=" hover:text-hover-social">
                Home
              </Link>
            </li>
            <li>
              <Link href="/" className=" hover:text-hover-social">
                About
              </Link>
            </li>
            <li>
              <Link href="/" className=" hover:text-hover-social">
                Product
              </Link>
            </li>
            <li className=" hover:text-hover-social">
              <Link href="/">Blog</Link>
            </li>
            <li className=" hover:text-hover-social">
              <Link href="/">Contact</Link>
            </li>
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
          <div className="block md:hidden absolute top-0 left-0 w-1/2 bg-black text-white h-screen">
            <nav className="my-8 block">
              <ul className=" flex flex-col gap-y-8 py-2 px-8 transition-all relative">
                <li className=" hover:ml-4 transition-all">
                  <Link href="/" className=" hover:text-hover-social">
                    Home
                  </Link>
                </li>
                <li className=" hover:ml-4 transition-all">
                  <Link href="/" className=" hover:text-hover-social">
                    About
                  </Link>
                </li>
                <li className=" hover:ml-4 transition-all">
                  <Link href="/" className=" hover:text-hover-social">
                    Product
                  </Link>
                </li>
                <li className=" hover:ml-4 transition-all hover:text-hover-social">
                  <Link href="/">Blog</Link>
                </li>
                <li className=" hover:text-hover-social">
                  <Link href="/">Contact</Link>
                </li>
              </ul>
              <div className=" absolute top-5 right-5" onClick={closemenu}>
                <IoClose fontSize={25} />
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export default BottomNavbar;
