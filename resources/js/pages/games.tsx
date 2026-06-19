import { Head, router, usePage } from '@inertiajs/react';
import { Lock, Sparkles, Trophy, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import Footer from '@/components/footer';
import GameCard, { type GameCardData } from '@/components/game-card';
import LandingHeader from '@/components/landing-header';

interface GamesProps {
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

export default function Games({ games, hasActiveAccount, freeGamesLimit, recommendedCategory, demoPrice }: GamesProps) {
    const { flash } = usePage().props as {
        flash?: { status?: string };
    };
    const categories = useMemo(
        () => [...new Set(games.map((game) => game.category ?? 'Other'))],
        [games],
    );
    const [activeCategory, setActiveCategory] = useState(recommendedCategory);
    const [selectedGame, setSelectedGame] = useState<GameCardData | null>(null);

    const visibleGames = games.filter((game) => (game.category ?? 'Other') === activeCategory);

    useEffect(() => {
        console.log('[Games] page loaded', {
            hasActiveAccount,
            freeGamesLimit,
            recommendedCategory,
            demoPrice,
            flash,
            gameCount: games.length,
        });
    }, [demoPrice, flash, freeGamesLimit, games.length, hasActiveAccount, recommendedCategory]);

    useEffect(() => {
        console.log('[Games] flash changed', flash);
    }, [flash]);

    return (
        <>
            <Head title="Games" />
            <div className="min-h-screen bg-[#FAFAFA] text-[#1b1b18] antialiased dark:bg-[#09090b] dark:text-[#f4f4f5]">
                <LandingHeader />

                <main>
                  

                    <section className="py-10">
                        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 lg:px-8">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-2xl font-black tracking-tight text-neutral-900 dark:text-white">
                                        Choose a category
                                    </h2>
                                    <p className="mt-1 text-sm font-medium text-neutral-500">
                                        The recommended category is highlighted first.
                                    </p>
                                </div>
                                <div className="hidden items-center gap-2 rounded-full bg-[#E8EDF2] px-4 py-2 text-xs font-bold text-neutral-500 shadow-[-3px_-3px_6px_rgba(255,255,255,0.9),3px_3px_6px_rgba(0,0,0,0.06)] sm:flex">
                                    <Trophy className="h-4 w-4 text-amber-500" />
                                    {hasActiveAccount ? 'Premium access active' : 'Free access only'}
                                </div>
                            </div>

                            <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setActiveCategory(category)}
                                        className={`whitespace-nowrap rounded-full px-5 py-3 text-sm font-black transition-all duration-200 ${
                                            activeCategory === category
                                                ? 'bg-[#D2232A] text-white shadow-[-4px_-4px_8px_rgba(255,255,255,0.3),4px_4px_8px_rgba(0,0,0,0.1)]'
                                                : 'bg-[#E8EDF2] text-neutral-700 shadow-[-4px_-4px_8px_rgba(255,255,255,0.9),4px_4px_8px_rgba(0,0,0,0.06)] hover:shadow-[-6px_-6px_12px_rgba(255,255,255,0.9),6px_6px_12px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 active:shadow-[inset_-4px_-4px_8px_rgba(255,255,255,0.9),inset_4px_4px_8px_rgba(0,0,0,0.1)] active:translate-y-0'
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
                                <div className="rounded-[2rem] border border-dashed border-neutral-200 bg-white p-10 text-center text-neutral-500 dark:border-zinc-800 dark:bg-zinc-950">
                                    No games found in this category yet.
                                </div>
                            )}
                        </div>
                    </section>
                </main>

                <Footer />
            </div>

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
                                    onClick={() => {
                                        console.log('[Games] dismissed pay modal', selectedGame);
                                        setSelectedGame(null);
                                    }}
                                    className="flex-1 rounded-full border border-neutral-200 px-5 py-3 text-sm font-black text-neutral-700 transition hover:bg-neutral-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
                                >
                                    Not now
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        console.log('[Games] navigating to demo payment page', {
                                            route: '/pay',
                                            selectedGame,
                                        });
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
