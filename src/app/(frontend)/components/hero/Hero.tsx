import Image from "next/image";
import Link from "next/link";
import HeroSlider from "../../features/HeroSlider";

const Hero: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-[100%] h-55 md:h-87.5 lg:h-100 xl:h-112.5 gap-4 m-3 -z-10">
        <div className=" col-span-1 row-span-2 rounded-3xl Hero-css overflow-hidden">
          <HeroSlider
            spaceBetween={20}
            slidesPerView={1}
            classNames="w-full h-full"
            loop={true}
            autoplay={{
              delay: 3000, // 3 seconds
              disableOnInteraction: false, // keep auto sliding after user interaction
            }}
            pagination={{ clickable: true }}
          >
            <div className="w-full h-full rounded-3xl relative">
              <Link href="#">
                <Image
                  src="/slider/slider__moonsoon_copy_jpg.jpg"
                  fill
                  className="object-cover brightness-75"
                  sizes="100vw"
                  unoptimized
                  alt="one"
                />
              </Link>
            </div>
            <div className="w-full h-full rounded-3xl relative">
              <Link href="#">
                <Image
                  src="/slider/one.jpg"
                  fill
                  className="object-cover brightness-75"
                  sizes="100vw"
                  alt="one"
                />
              </Link>
              <div className=" absolute top-1/2 -translate-y-1/2 left-2 md:left-10">
                <h1 className=" text-lg md:text-3xl lg:text-5xl xl:text-c1 font-mont font-bold">
                  Better Devices for Better Life
                </h1>
                <p className=" text-social font-normal text-xs md:text-2xl text-start">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor.
                </p>
              </div>
            </div>
            <div className="w-full h-full rounded-3xl relative">
              <Link href="#">
                <Image
                  src="/slider/samsung.png"
                  fill
                  preload
                  className="object-cover brightness-75"
                  sizes="100vw"
                  unoptimized
                  alt="one"
                />
              </Link>
              <div className=" hidden absolute top-1/2 -translate-y-1/2 left-2 md:left-10">
                <h1 className=" text-lg md:text-3xl lg:text-5xl xl:text-c1 font-mont font-bold">
                  Better Devices for Better Life
                </h1>
                <p className=" text-social font-normal text-xs md:text-2xl text-start">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor.
                </p>
              </div>
            </div>
            <div className="w-full h-full rounded-3xl relative">
              <Link href="#">
                <Image
                  src="/slider/laptop.avif"
                  fill
                  preload
                  className="object-cover brightness-75 blur-[2px]"
                  sizes="100vw"
                  unoptimized
                  alt="one"
                />
              </Link>
              <div className=" absolute top-1/2 -translate-y-1/2 left-2 md:left-10">
                <h1 className=" text-lg md:text-3xl lg:text-5xl xl:text-c1 font-mont font-bold">
                  Better Devices for Better Life
                </h1>
                <p className=" text-social font-normal text-xs md:text-2xl text-start">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor.
                </p>
              </div>
            </div>
            <div className="w-full h-full rounded-3xl relative">
              <Link href="#">
                <Image
                  src="/slider/slider_jpg.jpg"
                  fill
                  preload
                  className="object-cover brightness-75"
                  sizes="100vw"
                  unoptimized
                  alt="one"
                />
              </Link>
            </div>
          </HeroSlider>
        </div>
    
      </div>
    </>
  );
};

export default Hero;
