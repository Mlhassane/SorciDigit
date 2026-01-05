// components/home/features.tsx
import { useState, useEffect, useRef } from 'react';

const ServicesSection = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Animation pour le point qui "respire"
  useEffect(() => {
    const animateBreathe = () => {
      const dot = document.querySelector('.breathe-dot');
      if (dot) {
        const animation = dot.animate(
          [
            { transform: 'scale(1)', opacity: 0.7 },
            { transform: 'scale(1.2)', opacity: 1 },
            { transform: 'scale(1)', opacity: 0.7 }
          ],
          {
            duration: 2000,
            iterations: Infinity
          }
        );
        return () => animation.cancel();
      }
    };
    
    animateBreathe();
  }, []);

  // Observer pour l'animation d'entrée
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="px-6 py-20 max-w-6xl mx-auto relative overflow-hidden"
    >
      {/* Éléments décoratifs flottants */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      
      <div 
        className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
      >
        {/* Services Header */}
        <div className="flex items-center gap-4 mb-12 relative z-10">
          <div className="w-8 h-8 border-2 border-black rounded-full flex items-center justify-center animate-bounce">
            <div className="w-2 h-2 bg-black rounded-full breathe-dot"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-black">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 animate-text-gradient">
              Services
            </span>
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-auto relative z-10">
          {/* Branding Design Card */}
          <div 
            className="lg:row-span-2 bg-black rounded-3xl p-8 flex flex-col justify-center items-center text-white min-h-[300px] lg:min-h-[400px] group hover:scale-[1.02] transition-transform duration-500 hover:shadow-2xl cursor-pointer relative overflow-hidden"
            onMouseEnter={() => setActiveCard('branding')}
            onMouseLeave={() => setActiveCard(null)}
          >
            <div className="text-center z-10 relative">
              <h3 className="text-6xl md:text-7xl font-light mb-4 group-hover:scale-110 transition-transform duration-300">
                B D
              </h3>
              <p className="text-xl opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                Branding Design
              </p>
            </div>
            
            {/* Animated particles */}
            {activeCard === 'branding' && (
              <>
                {[...Array(25)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute rounded-full animate-particles"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      width: `${Math.random() * 10 + 2}px`,
                      height: `${Math.random() * 10 + 2}px`,
                      backgroundColor: ['#ec4899', '#a855f7', '#f472b6', '#f59e0b'][Math.floor(Math.random() * 4)],
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </>
            )}
            
            {/* Animated shapes */}
            <div className="absolute top-4 left-4 w-12 h-12 border-2 border-purple-500 rounded-full opacity-10 group-hover:opacity-30 transition-opacity duration-500 animate-spin-slow"></div>
            <div className="absolute bottom-4 right-4 w-16 h-16 border-2 border-pink-500 rounded-lg opacity-10 group-hover:opacity-30 transition-opacity duration-500 animate-spin-slow-reverse"></div>
            
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Floating text */}
            <div className="absolute bottom-6 left-0 right-0 text-center opacity-0 group-hover:opacity-70 transition-opacity duration-500 text-sm">
              Identité visuelle • Logos • Charte graphique
            </div>
          </div>

          {/* Communication Digital Card */}
          <div 
            className="bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 rounded-3xl p-6 text-white min-h-[180px] group hover:scale-[1.02] transition-transform duration-500 hover:shadow-2xl cursor-pointer relative overflow-hidden"
            onMouseEnter={() => setActiveCard('communication')}
            onMouseLeave={() => setActiveCard(null)}
          >
            <h3 className="text-xl font-semibold mb-6 group-hover:scale-105 transition-transform duration-300 flex items-center">
              <span className="mr-2 animate-pulse">📱</span>
              Communication Digital 
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center group-hover:bg-blue-400/30 transition-colors">
                  <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                </div>
                <div className="w-12 h-6 bg-white/30 rounded-full relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 animate-pulse"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center group-hover:bg-blue-400/30 transition-colors">
                  <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                </div>
                <div className="w-12 h-6 bg-white/30 rounded-full relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                </div>
              </div>
            </div>
            
            {/* Animated social icons */}
            {activeCard === 'communication' && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="flex flex-wrap justify-center gap-4">
                  {['facebook', 'twitter', 'instagram', 'linkedin', 'tiktok', 'youtube'].map((platform, i) => (
                    <div 
                      key={platform}
                      className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-xl animate-float"
                      style={{ 
                        animationDelay: `${i * 0.1}s`,
                        boxShadow: '0 0 15px rgba(255,255,255,0.3)'
                      }}
                    >
                      <span className="font-bold">{platform.charAt(0).toUpperCase()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Wave animation */}
            <div className="absolute bottom-0 left-0 right-0 h-8 overflow-hidden opacity-30 group-hover:opacity-70 transition-opacity duration-500">
              <div className="absolute bottom-0 left-0 w-200% h-full bg-wave-pattern animate-wave"></div>
            </div>
          </div>

          {/* Web & Mobile Development Card */}
          <div 
            className="bg-black rounded-3xl p-6 text-white min-h-[180px] flex flex-col justify-center items-center group hover:scale-[1.02] transition-transform duration-500 hover:shadow-2xl cursor-pointer relative"
            onMouseEnter={() => setActiveCard('dev')}
            onMouseLeave={() => setActiveCard(null)}
          >
            <div className="text-center z-10">
              <h3 className="text-3xl font-light mb-2 group-hover:scale-110 transition-transform duration-300">
                Développement web
              </h3>
              <p className="text-lg opacity-80 group-hover:opacity-100 transition-opacity duration-300">& Mobile</p>
              <div className="w-12 h-1 bg-white mx-auto mt-4 group-hover:w-16 transition-all duration-300"></div>
            </div>
            
            {/* Animated device icons */}
            {activeCard === 'dev' && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="flex space-x-6">
                  <div className="animate-float">
                    <div className="w-10 h-16 bg-gray-800 rounded-lg border border-gray-600 relative">
                      <div className="w-1 h-1 bg-gray-400 rounded-full absolute top-2 left-2"></div>
                      <div className="absolute inset-1 bg-gray-900 rounded flex items-center justify-center">
                        <div className="text-xs text-green-400 font-mono animate-code-pulse">
                          &lt;code/&gt;
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="animate-float" style={{ animationDelay: '0.3s' }}>
                    <div className="w-16 h-10 bg-gray-800 rounded-xl border border-gray-600 relative">
                      <div className="w-1 h-1 bg-gray-400 rounded-full absolute top-2 right-2"></div>
                      <div className="absolute inset-1 bg-gray-900 rounded flex items-center justify-center">
                        <div className="text-xs text-blue-400 font-mono animate-code-pulse" style={{animationDelay: '0.5s'}}>
                          {`{ ... }`}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Animated code lines */}
            <div className="absolute top-4 right-4 text-xs opacity-20 group-hover:opacity-50 transition-opacity">
              <div className="font-mono animate-code-scroll">
                <div>function animate() {'{'}</div>
                <div className="ml-4">return requestAnimationFrame(animate);</div>
                <div>{'}'}</div>
                <div className="mt-2">const app = new App();</div>
                <div>app.init();</div>
              </div>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-br from-gray-600/20 to-gray-400/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          {/* Conseils & Audits Card */}
          <div 
            className="lg:col-span-2 bg-black rounded-3xl p-8 text-white min-h-[200px] flex items-center justify-center group hover:scale-[1.02] transition-transform duration-500 hover:shadow-2xl cursor-pointer relative overflow-hidden"
            onMouseEnter={() => setActiveCard('audit')}
            onMouseLeave={() => setActiveCard(null)}
          >
            <h3 className="text-4xl md:text-5xl font-light group-hover:scale-110 transition-transform duration-300 relative z-10">
              Conseils & Audits
            </h3>
            
            {/* Animated chart */}
            {activeCard === 'audit' && (
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center space-x-1 pb-4 px-4">
                {[40, 60, 80, 60, 40, 70, 90].map((height, i) => (
                  <div 
                    key={i}
                    className="w-4 bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-md relative overflow-hidden"
                    style={{ height: `${height}%` }}
                  >
                    <div className="absolute inset-0 animate-grow bg-gradient-to-t from-purple-300/30 to-pink-300/30"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    ></div>
                    <div className="absolute -bottom-4 left-0 right-0 text-center text-xs text-white/70">
                      {['Q1', 'Q2', 'Q3', 'Q4', 'Q1', 'Q2', 'Q3'][i]}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Animated circles */}
            <div className="absolute top-1/4 left-1/4 w-16 h-16 border-2 border-purple-500/30 rounded-full animate-ping-slow"></div>
            <div className="absolute bottom-1/3 right-1/3 w-12 h-12 border-2 border-pink-500/30 rounded-full animate-ping-slow" style={{animationDelay: '0.5s'}}></div>
            
            {/* Action button */}
            <button className="absolute bottom-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white text-black px-6 py-2 rounded-full font-medium shadow-lg hover:bg-gray-100 hover:scale-105 transition-all glow-effect">
              Demander un audit <span className="ml-2">→</span>
            </button>
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes particles {
          0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-150px) translateX(${Math.random() * 100 - 50}px) rotate(${Math.random() * 360}deg); opacity: 0; }
        }
        
        @keyframes grow {
          0% { height: 0; }
          100% { height: 100%; }
        }
        
        @keyframes text-gradient {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes spin-slow-reverse {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
        
        @keyframes wave {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        @keyframes code-scroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        
        @keyframes code-pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.2); opacity: 0.15; }
        }
        
        @keyframes ping-slow {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-particles {
          animation: particles 3s ease-out forwards;
        }
        
        .animate-grow {
          animation: grow 0.8s ease-out forwards;
        }
        
        .animate-text-gradient {
          background-size: 300% 300%;
          animation: text-gradient 6s ease infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 25s linear infinite;
        }
        
        .animate-wave {
          animation: wave 8s linear infinite;
        }
        
        .animate-code-scroll {
          animation: code-scroll 10s linear infinite;
        }
        
        .animate-code-pulse {
          animation: code-pulse 2s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0,0,0.2,1) infinite;
        }
        
        .bg-wave-pattern {
          background: 
            linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent),
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(173, 216, 230, 0.1) 10px,
              rgba(173, 216, 230, 0.1) 20px
            );
        }
        
        .glow-effect {
          box-shadow: 0 0 15px rgba(192, 132, 252, 0.7);
        }
      `}</style>
    </section>
  );
};

export default ServicesSection;