// import Image from "next/image";

import Hero from "./components/hero/Hero";
import NewArrivel from "./components/newArrivel/NewArrivel";

export default function Home() {
  return (
    <>
      <div className="my-2">
        <Hero />
      </div>
      <div className=" my-4 mt-11">
        <NewArrivel />
      </div>
    </>
  );
}
