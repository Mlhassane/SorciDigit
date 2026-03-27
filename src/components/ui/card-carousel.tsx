'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { SparklesIcon } from 'lucide-react';
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from 'swiper/modules';

import { Badge } from '@/components/ui/badge';

interface CarouselProps {
  images: { src: string; alt: string }[];
  autoplayDelay?: number;
  showPagination?: boolean;
  showNavigation?: boolean;
}

export const CardCarousel: React.FC<CarouselProps> = ({
  images,
  autoplayDelay = 1500,
  showPagination = true,
  showNavigation = true,
}) => {
  const css = `
  .swiper {
    width: 100%;
    padding-bottom: 50px;
  }
  
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 280px;
  }
  
  @media (min-width: 768px) {
    .swiper-slide {
      width: 400px;
    }
  }
  
  .swiper-slide img {
    display: block;
    width: 100%;
  }
  
  
  .swiper-3d .swiper-slide-shadow-left {
    background-image: none;
  }
  .swiper-3d .swiper-slide-shadow-right{
    background: none;
  }
  `;
  return (
    <section className="w-full">
      <style>{css}</style>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="border-secondary/50 mx-auto w-full max-w-4xl rounded-[24px] border p-2 shadow-sm md:rounded-t-[44px]"
      >
        <div className="from-secondary/10 to-card relative mx-auto flex w-full flex-col rounded-[24px] border bg-gradient-to-b p-2 shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)_inset] md:items-start md:gap-8 md:rounded-t-[40px] md:rounded-b-[20px] md:p-2">
          <div className="flex flex-col justify-center pt-10 pb-2 px-4 md:items-center w-full">
            <p className="text-center text-sm md:text-base text-gray-600 max-w-xl mx-auto">
              Nous travaillons sans relâche pour rendre vos solutions plus <span className='font-bold text-black'>faciles</span>, plus <span className='font-bold text-black'>accessibles</span> et surtout à <span className='font-bold text-black'>moindre coût</span>.
            </p>
          </div>

          <div className="flex w-full items-center justify-center gap-4 py-8">
            <div className="w-full">
              <Swiper
                spaceBetween={20}
                autoplay={{
                  delay: autoplayDelay,
                  disableOnInteraction: false,
                }}
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                  rotate: 5,
                  stretch: 0,
                  depth: 100,
                  modifier: 2.5,
                }}
                pagination={showPagination}
                navigation={
                  showNavigation
                    ? {
                      nextEl: '.swiper-button-next',
                      prevEl: '.swiper-button-prev',
                    }
                    : undefined
                }
                modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <motion.div
                      className="size-full rounded-2xl flex items-center justify-center overflow-hidden shadow-2xl"
                    >
                      <img
                        src={image.src}
                        className="rounded-xl w-full h-auto object-cover"
                        alt={image.alt}
                      />
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
