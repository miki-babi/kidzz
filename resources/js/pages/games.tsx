import { Head, router, usePage } from '@inertiajs/react';
import { Lock, Sparkles, X, Zap, Star } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import GameCard from '@/components/game-card';
import type { GameCardData } from '@/components/game-card';
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

export default function Games({
    games,
    hasActiveAccount,
    freeGamesLimit,
    recommendedCategory,
    demoPrice,
}: GamesProps) {
    const { flash } = usePage().props as {
        flash?: { status?: string };
    };
    const categories = useMemo(
        () => [...new Set(games.map((game) => game.category ?? 'Other'))],
        [games],
    );
    const [activeCategory, setActiveCategory] = useState(recommendedCategory);
    const [selectedGame, setSelectedGame] = useState<GameCardData | null>(null);

    const visibleGames = games.filter(
        (game) => (game.category ?? 'Other') === activeCategory,
    );

    useEffect(() => {
        console.log('[Games] page loaded', {
            hasActiveAccount,
            freeGamesLimit,
            recommendedCategory,
            demoPrice,
            flash,
            gameCount: games.length,
        });
    }, [
        demoPrice,
        flash,
        freeGamesLimit,
        games.length,
        hasActiveAccount,
        recommendedCategory,
    ]);

    useEffect(() => {
        console.log('[Games] flash changed', flash);
    }, [flash]);

    return (
        <>
            <Head title="Games" />
            <div className="min-h-screen bg-white text-[#3C3C3C] antialiased dark:bg-[#09090b] dark:text-[#f4f4f5]">
                <LandingHeader />

                <main>
                    {/* Duolingo-style hero banner */}

                    <section className="py-10">
                        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 lg:px-8">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-2xl font-extrabold tracking-tight text-[#3C3C3C] dark:text-white">
                                        Choose a category
                                    </h2>
                                    <p className="mt-1 text-sm font-semibold text-[#777777]">
                                        The recommended category is highlighted
                                        first.
                                    </p>
                                </div>
                            </div>

                            {/* Duolingo-style category pills */}
                            <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
                                {categories.map((category) => {
                                    const isActive =
                                        activeCategory === category;
                                    const colorMap: Record<string, string> = {
                                        [recommendedCategory]: 'bg-duo-red',
                                    };
                                    const bgColor = isActive
                                        ? colorMap[category] || 'bg-duo-red'
                                        : 'bg-duo-red';
                                    const textColor = isActive
                                        ? '#FFFFFF'
                                        : '#777777';

                                    return (
                                        <button
                                            key={category}
                                            onClick={() =>
                                                setActiveCategory(category)
                                            }
                                            className={`inline-flex items-center gap-2 rounded-xl border-2 px-5 py-2.5 text-sm font-black tracking-wider whitespace-nowrap uppercase transition-all active:translate-y-0.5 ${
                                                activeCategory === category
                                                    ? 'border-[#D62B2B] bg-[#FF4B4B] text-white shadow-[0_3px_0_#B30000] hover:translate-y-px hover:shadow-[0_2px_0_#B30000]'
                                                    : 'border-[#E5E5E5] bg-white text-[#777777] shadow-[0_2px_0_#C4C4C4] hover:translate-y-px hover:bg-neutral-50 hover:shadow-[0_1px_0_#C4C4C4]'
                                            }`}
                                            style={{
                                                backgroundColor: bgColor,
                                                color: textColor,
                                                border: isActive
                                                    ? '2px solid transparent'
                                                    : '2px solid #E5E5E5',
                                            }}
                                        >
                                            {category}
                                            {category ===
                                                recommendedCategory && (
                                                <span className="ml-2 inline-flex items-center gap-0.5 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-extrabold tracking-widest uppercase">
                                                    <Sparkles className="h-3 w-3" />{' '}
                                                    Best
                                                </span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>

                            {visibleGames.length > 0 ? (
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                                    {visibleGames.map((game) => (
                                        <GameCard
                                            key={game.id}
                                            game={game}
                                            href={`/games/${game.routePath}`}
                                            onLockedClick={() =>
                                                setSelectedGame(game)
                                            }
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="card-duo p-16 text-center">
                                    <div className="mb-4 text-6xl">🎮</div>
                                    <p className="text-lg font-bold text-[#777777]">
                                        No games found in this category yet.
                                    </p>
                                </div>
                            )}
                        </div>
                    </section>
                </main>
            </div>

            {/* Duolingo-style unlock modal */}
            {selectedGame && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#3C3C3C]/70 px-4 backdrop-blur-sm">
                    <div className="relative w-full max-w-lg card-duo p-8 shadow-2xl">
                        <button
                            type="button"
                            onClick={() => setSelectedGame(null)}
                            className="absolute top-4 right-4 rounded-full p-2 text-[#777777] transition hover:bg-[#F7F7F7] hover:text-[#3C3C3C] dark:hover:bg-zinc-900"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        <div className="space-y-6 text-center">
                            {/* Mascot */}
                            <div className="mx-auto flex h-20 w-20 float-duo items-center justify-center rounded-full bg-[#FFC800] text-5xl shadow-md">
                                🦁
                            </div>

                            <div className="inline-flex items-center gap-2 rounded-full bg-[#FF4B4B]/10 px-4 py-2 text-xs font-extrabold tracking-wider text-[#FF4B4B] uppercase">
                                <Lock className="h-4 w-4" />
                                Premium Game
                            </div>

                            <div>
                                <h3 className="text-2xl font-extrabold tracking-tight text-[#3C3C3C] dark:text-white">
                                    Unlock {selectedGame.name}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-[#777777]">
                                    This is a demo payment flow. Pay{' '}
                                    {currency(demoPrice)} to unlock premium
                                    access and open all locked games.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="rounded-2xl border-2 border-[#E5E5E5] bg-[#F7F7F7] p-4">
                                    <div className="text-[11px] font-extrabold tracking-widest text-[#777777] uppercase">
                                        Plan
                                    </div>
                                    <div className="mt-1 flex items-center justify-center gap-1 text-lg font-extrabold text-[#3C3C3C] dark:text-white">
                                        <Star className="h-4 w-4 text-[#FFC800]" />{' '}
                                        Premium
                                    </div>
                                </div>
                                <div className="rounded-2xl border-2 border-[#E5E5E5] bg-[#F7F7F7] p-4">
                                    <div className="text-[11px] font-extrabold tracking-widest text-[#777777] uppercase">
                                        Price
                                    </div>
                                    <div className="mt-1 text-lg font-extrabold text-[#58CC02]">
                                        {currency(demoPrice)}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setSelectedGame(null)}
                                    className="btn-duo-outline inline-flex flex-1 items-center justify-center px-5 py-3 text-sm"
                                >
                                    Not now
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        console.log(
                                            '[Games] navigating to demo payment page',
                                            {
                                                route: '/pay',
                                                selectedGame,
                                            },
                                        );
                                        router.visit('/pay');
                                    }}
                                    className="btn-duo-green inline-flex flex-1 items-center justify-center px-5 py-3 text-sm shadow-md glow-duo"
                                >
                                    <Zap className="h-4 w-4" /> Unlock Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
