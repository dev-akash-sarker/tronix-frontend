// import Image from "next/image";

import Brands from "./components/brands/Brands";
import Hero from "./components/hero/Hero";
import NewArrivel from "./components/newArrivel/NewArrivel";
import PromotionCampaign from "./components/promotions/Promotions";

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
    </>
  );
}
