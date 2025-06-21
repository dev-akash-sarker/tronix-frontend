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
  classNames: string;
}
const HeroSlider: React.FC<CustomSwiperProps> = ({
  children,
  classNames,
  ...swiperProps
}) => {
  return (
    <Swiper {...swiperProps} modules={[Navigation, Pagination, Autoplay]}>
      {children.map((child, index) => (
        <SwiperSlide key={index} className={classNames}>
          {child}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSlider;
