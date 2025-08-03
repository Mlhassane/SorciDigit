import React from 'react';

import { CardCarousel } from '../ui/card-carousel';

const CardCaroursalDemo = () => {
  const images = [
    { src: '/home.png', alt: 'Image 1' },
    { src: '/doctana.png', alt: 'Image 2' },
    { src: '/shagali.png', alt: 'Image 3' },
  ];

  return (
    <div className="w-full">
      <CardCarousel
        images={images}
        autoplayDelay={5000}
        showPagination={true}
        showNavigation={true}
      />
    </div>
  );
};

export default CardCaroursalDemo;
