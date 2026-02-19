
import React from 'react';
import { PORTFOLIO_DATA } from '../constants';

const ExperienceTimeline: React.FC = () => {
  return (
    <div className="space-y-16 p-4 md:p-8">
      {PORTFOLIO_DATA.education.map((edu, idx) => (
        <div key={idx} className="relative pl-12 border-l-4 border-slate-700/50 pb-4">
          {/* Milestone Marker */}
          <div className="absolute -left-[16px] top-0 w-8 h-8 bg-yellow-400 border-4 border-black shadow-[0_0_20px_rgba(255,255,0,0.6)] flex items-center justify-center">
            <div className="w-2 h-2 bg-white animate-pulse"></div>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-baseline gap-2 mb-2">
            <span className="bg-black text-yellow-400 font-bold px-3 py-1 border-2 border-yellow-400 text-lg uppercase tracking-tighter">
              {edu.period}
            </span>
          </div>

          <h3 className="text-3xl md:text-4xl font-black text-white mb-1 uppercase tracking-tight">
            {edu.degree}
          </h3>
          <div className="text-cyan-400 text-2xl mb-6 font-bold flex items-center gap-2">
             <span className="opacity-50">@</span> {edu.school.toUpperCase()}
          </div>
          
          <div className="group flex gap-4 text-slate-300 text-xl bg-white/5 p-4 border border-white/10 hover:border-yellow-400/50 transition-colors">
            <span className="text-yellow-400 font-bold group-hover:scale-125 transition-transform">&raquo;</span>
            <p className="leading-tight"></p>
          </div>
        </div>
      ))}

      <div className="mt-20 pt-12 border-t-4 border-slate-800 text-center">
         <h2 className="text-white mb-4 underline">End of Quest Log</h2>
         <p className="text-slate-500 text-xl">The journey continues in Mumbai...</p>
      </div>
    </div>
  );
};

export default ExperienceTimeline;
