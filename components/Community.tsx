import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../services/supabase';
import ProfileModal from './ProfileModal';
import { Filter } from 'bad-words';
import RollingNumber from './RollingNumber';

const filter = new Filter();

interface Comment {
    id: string;
    username: string;
    text: string;
    timestamp: number;
}

interface User {
    username: string;
    isLoggedIn: boolean;
}

const Community: React.FC = () => {
    const [likes, setLikes] = useState<number>(0);
    const [hasLiked, setHasLiked] = useState<boolean>(false);
    const [visitors, setVisitors] = useState<number>(0);

    const [user, setUser] = useState<User>({ username: '', isLoggedIn: false });
    const [tempUsername, setTempUsername] = useState('');

    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [showLoginWarning, setShowLoginWarning] = useState(false);
    const [showProfanityWarning, setShowProfanityWarning] = useState(false);
    const [isCreativeMode, setIsCreativeMode] = useState(false);

    const chatContainerRef = useRef<HTMLDivElement>(null);

    // Initial load & Subscriptions
    useEffect(() => {
        const loadUserFromStorage = () => {
            const storedUser = localStorage.getItem('mc_portfolio_user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            } else {
                setUser({ username: '', isLoggedIn: false });
            }
        };

        loadUserFromStorage();

        const handleProfileUpdate = () => {
            loadUserFromStorage();
        };

        window.addEventListener('mc_profile_updated', handleProfileUpdate);

        // Like State (Keep per user)
        setHasLiked(localStorage.getItem('mc_portfolio_has_liked') === 'true');

        const fetchData = async () => {
            // Fetch initial stats
            const { data: statsData } = await supabase
                .from('global_stats')
                .select('*')
                .eq('id', 1)
                .single();

            if (statsData) {
                setLikes(statsData.likes);
                setVisitors(statsData.visitors);

                if (!sessionStorage.getItem('mc_portfolio_visited')) {
                    sessionStorage.setItem('mc_portfolio_visited', 'true');
                    // Delay increment so the user visibly sees the counter go up
                    setTimeout(async () => {
                        await supabase.rpc('increment_visitors');
                    }, 1000);
                }
            }

            // Fetch initial comments
            const { data: commentsData } = await supabase
                .from('comments')
                .select('*')
                .order('timestamp', { ascending: true });

            if (commentsData) {
                setComments(commentsData);
            }
        };

        fetchData();

        // Realtime Subscriptions
        const channels = supabase.channel('pub-sub-channel')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'comments' }, payload => {
                if (payload.eventType === 'INSERT') {
                    setComments(prev => {
                        const newComment = payload.new as Comment;
                        if (prev.some(c => c.id === newComment.id)) return prev;
                        // Replace optimistic comment based on matching text/username
                        const tempIndex = prev.findIndex(c => c.text === newComment.text && c.username === newComment.username && c.id.toString().startsWith('temp_'));
                        if (tempIndex !== -1) {
                            const updated = [...prev];
                            updated[tempIndex] = newComment;
                            return updated;
                        }
                        return [...prev, newComment];
                    });
                }
            })
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'global_stats' }, payload => {
                setLikes(payload.new.likes);
                setVisitors(payload.new.visitors);
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channels);
            window.removeEventListener('mc_profile_updated', handleProfileUpdate);
        };
    }, []);

    // Auto-scroll chat without scrolling the whole window
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [comments]);

    const handleLike = async () => {
        if (!user.isLoggedIn) {
            setShowLoginWarning(true);
            setTimeout(() => setShowLoginWarning(false), 3500);
            return;
        }

        const newHasLiked = !hasLiked;
        setHasLiked(newHasLiked);
        localStorage.setItem('mc_portfolio_has_liked', newHasLiked.toString());

        if (newHasLiked) {
            await supabase.rpc('increment_likes');
            // Record who liked the web
            await supabase.from('user_likes').insert([{ username: user.username }]);
        } else {
            await supabase.rpc('decrement_likes');
            // Remove the user's like record
            await supabase.from('user_likes').delete().eq('username', user.username);
        }

        // Optimistic UI update
        setLikes(prev => newHasLiked ? prev + 1 : Math.max(0, prev - 1));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user.isLoggedIn) {
            if (tempUsername.trim()) {
                const newUser = { username: tempUsername.trim(), isLoggedIn: true };
                setUser(newUser);
                localStorage.setItem('mc_portfolio_user', JSON.stringify(newUser));
                setTempUsername('');
            }
        } else {
            const commentText = newComment.trim();
            if (commentText) {
                if (filter.isProfane(commentText) || commentText.includes('*')) {
                    setShowProfanityWarning(true);
                    setTimeout(() => setShowProfanityWarning(false), 3500);
                    return;
                }

                if (commentText.toLowerCase() === '/gamemode creative' || commentText.toLowerCase() === '/gamemode 1') {
                    setIsCreativeMode(true);
                    setNewComment('');
                    setComments(prev => [...prev, { id: 'sys_' + Date.now(), username: 'System', text: 'Set own game mode to Creative Mode', timestamp: Date.now() }]);
                    return;
                }

                if (commentText.toLowerCase() === '/gamemode survival' || commentText.toLowerCase() === '/gamemode 0') {
                    setIsCreativeMode(false);
                    setNewComment('');
                    setComments(prev => [...prev, { id: 'sys_' + Date.now(), username: 'System', text: 'Set own game mode to Survival Mode', timestamp: Date.now() }]);
                    return;
                }

                const tempId = 'temp_' + Date.now();
                const ts = Date.now();
                const commentPayload = {
                    id: tempId,
                    username: user.username,
                    text: commentText,
                    timestamp: ts
                };

                setNewComment('');
                setComments(prev => [...prev, commentPayload]);

                // Write to Supabase
                await supabase.from('comments').insert([{
                    username: user.username,
                    text: commentText,
                    timestamp: ts
                }]);
            }
        }
    };

    return (
        <section className={`pt-14 pb-4 md:pt-[72px] px-4 mx-auto animate-in fade-in zoom-in duration-300 relative font-['VT323',_monospace] flex flex-col items-center gap-6 z-10 w-full max-w-7xl transition-all duration-1000 ${isCreativeMode ? 'drop-shadow-[0_0_50px_rgba(85,255,255,0.4)] scale-[1.02]' : ''}`}>
            {isCreativeMode && (
                <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
                    <div className="absolute inset-0 bg-[#55ffff]/5 animate-pulse mix-blend-screen"></div>
                    <div className="absolute top-[10%] left-[5%] text-[#55ffff]/30 text-6xl animate-bounce">⊹</div>
                    <div className="absolute top-[30%] right-[10%] text-[#55ffff]/30 text-4xl animate-bounce" style={{ animationDelay: '0.5s' }}>⊹</div>
                    <div className="absolute bottom-[20%] left-[15%] text-[#55ffff]/30 text-5xl animate-bounce" style={{ animationDelay: '1s' }}>⊹</div>
                    <div className="absolute bottom-[10%] right-[20%] text-[#55ffff]/30 text-6xl animate-bounce" style={{ animationDelay: '1.5s' }}>⊹</div>
                </div>
            )}

            {/* Profile Button - Top Right */}
            <div className="absolute top-2 right-4 md:right-8 z-50">
                <button
                    onClick={() => setIsProfileOpen(true)}
                    className="bg-[#2b2b2b] border-[3px] border-[#4a4a4a] border-t-[#555] border-l-[#555] border-b-[#111] border-r-[#111] px-4 py-2 flex items-center gap-2 hover:bg-[#3b3b3b] shadow-lg active:translate-y-[2px]"
                >
                    <svg width="20" height="20" viewBox="0 0 16 16" className="pixel-art drop-shadow-[2px_2px_rgba(0,0,0,0.8)] fill-white">
                        <rect x="5" y="2" width="6" height="6" />
                        <rect x="2" y="10" width="12" height="6" />
                    </svg>
                    <span className="text-white text-lg drop-shadow-[2px_2px_#000]">PROFILE</span>
                </button>
            </div>

            {/* Top Like Panel */}
            <div className={`border mx-auto flex flex-col items-center py-2 mb-2 w-[90%] sm:w-[95%] md:w-auto px-4 md:px-8 shadow-[0_0_15px_rgba(0,0,0,0.8)] transition-all duration-1000 ${isCreativeMode ? 'bg-[#0a1a2a]/95 border-[#55ffff]' : 'bg-[#1a1a1a]/95 border-[#3a3a3a]'}`}>
                <h3 className={`text-lg md:text-xl tracking-wide mb-3 drop-shadow-[2px_2px_#000] text-center transition-colors duration-1000 ${isCreativeMode ? 'text-[#55ffff]' : 'text-slate-300'}`}>
                    Enjoyed My Creative Portfolio? Leave a like to support me!
                </h3>

                <div className="flex flex-row flex-wrap justify-center items-center gap-4 md:gap-6">
                    <button
                        onClick={handleLike}
                        className="bg-[#2b2b2b] border-[3px] border-[#4a4a4a] border-t-[#555] border-l-[#555] border-b-[#111] border-r-[#111] px-5 py-2 flex items-center gap-3 md:gap-4 hover:bg-[#3b3b3b] transition-colors shadow-lg active:border-t-[#111] active:border-l-[#111] active:border-b-[#555] active:border-r-[#555]"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill={hasLiked ? "#ff5555" : "#333"} className="drop-shadow-[1px_1px_rgba(0,0,0,0.8)] filter">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        <span className="text-[#a8a8a8] font-bold text-xl md:text-2xl tracking-wider drop-shadow-[2px_2px_#000] opacity-80">Liked!</span>
                        <span className="bg-[#1f1f1f] px-3 py-1 text-[#ffaa00] text-lg md:text-xl drop-shadow-[1px_1px_#000] border-2 border-[#111] rounded-sm shadow-[inset_2px_2px_#000]">
                            {likes}
                        </span>
                    </button>

                    <div className="bg-[#2b2b2b] border-[3px] border-[#4a4a4a] border-t-[#555] border-l-[#555] border-b-[#111] border-r-[#111] px-5 py-2 flex items-center gap-3 md:gap-4 shadow-lg cursor-default">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#55ffff" className="drop-shadow-[1px_1px_rgba(0,0,0,0.8)]">
                            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                        </svg>
                        <span className="text-[#a8a8a8] font-bold text-xl md:text-2xl tracking-wider drop-shadow-[2px_2px_#000] opacity-80">Views</span>
                        <span className="bg-[#1f1f1f] px-3 py-1 text-[#55ffff] text-lg md:text-xl drop-shadow-[1px_1px_#000] border-2 border-[#111] rounded-sm shadow-[inset_2px_2px_#000]">
                            <RollingNumber value={visitors} />
                        </span>
                    </div>

                    <a
                        href="https://buymeacoffee.com/rohit_adepu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#2b2b2b] border-[3px] border-[#4a4a4a] border-t-[#555] border-l-[#555] border-b-[#111] border-r-[#111] px-5 py-2 flex items-center gap-3 md:gap-4 hover:bg-[#3b3b3b] transition-colors shadow-lg active:border-t-[#111] active:border-l-[#111] active:border-b-[#555] active:border-r-[#555] no-underline"
                    >
                        <img
                            src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
                            alt="Buy me a coffee"
                            className="w-5 h-7 md:w-6 md:h-8 drop-shadow-[1px_1px_rgba(0,0,0,0.8)] pointer-events-none"
                        />
                        <span className="text-[#a8a8a8] font-bold text-xl md:text-2xl tracking-wider drop-shadow-[2px_2px_#000] opacity-80 whitespace-nowrap">Buy Me a Coffee</span>
                    </a>
                </div>

                {hasLiked ? (
                    <p className="text-[#55ff55] mt-2 text-xs md:text-sm tracking-wide drop-shadow-[1px_1px_#000]">
                        Thanks for your support!💙
                    </p>
                ) : (
                    <p className="text-transparent mt-2 text-xs md:text-sm select-none pointer-events-none">.</p>
                )}
            </div>

            {/* Bottom Terminal / Chat Panel */}
            <div className={`w-[95%] sm:w-[700px] mx-auto border p-3 sm:p-4 text-xs sm:text-sm shadow-[0_0_15px_rgba(0,0,0,0.8)] relative flex flex-col justify-between h-[220px] sm:h-[260px] transition-all duration-1000 ${isCreativeMode ? 'bg-[#05101a]/95 border-[#55ffff]' : 'bg-[#0c0c0c]/95 border-[#3a3a3a]'}`}>

                {/* Chat History */}
                <div
                    ref={chatContainerRef}
                    className="space-y-1 overflow-y-auto custom-scrollbar flex-1 mb-2 px-2 drop-shadow-[1px_1px_#000]"
                >
                    <div className="text-[#55ff55]">[INFO] Connecting to server...</div>
                    <div className="text-[#55ff55]">[INFO] Successfully joined game.</div>
                    <div className="text-white">
                        <span className="text-[#55ffff] hover:underline cursor-pointer">[CHAT]</span> {'<System>'} Welcome to the portfolio!
                    </div>

                    <div className="text-[#ff5555]">
                        <span className="text-[#55ffff] hover:underline cursor-pointer">[CHAT]</span> {'<System>'} [WARNING] Be fully warned, the elusive Herobrine is always watching your messages... For those who don't know, Herobrine is a legendary, creepy urban legend in Minecraft—a mysterious ghost player with glowing white eyes who haunts servers, stalks players, and builds weird structures without reason. Never trust what he says.
                    </div>

                    {hasLiked && (
                        <div className="text-white">
                            <span className="text-[#55ffff] hover:underline cursor-pointer">[CHAT]</span> {'<System>'} Player voted for the server!
                        </div>
                    )}

                    {comments.map(comment => {
                        const date = new Date(comment.timestamp);
                        const timeStr = isNaN(date.getTime()) ? '' : `[${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}] `;
                        return (
                            <div key={comment.id} className="text-white">
                                <span className="text-[#888888] text-xs mr-2">{timeStr}</span>
                                <span className="text-[#55ffff] hover:underline cursor-pointer">[CHAT]</span> {'<' + comment.username + '>'} {comment.text}
                            </div>
                        );
                    })}

                    <div className="text-[#aaaaaa]">
                        <span className="text-[#55ffff] hover:underline cursor-pointer">[CHAT]</span> {'<Herobrine>'} I am watching you...
                    </div>
                </div>



                {/* Input Area */}
                <div className="border-t-[2px] border-[#3a3a3a] pt-3 z-10 bg-[#0c0c0c]/90">
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <span className="text-[#aaaaaa] pt-2 drop-shadow-[1px_1px_#000] hidden sm:block">
                            {user.isLoggedIn ? `[${user.username}]>` : 'System>'}
                        </span>
                        <input
                            type="text"
                            className="flex-1 bg-black/60 text-white px-3 py-2 border-[2px] border-[#333] focus:border-[#55ffff] focus:bg-black outline-none transition-colors font-sans text-sm drop-shadow-[1px_1px_0_#000]"
                            placeholder={user.isLoggedIn ? "Type a message directly to chat..." : "Enter your name to join the server..."}
                            value={user.isLoggedIn ? newComment : tempUsername}
                            onChange={e => user.isLoggedIn ? setNewComment(e.target.value) : setTempUsername(e.target.value)}
                            maxLength={100}
                        />
                        <button type="submit" className="bg-[#3a3a3a] border-[2px] border-[#555] border-b-[#111] border-r-[#111] px-6 py-2 text-white hover:bg-[#4a4a4a] active:border-t-[#111] active:border-l-[#111] active:border-b-[#555] active:border-r-[#555] drop-shadow-[1px_1px_0_#000]">
                            {user.isLoggedIn ? "SEND" : "JOIN"}
                        </button>
                    </form>
                </div>
            </div>

            {/* Custom Warning Popup */}
            {(showLoginWarning || showProfanityWarning) && (
                <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[200] max-w-sm w-full mx-4 animate-in slide-in-from-top fade-in duration-300 pointer-events-none">
                    <div className="mc-panel bg-[#2b2b2b] border-4 border-[#ff5555] shadow-[0_0_20px_rgba(255,85,85,0.4)] p-4 text-center">
                        <h3 className="text-[#ff5555] font-bold text-2xl uppercase tracking-wider mb-2">
                            {showProfanityWarning ? "Language Warning" : "Access Denied"}
                        </h3>
                        <p className="text-slate-300 text-lg">
                            {showProfanityWarning
                                ? "No negative or vulgar language allowed in this server!"
                                : "Join the server first! Click 'PROFILE' in the top right to set your username."
                            }
                        </p>
                    </div>
                </div>
            )}

            <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
        </section>
    );
};

export default Community;
