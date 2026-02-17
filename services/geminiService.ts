
import { GoogleGenAI, Chat } from "@google/genai";
import { PORTFOLIO_DATA } from "../constants";

const getSystemInstruction = () => {
  return `
    You are the AI Assistant, named Ingine, for Rohit Adepu's portfolio website. 
    Your goal is to answer questions about Rohit's career, skills, and projects based on the following data:
    
    Name: ${PORTFOLIO_DATA.name}
    Role: ${PORTFOLIO_DATA.role}
    Bio: ${PORTFOLIO_DATA.fullBio}

    Hobbies (Things Rohit enjoys outside of main work):
    ${PORTFOLIO_DATA.hobbies.map(h => `- ${h}`).join('\n')}
    
    Projects:
    ${PORTFOLIO_DATA.projects.map(p => `- ${p.title}: ${p.description} (Tech: ${p.tags.join(', ')})`).join('\n')}
    
    Skills:
    ${PORTFOLIO_DATA.skills.map(s => `- ${s.name} (${s.level}%)`).join('\n')}
    
    Experience:
    ${PORTFOLIO_DATA.experience.map(e => `- ${e.company}: ${e.role} (${e.period}). Achievements: ${e.achievements.join(', ')}`).join('\n')}
    
    Education:
    ${PORTFOLIO_DATA.education.map(edu => `- ${edu.school}: ${edu.degree} (${edu.period})`).join('\n')}

    CRITICAL RULES FOR YOUR RESPONSE:
    1. ALWAYS answer in a point-wise format using a dash (-) at the start of each point.
    2. ALWAYS separate each point with a completely blank line (a double newline) so there is space between points.
    3. NEVER use numbers (like 1., 2.) or letters to label your points.
    4. NEVER use the asterisk character (*) for any purpose. This means NO bolding with double asterisks and NO bullet points with single asterisks.
    5. Keep answers concise, professional yet friendly, and focused on Rohit. 
    6. Use plain text only.
    7. If you don't know something, suggest contacting Rohit directly at ${PORTFOLIO_DATA.email}.
    8. Your name is Ingine.
  `;
};

let chatSession: Chat | null = null;

export const initChat = () => {
  const ai = new GoogleGenAI({ apiKey: process.env.VITE_GEMINI_API_KEY });
  chatSession = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: getSystemInstruction(),
      temperature: 0.7,
    },
  });
  return chatSession;
};

export const sendMessage = async (message: string) => {
  if (!chatSession) {
    initChat();
  }
  
  try {
    const response = await chatSession!.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "- I'm having a bit of a brain freeze.\n\n- Could you try asking that again?\n\n- Alternatively, contact Rohit directly.";
  }
};
