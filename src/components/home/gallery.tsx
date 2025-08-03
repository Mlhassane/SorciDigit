'use client';

import { Geist } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Spotlight } from '../ui/spotlight';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import WrapButtonDemo from '../ui/wrap-button';
import { Globe } from 'lucide-react';
import CardCaroursalDemo from './cardcarouseldemo';

const space = Geist({
  subsets: ['latin'],
  variable: '--font-carlito',
  weight: '400',
});

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id="trending"
      className="border-secondary/50 bg-background relative mb-32 min-h-screen overflow-hidden rounded-tl-3xl rounded-tr-3xl rounded-br-3xl rounded-bl-3xl border-t border-b pt-16 md:rounded-tl-[5rem] md:rounded-tr-[5rem] md:rounded-br-[5rem] md:rounded-bl-[5rem]"
    
    >
      <div className="absolute z-0 h-full w-full">
        {/* <Spotlight /> */}
      </div>
      <div className="absolute bottom-0 z-0 h-full w-full rotate-180">
        {/* <Spotlight /> */}
      </div>
   
      <div className="mx-auto px-2">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5, delay: 0 }}
          className="mx-auto max-w-[540px]"
        >
          <div className="flex justify-center">
            <button
              type="button"
              className="group bg-background/50 hover:shadow-primary/[0.1] dark:border-border relative z-[60] mx-auto rounded-full border border-zinc-500/80 px-6 py-1 text-xs backdrop-blur transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-100 md:text-sm"
            >
              <div className="via-primary absolute inset-x-0 -top-px mx-auto h-0.5 w-1/2 bg-gradient-to-r from-transparent to-transparent shadow-2xl transition-all duration-500 group-hover:w-3/4"></div>
              <div className="via-primary absolute inset-x-0 -bottom-px mx-auto h-0.5 w-1/2 bg-gradient-to-r from-transparent to-transparent shadow-2xl transition-all duration-500 group-hover:h-px"></div>
              <span className="relative">Gallerie</span>
            </button>
          </div>
          <h2
            className={cn(
              'from-foreground/60 via-foreground to-foreground/60 dark:from-muted-foreground/55 dark:via-foreground dark:to-muted-foreground/55 mt-5 bg-gradient-to-r bg-clip-text text-center text-4xl font-semibold tracking-tighter text-transparent md:text-[54px] md:leading-[60px]',
              space.className,
            )}
          >
            Quelques projets réalisés
          </h2>
          <p className="mt-5 text-center text-lg text-zinc-500">
           Decouvrez ici les projets sur lesquels notre équipe s'est donné corps et âme  pour realiser
          </p>
        </motion.div>
        <div className="mx-auto mt-10 w-full max-w-7xl rounded-[24px] p-2 shadow-sm md:rounded-t-[44px]">
          <CardCaroursalDemo />
        </div>
        <section className="relative z-50 my-10 mb-20 w-full">
          <div className="mt-20 flex flex-col items-center justify-center">
          
           
         
            <WrapButtonDemo className="mt-10" href="/docs/get-started">
              <Globe className="animate-spin" />
              Quelle est votre projet ?
            </WrapButtonDemo>
          </div>
        </section>
      </div>
    </section>
  );
}
