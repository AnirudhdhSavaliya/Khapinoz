// import React from 'react';
// import { Link } from 'react-router-dom';
// import heroSliderImg from '../../assets/heroSliderHome.avif'
// const HeroSection = () => {
//   return (
// <section
//   className="relative bg-cover bg-center h-[60vh] flex items-center justify-center text-center sm:text-left"
//   style={{
//     backgroundImage:`url(${heroSliderImg})`, 
//   }}
// >
//   <div className="absolute inset-0 bg-black opacity-40"></div>

//   <div className="relative z-10 text-white px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
//     <h1 className="text-4xl sm:text-5xl font-bold mb-4">
//       Fresh Pizzas, Delivered Fast!
//     </h1>
//     <p className="text-lg sm:text-xl mb-6">
//       Order from Khapinoz Pizza and satisfy your cravings today.
//     </p>
//     <div className="flex flex-col sm:flex-row justify-center sm:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
//       <Link
//         to="/order"
//         className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-md hover:bg-yellow-500 transition"
//       >
//         Order Now
//       </Link>
//       <Link
//         to="/menu"
//         className="border-2 border-white text-white font-semibold px-6 py-3 rounded-md hover:bg-white hover:text-red-600 transition"
//       >
//         Explore Menu
//       </Link>
//     </div>
//   </div>
// </section> 
//   );
// };

// export default HeroSection;


import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { Link } from "react-router-dom";
import heroSliderImg from "../../assets/heroSliderHome.avif";
import heroSliderImg2 from "../../assets/heroSliderHome2.avif";
import heroSliderImg3 from "../../assets/david-benes-zsRhTW3qrmo-unsplash.jpg";

const customStyles = `
  .swiper-slide {
    backface-visibility: hidden;
    transform-style: preserve-3d;
    overflow: hidden;
  }
  .swiper-pagination-bullet {
    background-color: white;
    opacity: 1;
  }
  .swiper-pagination-bullet-active {
    background-color: rgb(75 89 69);
    opacity: 1;
  }
  .swiper-button-next, .swiper-button-prev {
    color: rgb(75 89 69);
    transition: color 0.3s ease;
  }
  .swiper-button-next:hover, .swiper-button-prev:hover {
    color: rgb(75 89 69);
  }
`;

export default function App() {
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const swiperRef = useRef(null);

  const onAutoplayTimeLeft = (s, time, progressValue) => {
    setProgress(1 - progressValue);
    setTimeLeft(Math.ceil(time / 1000));
  };

  const handleSlideClick = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      if (isPlaying) {
        swiperRef.current.swiper.autoplay.stop();
      } else {
        swiperRef.current.swiper.autoplay.start();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="w-full h-[40vh] md:h-[20vh] lg:h-[70vh] xl:h-[70vh] 2xl:h-[70vh]">
      <style>{customStyles}</style>

      <Swiper
        ref={swiperRef}
        spaceBetween={0}
        slidesPerView={1}
        centeredSlides={true}
        effect="fade"
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={800}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="w-full h-full"
        onClick={handleSlideClick}
      >
        <SwiperSlide>
          <section
            className="relative bg-cover bg-center h-full flex items-center justify-center text-center"
            style={{
              backgroundImage: `url(${heroSliderImg})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>

            <div className="relative z-10 text-white px-4 sm:px-6 lg:px-12 w-full max-w-7xl mx-auto">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 lg:mb-6 drop-shadow-lg">
                Fresh Pizzas, Delivered Fast!
              </h1>
              <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 lg:mb-8 max-w-2xl mx-auto drop-shadow-md">
                Order from Khapinoz Pizza and satisfy your cravings today.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
                <Link
                  to="/order"
                  className="bg-yellow-400 text-black font-semibold px-5 py-2 sm:px-6 sm:py-3 rounded-full hover:bg-yellow-500 transition duration-300 shadow-lg text-sm sm:text-base"
                >
                  Order Now
                </Link>
                <Link
                  to="/menu"
                  className="border-2 border-white text-white font-semibold px-5 py-2 sm:px-6 sm:py-3 rounded-full hover:bg-white hover:text-red-600 transition duration-300 text-sm sm:text-base"
                >
                  Explore Menu
                </Link>
              </div>
            </div>

            <div className="absolute right-4 sm:right-6 bottom-4 sm:bottom-6 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center font-bold text-white z-20">
              <svg viewBox="0 0 48 48" className="absolute w-full h-full">
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  className="stroke-current stroke-3 sm:stroke-4 text-white fill-none"
                  style={{
                    strokeDasharray: "125.6",
                    strokeDashoffset: 125.6 * progress,
                  }}
                />
              </svg>
              <span className="relative text-sm sm:text-base">{timeLeft}s</span>
            </div>
          </section>
        </SwiperSlide>

        <SwiperSlide>
          <section
            className="relative bg-cover bg-center h-full flex items-center sm:justify-center"
            style={{
              backgroundImage: `url(${heroSliderImg2})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
            <div className="relative z-10 text-white px-3 sm:px-6 lg:px-12 w-full max-w-7xl">
              <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 lg:mb-8 max-w-2xl drop-shadow-md text-center sm:text-start">
                <span className="bg-red-600 p-3">Limited Time Only</span>
              </p>
              <h1 className="sm:text-start text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 lg:mb-6 drop-shadow-lg text-center">
                50% Off Every Pizza<br />Today Only!
              </h1>
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <Link
                  to="/order"
                  className="bg-yellow-400 text-black font-semibold px-5 py-2 sm:px-6 sm:py-3 rounded-full hover:bg-yellow-500 transition duration-300 shadow-lg text-sm sm:text-base"
                >
                  Grab the Deal
                </Link>
                <Link
                  to="/menu"
                  className="border-2 border-white text-white font-semibold px-5 py-2 sm:px-6 sm:py-3 rounded-full hover:bg-white hover:text-red-600 transition duration-300 text-sm sm:text-base"
                >
                  See Menu
                </Link>
              </div>
            </div>
            <div className="absolute right-4 sm:right-6 bottom-4 sm:bottom-6 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center font-bold text-white z-20">
              <svg viewBox="0 0 48 48" className="absolute w-full h-full">
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  className="stroke-current stroke-3 sm:stroke-4 text-white fill-none"
                  style={{
                    strokeDasharray: "125.6",
                    strokeDashoffset: 125.6 * progress,
                  }}
                />
              </svg>
              <span className="relative text-sm sm:text-base">{timeLeft}s</span>
            </div>
          </section>
        </SwiperSlide>
        
        <SwiperSlide>
          <section
            className="relative bg-cover bg-center h-full flex items-center justify-center sm:justify-start"
            style={{
              backgroundImage: `url(${heroSliderImg3})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="relative z-10 text-white px-4 sm:px-8 lg:px-16 w-full max-w-7xl">
              <p className="text-sm sm:text-lg md:text-xl mb-4 sm:mb-6 lg:mb-8 drop-shadow-md">
                <span className="bg-green-600 px-4 py-2 rounded-lg font-semibold text-white">
                  Friday Special
                </span>
              </p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 drop-shadow-lg text-center sm:text-left">
                Free Drink <br className="hidden sm:block" /> With Every Pizza!
              </h1>
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <Link
                  to="/order"
                  className="bg-yellow-400 text-black font-semibold px-6 py-3 sm:px-7 sm:py-3.5 rounded-full transition-all duration-300 shadow-lg text-sm sm:text-base 
                  hover:bg-yellow-500 hover:scale-105"
                >
                  Order Now
                </Link>
                <Link
                  to="/menu"
                  className="border-2 border-white text-white font-semibold px-6 py-3 sm:px-7 sm:py-3.5 rounded-full transition-all duration-300 text-sm sm:text-base
                  hover:bg-white hover:text-red-600 hover:scale-105"
                >
                  Explore Menu
                </Link>
              </div>
            </div>
            <div className="absolute right-4 sm:right-6 bottom-4 sm:bottom-6 w-12 h-12 flex items-center justify-center font-bold text-white z-20">
              <svg viewBox="0 0 48 48" className="absolute w-full h-full">
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  className="stroke-current stroke-3 sm:stroke-4 text-white fill-none"
                  style={{
                    strokeDasharray: "125.6",
                    strokeDashoffset: 125.6 * progress,
                    transition: "stroke-dashoffset 0.5s ease-in-out",
                  }}
                />
              </svg>
              <span className="relative text-sm sm:text-base">{timeLeft}s</span>
            </div>
          </section>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}