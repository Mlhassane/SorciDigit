'use client';
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Geist } from 'next/font/google';
import { cn } from '@/lib/utils';

const space = Geist({
  subsets: ['latin'],
  variable: '--font-carlito',
  weight: '400',
});

const testimonials = [
  {
    text: "Sorci Digit a transformé notre vision en une application mobile fluide. L'équipe est très réactive et professionnelle.",
    imageSrc: '/assets/avatars/avatar-1.webp',
    name: 'Amadou Diallo',
    username: '@amadou_d',
  },
  {
    text: "Le nouveau site e-commerce a fait exploser nos ventes. Un design parfait et une expérience utilisateur au top.",
    imageSrc: '/assets/avatars/avatar-2.webp',
    name: 'Sophie Konaté',
    username: '@sophie_k',
  },
  {
    text: "Une véritable expertise technique doublée d'un sens aigu du design. C'est l'agence qu'il vous faut.",
    imageSrc: '/assets/avatars/avatar-3.webp',
    name: 'Karim S.',
    username: '@karim_tech',
  },
  {
    text: "Ils ont su comprendre nos besoins et livrer une plateforme B2B robuste et moderne. Bravo à l'équipe !",
    imageSrc: '/assets/avatar-2.webp',
    name: 'Marie T.',
    username: '@marie_pro',
  },
  {
    text: "Notre branding n'a jamais été aussi fort. L'identité visuelle créée par Sorci Digit est incroyable.",
    imageSrc: '/assets/avatars/avatar-5.webp',
    name: 'Léo M.',
    username: '@leo_create',
  },
  {
    text: "La digitalisation de nos processus métiers nous a fait gagner un temps précieux. Un investissement très rentable.",
    imageSrc: '/assets/avatars/avatar-6.webp',
    name: 'Fatou Diagne',
    username: '@fatou_d',
  },
  {
    text: "Un accompagnement au top du début à la fin. L'équipe est à l'écoute et propose toujours les meilleures solutions.",
    imageSrc: '/assets/avatars/avatar-7.webp',
    name: 'Ayaan M.',
    username: '@ayaan_m',
  },
  {
    text: "Leur approche orientée données a considérablement amélioré notre taux de conversion. Merci Sorci Digit !",
    imageSrc: '/assets/avatar-5.webp',
    name: 'Sarah R.',
    username: '@sarah_r',
  },
  {
    text: "Délais respectés, qualité exceptionnelle et communication transparente. Je recommande vivement.",
    imageSrc: '/assets/avatars/avatar-9.webp',
    name: 'Jean P.',
    username: '@jean_p',
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const TestimonialsColumn = (props: {
  className?: string;
  testimonials: typeof testimonials;
  duration?: number;
}) => (
  <div className={props.className}>
    <motion.div
      animate={{
        translateY: '-50%',
      }}
      transition={{
        duration: props.duration || 10,
        repeat: Infinity,
        ease: 'linear',
        repeatType: 'loop',
      }}
      className="flex flex-col gap-6"
    >
      {[
        ...new Array(2).fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, imageSrc, name, username }) => (
              <div
                key={text}
                className="border-border from-secondary/10 to-card relative w-full max-w-xs overflow-hidden rounded-3xl border bg-gradient-to-b p-10 shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)_inset]"
              >
                {/* rose color gradient */}
                <div className="from-primary/10 to-card absolute -top-5 -left-5 -z-10 h-40 w-40 rounded-full bg-gradient-to-b blur-md" />
                <div className="grotesk">{text}</div>
                <div className="mt-5 flex items-center gap-2">
                  <img
                    src={imageSrc}
                    alt={name}
                    height={40}
                    width={40}
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="flex flex-col">
                    <div className="leading-5 font-medium tracking-tight grotesk">
                      {name}
                    </div>
                    <div className="leading-5 tracking-tight grotesk text-zinc-500">{username}</div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        )),
      ]}
    </motion.div>
  </div>
);

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const handleShareClick = () => {
    const tweets = require('@/lib/tweet-contents').tweetContents;
    const randomTweet = tweets[Math.floor(Math.random() * tweets.length)];
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(randomTweet)}`,
      '_blank',
    );
  };

  return (
    <section id="reviews" className="bg-background mb-24">
      <div className="mx-auto max-w-7xl">
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
              <span className="relative">Témoignages</span>
            </button>
          </div>
          <h2
            className={cn(
              'from-foreground/60 via-foreground to-foreground/60 dark:from-muted-foreground/55 dark:via-foreground dark:to-muted-foreground/55 mt-5 bg-gradient-to-r bg-clip-text text-center text-4xl font-semibold tracking-tighter text-transparent md:text-[54px] md:leading-[60px] serif italic',
            )}
          >
            Ce que disent nos clients
          </h2>
          <p className="mt-5 text-center text-lg text-zinc-500 grotesk">
            Chaque projet est une collaboration unique. Voici les retours de ceux qui nous ont fait confiance.
          </p>
        </motion.div>
        <div className="my-16 flex max-h-[738px] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
