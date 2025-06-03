import React, { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownLaunchPage = () => {
  // Date de lancement - modifiez cette date selon vos besoins
  const launchDate = new Date('2025-07-01T00:00:00').getTime();
  
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const [isAnimating, setIsAnimating] = useState(false);

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
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [launchDate]);

  const TimeCard = ({ value, label }: { value: number; label: string }) => (
    <div className="relative group">
      <div className={`
        bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20
        shadow-2xl transform transition-all duration-300 hover:scale-105
        ${isAnimating ? 'animate-pulse' : ''}
      `}>
        <div className="text-5xl md:text-6xl font-bold text-white mb-2 font-mono">
          {value.toString().padStart(2, '0')}
        </div>
        <div className="text-sm md:text-base text-white/80 uppercase tracking-wider font-medium">
          {label}
        </div>
      </div>
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-sm -z-10"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Logo/Brand */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 transform hover:rotate-12 transition-transform duration-300">
            <div className="text-2xl font-bold text-white">🚀</div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
          Quelque chose d'incroyable
          <br />
          <span className="text-3xl md:text-5xl lg:text-6xl">arrive bientôt</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl leading-relaxed">
          Nous préparons une expérience extraordinaire qui va révolutionner votre façon de travailler. 
          Restez connectés pour le grand lancement !
        </p>

        {/* Countdown */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12">
          <TimeCard value={timeLeft.days} label="Jours" />
          <TimeCard value={timeLeft.hours} label="Heures" />
          <TimeCard value={timeLeft.minutes} label="Minutes" />
          <TimeCard value={timeLeft.seconds} label="Secondes" />
        </div>

        {/* CTA Section */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              Être notifié du lancement
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-lg text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transform hover:scale-105 transition-all duration-300">
              En savoir plus
            </button>
          </div>
          
          {/* Email signup */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Votre email..."
              className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 whitespace-nowrap">
              S'inscrire
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-12 w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-lg rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-1000 ease-out"
              style={{ width: '75%' }}
            ></div>
          </div>
          <p className="text-white/60 text-sm mt-2">75% terminé</p>
        </div>

        {/* Social links */}
        <div className="mt-8 flex space-x-6">
          {['Twitter', 'LinkedIn', 'Instagram'].map((social) => (
            <a 
              key={social}
              href="#" 
              className="w-12 h-12 bg-white/10 backdrop-blur-lg rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
            >
              <span className="text-sm font-medium">{social[0]}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
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