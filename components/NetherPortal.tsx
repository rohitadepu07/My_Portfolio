
import React, { useEffect, useState } from 'react';

const NetherPortal: React.FC = () => {
  const [particles, setParticles] = useState<{ id: number; left: number; top: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    // Generate some portal particles
    const newParticles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="relative w-[220px] h-[320px] md:w-[180px] md:h-[240px] mx-auto opacity-80 pointer-events-none select-none">
      {/* --- Obsidian Frame --- */}
      <div className="absolute inset-0 border-[30px] md:border-[24px] border-black shadow-[0_0_40px_rgba(75,0,130,0.5)] z-10">
        {/* Frame Texture Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-30 mix-blend-overlay"></div>
      </div>

      {/* --- Portal Interior (Animated Swirl) --- */}
      <div className="absolute inset-[16px] md:inset-[24px] bg-[#4b0082] overflow-hidden">
        {/* Swirling Background 1 */}
        <div className="absolute inset-[-50%] bg-[radial-gradient(circle,rgba(147,51,234,0.8)_0%,rgba(75,0,130,1)_70%)] animate-[spin_10s_linear_infinite] opacity-60"></div>
        {/* Swirling Background 2 */}
        <div className="absolute inset-[-50%] bg-[radial-gradient(circle,rgba(192,38,211,0.5)_0%,transparent_60%)] animate-[spin_15s_linear_infinite_reverse] opacity-40"></div>
        
        {/* Moving Noise/Waves */}
        <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')] animate-[pulse_2s_ease-in-out_infinite]"></div>
        
        {/* Portal Highlight Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 via-transparent to-purple-400/20 pointer-events-none"></div>
      </div>

      {/* --- Particles --- */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute w-1.5 h-1.5 md:w-2 md:h-2 bg-purple-400 z-20 pixel-art"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            opacity: 0,
            animation: `portalParticle ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
            boxShadow: '0 0 8px rgba(168, 85, 247, 0.8)'
          }}
        />
      ))}

      <style>{`
        @keyframes portalParticle {
          0% { transform: translateY(20px) scale(0); opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { transform: translateY(-80px) scale(1.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default NetherPortal;
