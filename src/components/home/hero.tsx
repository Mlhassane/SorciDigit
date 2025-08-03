'use client';

import { Geist } from 'next/font/google';
import { cn } from '@/lib/utils';
import { CloudLightning, MoveRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HomeBadge from '../ui/home-badge';
import { Beam } from '../ui/gridbeam';
import { Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { TextAnimate } from '../magicui/text-animate';

const space = Geist({
  subsets: ['latin'],
  variable: '--font-carlito',
  weight: '900',
});

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

  const cards = [
    {
      title: 'V0 Compatible',
      description: 'Edit and customize visually, instantly.',
      icon: <CloudLightning className="h-full w-full" />,
      variant: 'rose',
      showGridLines: true,
    },
    {
      title: 'Animated Out of Box',
      description: 'No setup and  smooth UI interactions.',
      icon: <Sparkles className="h-full w-full" />,
      variant: 'rose',
      showGridLines: true,
    },
  ] as const;

  const cardConfigurations = [
    {
      color: 'rose',
      icon: 'Blocks',
      label: 'Command',
      canvasProps: { gap: 3, speed: 80, colors: '#fff, #fda4af, #e11d48' },
      number: 100,
      desc: 'Components available',
    },
    {
      color: 'rose',
      icon: 'f',
      label: 'Dropper',
      canvasProps: { gap: 3, speed: 80, colors: '#fff, #fda4af, #e11d48' },
      number: 15,
      desc: 'Categories available',
    },
  ];

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
        <div className="mx-auto mt-5 max-w-3xl text-center">
          <Beam />
          <motion.div
            className={cn(
              'from-foreground/60  via-foreground to-foreground/60 dark:from-muted-foreground/55 dark:via-foreground dark:to-muted-foreground/55 max-w-5xl bg-gradient-to-r bg-clip-text text-center text-6xl font-extrabold tracking-tighter text-transparent sm:text-6xl xl:text-6xl/none',

            )}
         
          >
            <TextAnimate  className='text-black' animation="blurInUp"  delay={0}>
              Accélérez votre transformation digital avec des solutions
            </TextAnimate>
            {/* <img
              src="/1.png"
              alt="Logo"
              draggable={false}
              className="mx-4 mb-2 inline-block h-12 w-12 md:h-16 md:w-16"
            /> */}
            <TextAnimate font='serif-italic'  className='text-black' animation="blurIn"  delay={0.5}>
              innovantes
            </TextAnimate>
          </motion.div>
        </div>
        <motion.div
          className="mx-auto mt-5 max-w-3xl text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.3 }}
        >
            <TextAnimate className="text-muted-foreground text-xl" animation="blurIn"  delay={1}>
             Parce que chaque projet mérite une attention particulière, alors notre vision s'étend au delà  de votre imagination 
            </TextAnimate>
          <p className="text-muted-foreground text-xl">
          
          </p>
        </motion.div>
        <motion.div
          className="mt-8 flex justify-center gap-3"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 3.5 }}
        >
          <Link className='cursor' href="/">
            <motion.button
              whileHover={{ scale: 1.05, translateX: 0.3 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-b from-black to-black/80 rounded-full text-sm text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset] pointer p-3 ">
              Réserver un appel
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
          <span className="text-sm text-gray-500">
            Nous sommes les sorciers du digital{' '}
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
