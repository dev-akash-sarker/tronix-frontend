import Image from "next/image";

const NewsLetter: React.FC = () => {
  return (
    <>
      <div className=" flex flex-col justify-center xl:flex-row  xl:justify-between items-center">
        <div className=" flex justify-between items-center">
          <Image
            src={"/newslettere.svg"}
            width={88.62}
            height={86.5}
            alt="newslettericon"
          />
          <div className="ml-8">
            <h3 className=" font-mont font-bold text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-white mt-0">Join our newsletter now!</h3>
            <p className=" font-pop font-normal text-sm lg:text-base text-social">Register now and get our latest updates and promos.</p>
          </div>
        </div>
        <div>
            <input type="text" placeholder="Enter your email" className=" w-[320px] md:w-90 px-8 pt-6 pb-6.25 outline-none bg-white rounded-lg" />
            <button className=" px-[32.5px] py-[16.5px] bg-dark-black text-white -ml-26.25 rounded-lg mt-4">Join</button>
        </div>
      </div>
    </>
  );
};

export default NewsLetter;
