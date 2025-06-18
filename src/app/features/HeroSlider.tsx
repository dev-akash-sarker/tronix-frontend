"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperProps } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ReactNode } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

interface CustomSwiperProps extends SwiperProps {
  children: ReactNode[];
}
const HeroSlider: React.FC<CustomSwiperProps> = ({
  children,
  ...swiperProps
}) => {
  return (
    <Swiper {...swiperProps} modules={[Navigation, Pagination]}>
      {children.map((child, index) => (
        <SwiperSlide key={index} className="w-full h-full">
          {child}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSlider;
