
import React, { useState, useEffect } from 'react';
import Navbar, { ViewType } from './components/Navbar';
import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard';
import SkillsRadar from './components/SkillsRadar';
import ExperienceTimeline from './components/ExperienceTimeline';
import ChatAssistant from './components/ChatAssistant';
import CustomCursor from './components/CustomCursor';
import HUD from './components/HUD';
import PlayerEmote from './components/PlayerEmote';
import Ghast from './components/Ghast';
import { PORTFOLIO_DATA } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<ViewType>('spawn');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isDisconnected, setIsDisconnected] = useState(false);
  const [isEmoting, setIsEmoting] = useState(false);

  // Reset scroll position when view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const toggleChat = () => setIsChatOpen(!isChatOpen);
  const togglePause = () => setIsPaused(!isPaused);

  const triggerEmote = () => {
    setIsEmoting(true);
  };

  const handleReconnect = () => {
    setIsDisconnected(false);
    setView('spawn');
  };

  // Global click listener for Ghast attack
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      if (isPaused || isDisconnected) return;

      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      
      // Dispatch custom event for Ghast to attack wherever the user clicks
      window.dispatchEvent(new CustomEvent('ghast-attack', { detail: { x, y } }));
    };

    window.addEventListener('mousedown', handleGlobalClick);
    return () => window.removeEventListener('mousedown', handleGlobalClick);
  }, [isPaused, isDisconnected]);

  if (isDisconnected) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex flex-col items-center justify-center p-6 text-center select-none">
        <CustomCursor />
        <div className="max-w-2xl w-full flex flex-col items-center animate-in fade-in duration-500">
          <h1 className="text-white text-4xl md:text-6xl mb-8 drop-shadow-[4px_4px_#000] font-bold">
            Connection Lost
          </h1>
          <div className="text-red-600 text-2xl md:text-3xl mb-12 font-bold uppercase tracking-wider drop-shadow-[2px_2px_#000]">
            Server Disconnected
          </div>
          <h1 className="text-white text-4xl md:text-4xl mb-8 drop-shadow-[4px_4px_#000] font-bold">
            Reload Web... To Spawn Againn...
          </h1>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (view) {
      case 'spawn':
        return <Hero onSetView={(v) => setView(v)} />;
      case 'solo':
      case 'team':
        const filteredProjects = PORTFOLIO_DATA.projects.filter(p => view === 'solo' ? !p.isTeam : p.isTeam);
        return (
          <section className="py-12 animate-in fade-in zoom-in duration-300">
            <div className="mc-dark-panel border-4 border-slate-600 mb-8 flex justify-between items-center">
              <div>
                <h2 className="text-cyan-400">
                  {view === 'solo' ? 'Singleplayer: Solo Projects' : 'Multiplayer: Team Deployments'}
                </h2>
                <p className="text-lg text-slate-300">
                  {view === 'solo' ? 'Hand-crafted individual builds.' : 'Collaborative raids with engineering squads.'}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
              {filteredProjects.length === 0 && (
                <div className="col-span-full mc-panel text-center p-20 opacity-50">
                   <h3 className="text-black">EMPTY CHUNK</h3>
                   <p className="text-slate-600">No projects found in this biome.</p>
                </div>
              )}
            </div>
          </section>
        );
      case 'stats':
        return (
          <section className="py-12 animate-in slide-in-from-bottom-8 duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="mc-panel">
                <h2 className="mb-6 underline text-black">Player Attributes</h2>
                <div className="space-y-6">
                  {PORTFOLIO_DATA.skills.map(skill => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-xl font-bold mb-1">
                        <span>{skill.name.toUpperCase()}</span>
                        <span className="text-blue-600">Lv. {skill.level}</span>
                      </div>
                      <div className="w-full h-4 bg-slate-800 border-2 border-black">
                        <div 
                          className="h-full bg-cyan-500 shadow-[inset_0_2px_#afff80,inset_0_-2px_#3d7a1f]" 
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-8">
                <div className="p-4 bg-black/40 border-4 border-slate-700 backdrop-blur-md">
                   <SkillsRadar />
                </div>
                                <div className="mc-dark-panel border-2 border-yellow-600 p-4">
                   <h3 className="text-yellow-400 mb-2">Player Hobbies: T shapped learner</h3>
                   <ul className="text-slate-300 text-lg space-y-1">
                     <li>- <span className="text-white">Artist:</span> drawing, sketching, painting,</li>
                     <li>- <span className="text-white">Music Production:</span> Linux - LMMS Studio</li>
                     <li>- <span className="text-white">Animation:</span> Pencil2D, krita</li>
                     <li>- <span className="text-white">Watching Movies:</span> Sci-fi, adventure, mystery</li>
                     <li>- <span className="text-white">Watching and reading Documentries: Business case studies</span> </li>
                     <li>- <span className="text-white">Clean Code:</span> Main ability</li>
                   </ul>
                </div>
              </div>
            </div>
          </section>
        );
      case 'questlog':
        return (
          <section className="py-12 max-w-4xl mx-auto animate-in slide-in-from-right-8 duration-300">
            <div className="mc-panel text-center mb-16 border-double border-8 border-slate-500 shadow-2xl">
              <h2 className="text-black">World History (Quest Log)</h2>
              <p className="text-slate-600">Player Journey and Education</p>
            </div>
            <div className="mc-dark-panel border-4 border-slate-600 bg-black/80">
              <ExperienceTimeline />
            </div>
          </section>
        );
      case 'contact':
        return (
          <section className="min-h-[90vh] flex items-center justify-center py-12 animate-in zoom-in duration-300">
            <div className="max-w-4xl w-full mx-auto">
              <div className="mc-panel bg-slate-400 border-8 border-black text-center p-8 md:p-12 relative shadow-[12px_12px_0px_rgba(0,0,0,0.4)]">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-black border-2 border-black px-2 py-0.5 font-bold text-sm md:text-base shadow-[2px_2px_0px_#000] z-20 whitespace-nowrap">
                  ACHIEVEMENT UNLOCKED: THE END?
                </div>
                
                <h2 className="text-black mb-6 mt-2 uppercase text-3xl md:text-5xl">Join Rohit's Server</h2>
                <p className="text-slate-800 text-xl md:text-2xl mb-8 italic">
                  "It's dangerous to go alone! Take me for your next project."
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="bg-black/10 p-3 border-2 border-black/20 text-left">
                    <h4 className="font-bold mb-1 text-sm md:text-base">DIRECT CONNECTION</h4>
                    <p className="text-lg md:text-xl break-all">{PORTFOLIO_DATA.email}</p>
                    <p className="text-base opacity-60">LinkedIn - Rohit Adepu</p>
                  </div>
                  <div className="bg-black/10 p-3 border-2 border-black/20 text-left">
                    <h4 className="font-bold mb-1 text-sm md:text-base">COORDINATES</h4>
                    <p className="text-lg md:text-xl">Mumbai, India (Layer 64)</p>
                    <p className="text-xs uppercase opacity-50">GitHub: @rohitadepu07</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${PORTFOLIO_DATA.email}`, '_blank')}
                    className="mc-button py-3 px-8 text-xl md:text-2xl hover:scale-105"
                  >
                    SEND WHISPER
                  </button>
                  <button 
                    onClick={() => window.open('https://www.linkedin.com/in/rohit-adepu-a52059329?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BfojK7kyjTyurWSMFj2GKgw%3D%3D', '_blank')}
                    className="mc-button py-3 px-8 text-xl md:text-2xl opacity-80 hover:opacity-100"
                  >
                    LINKEDIN
                  </button>
                  <button 
                    onClick={() => window.open('https://github.com/rohitadepu07', '_blank')}
                    className="mc-button py-3 px-8 text-xl md:text-2xl opacity-80 hover:opacity-100"
                  >
                    GITHUB REPO
                  </button>
                </div>
              </div>
            </div>
          </section>
        );
      default:
        return <Hero onSetView={(v) => setView(v)} />;
    }
  };

  return (
    <div className={`min-h-screen relative selection:bg-cyan-400 selection:text-black flex flex-col ${isPaused ? 'overflow-hidden' : ''}`}>
      <CustomCursor />
      <Ghast />
      <HUD 
        onToggleChat={toggleChat} 
        onTogglePause={togglePause} 
        onEmote={triggerEmote}
      />
      <Navbar currentView={view} setView={setView} />
      
      <main className={`flex-1 container mx-auto px-6 lg:px-12 relative z-10 pb-40 overflow-x-hidden ${isPaused ? 'blur-sm' : ''}`}>
        {renderContent()}
      </main>

      <PlayerEmote active={isEmoting} onComplete={() => setIsEmoting(false)} />

      {isPaused && (
        <div className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-md flex flex-col items-center justify-center p-6 animate-in fade-in zoom-in duration-200">
          <h2 className="text-white text-5xl md:text-7xl mb-12 drop-shadow-[4px_4px_#000] font-bold">GAME PAUSED</h2>
          <div className="flex flex-col gap-6 w-full max-w-sm">
            <button 
              onClick={togglePause}
              className="mc-button py-6 text-3xl"
            >
              BACK TO GAME
            </button>
            <button 
              onClick={() => { setView('spawn'); setIsPaused(false); }}
              className="mc-button py-6 text-3xl opacity-80"
            >
              SPAWN POINT
            </button>
            <button 
              onClick={() => { setIsDisconnected(true); setIsPaused(false); }}
              className="mc-button py-6 text-3xl opacity-60"
            >
              DISCONNECT
            </button>
          </div>
        </div>
      )}

      <footer className="min-h-screen flex flex-col items-center justify-center bg-black/90 text-center text-slate-500 text-xl border-t-4 border-slate-800 z-10 relative px-4">
         <div className="mb-4 text-cyan-400 max-w-2xl">
             Portfolio crafted by Rohit Adepu - A Creator in the World.
        </div>
        <div className="mb-4 text-cyan-600 max-w-4xl">
             Built with React, Tailwind CSS, and a touch of Redstone magic.
        </div>
        <div>&copy; {new Date().getFullYear()} {PORTFOLIO_DATA.name} World. No Creepers were harmed.</div>
      </footer>

      <ChatAssistant isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    </div>
  );
};

export default App;
