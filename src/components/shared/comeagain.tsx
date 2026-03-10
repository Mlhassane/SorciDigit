'use client';

import { cn } from '@/lib/utils';
import { AnimationPlaybackControls, motion, useAnimate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Bricolage_Grotesque } from 'next/font/google';

const space = Bricolage_Grotesque({
  subsets: ['latin'],
});

export default function EndSlider() {
  const animation = useRef<AnimationPlaybackControls | null>(null);
  const [scope, animate] = useAnimate();

  const [slowDownAnimation, setSlowDownAnimation] = useState(false);

  useEffect(() => {
    animation.current = animate(
      scope.current,
      { x: '-50%' },
      { duration: 30, ease: 'linear', repeat: Infinity },
    );
  }, []);

  useEffect(() => {
    if (animation.current) {
      if (slowDownAnimation) {
        animation.current.speed = 0.5;
      } else {
        animation.current.speed = 1;
      }
    }
  }, [slowDownAnimation]);

  return (
    <section className="pb-10">
      <div className="flex overflow-x-clip p-4">
        <motion.div
          ref={scope}
          className="flex flex-none gap-16 pr-16 text-7xl font-medium md:text-8xl"
          onMouseEnter={() => setSlowDownAnimation(true)}
          onMouseLeave={() => setSlowDownAnimation(false)}
        >
          {[
            { step: "1", title: "Audit & Stratégie" },
            { step: "2", title: "Création & Développement" },
            { step: "3", title: "Lancement & Croissance" },
            { step: "1", title: "Audit & Stratégie" },
            { step: "2", title: "Création & Développement" },
            { step: "3", title: "Lancement & Croissance" },
          ].map((item, index) => (
            <div
              key={index}
              className={cn(
                'from-foreground/60 via-foreground to-foreground/60 dark:from-muted-foreground/55 dark:via-foreground dark:to-muted-foreground/55 flex items-center gap-4 bg-gradient-to-r bg-clip-text text-center font-semibold text-transparent whitespace-nowrap',
                space.className,
              )}
            >
              <span className="text-4xl text-black/20 mr-2 serif italic">{item.step}.</span>
              <span className={cn('grotesk', slowDownAnimation && 'text-primary')}>
                {item.title}
              </span>
              <span className="mx-8 text-black/10">✦</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
