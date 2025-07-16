'use client'
import React, { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownLaunchPage = () => {
  // Date de lancement - modifiez cette date selon vos besoins
  const launchDate = new Date('2025-06-10T00:00:00').getTime(); // Lancement dans une semaine
  
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Détection du thème de l'appareil
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDarkMode);

    // Écoute des changements de thème de l'appareil
    const handleChange = (event: MediaQueryListEvent) => {
      setIsDarkMode(event.matches);
    };

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleChange);

    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', handleChange);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = launchDate - now;
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setTimeLeft({ days, hours, minutes, seconds });
        
        // Animation sur changement de seconde
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 200);
      } else {
        clearInterval(timer);
        // Gérer le cas où le lancement est passé
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [launchDate]);

  const TimeCard = ({ value, label }: { value: number; label: string }) => (
    <div className="relative group">
      <div className={`
        ${isDarkMode ? 'bg-black/10 border-white/20 text-white' : 'bg-white/10 border-black/20 text-black'}
        backdrop-blur-lg rounded-2xl p-4 sm:p-6 
        shadow-2xl transform transition-all duration-300 hover:scale-105
        ${isAnimating ? 'animate-pulse' : ''}
      `}>
        <div className="text-4xl sm:text-5xl md:text-6xl font-bold font-mono">
          {value.toString().padStart(2, '0')}
        </div>
        <div className="text-sm md:text-base uppercase tracking-wider font-medium">
          {label}
        </div>
      </div>
      <div className="absolute -inset-1 bg-gradient-to-r from-gray-500 to-gray-700 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-sm -z-10"></div>
    </div>
  );

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'} relative overflow-hidden`}>
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-gray-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-56 sm:h-56 md:w-80 md:h-80 bg-gray-700/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-gray-600/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Logo/Brand */}
        <div className="mb-6 sm:mb-8">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-gray-500 to-gray-700 rounded-2xl flex items-center justify-center mb-2 sm:mb-4 transform hover:rotate-12 transition-transform duration-300">
            <div className="text-xl sm:text-2xl font-bold">🚀</div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight bg-clip-text text-transparent"
            style={{ backgroundImage: isDarkMode ? 'linear-gradient(to right, white, gray)' : 'linear-gradient(to right, black, gray)' }}>
          Quelque chose d'incroyable
          <br />
          <span className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl">arrive bientôt</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed"
           style={{ color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)' }}>
          Nous préparons une expérience extraordinaire qui va révolutionner votre façon de travailler. 
          Restez connectés pour le grand lancement !
        </p>

        {/* Countdown */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 md:gap-8 mb-6 sm:mb-8 md:mb-12">
          <TimeCard value={timeLeft.days} label="Jours" />
          <TimeCard value={timeLeft.hours} label="Heures" />
          <TimeCard value={timeLeft.minutes} label="Minutes" />
          <TimeCard value={timeLeft.seconds} label="Secondes" />
        </div>

        {/* CTA Section */}
        <div className="space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
            <button className="px-6 py-3 sm:px-8 sm:py-4 font-semibold rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                    style={{ backgroundImage: isDarkMode ? 'linear-gradient(to right, gray, black)' : 'linear-gradient(to right, gray, white)', color: isDarkMode ? 'white' : 'black' }}>
              Être notifié du lancement
            </button>
            <button className="px-6 py-3 sm:px-8 sm:py-4 rounded-xl transform hover:scale-105 transition-all duration-300"
                    style={{ backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)', color: isDarkMode ? 'white' : 'black', border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(0, 0, 0, 0.2)' }}>
              En savoir plus
            </button>
          </div>
          
          {/* Email signup */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Votre email..."
              className="flex-1 px-3 py-2 sm:px-4 sm:py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              style={{ backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)', color: isDarkMode ? 'white' : 'black', border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(0, 0, 0, 0.2)' }}
            />
            <button className="px-5 py-2 sm:px-6 sm:py-3 font-semibold rounded-lg transition-all duration-300 whitespace-nowrap"
                    style={{ backgroundImage: isDarkMode ? 'linear-gradient(to right, gray, black)' : 'linear-gradient(to right, gray, white)', color: isDarkMode ? 'white' : 'black' }}>
              S'inscrire
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-6 sm:mt-8 md:mt-12 w-full max-w-md">
          <div className="rounded-full h-1 sm:h-2 overflow-hidden"
               style={{ backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }}>
            <div 
              className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{ width: '75%', backgroundImage: isDarkMode ? 'linear-gradient(to right, gray, black)' : 'linear-gradient(to right, gray, white)' }}
            ></div>
          </div>
          <p className="text-sm mt-1 sm:mt-2" style={{ color: isDarkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)' }}>75% terminé</p>
        </div>

        {/* Social links */}
        <div className="mt-4 sm:mt-6 md:mt-8 flex space-x-4 sm:space-x-6">
          {['Twitter', 'LinkedIn', 'Instagram'].map((social) => (
            <a 
              key={social}
              href="#" 
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{ backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)', color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)' }}
            >
              <span className="text-xs sm:text-sm font-medium">{social[0]}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 sm:w-2 sm:h-2 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
              backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'
            }}
          ></div>
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default CountdownLaunchPage;