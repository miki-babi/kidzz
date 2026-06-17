import { Head, router } from '@inertiajs/react';
import { Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';
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


export default function Dashboard({ games, hasActiveAccount, freeGamesLimit, recommendedCategory, demoPrice }: DashboardProps) {
    const profile = useCurrentProfile();
    const [activeCategory, setActiveCategory] = useState(recommendedCategory);

    const categories = useMemo(
        () => [...new Set(games.map((game) => game.category ?? 'Other'))],
        [games],
    );
    const [selectedGame, setSelectedGame] = useState<GameCardData | null>(null);

    const visibleGames = games.filter((game) => (game.category ?? 'Other') === activeCategory);

    return (
        <>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                {profile && (
                    <div className="flex items-center gap-4 rounded-[2rem] border border-neutral-100 bg-white p-4 shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
                        <span className="text-5xl">{profile.avatar}</span>
                        <div className="flex-1">
                            <h2 className="text-xl font-bold text-neutral-900">{profile.name}</h2>
                            <p className="text-sm font-medium text-neutral-500">
                                Level {profile.level} · ⭐ {profile.stars} · 🪙 {profile.coins} · {profile.xp} XP
                            </p>
                        </div>
                        <span className="text-3xl font-black text-red-600">Lv.{profile.level}</span>
                    </div>
                )}

                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-red-700 dark:bg-red-500/10 dark:text-red-300">
                            <Sparkles className="h-4 w-4" />
                            Recommended category
                        </div>
                        <h2 className="text-4xl font-black tracking-tighter md:text-6xl">Choose a Game</h2>
                        <p className="text-sm font-medium text-neutral-500">
                            Tap a game below to start playing. {hasActiveAccount ? 'Premium access is active.' : `Only the first ${freeGamesLimit} games are free.`}
                        </p>
                    </div>
                    <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`whitespace-nowrap rounded-full px-6 py-3 text-sm font-black transition-all ${
                                    activeCategory === category
                                        ? 'bg-red-600 text-white shadow-lg'
                                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800'
                                }`}
                            >
                                {category}
                                {category === recommendedCategory && (
                                    <span className="ml-2 rounded-full bg-white/15 px-2 py-0.5 text-[10px] uppercase tracking-widest">
                                        Recommended
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {visibleGames.length > 0 ? (
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                                    {visibleGames.map((game) => (
                                        <GameCard
                                            key={game.id}
                                            game={game}
                                            href={`/games/${game.routePath}`}
                                            onLockedClick={() => {
                                                console.log('[Dashboard] locked game clicked', game);
                                                router.visit('/pay');
                                            }}
                                        />
                                ))}
                            </div>
                ) : (
                    <p className="py-12 text-center text-lg font-medium text-neutral-400">
                        No games in this category yet.
                    </p>
                )}
            </div>
        </>
    );
}
