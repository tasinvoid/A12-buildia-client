import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination, Autoplay, Parallax } from "swiper/modules";



import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";


import buldingImg1 from '../../../assets/pexels-expect-best-79873-323705.jpg';
import buldingImg2 from '../../../assets/pexels-pixabay-302769.jpg';
import buldingImg3 from '../../../assets/pexels-sevenstormphotography-443383.jpg';


function MySwiperComponent() {
  return (
  <div className="mx-5">
      <Swiper
        style={{
          '--swiper-navigation-color': '#000',
          '--swiper-pagination-color': '#000',
        }}
        speed={900}
        parallax={true}
        spaceBetween={30}
        navigation={false}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 4000, // Increased delay for better readability of new effects
          disableOnInteraction: false,
        }}
        modules={[EffectFade, Navigation, Pagination, Autoplay, Parallax]}
        className=" h-100 rounded-3xl" // Note: 'h-100' is not a standard TailwindCSS height class (e.g., h-screen, h-full). Ensure it's defined in your tailwind.config.js if you expect a specific height, otherwise it may not be responsive.
      >
        <div
          slot="container-start"
          className="parallax-bg absolute left-0 top-0 w-[130%] h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${buldingImg1})` }}
          data-swiper-parallax="-35%" // Increased parallax for background image
        ></div>

        <SwiperSlide>
          <div className="relative w-full h-full flex items-center justify-center text-black p-4 z-10">
            <img src={buldingImg1} className="w-full h-full object-cover absolute inset-0" alt="Building 1" />
            <div className="text-content relative z-20 text-center max-w-2xl mx-auto px-4"> {/* Added px-4 for smaller screens */}
              <div
                className="title text-4xl sm:text-5xl md:text-6xl font-extrabold mb-2 sm:mb-4 drop-shadow-lg" // Responsive text sizes, adjusted margin-bottom
                data-swiper-parallax="200"
                data-swiper-parallax-opacity="0"
                data-swiper-parallax-duration="1000"
              >
                MODERN LIVING
              </div>
              <div
                className="subtitle text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6 drop-shadow-lg" // Responsive text sizes, adjusted margin-bottom
                data-swiper-parallax="150"
                data-swiper-parallax-opacity="0"
                data-swiper-parallax-duration="1100"
              >
                YOUR DREAM ADDRESS
              </div>
              <div
                className="text text-sm sm:text-base md:text-lg leading-relaxed drop-shadow-md" // Responsive text sizes
                data-swiper-parallax="100"
                data-swiper-parallax-opacity="0"
                data-swiper-parallax-duration="1200"
              >
                <p>Welcome to our modern residential project, where every apartment is designed for your comfort and convenience.</p>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative w-full h-full flex items-center justify-center text-black p-4 z-10">
            <img src={buldingImg2} className="w-full h-full object-cover absolute inset-0" alt="Building 2" />
            <div className="text-content relative z-20 text-center max-w-2xl mx-auto px-4"> {/* Added px-4 for smaller screens */}
              <div
                className="title text-4xl sm:text-5xl md:text-6xl font-extrabold mb-2 sm:mb-4 drop-shadow-lg text-white" // Responsive text sizes
                data-swiper-parallax="200"
                data-swiper-parallax-opacity="0"
                data-swiper-parallax-duration="1000"
              >
                CONVENIENT LIFESTYLE
              </div>
              <div
                className="subtitle text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6 drop-shadow-lg text-white" // Responsive text sizes
                data-swiper-parallax="150"
                data-swiper-parallax-opacity="0"
                data-swiper-parallax-duration="1100"
              >
                EVERYTHING AT YOUR FINGERTIPS
              </div>
              <div
                className="text text-sm sm:text-base md:text-lg leading-relaxed drop-shadow-md"
                data-swiper-parallax="100"
                data-swiper-parallax-opacity="0"
                data-swiper-parallax-duration="1200"
              >
                <p className="text-white">Enjoy all modern amenities including parking, security, gym, and community hall.</p>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative w-full h-full flex items-center justify-center text-black p-4 z-10">
            <img src={buldingImg3} className="w-full h-full object-cover absolute inset-0" alt="Building 3" />
            <div className="text-content relative z-20 text-center max-w-2xl mx-auto px-4"> {/* Added px-4 for smaller screens */}
              <div
                className="title text-4xl sm:text-5xl md:text-6xl font-extrabold mb-2 sm:mb-4 drop-shadow-lg text-white" // Responsive text sizes
                data-swiper-parallax="200"
                data-swiper-parallax-opacity="0"
                data-swiper-parallax-duration="1000"
              >
                SEAMLESS MANAGEMENT
              </div>
              <div
                className="subtitle text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6 drop-shadow-lg text-white" // Responsive text sizes
                data-swiper-parallax="150"
                data-swiper-parallax-opacity="0"
                data-swiper-parallax-duration="1100"
              >
                EASILY FROM YOUR APP
              </div>
              <div
                className="text text-sm sm:text-base md:text-lg leading-relaxed drop-shadow-md"
                data-swiper-parallax="100"
                data-swiper-parallax-opacity="0"
                data-swiper-parallax-duration="1200"
              >
                <p className="text-white">Pay rent, submit maintenance requests, and receive announcements directly from your mobile device.</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default MySwiperComponent;