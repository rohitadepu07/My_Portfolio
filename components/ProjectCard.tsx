
import React from 'react';
import { Project } from '../types';

interface Props {
  project: Project;
}

const ProjectCard: React.FC<Props> = ({ project }) => {
  const hasLiveUrl = !!project.liveUrl;

  return (
    <div className="mc-panel !p-3 flex flex-col group hover:scale-[1.03] hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.3)] transition-all duration-300 cursor-default">
      <div className="border-2 border-black bg-slate-800 p-0.5 mb-3 aspect-video overflow-hidden relative">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover pixel-art opacity-80 group-hover:opacity-100 transition-opacity"
        />
        <div className="absolute top-1.5 left-1.5 flex flex-col gap-1">
          {project.tags.map(tag => (
            <span key={tag} className="bg-black/80 text-[10px] px-1 text-teal-400 border border-teal-900 leading-tight">
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="flex-1">
        <h3 className="text-xl font-bold mb-1 text-black underline leading-tight">{project.title}</h3>
        <p className="text-slate-700 text-base mb-3 line-clamp-3 font-medium leading-snug">
          {project.description}
        </p>
      </div>

      <div className="mt-auto pt-2 border-t border-slate-400 flex justify-between items-center">
        <div className="flex gap-3">
          <div className="flex items-center gap-1 text-slate-800 text-sm">
            <span>⭐</span> {project.stats.stars}
          </div>
          <div className="flex items-center gap-1 text-slate-800 text-sm">
            <span>🍴</span> {project.stats.forks}
          </div>
        </div>

        {hasLiveUrl ? (
          <a 
            href={project.liveUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="mc-button py-0.5 px-3 text-[12px] no-underline inline-block"
          >
            USE ITEM
          </a>
        ) : (
          <button
            onClick={() => window.open(project.githubUrl, '_blank')}
            className="mc-button py-0.5 px-3 text-[12px] filter grayscale"
        >
            LINK
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
