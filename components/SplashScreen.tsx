
import React, { useEffect, useState } from 'react';

const SplashScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onFinish, 700); // Allow fade out animation
    }, 3000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#006837] flex flex-col items-center justify-center transition-opacity duration-700">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.1)_0%,_transparent_70%)] animate-pulse"></div>
      
      <div className="relative animate-in zoom-in duration-1000">
        <div className="mb-10 transform hover:scale-105 transition-transform duration-500">
          <svg viewBox="0 0 400 200" className="w-80 h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D4AF37" />
                <stop offset="50%" stopColor="#FFFACD" />
                <stop offset="100%" stopColor="#B8860B" />
              </linearGradient>
            </defs>
            <path d="M100 120 L200 40 L300 120" fill="none" stroke="url(#goldGradient)" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="185" y="75" width="30" height="30" fill="url(#goldGradient)" className="animate-pulse" />
            <text x="200" y="170" textAnchor="middle" fill="white" fontSize="72" fontWeight="900" fontFamily="Playfair Display" className="tracking-tighter">MM&GG</text>
          </svg>
        </div>
        
        <div className="flex flex-col items-center gap-4">
           <div className="w-64 h-1.5 bg-black/20 rounded-full overflow-hidden border border-white/10 shadow-inner">
             <div className="h-full bg-gradient-to-r from-[#D4AF37] to-white animate-loading-bar shadow-[0_0_15px_rgba(212,175,55,0.8)]"></div>
           </div>
           <p className="text-[#D4AF37] text-[10px] font-black tracking-[0.6em] uppercase animate-pulse">Initializing Luxury Systems</p>
        </div>
      </div>
      
      <style>{`
        @keyframes loading-bar {
          0% { width: 0%; transform: translateX(-100%); }
          50% { width: 50%; }
          100% { width: 100%; transform: translateX(100%); }
        }
        .animate-loading-bar {
          animation: loading-bar 2.5s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
