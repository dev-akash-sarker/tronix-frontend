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

  return (
    <>
      <Swiper
        spaceBetween={10}
        navigation={false}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {images.map((imgSrc, index) => {
          return (
            <>
              <SwiperSlide key={index}>
                <Image
                  fill
                  style={{ objectFit: "cover" }}
                  alt="product"
                  src={imgSrc}
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
        {images.map((imgSrc, index) => (
          <>
            <SwiperSlide key={index}>
              <Image
                fill
                style={{ objectFit: "cover" }}
                alt="product"
                src={imgSrc}
              />
            </SwiperSlide>
          </>
        ))}
      </Swiper>
    </>
  );
};

export default ProductGallery;
