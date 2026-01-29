
import React from 'react';
import { PORTFOLIO_DATA } from '../constants';
import NetherPortal from './NetherPortal';

interface HeroProps {
  onSetView: (view: 'solo' | 'team') => void;
}

const Hero: React.FC<HeroProps> = ({ onSetView }) => {
  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center pt-20 px-4 md:px-6 animate-in fade-in duration-700">
      
      {/* --- Nether Portal Background --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 scale-[0.7] md:scale-110 pointer-events-none">
        <NetherPortal />
      </div>

      <div className="max-w-2xl w-full text-center z-10">
        <div className="mb-4 transform -rotate-1 scale-100 md:scale-110">
           <h1 className="text-yellow-400 mb-1 leading-none font-bold drop-shadow-[6px_6px_#000] text-4xl md:text-[3.5rem]" style={{ textShadow: '4px 4px #3f3f00' }}>
             {PORTFOLIO_DATA.name.toUpperCase()}
           </h1>
           <div className="inline-block bg-yellow-400 text-black px-4 py-1 font-bold animate-bounce text-sm md:text-lg border-4 border-black shadow-[4px_4px_0px_#000]">
             DEVELOPER EDITION!
           </div>
        </div>

        <div className="mc-dark-panel mb-5 max-w-[105%] md:max-w-2x1 mx-auto border-2 border-slate-500 bg-black/55 backdrop-blur-sm shadow-2xl py-4 px-4 md:p-2">
          <p className="text-lg md:text-2x2 text-green-400 mb-2 md:mb-2 font-bold tracking-widest uppercase">
            <span className="hidden md:inline">Full-Stack Engineer</span>
          </p>
          <p className="text-lg md:text-2x2 leading-relaxed text-slate-50 font-medium line-clamp-4 md:line-clamp-none">
            {PORTFOLIO_DATA.bio}
          </p>
        </div>
        
        <div className="flex flex-col gap-2 max-w-xs mx-auto">
          <div className="text-slate-300 mb-0.5 italic font-bold tracking-wider uppercase text-shadow text-sm md:text-base">Select Game Mode:</div>
          <button 
             onClick={() => onSetView('solo')}
             className="mc-button w-full text-center py-3 md:py-4 text-xl md:text-2xl hover:scale-105 transition-transform"
          >
            Singleplayer
          </button>
          <button 
            onClick={() => onSetView('team')} 
            className="mc-button w-full text-center py-3 md:py-4 text-xl md:text-2xl hover:scale-105 transition-transform"
          >
            Multiplayer
          </button>
        </div>
      </div>

      <style>{`
        .text-shadow {
          text-shadow: 2px 2px #000;
        }
      `}</style>
    </section>
  );
};

export default Hero;
