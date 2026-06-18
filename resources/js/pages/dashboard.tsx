import { Head, router, usePage } from '@inertiajs/react';
import { Lock, Sparkles, X } from 'lucide-react';
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

    return (
        <>
            <Head title="Dashboard" />

            {/* Configured constraints to cap screen real estate cleanly */}
            <div className="mx-auto flex w-full max-w-5xl h-full flex-1 flex-col gap-6 rounded-xl p-4">
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
                
                {/* Fixed container constraints and stripped heavy background section layout padding leaks */}
                <div className="w-full rounded-[2rem] bg-gradient-to-br from-red-600 via-red-600 to-orange-500 p-6 text-white shadow-2xl shadow-red-500/20 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-2xl space-y-3">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em]">
                            <Sparkles className="h-4 w-4" />
                            Recommended category
                        </div>
                        <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
                            {recommendedCategory}
                        </h1>
                        <p className="max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
                            Start with the first {freeGamesLimit} games for free. {hasActiveAccount ? 'Your premium account unlocks every game.' : 'Upgrade to premium to unlock the full library with a demo payment.'}
                        </p>
                        {flash?.status && (
                            <div className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">
                                {flash.status}
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm min-w-[240px]">
                        <div className="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur">
                            <div className="text-[11px] font-bold uppercase tracking-widest text-white/70">Plan</div>
                            <div className="mt-1 text-lg font-black">{hasActiveAccount ? 'Premium' : 'Free'}</div>
                        </div>
                        <div className="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur">
                            <div className="text-[11px] font-bold uppercase tracking-widest text-white/70">Demo price</div>
                            <div className="mt-1 text-lg font-black">{currency(demoPrice)}</div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-2">
    {categories.map((category) => (
        <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full px-6 py-3 text-sm font-black transition-all ${
                activeCategory === category
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800'
            }`}
        >
            <span>{category}</span>
            {category === recommendedCategory && (
                <Sparkles className="h-4 w-4 shrink-0" />
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
                                onLockedClick={() => setSelectedGame(game)}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="py-12 text-center text-lg font-medium text-neutral-400">
                        No games in this category yet.
                    </p>
                )}
            </div>

            {/* Interactive Overlay Payment Pop-Up Wrapper */}
            {selectedGame && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/70 px-4 backdrop-blur-sm">
                    <div className="relative w-full max-w-lg rounded-[2rem] bg-white p-6 shadow-2xl dark:bg-zinc-950">
                        <button
                            type="button"
                            onClick={() => setSelectedGame(null)}
                            className="absolute right-4 top-4 rounded-full p-2 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-zinc-900"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-red-700 dark:bg-red-500/10 dark:text-red-300">
                                <Lock className="h-4 w-4" />
                                Demo payment required
                            </div>
                            <div>
                                <h3 className="text-2xl font-black tracking-tight text-neutral-900 dark:text-white">
                                    Unlock {selectedGame.name}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                                    This is a demo payment flow. Pay {currency(demoPrice)} to unlock premium access and open all locked games.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="rounded-2xl bg-neutral-50 p-4 dark:bg-zinc-900">
                                    <div className="text-[11px] font-black uppercase tracking-widest text-neutral-400">Plan</div>
                                    <div className="mt-1 text-lg font-black text-neutral-900 dark:text-white">Premium</div>
                                </div>
                                <div className="rounded-2xl bg-neutral-50 p-4 dark:bg-zinc-900">
                                    <div className="text-[11px] font-black uppercase tracking-widest text-neutral-400">Price</div>
                                    <div className="mt-1 text-lg font-black text-neutral-900 dark:text-white">{currency(demoPrice)}</div>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setSelectedGame(null)}
                                    className="flex-1 rounded-full border border-neutral-200 px-5 py-3 text-sm font-black text-neutral-700 transition hover:bg-neutral-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
                                >
                                    Not now
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        router.visit('/pay');
                                    }}
                                    className="flex-1 rounded-full bg-red-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-red-500/20 transition hover:bg-red-700"
                                >
                                    Pay now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}