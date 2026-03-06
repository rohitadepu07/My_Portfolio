import React, { useState, useEffect } from 'react';

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        if (isOpen) {
            const stored = localStorage.getItem('mc_portfolio_user');
            if (stored) {
                const user = JSON.parse(stored);
                setUsername(user.username);
            }
        }
    }, [isOpen]);

    const handleSave = () => {
        if (username.trim()) {
            localStorage.setItem('mc_portfolio_user', JSON.stringify({
                username: username.trim(),
                isLoggedIn: true
            }));

            // Dispatch a custom event so Community.tsx and others can instantly update
            window.dispatchEvent(new Event('mc_profile_updated'));

            onClose();
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('mc_portfolio_user');
        localStorage.removeItem('mc_portfolio_has_liked');
        window.location.reload();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center p-4">
            <div className="mc-panel bg-slate-300 w-full max-w-sm border-4 border-black p-6 text-center animate-in zoom-in duration-200 pointer-events-auto">
                <h2 className="text-black mb-6 text-3xl font-bold uppercase drop-shadow-sm [text-shadow:2px_2px_#9386A0]">Player Profile</h2>

                <div className="mb-6 text-left">
                    <label className="block text-slate-800 text-sm font-bold mb-2 uppercase">
                        Set Username to Join Server
                    </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full bg-white border-2 border-black px-3 py-2 text-black focus:outline-none shadow-[inset_2px_2px_#aaa] font-['VT323'] text-2xl"
                        placeholder="Enter Your Name"
                        maxLength={20}
                    />
                    <p className="text-xs text-slate-700 mt-2 font-['VT323'] text-lg leading-tight">
                        You can update your username anytime above.Setting a username allows you to chat and drop likes in the Community Hub!                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={handleSave}
                        className="mc-button py-3 text-2xl"
                    >
                        {localStorage.getItem('mc_portfolio_user') ? 'UPDATE PROFILE' : 'JOIN SERVER'}
                    </button>
                    {localStorage.getItem('mc_portfolio_user') && (
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 border-2 border-black text-white py-2 text-xl hover:bg-red-500 font-['VT323'] drop-shadow-[2px_2px_0_#000]"
                        >
                            LOGOUT
                        </button>
                    )}
                    <button
                        onClick={onClose}
                        className="mc-button py-2 text-xl opacity-80"
                    >
                        CANCEL
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileModal;
