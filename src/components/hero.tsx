"use client"
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <> 
      {/* Hero Section  */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true }}
        className="relative py-6 md:py-12 h-screen rounded-b-[64px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black"
      >
        {/* Background Image with Better Overlay */}
        <div className="absolute h-screen inset-0 z-0">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-1/2 overflow-hidden">
            <img
              src="/1.png"
              alt="Professional Network"
              className="w-full h-full object-cover opacity-30 filter blur-md scale-110"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-gray-900/70 to-black/60" />
        </div>

        {/* Subtle Geometric Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 border border-white rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 border border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse delay-1000"></div>
        </div>

        {/* Floating Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <motion.div
            className="absolute w-96 h-96 bg-gradient-to-r from-white to-gray-300 rounded-full mix-blend-overlay filter blur-3xl"
            animate={{ y: [0, 50, 0], x: [0, -50, 0], rotate: [0, 90, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            style={{ top: '10%', left: '5%' }}
          />
          <motion.div
            className="absolute w-80 h-80 bg-gradient-to-r from-gray-300 to-white rounded-full mix-blend-overlay filter blur-3xl"
            animate={{ y: [0, -60, 0], x: [0, 60, 0], rotate: [0, -90, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            style={{ bottom: '10%', right: '5%' }}
          />
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center relative z-10 max-w-4xl mx-auto text-center px-4">
        {/* Logo with Half-Visibility Effect - Positioned at Top */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="relative w-32 h-16 mx-auto overflow-hidden">
            {/* Half Logo Circle with Blur Effect */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full bg-gradient-to-b from-white via-gray-200 to-transparent border-2 border-white/20 backdrop-blur-md filter blur-sm">
              <div className="absolute inset-2 rounded-full bg-gradient-to-b from-black via-gray-800 to-transparent flex items-center justify-center">
                <span className="text-white font-bold text-2xl opacity-60">L</span>
              </div>
            </div>
            {/* Additional Blur Layer */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full bg-white/5 blur-xl animate-pulse"></div>
          </div>
        </motion.div>

          {/* Main Heading with Better Typography */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-3xl md:text-6xl lg:text-8xl font-bold mb-6 text-white leading-tight tracking-tight"
          >
            Automatisez votre croissance{' '}
            <br className="hidden md:block" />
            <span className="italic bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
              digitale
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-lg md:text-xl lg:text-2xl font-light mb-12 text-gray-300 max-w-3xl leading-relaxed"
          >
            Transformez vos prospects en clients fidèles grâce à nos stratégies d'automatisation avancées.
            <br className="hidden md:block" />
            <span className="text-white font-medium">Votre succès digital commence ici.</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-col md:flex-row gap-6 justify-center"
          >
            <button className="group relative bg-white text-black font-bold py-5 px-8 md:px-12 rounded-full shadow-2xl hover:shadow-white/20 transform hover:scale-105 transition-all duration-300 overflow-hidden">
              <span className="relative z-10">Automatisez votre marketing</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button className="group relative bg-transparent border-2 border-white text-white font-bold py-5 px-8 md:px-12 rounded-full hover:bg-white hover:text-black transform hover:scale-105 transition-all duration-300 backdrop-blur-sm">
              <span className="relative z-10">Audit digital gratuit</span>
            </button>
          </motion.div>

         
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center backdrop-blur-sm">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}