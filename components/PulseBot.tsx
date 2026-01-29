
import React, { useEffect, useRef } from 'react';

const PulseBot: React.FC = () => {
  const botRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<SVGGElement>(null);
  const eyeLeftRef = useRef<SVGRectElement>(null);
  const eyeRightRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    const updateTracking = (clientX: number, clientY: number) => {
      if (!botRef.current || !headRef.current || !eyeLeftRef.current || !eyeRightRef.current) return;

      const botRect = botRef.current.getBoundingClientRect();
      const botCenterX = botRect.left + botRect.width / 2;
      const botCenterY = botRect.top + botRect.height / 2;

      const deltaX = clientX - botCenterX;
      const deltaY = clientY - botCenterY;
      const angle = Math.atan2(deltaY, deltaX);
      const distance = Math.min(Math.hypot(deltaX, deltaY) / 100, 8);

      const headRotate = angle * (180 / Math.PI) * 0.1;
      const headTranslateX = Math.cos(angle) * distance;
      const headTranslateY = Math.sin(angle) * distance;

      headRef.current.style.transform = `translate(${headTranslateX}px, ${headTranslateY}px) rotate(${headRotate}deg)`;

      const eyeMaxMove = 3;
      const eyeX = Math.cos(angle) * eyeMaxMove;
      const eyeY = Math.sin(angle) * eyeMaxMove;

      eyeLeftRef.current.style.transform = `translate(${eyeX}px, ${eyeY}px)`;
      eyeRightRef.current.style.transform = `translate(${eyeX}px, ${eyeY}px)`;
    };

    const handleMouseMove = (e: MouseEvent) => updateTracking(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) updateTracking(e.touches[0].clientX, e.touches[0].clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div 
      ref={botRef}
      className="fixed bottom-24 right-8 z-40 pointer-events-none scale-75 md:scale-100 origin-bottom-right"
    >
      <svg width="120" height="120" viewBox="0 0 100 100" className="pixel-art">
        {/* Enhanced Glow Filter Definition */}
        <defs>
          <filter id="eye-glow-strong" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feComponentTransfer in="coloredBlur" result="intenseBlur">
              <feFuncA type="linear" slope="2" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode in="intenseBlur"/>
              <feMergeNode in="intenseBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Blocky Body */}
        <rect x="30" y="60" width="40" height="30" fill="#2d2d2d" stroke="#000" strokeWidth="2"/>
        
        {/* Neck */}
        <rect x="45" y="50" width="10" height="15" fill="#111" />

        {/* Head */}
        <g ref={headRef} style={{ transition: 'transform 0.05s ease-out', transformOrigin: '50% 35%' }}>
          {/* Main Face Square */}
          <rect x="25" y="10" width="50" height="50" fill="#3a3a3a" stroke="#000" strokeWidth="2" />
          
          {/* Eyes - Glowing bright with pulse effect */}
          <g className="animate-pulse">
            <rect 
              ref={eyeLeftRef} 
              x="35" 
              y="25" 
              width="8" 
              height="8" 
              fill="#00ffff" 
              filter="url(#eye-glow-strong)"
              className="drop-shadow-[0_0_8px_rgba(0,255,255,1)]"
              style={{ transition: 'transform 0.05s ease-out' }}
            />
            <rect 
              ref={eyeRightRef} 
              x="57" 
              y="25" 
              width="8" 
              height="8" 
              fill="#00ffff" 
              filter="url(#eye-glow-strong)"
              className="drop-shadow-[0_0_8px_rgba(0,255,255,1)]"
              style={{ transition: 'transform 0.05s ease-out' }}
            />
          </g>

          {/* Mouth/Visor line */}
          <rect x="35" y="40" width="30" height="4" fill="#000" fillOpacity="0.5" />
          
          {/* Top of head texture */}
          <rect x="25" y="10" width="50" height="5" fill="#000" fillOpacity="0.2" />
        </g>
      </svg>
      <div className="mt-1 text-center bg-black/60 px-2 py-1 border border-white/20 backdrop-blur-sm">
        <span className="text-sm font-bold text-cyan-400 drop-shadow-[0_0_4px_rgba(34,211,238,0.8)]">PULSE-MOB v1.1</span>
      </div>
    </div>
  );
};

export default PulseBot;
