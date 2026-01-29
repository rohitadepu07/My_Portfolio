
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { PORTFOLIO_DATA } from '../constants';

const SkillsRadar: React.FC = () => {
  const data = PORTFOLIO_DATA.skills.map(s => ({
    subject: s.name,
    A: s.level,
    fullMark: 100,
  }));

  return (
    <div className="w-full h-[400px] glass rounded-3xl p-6 border border-white/5">
      <h3 className="text-xl font-bold mb-4 text-center">Proficiency Matrix</h3>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#334155" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
          <Radar
            name="Skills"
            dataKey="A"
            stroke="#2dd4bf"
            fill="#2dd4bf"
            fillOpacity={0.4}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillsRadar;
