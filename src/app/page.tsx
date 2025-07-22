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

// export default function Home() {
//   return (
//     <>
//       {/* Hero Section */}
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7, delay: 0.2 }}
//         viewport={{ once: true }}
//         className="relative py-6 md:py-12 h-screen rounded-b-[64px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-white/90 via-gray-50 to-white"
//       >
//         {/* Animated Background Blobs */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <motion.div
//             className="absolute w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30"
//             animate={{
//               y: [0, 50, 0],
//               x: [0, -50, 0],
//               rotate: [0, 90, 0],
//               scale: [1, 1.2, 1]
//             }}
//             transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
//             style={{ top: '10%', left: '5%' }}
//           />
//           <motion.div
//             className="absolute w-80 h-80 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-30"
//             animate={{
//               y: [0, -60, 0],
//               x: [0, 60, 0],
//               rotate: [0, -90, 0],
//               scale: [1.2, 1, 1.2]
//             }}
//             transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
//             style={{ bottom: '10%', right: '5%' }}
//           />
//           <motion.div
//             className="absolute w-72 h-72 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-25"
//             animate={{
//               y: [0, 30, 0],
//               x: [0, -30, 0],
//               rotate: [0, 45, 0]
//             }}
//             transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
//             style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
//           />
//         </div>

//         {/* Main Content */}
//         <div className="flex flex-col items-center relative z-10 max-w-5xl mx-auto text-center px-4">
//           {/* Main Heading avec meilleure gestion responsive */}
//           <motion.h1
//             className="max-w-xl text-3xl md:text-5xl lg:text-7xl font-extrabold mb-6 text-black leading-tight"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.3 }}
//             viewport={{ once: true }}
//           >

//             <TextAnimate animation="blurInUp" as="h1" delay={2} className="text-6xl  font-extrabold dark:text-white text-center">
//               Propulsez votre présence digitale à un niveau
//             </TextAnimate>
//             <span className="serif-italic text-transparent  bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">inégalé
//             </span>

//           </motion.h1>

//           {/* Subtitle avec animation */}
//           <motion.p
//             className="max-w-xl  text-xs md:text-xs lg:text-xs georgia mb-12 text-gray-700"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.5 }}
//             viewport={{ once: true }}

//           >
//             <TextAnimate animation="blurInUp" as="h1" delay={2}>
//               Révolutionnez votre impact digital avec des stratégies créatives explosives, un design qui déchire et une visibilité web qui propulse votre marque au sommet

//             </TextAnimate>


//           </motion.p>

//           {/* CTA Buttons avec hover effects améliorés */}
//           <motion.div
//             className="flex flex-col sm:flex-row gap-4 justify-center"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.7 }}
//             viewport={{ once: true }}
//           >
//             <motion.button
//               className="bg-black text-white font-bold py-4 px-8 md:px-12 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               Réservez un appel
//             </motion.button>
//             <motion.button
//               className="bg-transparent border-2 border-black text-black font-bold py-4 px-8 md:px-12 rounded-full hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-105"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               Coaching gratuit
//             </motion.button>
//           </motion.div>

//           {/* Trust indicators / Social proof */}
       
//         </div>

//         {/* Scroll Indicator amélioré */}
//         <motion.div
//           className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
//           animate={{ y: [0, 10, 0] }}
//           transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//         >
//           <div className="w-6 h-10 border-2 border-black rounded-full flex justify-center">
//             <motion.div
//               className="w-1 h-3 bg-black rounded-full mt-2"
//               animate={{ opacity: [1, 0.3, 1] }}
//               transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//             />
//           </div>
//         </motion.div>

//         {/* Particules flottantes pour plus de dynamisme */}
//         <div className="absolute inset-0 pointer-events-none">
//           {[...Array(5)].map((_, i) => (
//             <motion.div
//               key={i}
//               className="absolute w-2 h-2 bg-white rounded-full opacity-30"
//               animate={{
//                 y: [0, -100, 0],
//                 x: [0, Math.random() * 100 - 50, 0],
//                 opacity: [0.3, 0.8, 0.3]
//               }}
//               transition={{
//                 duration: 6 + Math.random() * 4,
//                 repeat: Infinity,
//                 delay: Math.random() * 3,
//                 ease: "easeInOut"
//               }}
//               style={{
//                 top: `${Math.random() * 100}%`,
//                 left: `${Math.random() * 100}%`
//               }}
//             />
//           ))}
//         </div>
//       </motion.div>

//     </>
//   )
// }




export default function Home() 
{ 
  return ( 
    <div> 
      sorci digit
    </div>
  )
}