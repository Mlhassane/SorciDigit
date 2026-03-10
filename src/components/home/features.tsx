// components/home/features.tsx
'use client';

import { motion } from 'framer-motion';
import { 
  Palette as PaletteIcon, 
  Share2 as ShareIcon, 
  Code2 as CodeIcon, 
  LineChart as ChartIcon,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { Geist } from 'next/font/google';
import { cn } from '@/lib/utils';

const space = Geist({
  subsets: ['latin'],
  variable: '--font-carlito',
  weight: '700',
});

const ServicesSection = () => {
  return (
    <section className="py-20 px-4 md:px-6 bg-white overflow-hidden" id="services">
      <div className="max-w-6xl mx-auto grotesk">
        
        {/* Mobile-First Header: Centered on mobile, aligned left on desktop */}
        <div className="flex flex-col mb-12 md:mb-20 text-center md:text-left">
           <motion.span 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-gray-400 uppercase mb-4 grotesk"
           >
             Notre Expertise
           </motion.span>
           <h2 className="text-5xl md:text-8xl font-medium text-black tracking-tight mb-6 serif italic leading-[0.9]">
             Services
           </h2>
           <p className="text-gray-400 text-lg md:text-2xl max-w-2xl leading-relaxed mx-auto md:mx-0 grotesk">
             Solutions digitales <span className="text-black font-bold">hautes performances</span> pour entrepreneurs ambitieux.
           </p>
        </div>

        {/* Bento Grid: Optimized for single column on mobile, complex layout on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 md:gap-6">
          
          {/* Branding Card - Tall on Desktop */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-3 lg:col-span-4 lg:row-span-2 bg-[#f9f9f9] rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-12 flex flex-col justify-between border border-gray-100 group transition-all duration-500 hover:bg-white hover:shadow-[0_20px_60px_rgba(0,0,0,0.05)] cursor-pointer"
          >
            <div>
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border border-gray-100 shadow-sm mb-10 group-hover:scale-110 transition-transform">
                <PaletteIcon className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-black mb-4">Branding</h3>
              <p className="text-gray-500 leading-relaxed text-base md:text-lg">
                Identité visuelle haute définition qui marque les esprits dès le premier regard.
              </p>
            </div>
            
            <div className="space-y-4 mt-8 pt-8 border-t border-gray-200/50">
              {["Logos & Charte", "Brand Book", "Identité Visuelle"].map((item) => (
                <div key={item} className="flex items-center gap-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <CheckCircle2 className="w-4 h-4 text-black" /> {item}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Development Card - High impact Square/Rect */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="md:col-span-3 lg:col-span-8 bg-black rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 group transition-all duration-500 cursor-pointer overflow-hidden relative"
          >
            <div className="relative z-10 text-center md:text-left">
              <div className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-4">TECH & CODE</div>
              <h3 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Web & Mobile</h3>
              <p className="text-gray-400 text-base md:text-lg max-w-sm">
                Sites vitrines, E-commerce et Applications web sur mesure.
              </p>
            </div>
            <div className="relative z-10">
               <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform">
                 <CodeIcon className="w-8 h-8 text-white" />
               </div>
            </div>
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
          </motion.div>

          {/* Communication Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="md:col-span-3 lg:col-span-4 bg-[#f9f9f9] rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-10 border border-gray-100 group transition-all duration-500 hover:bg-white hover:shadow-[0_20px_60px_rgba(0,0,0,0.05)] cursor-pointer"
          >
            <div className="flex justify-between items-start mb-10">
              <ShareIcon className="w-8 h-8 text-black opacity-20 group-hover:opacity-100 transition-opacity" />
              <ArrowRight className="w-6 h-6 text-gray-300 group-hover:text-black group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-black mb-3">Communication</h3>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              Engagez votre communauté et transformez vos abonnés en clients.
            </p>
          </motion.div>

          {/* Audit Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="md:col-span-3 lg:col-span-4 bg-[#f9f9f9] rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-10 border border-gray-100 group transition-all duration-500 hover:bg-white hover:shadow-[0_20px_60px_rgba(0,0,0,0.05)] cursor-pointer"
          >
            <div className="flex justify-between items-start mb-10">
              <ChartIcon className="w-8 h-8 text-black opacity-20 group-hover:opacity-100 transition-opacity" />
              <div className="w-2 h-2 bg-black rounded-full animate-ping"></div>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-black mb-3">Audits & SEO</h3>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              Optimisez vos performances avec nos analyses stratégiques expertes.
            </p>
          </motion.div>

        </div>

        {/* Mobile-Friendly Bottom Quote */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 flex flex-col items-center px-4"
        >
           <div className="w-12 h-1 bg-black/5 rounded-full mb-12"></div>
           <div className="flex flex-col md:flex-row items-center gap-6 max-w-3xl">
              <div className="w-16 h-16 rounded-[1.5rem] overflow-hidden border-2 border-gray-50 shadow-sm flex-shrink-0">
                 <img src="/1.png" alt="Sorci Digit" className="w-full h-full object-contain p-2" />
              </div>
              <p className="text-gray-600 font-medium leading-relaxed text-xl md:text-2xl serif italic text-center md:text-left">
                " Chaque projet est une nouvelle aventure. Bientôt, réservez vos services <span className="text-black font-bold not-italic serif">directement depuis votre smartphone</span>. "
              </p>
           </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ServicesSection;