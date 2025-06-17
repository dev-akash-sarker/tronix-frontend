"use client";

import Link from "next/link";
import { BsEnvelope } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import {
  FaFacebookSquare,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { IoIosCall } from "react-icons/io";

// Define interface for component props
interface TopNavbarProps {
  className?: string;
}

const TopNavbar: React.FC<TopNavbarProps> = () => {
  // State Management
  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between py-4 items-center ">
        <div className="w-full md:w-auto">
          {/* Social Media */}
          <nav>
            <ul className="text-social flex justify-around md:justify-normal items-center gap-x-3 lg:gap-x-4 xl:gap-x-8 transition-all">
              <li>
                <Link href={"#"} className=" hover:text-hover-social ">
                  <FaInstagram fontSize={24} />
                </Link>
              </li>
              <li>
                <Link href={"#"} className=" hover:text-hover-social ">
                  <FaFacebookSquare fontSize={24} />
                </Link>
              </li>
              <li className=" hover:text-hover-social ">
                <Link href={"#"}>
                  <FaTwitter fontSize={24} />
                </Link>
              </li>
              <li className=" hover:text-hover-social ">
                <Link href={"#"}>
                  <FaLinkedin fontSize={24} />
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className=" w-full mt-2 md:w-auto md:mt-0">
          {/* Contacts Informations and Account */}
          <nav>
            <ul className="flex flex-col  md:flex-row md:items-center md:gap-x-4 xl:gap-x-8 transition-all">
              <li className=" py-3 px-4 md:p-0 bg-gray-600 md:bg-transparent flex items-center gap-2 xl:gap-4">
                <IoIosCall className="text-hover-social lg:text-xl xl:text-2xl" />
                <Link
                  href={"#"}
                  className="text-white md:text-black lg:text-md "
                >
                  01911111111
                </Link>
              </li>
              <li className="py-3 px-4 md:p-0 bg-gray-500 md:bg-transparent  flex items-center gap-2 xl:gap-4">
                <BsEnvelope className="text-hover-social lg:text-xl xl:text-2xl" />
                <Link href={"#"} className="text-white md:text-black ">
                  suport@abc.com
                </Link>
              </li>
              <li className="py-3 px-4 md:p-0 bg-gray-600 md:bg-transparent  flex items-center gap-2 xl:gap-4">
                <CiUser className="text-hover-social lg:text-xl xl:text-2xl" />
                <Link href={"#"} className="text-white md:text-black ">
                  Account
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};
export default TopNavbar;
