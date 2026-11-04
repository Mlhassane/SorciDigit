'use client';

import Features from '@/components/home/features';
import Hero from '@/components/home/hero';
import Gallery from '@/components/home/gallery';
import Testimonials from '@/components/home/testimonials';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';


export default function Homepage() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <>
      <Hero />
      <Features />
      <Testimonials />
      <Gallery />
    </>
  );
}
