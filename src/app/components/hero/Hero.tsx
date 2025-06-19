import HeroSlider from "@/app/features/HeroSlider";
import Image from "next/image";
import Link from "next/link";

const Hero: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-[60%_40%] h-[220px] md:h-[350px] lg:h-[400px] xl:h-[450px] gap-4 m-3 -z-10">
        <div className=" col-span-1 row-span-2 rounded-3xl Hero-css overflow-hidden">
          <HeroSlider
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3000, // 3 seconds
              disableOnInteraction: false, // keep auto sliding after user interaction
            }}
            pagination={{ clickable: true }}
          >
            <div className="bg-black w-full h-full rounded-3xl relative">
              <Link href="#">
                <video
                  src="/slider/xlarge_2x.mp4"
                  width={100}
                  height={100}
                  className="w-full h-full"
                  autoPlay
                  muted
                  loop // optional, if you want it to repeat
                  playsInline // good for mobile support
                ></video>
              </Link>
              <div className=" absolute top-1/2 -translate-y-1/2 left-10 hidden">
                <h1 className=" sm:text-4xl md:text-4xl lg:text-5xl xl:text-c1 font-mont font-bold">
                  Better Devices for Better Life
                </h1>
                <p className=" text-social font-normal, text-2xl">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor.
                </p>
              </div>
            </div>
            <div className="bg-amber-300 w-full h-full rounded-3xl relative">
              <Link href="#">
                <Image
                  src="/slider/one.jpg"
                  width={100}
                  height={100}
                  className="w-full h-full bg-cover"
                  alt="one"
                  // Photo by Jakub Zerdzicki: https://www.pexels.com/photo/fall-devices-18523431/
                />
              </Link>
              <div className=" absolute top-1/2 -translate-y-1/2 left-10">
                <h1 className=" sm:text-4xl md:text-4xl lg:text-5xl xl:text-c1 font-mont font-bold">
                  Better Devices for Better Life
                </h1>
                <p className=" text-social font-normal, text-2xl">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor.
                </p>
              </div>
            </div>
            <div className="bg-amber-300 w-full h-full rounded-3xl relative">
              <Link href="#">
                <Image
                  src="/slider/samsung.png"
                  width={100}
                  height={100}
                  className="w-full h-full bg-cover"
                  unoptimized
                  alt="one"
                />
              </Link>
              <div className=" absolute top-1/2 -translate-y-1/2 left-10 hidden">
                <h1 className=" sm:text-4xl md:text-4xl lg:text-5xl xl:text-c1 font-mont font-bold">
                  Better Devices for Better Life
                </h1>
                <p className=" text-social font-normal, text-2xl">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor.
                </p>
              </div>
            </div>
            <div className="bg-amber-300 w-full h-full rounded-3xl relative">
              <Link href="#">
                <Image
                  src="/slider/laptop.avif"
                  width={100}
                  height={100}
                  className="w-full h-full bg-cover blur-[2px]"
                  unoptimized
                  alt="one"
                />
              </Link>
              <div className=" absolute top-1/2 -translate-y-1/2 left-10">
                <h1 className=" sm:text-4xl md:text-4xl lg:text-5xl xl:text-c1 font-mont font-bold">
                  Better Devices for Better Life
                </h1>
                <p className=" text-social font-normal, text-2xl">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor.
                </p>
              </div>
            </div>
          </HeroSlider>
        </div>

        <div className="bg-red-300 relative rounded-3xl overflow-hidden bg-[url('/slider/pcgaming.jpg')] bg-cover bg-center h-full ">
          <Link href="#">
            <h2 className=" text-[12px] lg:text-base block font-mont font-extrabold absolute top-1/2 left-1/2 -translate-1/2 bg-amber-300 py-4 px-5 text-center rounded-3xl ">
              PC Gaming Collection
            </h2>
          </Link>
        </div>
        <div className="bg-red-300 relative rounded-3xl overflow-hidden bg-[url('/slider/camera.jpg')] bg-cover bg-center h-full ">
          <Link href="#">
            <h2 className=" text-[12px] block lg:text-base font-mont font-extrabold absolute top-1/2 left-1/2 -translate-1/2 bg-black text-white py-4 px-5 text-center rounded-3xl ">
              Camera Collection
            </h2>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Hero;
