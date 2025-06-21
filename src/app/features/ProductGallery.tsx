"use client";

import React, { useState } from "react";
// Import Swiper React components
import type { Swiper as SwiperClass } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./style.css";
import Image from "next/image";
interface ProductGalleryProps {
  images: string[];
}
const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  console.log("wow", images);
  return (
    <>
      <Swiper
        spaceBetween={10}
        navigation={false}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {images.map((imgSrc, key) => {
          return (
            <>
              <SwiperSlide key={key}>
                <Image
                  fill
                  style={{ objectFit: "cover" }}
                  alt="product"
                  src={imgSrc}
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  fill
                  style={{ objectFit: "cover" }}
                  alt="product"
                  src="https://swiperjs.com/demos/images/nature-7.jpg"
                />
              </SwiperSlide>
            </>
          );
        })}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        navigation={true}
        spaceBetween={32}
        slidesPerView={4}
        freeMode={true}
        loop={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images.map((imgSrc, key) => (
          <>
            <SwiperSlide key={key}>
              <Image
                fill
                style={{ objectFit: "cover" }}
                alt="product"
                src={imgSrc}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                fill
                style={{ objectFit: "cover" }}
                alt="product"
                src="https://swiperjs.com/demos/images/nature-7.jpg"
              />
            </SwiperSlide>
          </>
        ))}
      </Swiper>
    </>
  );
};

export default ProductGallery;
