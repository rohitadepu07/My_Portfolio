
import { PortfolioData } from './types';

export const PORTFOLIO_DATA: PortfolioData = {
  name: "Rohit Adepu",
  role: "Full Stack Web Developer",
  location: "Mumbai, Maharashtra",
  email: "rohitadepu27@gmail.com",
  bio: "I have a deep-seated passion for continuous learning and creation. I thrive on the process of acquiring new skills, then synthesizing them in unexpected ways to develop something truly unique.",
  fullBio: "I have a deep-seated passion for continuous learning and creation. I thrive on the process of acquiring new skills, then synthesizing them in unexpected ways to develop something truly unique. My greatest satisfaction comes from taking a fresh approach to a challenge, using a diverse set of abilities to bring a novel concept to life.",
  projects: [
    {
      id: "factcheck",
      title: "Factcheck",
      description: "AI-driven misinformation detection platform designed to verify the authenticity of digital content.",
      longDescription: "Factcheck is an AI-driven misinformation detection platform designed to verify the authenticity of digital content. It provides tools for users to cross-reference news, analyze URLs, and scrutinize media to identify potential 'fake news' or deepfakes. The platform focuses on enhancing digital literacy and ensuring information integrity through automated fact-checking features.",
      image: "components/Projects SS/Factcheck.png",
      tags: [],
      isTeam: false,
      stats: { stars: 45, forks: 12, commits: 88 },
      githubUrl: "https://factcheck-ai.netlify.app/"
    },
    {
      id: "factline",
      title: "Factline",
      description: "Simple, informative website dedicated to sharing interesting facts and knowledge across various topics.",
      longDescription: "Factline is a simple, informative website dedicated to sharing interesting facts and knowledge across various topics. Its primary goal is to provide users with quick, engaging, and bite-sized information to help them learn something new every day.",
      image: "components/Projects SS/Factline.png",
      tags: [],
      isTeam: true,
      stats: { stars: 32, forks: 8, commits: 120 },
      githubUrl: "https://factline.unaux.com/index.html?i=1"
    },
    {
      id: "purely",
      title: "Purely - Ingredients Detector",
      description: "AI-powered platform designed to decode product ingredients in food and personal care items.",
      longDescription: "Purely is an AI-powered platform designed to decode product ingredients. It simplifies complex labels on food and personal care items, providing clear insights into health impacts and safety to help users make more informed purchasing decisions.",
      image: "components/Projects SS/Purely.png",
      tags: [],
      isTeam: true,
      stats: { stars: 58, forks: 15, commits: 210 },
      githubUrl: "https://purely-ai.netlify.app/"
    }
  ],
  skills: [
    { name: "Html/Css/JS", level: 90, category: "Frontend" },
    { name: "Bootstrap", level: 80, category: "Frontend" },
    { name: "C/C++", level: 70, category: "System Design" },
    { name: "Python", level: 50, category: "AI/ML" },
    { name: "Flutter", level: 40, category: "Mobile Development"},
    { name: "React", level: 20, category: "Frontend" },
    { name: "Node.js", level: 25, category: "Backend" },
    { name: "Firebase", level: 30, category: "Backend" },
    { name: "Supabase", level: 30, category: "Backend" },
    { name: "Socket.io", level: 20, category: "Backend" },
  ],
  experience: [], // CV doesn't list work experience, only projects and education
  education: [
    {
      school: "New Horizon Institute Of Technology And Management, Thane",
      degree: "BE in Computer Science And Design",
      period: "Current"
    },
    {
      school: "Bhavani Shankar Road Jr College Of Science (Vidyalankar), Mumbai",
      degree: "HSC - Science",
      period: "Completed"
    },
    {
      school: "Muktangan English Medium School, Mumbai",
      degree: "SSC - Science",
      period: "Completed"
    }
  ]
};
