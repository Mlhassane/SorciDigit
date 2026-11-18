'use client';

import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';
import HomeBadge from '../ui/home-badge';
import { Beam } from '../ui/gridbeam';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { TextAnimate } from '../magicui/text-animate';

const PIXEL_SCRIPT_URL =
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pixel-RKkUKH2OXWk9adKbDnozmndkwseTQh.js';

export default function Hero() {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    // Use Intersection Observer to load the script only when the component is in view
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          import('@/lib/load-script').then(({ loadScript }) => {
            loadScript(PIXEL_SCRIPT_URL)
              .then(() => {
                setIsScriptLoaded(true);
              })
              .catch((error) => {
                console.error('Error loading pixel script:', error);
              });
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    const heroElement = document.getElementById('hero-section');
    if (heroElement) {
      observer.observe(heroElement);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      id="hero-section"
      className="bg-background relative min-h-screen w-full overflow-x-hidden py-32 md:px-6 flex items-center"
    >
      <img
        src="/vector1.png"
        alt="Vector"
        width={300}
        draggable={false}
        height={300}
        className="absolute top-0 right-0 z-[2] object-cover object-center select-none"
      />
      <img
        src="/vector2.png"
        alt="Vector"
        width={300}
        height={300}
        draggable={false}
        className="absolute top-0 left-0 z-[2] object-cover object-center select-none"
      />
      <img
        src="/vector5.png"
        alt="Vector"
        width={300}
        draggable={false}
        height={300}
        className="absolute bottom-0 -left-44 z-[2] -rotate-90 object-cover object-center select-none"
      />
      <img
        src="/vector6.png"
        alt="Vector"
        width={300}
        draggable={false}
        height={300}
        className="absolute -right-44 bottom-0 z-[2] rotate-90 object-cover object-center select-none"
      />
      <div className="container mx-auto px-4 2xl:max-w-[1400px]">
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1 }}
        >
          <HomeBadge />
        </motion.div>
        <div className="mx-auto mt-5 max-w-4xl text-center">
          <Beam />
          <motion.div
            className={cn(
              'from-foreground/60  via-foreground to-foreground/60 dark:from-muted-foreground/55 dark:via-foreground dark:to-muted-foreground/55 max-w-5xl bg-gradient-to-r bg-clip-text text-center text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter text-transparent xl:text-6xl/none mb-4',
            )}
          >
            <TextAnimate as="h1" className='text-black serif' animation="blurInUp" delay={0}>
              Nous transformons vos ambitions en expériences digitales qui font grandir votre business.
            </TextAnimate>
          </motion.div>
        </div>
        <motion.div
          className="mx-auto mt-6 max-w-3xl text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.3 }}
        >
          <TextAnimate className="font-medium text-black text-xl md:text-2xl tracking-tight mb-6 serif italic leading-tight" animation="blurIn" delay={0.5}>
            Stratégie, design et technologie. Nous accompagnons les entreprises ambitieuses dans leur transformation digitale.
          </TextAnimate>
          <p className="text-muted-foreground text-lg grotesk max-w-2xl mx-auto">
            De la stratégie de marque à l'application mobile, nous concevons des solutions sur mesure pour les entreprises et startups d'Afrique de l'Ouest — fluides, rentables et mémorables
          </p>
        </motion.div>
        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.6 }}
        >
          <Link className='cursor-pointer' href="/get-started">
            <motion.button
              whileHover={{ scale: 1.05, translateX: 0.3 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-b from-black to-black/80 rounded-full text-base font-bold text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset] px-8 py-4 flex items-center gap-2 grotesk hover:shadow-xl transition-all whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Démarrer un projet
            </motion.button>
          </Link>
          <Link className='cursor-pointer' href="/portfolio">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full text-base font-semibold text-black border border-black/15 bg-white/70 backdrop-blur px-8 py-4 flex items-center gap-2 grotesk hover:border-black/40 hover:shadow-lg transition-all whitespace-nowrap">
              Découvrir nos réalisations
              <ArrowUpRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
        <motion.div
          className="mt-5 flex items-center justify-center gap-x-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.75, delay: 0.75 }}
        >
          <motion.img
            draggable={false}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.25 }}
            src="/vector4.png"
            alt="Next.js"
            className="mt-4 mr-2 hidden w-96 brightness-[4] select-none xl:block"
          />
          <span className="text-sm text-gray-500 text-center italic">
            La technologie est notre outil. Votre croissance est notre obsession.
          </span>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.25 }}
            className="mt-4 ml-2 hidden w-96 select-none xl:block"
          >
            <img
              src="/vector3.png"
              alt="Vector graphic"
              width={384}
              height={100}
              draggable={false}
              className="brightness-[4] font-black"
            />
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}
