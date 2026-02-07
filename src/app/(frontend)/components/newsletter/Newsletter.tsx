import Image from "next/image";

const NewsLetter: React.FC = () => {
  return (
    <>
      <div className=" flex flex-col justify-center min-[1456px]:flex-row min-[1456px]:justify-between items-center">
        <div className="flex justify-start md:justify-between items-center mx-0 md:mx-8">
          {/* 1. Parent container controls the size */}
          <div className="relative w-20 h-20 lg:w-16 lg:h-16 xl:w-20 xl:h-20 max-[767px]:hidden">
            <Image
              src="/newslettere.svg"
              fill
              alt="newslettericon"
              className="object-contain" // 2. Keeps the SVG from stretching
            />
          </div>

          <div className="md:ml-8">
            <h3 className="font-mont font-bold text-sm md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-white mt-0">
              Join our newsletter now!
            </h3>
            <p className="font-pop font-normal text-sm lg:text-base text-social">
              Register now and get our latest updates and promos.
            </p>
          </div>
        </div>

        <div>
          <input
            type="text"
            placeholder="Enter your email"
            className=" min-[374px]:w-90.5 mx-2 sm:w-100 lg:w-131.25 xl:w-145 md:w-120 md:mt-3 lg:mt-0 px-8 pt-6 pb-6.25 outline-none bg-white rounded-lg"
          />
          <button className=" px-[32.5px] py-[16.5px] bg-dark-black text-white -ml-26.25 rounded-lg mt-4">
            Join
          </button>
        </div>
      </div>
    </>
  );
};

export default NewsLetter;
