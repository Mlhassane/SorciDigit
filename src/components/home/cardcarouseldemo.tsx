'use client';

import React from 'react';

import { CardCarousel } from '../ui/card-carousel';

const FALLBACK_IMAGES = [
  { src: '/home.png', alt: 'Réalisation Sorci Digit' },
  { src: '/doctana.png', alt: 'Doctana — plateforme e-commerce' },
  { src: '/shagali.png', alt: 'Shagali — application sur mesure' },
];

const CardCaroursalDemo = ({ images }: { images?: { src: string; alt: string }[] }) => {
  const list = images && images.length > 0 ? images : FALLBACK_IMAGES;

  return (
    <div className="w-full">
      <CardCarousel
        images={list}
        autoplayDelay={5000}
        showPagination={true}
        showNavigation={true}
      />
    </div>
  );
};

export default CardCaroursalDemo;
