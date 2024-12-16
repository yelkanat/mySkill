import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";

export default function BannerSlider() {
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      style={{
        width: "100%",
        height: "400px",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <SwiperSlide>
        <Image
          src="/banner.jpg"
          alt="Баннер 1"
          layout="fill"
          objectFit="cover"
          priority
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/banner4.jpg"
          alt="Баннер 2"
          layout="fill"
          objectFit="cover"
          priority
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/banner.jpg"
          alt="Баннер 3"
          layout="fill"
          objectFit="cover"
          priority
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/banner4.jpg"
          alt="Баннер 4"
          layout="fill"
          objectFit="cover"
          priority
        />
      </SwiperSlide>
    </Swiper>
  );
}
