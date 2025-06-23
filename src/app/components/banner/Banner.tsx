import Image from "next/image";
import Link from "next/link";

interface BannerInterface {
  title: string;
  subtitle: string;
  linkTitle: string;
  linkUrl: string;
}

const Banner: React.FC<BannerInterface> = ({
  title,
  subtitle,
  linkTitle,
  linkUrl,
}) => {
  return (
    <div className=" relative">
      <Image
        src="/banner/banner.jpg"
        fill
        alt="banner"
        className=" absolute top-0 left-0 -z-10 rounded-4xl"
      />
      <div className=" py-[100px] rounded-4xl bannerimage z-20">
        <h4 className=" font-mont font-bold text-2xl md:text-4xl xl:text-5xl text-white text-center">
          {title}
        </h4>
        <p className="w-full mx-2 md:w-[501px] md:mx-auto font-pop font-normal text-sm xl:text-lg text-social text-center mt-4 mb-10">
          {subtitle}
        </p>
        <div className=" text-center">
          <Link
            href={`/${linkUrl}`}
            className=" inline-block font-pop font-normal text-lg text-white px-6 py-3 xl:px-[29.5px] xl:py-[16.5px] border border-white rounded-lg"
          >
            {linkTitle}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
