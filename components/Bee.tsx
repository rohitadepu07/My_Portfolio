
import React, { useState, useEffect } from 'react';

const Bee: React.FC = () => {
  const [pos, setPos] = useState({ x: 10, y: 20 });
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let angle = Math.random() * Math.PI * 2;
    let speed = 2;
    
    const move = () => {
      setPos(prev => {
        // Randomly change direction slightly
        angle += (Math.random() - 0.5) * 0.2;
        
        let nextX = prev.x + Math.cos(angle) * speed;
        let nextY = prev.y + Math.sin(angle) * speed;

        // Bounce off edges
        if (nextX < 5 || nextX > 95) angle = Math.PI - angle;
        if (nextY < 5 || nextY > 95) angle = -angle;

        setRotation(angle * (180 / Math.PI));
        return { x: nextX, y: nextY };
      });
    };

    const interval = setInterval(move, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="fixed z-[35] pointer-events-none transition-transform duration-500 ease-linear"
      style={{ 
        left: `${pos.x}%`, 
        top: `${pos.y}%`,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)` 
      }}
    >
      <svg width="40" height="30" viewBox="0 0 40 30" className="pixel-art">
        {/* Bee Body */}
        <rect x="5" y="10" width="25" height="15" fill="#facc15" stroke="#000" strokeWidth="1" />
        <rect x="12" y="10" width="5" height="15" fill="#000" />
        <rect x="22" y="10" width="5" height="15" fill="#000" />
        
        {/* Eyes */}
        <rect x="27" y="13" width="3" height="3" fill="#000" />
        
        {/* Wings */}
        <g className="animate-pulse">
          <rect x="10" y="2" width="8" height="8" fill="rgba(255,255,255,0.6)" stroke="#fff" strokeWidth="0.5" />
          <rect x="20" y="2" width="8" height="8" fill="rgba(255,255,255,0.6)" stroke="#fff" strokeWidth="0.5" />
        </g>
        
        {/* Stinger */}
        <rect x="2" y="16" width="3" height="3" fill="#000" />
      </svg>
    </div>
  );
};

export default Bee;
