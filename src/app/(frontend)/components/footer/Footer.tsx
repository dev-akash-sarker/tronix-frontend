import Image from "next/image";
import Link from "next/link";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";

const Footer: React.FC = () => {
  return (
    <>
      <div>
        <div className=" flex justify-center items-start flex-col md:flex-row md:justify-start mx-10 py-11.25 flex-wrap">
          <div className="w-full md:w-1/2 lg:w-1/2">
            <div className="relative w-28 h-13.5 mb-4">
              <Image
                src="/tronix.png"
                alt="tronix"
                fill
                sizes="112px"
                className="object-contain"
              />
            </div>
            <p className="w-95.25 text-base xl:text-[18px] font-pop font-normal my-4 text-dark-black">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor.
            </p>

            <div className=" flex justify-start items-center gap-2">
              <span className="inline-block relative w-[19.93px] h-[19.87px] min-[320px]:mb-0 mb-4">
                <Image
                  src={"/phone.png"}
                  alt="tronix"
                  fill
                  sizes="19.93px"
                  className="object-contain"
                />
              </span>
              <p className="text-dark-black">+1234567890</p>
            </div>
            <div className=" flex justify-start items-center gap-2 md:mt-4 min-[375px]:mt-0">
              <span className=" inline-block w-5 h-4 relative">
                <Image
                  src={"/inbox.png"}
                  fill
                  sizes="20px"
                  className="object-contain"
                  alt="messege us"
                />
              </span>
              <p className=" text-dark-black ">lovia@support.com</p>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/6">
            <h5 className=" font-mont font-bold text-xl xs:text-2xl text-dark-black mt-6 md:mt-0">
              Company
            </h5>
            <nav>
              <ul className=" flex flex-col gap-4 md:gap-8 mt-2 footernav">
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
          <div className="w-full md:w-1/2 lg:w-1/6">
            <h5 className=" font-mont font-bold text-xl xs:text-2xl text-dark-black mt-6 md:mt-0">
              Information
            </h5>
            <nav>
              <ul className=" flex flex-col gap-4 md:gap-8 mt-4 footernav">
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
          <div className="w-full md:w-1/2 lg:w-1/6">
            <h5 className=" font-mont font-bold text-xl xs:text-2xl text-dark-black mt-6 md:mt-0">
              Follow Us
            </h5>
            <nav>
              <ul className=" flex flex-row gap-4 mt-4">
                <li className=" font-pop font-normal text-base xl:text-[18px] bg-hover-social  hover:bg-social transition-all text-white p-[11.33px] rounded-lg">
                  <Link href={"#"}>
                    <BsInstagram />
                  </Link>
                </li>
                <li className=" font-pop font-normal text-base xl:text-[18px] bg-hover-social hover:bg-social transition-all  text-white p-[11.33px] rounded-lg">
                  <Link href={"#"}>
                    <BsTwitter />
                  </Link>
                </li>
                <li className=" font-pop font-normal text-base xl:text-[18px] bg-hover-social hover:bg-social transition-all  text-white p-[11.33px] rounded-lg">
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
          <span className=" inline-block w-32 h-8 relative">
            <Image
              src={"/payment/payment.png"}
              sizes="128px"
              fill
              className="object-contain"
              alt="visa paypal"
            />
          </span>
        </div>
      </div>
    </>
  );
};

export default Footer;
