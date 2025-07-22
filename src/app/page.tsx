// // "use client"
// // import React from 'react';
// // import { motion } from 'framer-motion';

// // export default function Home() {
// //   // Variants pour l'animation du titre
// //   const titleVariants = {
// //     hidden: { opacity: 0, y: 20 },
// //     visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
// //   };

// //   // Variants pour l'animation du scroll indicator
// //   const scrollIndicatorVariants = {
// //     pulse: {
// //       scale: [1, 1.2, 1],
// //       y: [0, 5, 0],
// //       transition: { repeat: Infinity, duration: 1.5, ease: 'easeInOut' },
// //     },
// //   };

// //   return (
// //     <>
// //       <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-900 flex flex-col items-center justify-center relative overflow-hidden">
// //         <motion.div
// //           className="absolute w-64 h-64 bg-blue-400 rounded-full filter blur-3xl opacity-40 z-[-1]"
// //           style={{ top: '10%', left: '20%' }}
// //           animate={{
// //             scale: [1, 1.2, 1],
// //             x: [0, 50, 0],
// //             y: [0, 30, 0],
// //           }}
// //           transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
// //         />
// //         <motion.div
// //           className="absolute w-96 h-96 bg-purple-400 rounded-full filter blur-3xl opacity-40 z-[-1]"
// //           style={{ bottom: '15%', right: '15%' }}
// //           animate={{
// //             scale: [1, 1.3, 1],
// //             x: [0, -40, 0],
// //             y: [0, 20, 0],
// //           }}
// //           transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
// //         />

// //         <motion.h1
// //           className=" max-w-xl text-2xl md:text-5xl lg:text-7xl font-georgia font-bold mb-6 text-black dark:text-white drop-shadow-2xl leading-tight text-center px-4"
// //           variants={titleVariants}
// //           initial="hidden"
// //           animate="visible"
// //         >
// //           Propulsez votre présence digitale à un niveau totalement{' '}
// //           <span className="serif italic">inégalé</span>
// //         </motion.h1>
// //       {/* Sous-titre */}
// //       <motion.p
// //         className="max-w-xl text-lg md:text-xl font-georgia text-gray-700 dark:text-gray-200 mb-8 text-center px-4 max-w-2xl"
// //         initial={{ opacity: 0, y: 20 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 0.8, delay: 0.2 }}
// //       >
// //       Révolutionnez votre impact digital avec des stratégies créatives explosives, un design qui déchire et une visibilité web qui propulse votre marque au sommet
// //       </motion.p>
// //        {/* Boutons CTA */}
// //        <motion.div
// //         className="flex flex-col md:flex-row gap-4 mb-12"
// //         initial={{ opacity: 0, y: 20 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 0.8, delay: 0.4 }}
// //       >
// //         <button className="px-6 py-3 bg-blue-600 text-white font-georgia rounded-full hover:bg-blue-700 transition-colors duration-300">
// //           Découvrir nos services
// //         </button>
// //         <button className="px-6 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-300 dark:border-blue-300 font-georgia rounded-full hover:bg-blue-600 hover:text-white dark:hover:bg-blue-300 dark:hover:text-gray-900 transition-colors duration-300">
// //           Nous contacter
// //         </button>
// //       </motion.div>

// //       {/* Scroll Indicator */}
// //       <motion.div
// //         className="w-6 h-10 border-2 border-gray-800 dark:border-gray-200 rounded-full flex justify-center"
// //         initial={{ opacity: 0 }}
// //         animate={{ opacity: 1 }}
// //         transition={{ duration: 0.8, delay: 0.6 }}
// //       >
// //         <motion.div
// //           className="w-1 h-3 bg-gray-800 dark:bg-gray-200 rounded-full mt-2"
// //           variants={scrollIndicatorVariants}
// //           animate="pulse"
// //         />
// //       </motion.div>
// //       </div>
// //     </>
// //   );
// // };



// // app/page.tsx
// "use client"
// import { TextAnimate } from '@/components/magicui/text-animate';
// import { AnimatePresence, motion } from 'framer-motion';



"use client"
import { TextAnimate } from '@/components/magicui/text-animate';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link'
import ShowcaseSection from '@/components/showcase-section';
export default function Home() { 

  
  /* Nouvelle Section Portfolio - Scroll Horizontal */
  const projectsRef = useRef(null);
  const [currentProject, setCurrentProject] = useState(0);

  const projects = [
    {
      id: 1,
      title: "Révolution E-commerce",
      client: "TechStyle Fashion",
      description: "Transformation complète d'une boutique en ligne avec augmentation de 300% des conversions.",
      technologies: ["React", "Node.js", "Stripe"],
      image: "🛒"
    },
    {
      id: 2,
      title: "Application Mobile",
      client: "StartUp Innovante",
      description: "App mobile native avec fonctionnalités AI pour 50K+ utilisateurs actifs.",
      technologies: ["React Native", "Python", "TensorFlow"],
      image: "📱"
    },
    {
      id: 3,
      title: "Plateforme SaaS",
      client: "Enterprise Solutions",
      description: "Plateforme B2B complète avec dashboard analytique et intégrations API.",
      technologies: ["Vue.js", "Laravel", "PostgreSQL"],
      image: "💻"
    },
    {
      id: 4,
      title: "Marketplace Innovante",
      client: "GreenTech Corp",
      description: "Marketplace écologique avec système de matching intelligent.",
      technologies: ["Next.js", "GraphQL", "Prisma"],
      image: "🌱"
    }
  ];

  const handleScroll = (e: { deltaY: number; }) => {
    if (e.deltaY > 0) {
      setCurrentProject(prev => Math.min(prev + 1, projects.length - 1));
    } else {
      setCurrentProject(prev => Math.max(prev - 1, 0));
    }
  }; 
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const words = "Transformez votre présence numérique avec puissance et magie".split(" ");
  const descriptionWords = "Vous avez un rêve, une ambition, un projet ou un tout autre délire Nous art ne se limite à rien.".split(" ");


  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true }}
        className="relative py-6 md:py-12 h-screen rounded-b-[64px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-white/90 via-gray-50 to-white"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30"
            animate={{
              y: [0, 50, 0],
              x: [0, -50, 0],
              rotate: [0, 90, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            style={{ top: '10%', left: '5%' }}
          />
          <motion.div
            className="absolute w-80 h-80 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-30"
            animate={{
              y: [0, -60, 0],
              x: [0, 60, 0],
              rotate: [0, -90, 0],
              scale: [1.2, 1, 1.2]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            style={{ bottom: '10%', right: '5%' }}
          />
          <motion.div
            className="absolute w-72 h-72 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-25"
            animate={{
              y: [0, 30, 0],
              x: [0, -30, 0],
              rotate: [0, 45, 0]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          />
        </div>
        <div className="flex flex-col items-center relative z-10 max-w-5xl mx-auto text-center px-4">
          {/* Main Heading avec meilleure gestion responsive */}
          <motion.h1
            className="max-w-xl text-3xl md:text-5xl lg:text-7xl font-extrabold mb-6 text-black leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >

            <h1  className="text-6xl  font-extrabold dark:text-white text-center">
              Propulsez votre présence digitale à un niveau
            </h1>
            <span className="serif-italic text-transparent  bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">inégalé
            </span>

          </motion.h1>

          {/* Subtitle avec animation */}
          <motion.p
            className="max-w-xl  text-xl md:text-xs lg:text-xl georgia mb-12 text-gray-700"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}

          >
            <span className='text-lg max-w-xl'>
              Révolutionnez votre impact digital avec des stratégies créatives explosives, un design qui déchire et une visibilité web qui propulse votre marque au sommet

            </span>


          </motion.p>

          {/* CTA Buttons avec hover effects améliorés */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="bg-black text-white font-bold py-4 px-8 md:px-12 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Réservez un appel
            </motion.button>
            <motion.button
              className="bg-transparent border-2 border-black text-black font-bold py-4 px-8 md:px-12 rounded-full hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Coaching gratuit
            </motion.button>
          </motion.div>

          {/* Trust indicators / Social proof */}

        </div> 
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 border-2 border-black rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-black rounded-full mt-2"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>

        {/* Particules flottantes pour plus de dynamisme */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-30"
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 100 - 50, 0],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut"
              }}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>

      </motion.div> 

      <section className="px-6 py-20 max-w-6xl mx-auto">
        <div
          className="transition-all duration-1000 delay-1400 translate-y-0 opacity-100"
        >
          {/* Services Header */}
          <div className="flex items-center gap-4 mb-12">
            <div className="w-8 h-8 border-2 border-black rounded-full flex items-center justify-center animate-breathe">
              <div className="w-2 h-2 bg-black rounded-full animate-pulse-dot"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-black">Services</h2>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-auto">
            {/* Ultra Design Card */}
            <div className="lg:row-span-2 bg-black rounded-3xl p-8 flex flex-col justify-center items-center text-white min-h-[300px] lg:min-h-[400px] group hover:scale-105 transition-all duration-500 hover:shadow-2xl cursor-pointer">
              <div className="text-center">
                <h3 className="text-6xl md:text-7xl font-light mb-4 group-hover:scale-110 transition-transform duration-300">
                  B D
                </h3>
                <p className="text-xl opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  Branding Design
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Secure Payment Card */}
            <div className="bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 rounded-3xl p-6 text-white min-h-[180px] group hover:scale-105 transition-all duration-500 hover:shadow-2xl cursor-pointer">
              <h3 className="text-xl font-semibold mb-6 group-hover:scale-105 transition-transform duration-300">
                Commuication Digital 
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse-dot"></div>
                  </div>
                  <div className="w-12 h-6 bg-white/30 rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 animate-float"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse-dot"></div>
                  </div>
                  <div className="w-12 h-6 bg-white/30 rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 animate-float-delayed"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* iOS App Card */}
            <div className="bg-black rounded-3xl p-6 text-white min-h-[180px] flex flex-col justify-center items-center group hover:scale-105 transition-all duration-500 hover:shadow-2xl cursor-pointer">
              <div className="text-center">
                <h3 className="text-3xl font-light mb-2 group-hover:scale-110 transition-transform duration-300">
                  Developppement web
                </h3>
                <p className="text-lg opacity-80 group-hover:opacity-100 transition-opacity duration-300">& Mobile</p>
                <div className="w-12 h-1 bg-white mx-auto mt-4 group-hover:w-16 transition-all duration-300"></div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-gray-600/20 to-gray-400/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Website Card */}
            <div className="lg:col-span-2 bg-black rounded-3xl p-8 text-white min-h-[200px] flex items-center justify-center group hover:scale-105 transition-all duration-500 hover:shadow-2xl cursor-pointer">
              <h3 className="text-4xl md:text-5xl font-light group-hover:scale-110 transition-transform duration-300">
                Conseils & Audits
              </h3>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
        </div>
      </section> 
     
      <section 
        ref={projectsRef}
        className="relative h-screen w-full flex items-center justify-center overflow-hidden"
        onWheel={handleScroll}
      >
        {/* <div className="relative h-[80vh] w-[80vw] mx-auto sti">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`absolute inset-0 flex flex-col items-center justify-center p-12 rounded-3xl border border-gray-700/30 backdrop-blur-sm transition-all duration-500 ${
                currentProject === index ? 'z-10 opacity-100' : 'z-0 opacity-0'
              }`}
              style={{
                background: `linear-gradient(135deg, rgba(30, 30, 40, 0.8) 0%, rgba(10, 10, 20, 0.9) 100%)`
              }}
            >
              <motion.div 
                className="text-9xl mb-8"
                animate={{ 
                  y: currentProject === index ? 0 : 100,
                  opacity: currentProject === index ? 1 : 0
                }}
                transition={{ duration: 0.6 }}
              >
                {project.image}
              </motion.div>
              
              <motion.div
                className="text-center max-w-2xl"
                animate={{ 
                  y: currentProject === index ? 0 : 50,
                  opacity: currentProject === index ? 1 : 0
                }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h3 className="text-4xl font-bold text-white mb-4">{project.title}</h3>
                <p className="text-lg text-gray-300 mb-6">{project.description}</p>
                <div className="flex justify-center gap-3 mb-8">
                  {project.technologies.map(tech => (
                    <span key={tech} className="px-4 py-2 bg-white/10 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="text-gray-400 italic">Client: {project.client}</p>
              </motion.div>

              <motion.div 
                className="absolute bottom-8 left-0 right-0 flex justify-center gap-2"
                animate={{ opacity: currentProject === index ? 1 : 0 }}
              >
                {projects.map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => setCurrentProject(i)}
                    className={`w-3 h-3 rounded-full transition-all ${i === currentProject ? 'bg-white w-6' : 'bg-white/30'}`}
                  />
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div> */}
      </section> 
 

       

         
         </>
  )
}