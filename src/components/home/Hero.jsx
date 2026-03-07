"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import dynamic from "next/dynamic";


import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Typewriter = dynamic(
  () => import("react-simple-typewriter").then((mod) => mod.Typewriter),
  { ssr: false }
);

const slides = [
  {
    img: "/assets/image1.jpg",
    tagline: ["Orvella - Made for Your Everyday Look."],
  },
  {
    img: "/assets/image2.jpg",
    tagline: ["Orvella - Style You'll Love to Wear."],
  },
  {
    img: "/assets/image3.jpg",
    tagline: ["Orvella - Made for Moments That Matter"],
  },
  {
    img: "/assets/image4.jpg",
    tagline: ["Orvella - Curated Style, Effortless Living"],
  },
  {
    img: "/assets/image5.jpg",
    tagline: ["Orvella - Dress With Attitude"],
  },
];

const Hero = () => {
  return (
    <div className="w-full px-2 lg:px-0 pt-4 pb-4">
      <Swiper
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        modules={[Navigation, Pagination, Autoplay]}
        className="rounded-xl overflow-hidden shadow-2xl"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-72 sm:h-64 md:h-96 lg:h-140">
              <Image
                src={slide.img}
                alt={`Hero slide ${index + 1}`}
                fill
                priority={index === 0}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px"
                className="brightness-90"
              />

             
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              {/* Discount Badge */}
              <div className="absolute top-1 right-1 lg:top-0.5 lg:right-0.5 z-10">
                <div className="relative group cursor-pointer">
                  <div className="relative backdrop-blur-lg rounded-xl overflow-hidden transform group-hover:scale-110 transition-all duration-300 border border-white/40 shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <div className="relative px-2 py-1.5 lg:px-4 lg:py-3">
                      <div className="flex items-center gap-1.5 lg:gap-3">
                        <div className="relative shrink-0">
                          <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg group-hover:shadow-red-500/50 transition-all duration-300">
                            <div className="text-center">
                              <div className="text-[6px] lg:text-[7px] font-bold text-white/90 uppercase tracking-wide leading-none">Up To</div>
                              <div className="text-base lg:text-lg font-black text-white leading-none my-0.5">25%</div>
                              <div className="text-[5px] lg:text-[6px] font-bold text-white/90 uppercase tracking-wide leading-none">OFF</div>
                            </div>
                          </div>
                          <div className="absolute inset-0 rounded-full border-2 border-red-400/0 group-hover:border-red-400/60 group-hover:scale-125 transition-all duration-500"></div>
                        </div>
                        <div className="pr-0.5 lg:pr-1">
                          <div className="text-[9px] lg:text-[11px] font-bold text-white uppercase tracking-wide leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] group-hover:text-red-400 transition-colors duration-300">
                            Special
                          </div>
                          <div className="text-[9px] lg:text-[11px] font-bold text-white uppercase tracking-wide leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] group-hover:text-red-400 transition-colors duration-300">
                            Offer
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-400/50 to-transparent group-hover:via-red-400 transition-colors duration-300"></div>
                  </div>
                  <div className="absolute -inset-2 bg-red-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                </div>
              </div>

              {/* Text */}
              <div className="absolute inset-0 flex items-end justify-center pb-3 lg:pb-8 px-2 lg:px-4">
                <p className="text-sm md:text-2xl lg:text-5xl font-bold text-white text-center drop-shadow-lg bg-black/20 backdrop-blur-sm px-3 py-2 lg:px-6 lg:py-3 rounded-2xl border border-white/20">
                  <Typewriter
                    words={slide.tagline}
                    loop
                    typeSpeed={80}
                    deleteSpeed={60}
                    delaySpeed={3000}
                    cursor
                    cursorStyle="|"
                  />
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
