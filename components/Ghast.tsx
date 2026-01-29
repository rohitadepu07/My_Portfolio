
import React, { useState, useEffect, useRef } from 'react';

const Ghast: React.FC = () => {
  // Official Minecraft high-quality assets
  const GHAST_NORMAL = "https://minecraft.wiki/images/thumb/Happy_Ghast_JE1_BE1.gif/240px-Happy_Ghast_JE1_BE1.gif?7e801";
  
  /**
   * The shooting expression image as provided by the user.
   * Using the high-quality Minecraft Wiki asset that matches the uploaded image.
   */
  const GHAST_ATTACK = "https://minecraft.wiki/images/thumb/Ghast_shooting_JE3.png/150px-Ghast_shooting_JE3.png?48502";

  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [targetPos, setTargetPos] = useState({ x: 50, y: 50 });
  const [facingRight, setFacingRight] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isAttacking, setIsAttacking] = useState(false);
  
  const requestRef = useRef<number>(null);
  const attackTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!visible) setVisible(true);
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setTargetPos({ x, y });
    };

    const handleGhastAttack = () => {
      // Clear any existing timeout to reset the expression duration
      if (attackTimeoutRef.current) {
        window.clearTimeout(attackTimeoutRef.current);
      }
      
      setIsAttacking(true);
      
      // Return to normal expression after a brief moment (800ms)
      attackTimeoutRef.current = window.setTimeout(() => {
        setIsAttacking(false);
      }, 800);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('ghast-attack', handleGhastAttack);

    const update = () => {
      setPos(prev => {
        const ease = 0.04;
        const time = Date.now() / 1000;
        const bob = Math.sin(time * 1.5) * 2;

        const nextX = prev.x + (targetPos.x - prev.x) * ease;
        const nextY = prev.y + (targetPos.y - prev.y) * ease + bob * 0.01;

        if (targetPos.x > nextX + 0.5) {
          setFacingRight(true);
        } else if (targetPos.x < nextX - 0.5) {
          setFacingRight(false);
        }

        return { x: nextX, y: nextY };
      });
      
      requestRef.current = requestAnimationFrame(update);
    };

    requestRef.current = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('ghast-attack', handleGhastAttack);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [targetPos, visible]);

  const floatY = Math.sin(Date.now() / 800) * 15;

  if (!visible) return null;

  return (
    <div 
      className="fixed z-[30] pointer-events-none drop-shadow-2xl transition-opacity duration-1000"
      style={{ 
        left: `${pos.x}%`, 
        top: `${pos.y}%`,
        transform: `translate(-50%, -50%) translateY(${floatY}px) scaleX(${facingRight ? -1 : 1})`,
        opacity: visible ? 1 : 0
      }}
    >
      <img 
        src={isAttacking ? GHAST_ATTACK : GHAST_NORMAL} 
        alt="Ghast" 
        className={`w-32 h-32 md:w-48 md:h-48 pixel-art transition-transform duration-200 ${isAttacking ? 'scale-110' : 'scale-100'}`}
        style={{
          filter: isAttacking 
            ? 'drop-shadow(0 0 35px rgba(255,0,0,0.7))' 
            : 'drop-shadow(0 0 25px rgba(255,255,255,0.4))'
        }}
      />
    </div>
  );
};

export default Ghast;
