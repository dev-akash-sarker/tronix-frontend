import Image from "next/image";
import Link from "next/link";
import { BsEnvelope, BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { IoIosCall } from "react-icons/io";

const Footer: React.FC = () => {
  return (
    <>
  <div>
        <div className=" flex justify-center items-start flex-col md:flex-row md:justify-start py-[45px] flex-wrap">
        <div className="w-1/3 lg:w-1/2">
          <div className=" mb-4">
            <Image src={"/tronix.png"} width={112} height={54} alt="tronix" />
          </div>
          <p className="w-[381px] text-base xl:text-[18px] font-pop font-normal my-4 text-dark-black">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor.
          </p>

          <div className=" flex justify-start items-center gap-2">
            <Image
              src={"/phone.png"}
              width={19.93}
              height={19.87}
              alt="tronix"
            />
            <p className="text-dark-black">+1234567890</p>
          </div>
          <div className=" flex justify-start items-center gap-2 mt-4">
            <Image src={"/inbox.png"} width={20} height={16} alt="messege us" />
            <p className=" text-dark-black ">lovia@support.com</p>
          </div>
        </div>
        <div className=" w-1/3 lg:w-1/6">
          <h5 className=" font-mont font-bold text-xl xs:text-2xl text-dark-black">
            Company
          </h5>
          <nav>
            <ul className=" flex flex-col gap-8 mt-4 footernav">
              <li className=" font-pop font-normal text-base xl:text-[18px] text-dark-black">
                <Link href={"/about"}>About</Link>
              </li>
              <li className=" font-pop font-normal text-base xl:text-[18px] text-dark-black">
                <Link href={"#"}>Products</Link>
              </li>
              <li className=" font-pop font-normal text-base xl:text-[18px] text-dark-black">
                <Link href={"#"}>Contact</Link>
              </li>
              <li className=" font-pop font-normal text-base xl:text-[18px] text-dark-black">
                <Link href={"#"}>Blog</Link>
              </li>
              <li className=" font-pop font-normal text-base xl:text-[18px] text-dark-black">
                <Link href={"#"}>Careers</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className=" w-1/3 lg:w-1/6">
          <h5 className=" font-mont font-bold text-xl xs:text-2xl text-dark-black">
            Information
          </h5>
          <nav>
            <ul className=" flex flex-col gap-8 mt-4 footernav">
              <li className=" font-pop font-normal text-base xl:text-[18px] text-dark-black">
                <Link href={"#"}>Help Center</Link>
              </li>
              <li className=" font-pop font-normal text-base xl:text-[18px] text-dark-black">
                <Link href={"#"}>Payment Methods</Link>
              </li>
              <li className=" font-pop font-normal text-base xl:text-[18px] text-dark-black">
                <Link href={"#"}>Return & Refund</Link>
              </li>
              <li className=" font-pop font-normal text-base xl:text-[18px] text-dark-black">
                <Link href={"#"}>Privacy Policy</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className=" w-1/3 lg:w-1/6">
          <h5 className=" font-mont font-bold text-xl xs:text-2xl text-dark-black">
            Follow Us
          </h5>
          <nav>
            <ul className=" flex flex-row gap-4 mt-4">
              <li className=" font-pop font-normal text-base xl:text-[18px] bg-hover-social  hover:bg-social transition-all text-white p-[11.33px] rounded-[8px]">
                <Link href={"#"}>
                  <BsInstagram />
                </Link>
              </li>
              <li className=" font-pop font-normal text-base xl:text-[18px] bg-hover-social hover:bg-social transition-all  text-white p-[11.33px] rounded-[8px]">
                <Link href={"#"}>
                  <BsTwitter />
                </Link>
              </li>
              <li className=" font-pop font-normal text-base xl:text-[18px] bg-hover-social hover:bg-social transition-all  text-white p-[11.33px] rounded-[8px]">
                <Link href={"#"}>
                  <BsFacebook />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <hr className="my-11 text-social" />
      <div className="mb-4 flex flex-col justify-center gap-y-2 md:gap-0 md:flex-row md:justify-between items-center">
        <p>Copyright © 2021 Tronix. All Right Reseved</p>
        <Image src={"/payment/payment.png"} width={128} height={32} alt="visa paypal"/>
      </div>
  </div>
    </>
  );
};

export default Footer;
