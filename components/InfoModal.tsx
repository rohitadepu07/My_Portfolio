import React from 'react';

interface InfoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in zoom-in duration-200">
            <div className="mc-panel max-w-2xl w-full max-h-[80vh] overflow-y-auto relative border-4 border-[#373737] bg-[#c6c6c6] p-6 shadow-[inset_-4px_-4px_rgba(0,0,0,0.5),inset_4px_4px_rgba(255,255,255,0.8)]">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-[#8b8b8b] border-2 border-black shadow-[inset_-2px_-2px_#444,inset_2px_2px_#bbb] hover:bg-[#9a9a9a] active:translate-y-[1px] text-black font-bold text-xl"
                >
                    X
                </button>

                <h2 className="text-black text-3xl mb-6 font-bold uppercase [text-shadow:2px_2px_#fff]">
                    Portfolio Guide
                </h2>

                <div className="space-y-6 text-black text-lg">

                    <div className="bg-black/10 p-4 border-2 border-black/20">
                        <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
                            <span className="text-2xl">👻</span> Happy Ghast
                        </h3>
                        <p>
                            The Happy Ghast is a friendly Minecraft character that floats around and follows your cursor. Click on it to see it react and change its expression!
                        </p>
                    </div>

                    <div className="bg-black/10 p-4 border-2 border-black/20">
                        <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
                            <span className="text-2xl">🧰</span> Interactive Hotbar
                        </h3>
                        <p>
                            This Minecraft-inspired hotbar serves as a pixel-perfect navigation menu. It lets you scroll through my portfolio's "inventory" of projects and skills just like you're switching tools in-game. Use your mouse scroll wheel or click to navigate!
                        </p>
                    </div>

                    <div className="bg-black/10 p-4 border-2 border-black/20">
                        <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
                            <span className="text-2xl">❤️</span> HUD (Heads-Up Display)
                        </h3>
                        <p>
                            The HUD displays classic Minecraft elements like health, hunger, and armor. At the top center, you can find buttons to Emote, open the Terminal/Chat, and Pause the experience.
                        </p>
                    </div>

                    <div className="bg-black/10 p-4 border-2 border-black/20">
                        <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
                            <span className="text-2xl">💬</span> Terminal / Chat Assistant
                        </h3>
                        <p>
                            Open the chat using the chat icon to interact with the AI assistant. It can guide you through the portfolio, answer questions, or just chat!
                        </p>
                    </div>

                    <div className="bg-black/10 p-4 border-2 border-black/20">
                        <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
                            <span className="text-2xl">🚪</span> Nether Portal
                        </h3>
                        <p>
                            The mysterious Nether Portal is the glowing violet part behind the texts! Step into it to explore the different builds and dimensions of my portfolio!
                        </p>
                    </div>

                </div>

                <div className="mt-8 text-center">
                    <button
                        onClick={onClose}
                        className="mc-button py-2 px-8 text-xl"
                    >
                        Got it!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InfoModal;
