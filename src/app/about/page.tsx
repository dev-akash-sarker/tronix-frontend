import Image from "next/image";
import Link from "next/link";
import { RxCaretRight } from "react-icons/rx";

const AboutUs: React.FC = () => {
  return (
    <div>
      <div className="navigation font-pop text-base font-medium mb-12">
        <Link href={"/"} className=" hover:text-hover-social transition-all">
          Home
        </Link>
        <RxCaretRight className=" inline-block" />
        <Link href={"/about"} className="text-hover-social transition-all">
          About
        </Link>
      </div>
      {/* title */}
      <div className="mb-20">
        <h3 className=" font-mont font-bold text-5xl text-dark-black text-center mb-8">
          About Tronix
        </h3>
        <p className=" px-50 font-pop text-[18px] text-dark-black">
          We are here to provide a place special for electronic devices.
          Although we only operated for 2 years but we always provide the best
          service for customers and all the sellers who use our website. With
          the hope that it can help improve a better life using various
          electronic goods with the latest technology, we are all ears to any
          suggestion from our dear customers
        </p>
      </div>
      {/* banner */}
      <div className=" w-full max-w-[1597px] mx-auto aspect-[2.66/1] relative md:max-h-[300px] sm:max-h-[200px] rounded-2xl mb-40">
        <Image
          src={"/banner/banner.jpg"}
          alt="banner"
          fill
          className="object-cover rounded-2xl"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1597px"
        />
      </div>
      {/* Why choosing */}
      <div>
        <h3 className=" font-mont font-bold text-5xl text-dark-black text-center mb-20">
          Why Choosing Us
        </h3>
        <div className=" flex gap-y-8 lg:gap-y-0 lg:gap-0 flex-wrap">
          <center className="w-full mx-8 md:mx-0 md:w-1/2 lg:w-1/4">
            <div className="font-pop">
              <Image
                src={"/quality.svg"}
                width={64}
                height={64}
                alt="qualiti"
              />
              <h3 className="font-medium text-2xl text-dark-black">
                54 Brands
              </h3>
              <p className=" font-normal text-[18px] text-old-gray">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.{" "}
              </p>
            </div>
          </center>
          <center className="w-full mx-8 md:mx-0 md:w-1/2 lg:w-1/4">
            <div className="font-pop">
              <Image
                src={"/FastDelivery.svg"}
                width={64}
                height={64}
                alt="qualiti"
              />
              <h3 className="font-medium text-2xl text-dark-black">
                Fast Delivery
              </h3>
              <p className=" font-normal text-[18px] text-old-gray">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.{" "}
              </p>
            </div>
          </center>
          <center className="w-full mx-8 md:mx-0 md:w-1/2 lg:w-1/4">
            <div className="font-pop">
              <Image
                src={"/CashOnDelivery.svg"}
                width={64}
                height={64}
                alt="qualiti"
              />
              <h3 className="font-medium text-2xl text-dark-black">
                COD Service
              </h3>
              <p className=" font-normal text-[18px] text-old-gray">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.{" "}
              </p>
            </div>
          </center>
          <center className="w-full mx-8 md:mx-0 md:w-1/2 lg:w-1/4">
            <div className="font-pop">
              <Image src={"/best.svg"} width={64} height={64} alt="qualiti" />
              <h3 className="font-medium text-2xl text-dark-black">
                100% Original Products
              </h3>
              <p className=" font-normal text-[18px] text-old-gray">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.{" "}
              </p>
            </div>
          </center>
        </div>
      </div>
      {/* Our Team */}
      <div className=" my-20">
        <h3 className=" font-mont font-bold text-5xl text-dark-black text-center mb-8">
          Our Team
        </h3>
        <p className=" w-[626px] font-pop text-[18px] text-dark-black text-center mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt.
        </p>

        <div className="flex gap-8 justify-center mt-20 relative flex-wrap">
          <div className="w-full md:w-1/3 lg:w-1/4 shadow-2xl rounded-2xl">
            <div className=" w-full aspect-square bg-gray-500 border border-gray-300 relative rounded-2xl">
              <Image
                src={"/banner/banner.jpg"}
                fill
                alt="teams"
                className="object-cover rounded-2xl"
              />
            </div>
            <div className="w-full py-[34.5px] bg-[fafafa] text-center">
              <h6 className=" font-pop font-medium text-2xl text-dark-black">Sam Alabama</h6> 
              <p className="font-pop font-medium text-[18px] text-old-gray">Team Member</p>
            </div>
          </div>
          <div className="w-full md:w-1/3 lg:w-1/4 shadow-2xl rounded-2xl">
            <div className=" w-full aspect-square bg-gray-500 border border-gray-300 relative rounded-2xl">
              <Image
                src={"/banner/banner.jpg"}
                fill
                alt="teams"
                className="object-cover rounded-2xl"
              />
            </div>
            <div className="w-full py-[34.5px] bg-[fafafa] text-center">
              <h6 className=" font-pop font-medium text-2xl text-dark-black">Sam Alabama</h6> 
              <p className="font-pop font-medium text-[18px] text-old-gray">Team Member</p>
            </div>
          </div>
          <div className="w-full md:w-1/3 lg:w-1/4 shadow-2xl rounded-2xl">
            <div className=" w-full aspect-square bg-gray-500 border border-gray-300 relative rounded-2xl">
              <Image
                src={"/banner/banner.jpg"}
                fill
                alt="teams"
                className="object-cover rounded-2xl"
              />
            </div>
            <div className="w-full py-[34.5px] bg-[fafafa] text-center">
              <h6 className=" font-pop font-medium text-2xl text-dark-black">Sam Alabama</h6> 
              <p className="font-pop font-medium text-[18px] text-old-gray">Team Member</p>
            </div>
          </div>
          <div className="w-full md:w-1/3 lg:w-1/4 shadow-2xl rounded-2xl">
            <div className=" w-full aspect-square bg-gray-500 border border-gray-300 relative rounded-2xl">
              <Image
                src={"/banner/banner.jpg"}
                fill
                alt="teams"
                className="object-cover rounded-2xl"
              />
            </div>
            <div className="w-full py-[34.5px] bg-[fafafa] text-center">
              <h6 className=" font-pop font-medium text-2xl text-dark-black">Sam Alabama</h6> 
              <p className="font-pop font-medium text-[18px] text-old-gray">Team Member</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
