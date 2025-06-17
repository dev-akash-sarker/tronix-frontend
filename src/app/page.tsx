// import Image from "next/image";

import BottomNavbar from "./components/navbar/bottomnavbar/BottomNavbar";
import TopNavbar from "./components/navbar/topnavbar/TopNavbar";

export default function Home() {
  return (
    <>
      <div className="">
        <div className=" w-full md:mx-0 lg:mx-auto">
          <div className="lg:mx-40">
            <TopNavbar />
            <hr className="text-gray-300" />
            <BottomNavbar />
          </div>
        </div>
      </div>
      Home
    </>
  );
}
