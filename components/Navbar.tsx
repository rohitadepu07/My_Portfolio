
import React, { useState, useEffect } from 'react';

export type ViewType = 'spawn' | 'solo' | 'team' | 'stats' | 'questlog' | 'certificates' | 'contact' | 'community' | '404';

/**
 * Custom Pixel Art Icons for the Hotbar
 * Designed on a 16x16 grid for authentic cartoon pixel aesthetic
 */
const PixelCert = () => (
  <svg width="24" height="24" viewBox="0 0 16 16" className="pixel-art drop-shadow-[2px_2px_rgba(0,0,0,0.5)]">
    <rect x="2" y="2" width="12" height="12" fill="#8b4513" /> {/* Frame Border */}
    <rect x="3" y="3" width="10" height="10" fill="#f5deb3" /> {/* Parchment */}
    <rect x="5" y="5" width="6" height="1" fill="#555" opacity="0.5" /> {/* Text Line 1 */}
    <rect x="5" y="7" width="6" height="1" fill="#555" opacity="0.5" /> {/* Text Line 2 */}
    <rect x="6" y="9" width="4" height="4" fill="#ffd700" /> {/* Gold Seal */}
    <rect x="7" y="10" width="2" height="2" fill="#b8860b" /> {/* Seal Detail */}
  </svg>
);

const PixelSpawn = () => (
  <svg width="24" height="24" viewBox="0 0 16 16" className="pixel-art drop-shadow-[2px_2px_rgba(0,0,0,0.5)]">
    <rect x="2" y="8" width="12" height="4" fill="#8b0000" /> {/* Bed Base */}
    <rect x="2" y="7" width="4" height="2" fill="#fff" /> {/* Pillow */}
    <rect x="2" y="10" width="1" height="3" fill="#555" /> {/* Leg 1 */}
    <rect x="13" y="10" width="1" height="3" fill="#555" /> {/* Leg 2 */}
    <rect x="6" y="7" width="8" height="2" fill="#ff0000" /> {/* Blanket */}
  </svg>
);

const PixelSolo = () => (
  <svg width="24" height="24" viewBox="0 0 16 16" className="pixel-art drop-shadow-[2px_2px_rgba(0,0,0,0.5)]">
    <rect x="4" y="4" width="8" height="8" fill="#d7b594" /> {/* Face */}
    <rect x="4" y="4" width="8" height="2" fill="#6b4d3c" /> {/* Hair */}
    <rect x="5" y="7" width="2" height="1" fill="#fff" /> {/* Eye L */}
    <rect x="9" y="7" width="2" height="1" fill="#fff" /> {/* Eye R */}
    <rect x="6" y="10" width="4" height="1" fill="#8b4513" /> {/* Mouth */}
  </svg>
);

const PixelTeam = () => (
  <svg width="24" height="24" viewBox="0 0 16 16" className="pixel-art drop-shadow-[2px_2px_rgba(0,0,0,0.5)]">
    {/* Alex Head (Back) */}
    <rect x="2" y="5" width="7" height="7" fill="#e9c197" />
    <rect x="2" y="5" width="7" height="2" fill="#ff8c00" /> {/* Ginger Hair */}
    <rect x="3" y="8" width="1" height="1" fill="#556b2f" /> {/* Eye */}
    {/* Steve Head (Front) */}
    <rect x="7" y="3" width="7" height="7" fill="#d7b594" />
    <rect x="7" y="3" width="7" height="2" fill="#6b4d3c" /> {/* Brown Hair */}
    <rect x="8" y="6" width="1" height="1" fill="#fff" />
    <rect x="12" y="6" width="1" height="1" fill="#fff" />
  </svg>
);

const PixelStats = () => (
  <svg width="24" height="24" viewBox="0 0 16 16" className="pixel-art drop-shadow-[2px_2px_rgba(0,0,0,0.5)]">
    <rect x="2" y="10" width="3" height="4" fill="#22c55e" />
    <rect x="6" y="6" width="3" height="8" fill="#eab308" />
    <rect x="10" y="3" width="3" height="11" fill="#3b82f6" />
    <rect x="1" y="14" width="14" height="1" fill="#fff" />
  </svg>
);

const PixelQuest = () => (
  <svg width="24" height="24" viewBox="0 0 16 16" className="pixel-art drop-shadow-[2px_2px_rgba(0,0,0,0.5)]">
    <rect x="3" y="2" width="10" height="12" fill="#f5deb3" /> {/* Paper */}
    <rect x="4" y="4" width="8" height="1" fill="#555" opacity="0.3" />
    <rect x="4" y="6" width="6" height="1" fill="#555" opacity="0.3" />
    <rect x="10" y="10" width="3" height="3" fill="#b91c1c" /> {/* Seal */}
  </svg>
);

const PixelContact = () => (
  <svg width="24" height="24" viewBox="0 0 16 16" className="pixel-art drop-shadow-[2px_2px_rgba(0,0,0,0.5)]">
    <rect x="2" y="4" width="12" height="8" fill="#fff" />
    <path d="M2 4l6 4 6-4" fill="none" stroke="#ddd" strokeWidth="1" />
    <rect x="7" y="7" width="2" height="2" fill="#ef4444" /> {/* Heart Stamp */}
  </svg>
);

const PixelCommunity = () => (
  <svg width="24" height="24" viewBox="0 0 16 16" className="pixel-art drop-shadow-[2px_2px_rgba(0,0,0,0.5)]">
    {/* Body */}
    <rect x="1" y="2" width="14" height="10" fill="#fff" />
    {/* Tail */}
    <rect x="3" y="12" width="6" height="1" fill="#fff" />
    <rect x="4" y="13" width="4" height="1" fill="#fff" />
    <rect x="5" y="14" width="2" height="1" fill="#fff" />

    {/* Outline */}
    <rect x="1" y="1" width="14" height="1" fill="#333" />
    <rect x="0" y="2" width="1" height="10" fill="#333" />
    <rect x="15" y="2" width="1" height="10" fill="#333" />
    <rect x="1" y="12" width="2" height="1" fill="#333" />
    <rect x="9" y="12" width="6" height="1" fill="#333" />

    {/* Tail Outline */}
    <rect x="3" y="13" width="1" height="1" fill="#333" />
    <rect x="4" y="14" width="1" height="1" fill="#333" />
    <rect x="5" y="15" width="2" height="1" fill="#333" />
    <rect x="7" y="14" width="1" height="1" fill="#333" />
    <rect x="8" y="13" width="1" height="1" fill="#333" />

    {/* Inner Heart */}
    <rect x="5" y="4" width="2" height="1" fill="#ef4444" />
    <rect x="9" y="4" width="2" height="1" fill="#ef4444" />
    <rect x="4" y="5" width="8" height="2" fill="#ef4444" />
    <rect x="5" y="7" width="6" height="1" fill="#ef4444" />
    <rect x="6" y="8" width="4" height="1" fill="#ef4444" />
    <rect x="7" y="9" width="2" height="1" fill="#ef4444" />
  </svg>
);

interface Props {
  currentView: ViewType;
  setView: (view: ViewType) => void;
}

const Navbar: React.FC<Props> = ({ currentView, setView }) => {
  const [popupName, setPopupName] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems: { icon: React.ReactNode; name: string; view: ViewType }[] = [
    { icon: <PixelSpawn />, name: 'Spawn Point', view: 'spawn' },
    { icon: <PixelSolo />, name: 'Solo Projects', view: 'solo' },
    { icon: <PixelTeam />, name: 'Team Projects', view: 'team' },
    { icon: <PixelStats />, name: 'Player Stats', view: 'stats' },
    { icon: <PixelQuest />, name: 'Quest Log', view: 'questlog' },
    { icon: <PixelCert />, name: 'Achievements', view: 'certificates' },
    { icon: <PixelContact />, name: 'Contact Info', view: 'contact' },
    { icon: <PixelCommunity />, name: 'Community Hub', view: 'community' }
  ];

  const handleSlotClick = (item: typeof menuItems[0]) => {
    setView(item.view);
    setPopupName(item.name);
    setTimeout(() => setPopupName(null), 2100);
  };

  const emptySlotsCount = isMobile ? 0 : 2;

  return (
    <div className="hotbar pixel-art !bottom-1 md:!bottom-2" role="navigation">
      {popupName && (
        <div key={popupName} className="item-popup !-top-32">
          {popupName}
        </div>
      )}

      {menuItems.map((item, i) => (
        <button
          key={i}
          onClick={() => handleSlotClick(item)}
          className={`hotbar-slot ${currentView === item.view ? 'active' : ''} group transition-all`}
          aria-label={item.name}
        >
          <div className="transform scale-110 md:scale-125">
            {item.icon}
          </div>

          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#1e1e1f] border-2 border-[#535355] px-3 py-1 text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-[110] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] hidden md:block">
            {item.name}
          </div>
        </button>
      ))}

      {[...Array(emptySlotsCount)].map((_, i) => (
        <div key={i + menuItems.length} className="hotbar-slot opacity-20 bg-black/10"></div>
      ))}
    </div>
  );
};

export default Navbar;
