// import Image from "next/image";

import Banner from "./components/banner/Banner";
import Brands from "./components/brands/Brands";
import Hero from "./components/hero/Hero";
import NewArrivel from "./components/newArrivel/NewArrivel";
import PromotionCampaign from "./components/promotions/Promotions";
import FeaturedProduct from "./components/featured/Featured";
import TopRatedProducts from "./components/topRatedProduct/TopRatedProducts";
import NewsLetter from "./components/newsletter/Newsletter";

export default function Home() {
  return (
    <>
      <div className="my-2">
        <Hero />
      </div>
      <div className=" my-4 mt-11">
        <NewArrivel />
      </div>
      <div>
        <PromotionCampaign />
      </div>
      <div>
        <Brands />
      </div>
      <div>
        <Banner
          title="Get Best Quality Device"
          subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
sed do eiusmod tempor. "
          linkTitle="Shop Now"
          linkUrl="/allcategory"
        />
      </div>
      <div>
        <FeaturedProduct />
      </div>
      <div>
        <TopRatedProducts />
      </div>
      <div className=" lg:-mx-40 bg-hover-social mt-10 lg:mt-20">
        <div className=" lg:mx-40 py-[69px]">
          <NewsLetter/>
        </div>
      </div>
      
    </>
  );
}
