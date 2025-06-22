import Image from "next/image";

const Brands: React.FC = () => {
  return (
    <div className=" my-40 w-full">
      <div className=" mx-32 flex justify-start items-center gap-x-20">
        <Image
          src="/brands/SimSong.png"
          width={189}
          height={72}
          className=" w-[15%]  aspect-[4/3] object-contain"
          alt="1"
        />
        <Image
          src="/brands/Harps.png"
          width={189}
          height={72}
          className=" w-[15%]  aspect-[4/3] object-contain"
          alt="1"
        />
        <Image
          src="/brands/DiskVan.png"
          width={189}
          height={72}
          className=" w-[15%]  aspect-[4/3] object-contain"
          alt="1"
        />
        <Image
          src="/brands/Ikon.png"
          width={189}
          height={72}
          className=" w-[15%]  aspect-[4/3] object-contain"
          alt="1"
        />
        <Image
          src="/brands/Strons.png"
          width={189}
          height={72}
          className=" w-[15%]  aspect-[4/3] object-contain"
          alt="1"
        />
        <Image
          src="/brands/Cocoon.png"
          width={189}
          height={72}
          className=" w-[15%]  aspect-[4/3] object-contain"
          alt="1"
        />
      </div>
    </div>
  );
};

export default Brands;
