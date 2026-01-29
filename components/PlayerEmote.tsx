
import React, { useEffect, useState } from 'react';

interface PlayerEmoteProps {
  active: boolean;
  onComplete: () => void;
}

const PlayerEmote: React.FC<PlayerEmoteProps> = ({ active, onComplete }) => {
  const [shouldRender, setShouldRender] = useState(active);

  /**
   * High-resolution 3D Steve render exactly matching the running pickaxe version.
   */
  const STEVE_IMAGE = "https://i.redd.it/b5qykgkthyq51.png";

  useEffect(() => {
    if (active) {
      setShouldRender(true);
      const timer = setTimeout(() => {
        onComplete();
      }, 4000); // Display for 4 seconds
      return () => clearTimeout(timer);
    } else {
      // Small delay before unmounting for the exit animation
      const timer = setTimeout(() => setShouldRender(false), 500);
      return () => clearTimeout(timer);
    }
  }, [active, onComplete]);

  if (!shouldRender) return null;

  return (
    <div 
      className={`fixed bottom-12 right-12 z-[200] transition-all duration-700 ease-out transform ${
        active ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-32 opacity-0 scale-75'
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* Minecraft Style Chat Bubble */}
        <div className="mc-panel mb-4 py-2 px-10 text-black text-3xl font-bold animate-bounce border-4 border-black bg-white shadow-[8px_8px_0px_rgba(0,0,0,0.5)] relative">
          Hiii!
          {/* Authentic Minecraft chat bubble tail */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[18px] border-t-black"></div>
        </div>

        {/* The 3D Running Steve Render with energetic animation */}
        <div className="relative group">
          <img 
            src={STEVE_IMAGE} 
            alt="Running Steve" 
            className="w-56 h-auto md:w-72 drop-shadow-[20px_20px_0px_rgba(0,0,0,0.2)] animate-steve-run"
            onError={(e) => {
              // Reliable fallback if the primary host is down
              (e.target as HTMLImageElement).src = "https://www.pngkit.com/png/full/6-63300_minecraft-steve-png-minecraft-steve-running-png.png";
            }}
          />
          {/* Subtle Glow/Portal Aura */}
          <div className="absolute inset-x-0 bottom-0 top-1/2 bg-cyan-400/20 blur-[80px] -z-10 rounded-full animate-pulse"></div>
        </div>
      </div>

      <style>{`
        @keyframes steveRun {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-15px) rotate(-5deg); }
          50% { transform: translateY(0) rotate(5deg); }
          75% { transform: translateY(-15px) rotate(-5deg); }
        }
        .animate-steve-run {
          animation: steveRun 0.6s ease-in-out infinite;
          transform-origin: bottom center;
        }
        .pixel-art {
          image-rendering: auto; /* Best for high-res 3D renders */
        }
      `}</style>
    </div>
  );
};

export default PlayerEmote;
