
import React from 'react';

import emoteImg from './Icon/emote.jpeg';
import chatImg from './Icon/chat.jpeg';
import pauseImg from './Icon/Pause.jpeg';

interface HUDProps {
  onToggleChat: () => void;
  onTogglePause: () => void;
  onEmote: () => void;
  onToggleInfo: () => void;
}

const HUD: React.FC<HUDProps> = ({ onToggleChat, onTogglePause, onEmote, onToggleInfo }) => {

  // Now use the imported variables as the 'src'
  const PlayerIcon = () => (
    <img src={emoteImg} alt="Emote Icon" className="w-8 h-8 md:w-10 md:h-10 object-contain pixel-art" />
  );

  const ChatIcon = () => (
    <img src={chatImg} alt="Chat Icon" className="w-8 h-8 md:w-10 md:h-10 object-contain pixel-art" />
  );

  const MenuIcon = () => (
    <img src={pauseImg} alt="Pause Icon" className="w-8 h-8 md:w-10 md:h-10 object-contain pixel-art" />
  );

  // ... (Rest of your component remains the same)
  const Heart: React.FC<{ full?: boolean; half?: boolean; empty?: boolean }> = ({ full = true, half = false, empty = false }) => (
    <svg width="18" height="18" viewBox="0 0 9 9" className="pixel-art drop-shadow-[1px_1px_rgba(0,0,0,0.8)]">
      <path d="M2 0h2v1h1v-1h2v1h1v1h1v3h-1v1h-1v1h-1v1h-1v-1h-1v-1h-1v-1h-1v-3h1v-1z" fill="#000" />
      {!empty && (
        <>
          {full && <path d="M2 1h1v1h1v-1h2v1h1v3h-1v1h-1v1h-1v-1h-1v-1h-1v-3h1z" fill="#FF0000" />}
          {half && <path d="M2 1h1v1h1v-1h1v5h-1v-1h-1v-3h1z" fill="#FF0000" />}
          <path d="M2 2h1v1h-1z" fill="#FFF" opacity="0.8" />
        </>
      )}
    </svg>
  );

  const Armor: React.FC<{ empty?: boolean }> = ({ empty = false }) => (
    <svg width="18" height="18" viewBox="0 0 9 9" className="pixel-art drop-shadow-[1px_1px_rgba(0,0,0,0.8)]">
      <path d="M1 1h7v2h-1v1h1v3h-1v1h-5v-1h-1v-3h1v-1h-1z" fill="#000" />
      {!empty && (
        <>
          <path d="M2 2h5v1h-1v1h-3v-1h-1z" fill="#BBB" />
          <path d="M3 3h3v1h-3z" fill="#FFF" opacity="0.4" />
        </>
      )}
    </svg>
  );

  const Hunger: React.FC<{ full?: boolean; empty?: boolean }> = ({ full = true, empty = false }) => (
    <svg width="18" height="18" viewBox="0 0 9 9" className="pixel-art drop-shadow-[1px_1px_rgba(0,0,0,0.8)] scale-x-[-1]">
      <path d="M3 0h3v1h1v1h1v1h1v3h-1v1h-1v1h-3v-1h-1v-1h-1v-2h1v-1h1v-1h1v-2z" fill="#000" />
      {!empty && (
        <>
          <path d="M4 1h1v2h1v1h1v3h-1v1h-2v-1h-1v-4h1z" fill="#BD6A3A" />
          <path d="M5 2h1v1h-1z" fill="#FFF" opacity="0.3" />
        </>
      )}
    </svg>
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-[80] pixel-art select-none flex flex-col items-center">

      {/* --- TOP HUD BUTTONS --- */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-[1px] pointer-events-auto">
        {[
          { icon: <PlayerIcon />, action: onEmote, title: "Emote Hi!" },
          { icon: <ChatIcon />, action: onToggleChat, title: "Chat" },
          { icon: <MenuIcon />, action: onTogglePause, title: "Pause" }
        ].map((btn, i) => (
          <button
            key={i}
            onClick={btn.action}
            title={btn.title}
            className={`
              w-10 h-10 md:w-12 md:h-12 
              bg-[#8b8b8b] 
              border-[2px] border-black 
              flex items-center justify-center 
              shadow-[inset_-2px_-2px_#444,inset_2px_2px_#bbb] 
              hover:bg-[#9a9a9a] 
              active:translate-y-[1px]
              transition-all duration-75
            `}
          >
            <div className="scale-100">
              {btn.icon}
            </div>
          </button>
        ))}
      </div>

      {/* --- INFO BUTTON (TOP RIGHT) --- */}
      <div className="absolute top-4 right-4 pointer-events-auto">
        <button
          onClick={onToggleInfo}
          title="Information / Guide"
          className="
            w-6 h-6 md:w-8 md:h-8 
            bg-[#8b8b8b] 
            border-[2px] border-black 
            flex items-center justify-center 
            shadow-[inset_-2px_-2px_#444,inset_2px_2px_#bbb] 
            hover:bg-[#9a9a9a] 
            active:translate-y-[1px]
            transition-all duration-75
          "
        >
          <span className="text-black font-bold text-base drop-shadow-[1px_1px_#fff]">i</span>
        </button>
      </div>

      <div className="w-full max-w-[550px] mt-auto flex flex-col items-center pb-2 md:pb-4">

        <div className="w-full hidden md:flex justify-between ...">
          {/* Armor Bar */}
          <div className="flex">
            {[...Array(10)].map((_, i) => (
              <Armor key={`armor-${i}`} empty={i >= 10} />
            ))}
          </div>
          <span className="text-white text-xs opacity-50 font-bold mb-1 hidden md:block">FULL NETHERITE GEAR</span>
        </div>

        <div className="w-full hidden md:flex justify-between ...">
          {/* Health Bar */}
          <div className="flex">
            {[...Array(10)].map((_, i) => (
              <Heart key={`health-${i}`} full={true} />
            ))}
          </div>

          {/* Hunger Bar */}
          <div className="flex">
            {[...Array(10)].map((_, i) => (
              <Hunger key={`hunger-${i}`} full={true} />
            ))}
          </div>
        </div>

        {/* Row 3: XP Level and Bar */}
        <div className="relative w-full px-1 mb-1">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[#3cff00] font-bold text-3xl drop-shadow-[3px_3px_#000] z-10 animate-pulse">
            77
          </div>
          <div className="w-full h-2 bg-black border-2 border-[#1e1e1f] relative overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#3cff00] to-[#afff80] shadow-[0_0_15px_rgba(60,255,0,0.9)] transition-all duration-1000"
              style={{ width: '77%' }}
            />
          </div>
        </div>

        {/* Padding for Hotbar */}
        <div className="h-[50px] md:h-[62px]" />
      </div>

      <style>{`
        .pixel-art { image-rendering: pixelated; }
      `}</style>
    </div>
  );
};

export default HUD;
