
import { PortfolioData } from './types';

export const PORTFOLIO_DATA: PortfolioData = {
  name: "Rohit Adepu",
  role: "Full Stack Web Developer (1st Year Computer Science And Design Student)",
  location: "Mumbai, Maharashtra",
  email: "rohitadepu27@gmail.com",
  bio: "Just a Creator.... with a Creative Mind, \njust keep Exploring, Learning, Building, Repeat...",
  fullBio: "Just aCreator.... with a Creative Mind, \njust keep Exploring, Learning, Building, Repeat...",
  hobbies: ["Artist: Drawing,sketching, painting and digital art; Watching Movies:Sci-fi, adventure, mystery; Watching and reading Documentries: Business case studies; Clean Code:  Main ability; Music Production: Linux - LMMS Studio; Animation:  Pencil2D, krita;"],
  projects: [
    {
      id: "factcheck",
      title: "Factcheck",
      description: "AI-driven misinformation detection platform designed to verify the authenticity of digital content.",
      longDescription: "Factcheck is an AI-driven misinformation detection platform designed to verify the authenticity of digital content. It provides tools for users to cross-reference news, analyze URLs, and scrutinize media to identify potential 'fake news' or deepfakes. The platform focuses on enhancing digital literacy and ensuring information integrity through automated fact-checking features.",
      image: "./Projects SS/Factcheck.png",
      tags: [],
      isTeam: false,
      stats: { stars: 45, forks: 12, commits: 88 },
      githubUrl: "https://factcheck-ai.netlify.app/"
    },
    {
      id: "Threaded-Design-Memories",
      title: "Threaded Design Memories",
      description: "Embroidery Startup which focuses on different types of design that will be memories for the customers.",
      longDescription: "Threaded Design Memories is a platform for a startup business that focuses on creative embroidery designs.",
      image: "./Projects SS/Threaded-Design-Memories.png",
      tags: [],
      isTeam: false,
      stats: { stars: 45, forks: 12, commits: 88 },
      githubUrl: "https://threaded-design-memories.netlify.app/"
    },
    {
      id: "factline",
      title: "Factline",
      description: "Simple, informative website dedicated to sharing interesting facts and knowledge across various topics.",
      longDescription: "Factline is a simple, informative website dedicated to sharing interesting facts and knowledge across various topics. Its primary goal is to provide users with quick, engaging, and bite-sized information to help them learn something new every day.",
      image: "./Projects SS/Factline.png",
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
      image: "./Projects SS/Purely.png",
      tags: [],
      isTeam: true,
      stats: { stars: 58, forks: 15, commits: 210 },
      githubUrl: "https://purely-ai.netlify.app/"
    }
  ],
  skills: [
    { name: "Html/Css/JS", level: 90, category: "Frontend" },
    { name: "Bootstrap", level: 50, category: "Frontend" },
    { name: "C/C++", level: 70, category: "System Design" },
    { name: "Python (FastAPI)", level: 50, category: "Backend" },
    { name: "Flutter", level: 40, category: "Mobile Development" },
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
      degree: "SSC - 10th",
      period: "Completed"
    }
  ],
  certificates: [
    {
      id: "cert-1",
      title: "1st Hackathon at Mumabi Hacks",
      issuer: "Mumabi Hacks",
      date: "28-11-2025",
      image: "./certificates/Mumabi Hacks.jpeg"
    },
    {
      id: "cert-2",
      title: "2nd Hackathon at NMIMS",
      issuer: "NMIMS - GDG DevFest Mumbai",
      date: "15-02-2026",
      image: "./certificates/GDG.jpeg"
    },
    {
      id: "cert-3",
      title: "3rd Finals Hackathon at Ashoka University",
      issuer: "Ashoka University",
      date: "10-04-2026",
      image: "./certificates/Ashoka.jpeg"
    },
    {
      id: "cert-4",
      title: "4th Hackathon at PDEA's College of Engineering, Pune",
      issuer: "PDEA's College of Engineering, Pune",
      date: "20-06-2026",
      image: "./certificates/Pune.jpeg"
    },
  ]
};
