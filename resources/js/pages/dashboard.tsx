import { Head, router, usePage } from '@inertiajs/react';
import { Lock, Sparkles, X, Flame, Gem, Trophy, Zap, Star, Award, ArrowRight } from 'lucide-react';
import { useMemo, useState, useEffect } from 'react';
import GameCard, { type GameCardData } from '@/components/game-card';
import { useCurrentProfile } from '@/lib/store';

interface DashboardProps {
    games: GameCardData[];
    hasActiveAccount: boolean;
    freeGamesLimit: number;
    recommendedCategory: string;
    demoPrice: number;
}

function currency(price: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(price);
}

// Duolingo-style category icons
function getCategoryIcon(category: string): string {
    const iconMap: Record<string, string> = {
        'Communication Skill': '💬',
        'Daily Routine': '⏰',
        'Sensory Space': '🖐️',
        'Social Skills': '🤝',
        'Emotions': '😊',
        'Learning': '📚',
        'Games': '🎮',
    };
    return iconMap[category] ?? '📖';
}

export default function Dashboard({ games, hasActiveAccount, freeGamesLimit, recommendedCategory, demoPrice }: DashboardProps) {
    const profile = useCurrentProfile();
    const [activeCategory, setActiveCategory] = useState(recommendedCategory);
    const [selectedGame, setSelectedGame] = useState<GameCardData | null>(null);
    const { flash } = usePage().props as {
        flash?: { status?: string };
    };

    const categories = useMemo(
        () => [...new Set(games.map((game) => game.category ?? 'Other'))],
        [games],
    );

    const visibleGames = games.filter((game) => (game.category ?? 'Other') === activeCategory);
    useEffect(() => {
        console.log('[Games] flash changed', flash);
    }, [flash]);

    // Mock stats for Duolingo-style header
    const streakCount = 5;
    const gemCount = 120;

    return (
        <>
            <Head title="Dashboard" />

            {/* ===== DUOLINGO-STYLE DASHBOARD ===== */}
            <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-5 px-4 pb-8 pt-2">
                {/* ─── 1. TOP NAV / PROFILE + STATS ─── */}
                {profile && (
                    <div className="flex items-center justify-between border-b-2 border-[#E5E5E5] pb-4">
                        <div className="flex items-center gap-3">
                            {/* Cartoon-style avatar emoji */}
                            <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#E5E5E5] bg-[#FFF3C7] text-2xl shadow-[0_2px_0_#C4C4C4]">
                                {profile.avatar}
                            </span>
                            <div>
                                <h2 className="text-lg font-black text-[#3C3C3C]">
                                    {profile.name}
                                </h2>
                                <div className="flex items-center gap-3 text-sm font-bold text-[#777777]">
                                    <span className="flex items-center gap-1">
                                        <Trophy className="h-4 w-4 text-[#FF9600]" />
                                        Lv.{profile.level}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Star className="h-4 w-4 text-[#FF9600]" fill="#FF9600" />
                                        {profile.xp} XP
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Duolingo-style stats row: Streak + Gems */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5 rounded-xl border-2 border-[#E5E5E5] bg-white px-3 py-1.5 shadow-[0_2px_0_#C4C4C4]">
                                <Flame className="h-5 w-5 text-[#FF4B4B]" fill="#FF4B4B" />
                                <span className="text-base font-black text-[#3C3C3C]">{streakCount}</span>
                            </div>
                            <div className="flex items-center gap-1.5 rounded-xl border-2 border-[#E5E5E5] bg-white px-3 py-1.5 shadow-[0_2px_0_#C4C4C4]">
                                <Gem className="h-5 w-5 text-[#1CB0F6]" fill="#1CB0F6" />
                                <span className="text-base font-black text-[#3C3C3C]">{gemCount}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* ─── 2. MEGA BANNER ("Recommended") ─── */}
                <div className="relative overflow-hidden rounded-2xl border-b-4 border-shadowred bg-duo-darkred px-6 py-5 text-white">
                    {/* Character illustration */}
                    <img
                        src="/asset/maskot/maskot_waving.png"
                        alt="Maskot waving"
                        className="absolute bottom-0 right-4 h-28 w-28 select-none object-contain sm:h-36 sm:w-36"
                    />

                    <div className="relative z-10 max-w-lg space-y-3">
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-[11px] font-black uppercase tracking-[0.15em]">
                            <Sparkles className="h-3.5 w-3.5" />
                            Recommended
                        </div>
                        <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
                            {recommendedCategory}
                        </h1>
                        <p className="text-sm leading-relaxed text-white/80">
                            Start with the first {freeGamesLimit} games for free.{' '}
                            {hasActiveAccount
                                ? 'Your premium account unlocks every game!'
                                : 'Upgrade to premium to unlock the full library.'}
                        </p>

                        {/* Duolingo-style pill badge */}
                        <div className="inline-flex items-center gap-1.5 rounded-full border-2 border-white/30 bg-white/15 px-4 py-1.5 text-xs font-black uppercase tracking-wider">
                            <Zap className="h-3.5 w-3.5" />
                            {freeGamesLimit} FREE GAMES
                        </div>

                        {flash?.status && (
                            <div className="inline-flex rounded-full bg-white/20 px-4 py-2 text-sm font-bold">
                                {flash.status}
                            </div>
                        )}
                    </div>
                </div>

                {/* ─── 3. CATEGORY FILTER PILLS ─── */}
                <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-1">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`inline-flex items-center gap-2 whitespace-nowrap rounded-xl border-2 px-5 py-2.5 text-sm font-black uppercase tracking-wider transition-all active:translate-y-0.5 ${
                                activeCategory === category
                                    ? 'border-[#D62B2B] bg-[#FF4B4B] text-white shadow-[0_3px_0_#B30000] hover:shadow-[0_2px_0_#B30000] hover:translate-y-px'
                                    : 'border-[#E5E5E5] bg-white text-[#777777] shadow-[0_2px_0_#C4C4C4] hover:bg-neutral-50 hover:shadow-[0_1px_0_#C4C4C4] hover:translate-y-px'
                            }`}
                        >
                            <span className="text-lg">{getCategoryIcon(category)}</span>
                            <span>{category}</span>
                            {category === recommendedCategory && (
                                <Sparkles className="h-3.5 w-3.5 shrink-0" />
                            )}
                        </button>
                    ))}
                </div>

                {/* ─── 4. GAME CARDS GRID ─── */}
                {visibleGames.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {visibleGames.map((game) => (
                            <GameCard
                                key={game.id}
                                game={game}
                                href={`/games/${game.routePath}`}
                                onLockedClick={() => setSelectedGame(game)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-[#E5E5E5] py-16 text-center">
                        <span className="text-5xl">🔍</span>
                        <p className="text-lg font-bold text-[#777777]">
                            No games in this category yet.
                        </p>
                        <button
                            onClick={() => setActiveCategory(recommendedCategory)}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-[#FF4B4B] px-5 py-2.5 text-sm font-black uppercase tracking-wider text-white shadow-[0_3px_0_#B30000] transition-all active:translate-y-0.5"
                        >
                            <ArrowRight className="h-4 w-4" />
                            Try recommended
                        </button>
                    </div>
                )}
            </div>

            {/* ─── DUOLINGO-STYLE UNLOCK OVERLAY ─── */}
            {selectedGame && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/70 px-4 backdrop-blur-sm">
                    <div className="relative w-full max-w-md overflow-hidden rounded-2xl border-2 border-[#E5E5E5] bg-white shadow-xl">
                        {/* Decorative top bar */}
                        <div className="bg-gradient-to-r from-[#FF9600] via-[#FF4B4B] to-[#CE82FF] px-6 py-3">
                            <div className="flex items-center gap-2">
                                <Award className="h-5 w-5 text-white" />
                                <span className="text-sm font-black uppercase tracking-wider text-white">
                                    Premium Feature
                                </span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => setSelectedGame(null)}
                            className="absolute right-3 top-3 rounded-full p-1.5 text-white/80 transition hover:bg-white/20 hover:text-white"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        <div className="space-y-5 p-6">
                            <div className="flex items-center gap-4">
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-[#E5E5E5] bg-[#FFF3C7] shadow-[0_3px_0_#C4C4C4]">
                                    <Lock className="h-7 w-7 text-[#FF9600]" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-[#3C3C3C]">
                                        Unlock {selectedGame.name}
                                    </h3>
                                    <p className="mt-1 text-sm font-medium text-[#777777]">
                                        This is a demo payment flow. Pay {currency(demoPrice)} to unlock premium access.
                                    </p>
                                </div>
                            </div>

                            {/* Pricing boxes */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="rounded-xl border-2 border-[#E5E5E5] bg-[#F7F7F8] p-3">
                                    <div className="text-[10px] font-black uppercase tracking-widest text-[#777777]">
                                        Plan
                                    </div>
                                    <div className="mt-1 text-base font-black text-[#3C3C3C]">
                                        Premium
                                    </div>
                                </div>
                                <div className="rounded-xl border-2 border-[#E5E5E5] bg-[#F7F7F8] p-3">
                                    <div className="text-[10px] font-black uppercase tracking-widest text-[#777777]">
                                        Price
                                    </div>
                                    <div className="mt-1 text-base font-black text-[#3C3C3C]">
                                        {currency(demoPrice)}
                                    </div>
                                </div>
                            </div>

                            {/* Duolingo-style buttons */}
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setSelectedGame(null)}
                                    className="flex-1 rounded-xl border-2 border-[#E5E5E5] bg-white px-5 py-3 text-sm font-black uppercase tracking-wider text-[#777777] shadow-[0_3px_0_#C4C4C4] transition-all active:translate-y-0.5 hover:bg-neutral-50"
                                >
                                    Not now
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        router.visit('/pay');
                                    }}
                                    className="flex-1 rounded-xl bg-[#FF4B4B] px-5 py-3 text-sm font-black uppercase tracking-wider text-white shadow-[0_3px_0_#B30000] transition-all active:translate-y-0.5 hover:bg-[#F03B3B]"
                                >
                                    <span className="flex items-center justify-center gap-1.5">
                                        <Gem className="h-4 w-4" />
                                        Pay now
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}