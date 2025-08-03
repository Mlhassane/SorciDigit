'use client';

import Features from '@/components/home/features';
import Hero from '@/components/home/hero';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Gallery = dynamic(() => import('@/components/home/gallery'), {
  ssr: false,
});

const Testimonials = dynamic(() => import('@/components/home/testimonials'), {
  ssr: false,
});


export default function Homepage() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <>
      <Hero />
      <Features />
      <Gallery />
    </>
  );
}
