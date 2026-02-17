
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  isTeam?: boolean;
  stats: {
    stars: number;
    forks: number;
    commits: number;
  };
}

export interface Skill {
  name: string;
  level: number;
  category: 'Frontend' | 'Backend' | 'AI/ML' | 'DevOps' | 'System Design' | 'Mobile Development';
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  achievements: string[];
}

export interface Education {
  school: string;
  degree: string;
  period: string;
}

export interface PortfolioData {
  name: string;
  role: string;
  bio: string;
  fullBio: string;
  location: string;
  email: string;
  hobbies: string[];
  projects: Project[];
  skills: Skill[];
  experience: Experience[];
  education: Education[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
