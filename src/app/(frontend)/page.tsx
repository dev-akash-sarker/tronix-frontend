// import Image from "next/image";

import Banner from "./components/banner/Banner";
import Brands from "./components/brands/Brands";
import Hero from "./components/hero/Hero";
import NewArrivel from "./components/newArrivel/NewArrivel";
import PromotionCampaign from "./components/promotions/Promotions";
import FeaturedProduct from "./components/featured/Featured";
import TopRatedProducts from "./components/topRatedProduct/TopRatedProducts";

export default function Home() {
  const isFeatured: boolean = false;
  const isMiniBanner: boolean = false;
  const isBrands: boolean = false;
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
        {isBrands && <Brands />}
      </div>
      <div>
        {isMiniBanner && (
          <Banner
            title="Get Best Quality Device"
            subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
sed do eiusmod tempor. "
            linkTitle="Shop Now"
            linkUrl="/allcategory"
          />
        )}
      </div>
      <div>{isFeatured && <FeaturedProduct />}</div>
      <div>
        <TopRatedProducts />
      </div>
    </>
  );
}
