
import React, { useEffect } from 'react';

const CustomCursor: React.FC = () => {
  useEffect(() => {
    const dot = document.getElementById('custom-cursor-dot');

    if (!dot) return;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;

      const target = e.target as HTMLElement;
      const isHoverable = target.closest('button, a, input, .group, [role="button"]');
      
      if (isHoverable) {
        dot.style.transform = 'translate(-50%, -50%) scale(1.5)';
      } else {
        dot.style.transform = 'translate(-50%, -50%) scale(1)';
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return null;
};

export default CustomCursor;
