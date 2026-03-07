import React from 'react';

interface Props {
    onReturn: () => void;
}

const NotFound: React.FC<Props> = ({ onReturn }) => {
    return (
        <section className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-500">
            <div className="mc-panel p-8 md:p-16 max-w-3xl w-full border-8 border-slate-700 bg-slate-800/90 relative shadow-[12px_12px_0px_rgba(0,0,0,0.5)]">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-red-600 text-white border-4 border-black px-6 py-2 font-bold text-xl md:text-3xl shadow-[4px_4px_0px_#000] z-20 whitespace-nowrap">
                    ERROR 404
                </div>

                <h1 className="text-red-500 text-5xl md:text-7xl mb-6 font-bold drop-shadow-[4px_4px_#000] mt-4">
                    Aaaaaaa Error 404!
                </h1>

                <img
                    src="components/Icon/error.png"
                    alt="Connection Lost Creeper"
                    className="mx-auto w-48 h-48 md:w-64 md:h-64 object-cover pixel-art rounded-lg border-4 border-black shadow-[4px_4px_0px_#000] mb-8"
                />

                <p className="text-xl md:text-3xl text-white mb-8 font-bold [text-shadow:2px_2px_#000]">
                    You lost connection or the chunk is missing.
                </p>

                <div className="text-slate-300 text-lg md:text-xl mb-12 italic">
                    "Check your Wi-Fi or URL to reconnect to the world."
                </div>

                <button
                    onClick={onReturn}
                    className="mc-button py-4 px-8 text-2xl md:text-3xl hover:scale-105 transition-transform"
                >
                    RESPAWN
                </button>
            </div>
        </section>
    );
};

export default NotFound;
