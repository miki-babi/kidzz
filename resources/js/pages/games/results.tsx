import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, BarChart3, Clock, Gamepad2, Star, Trophy } from 'lucide-react';
import { useState } from 'react';

interface GameResult {
    id: number;
    name: string;
    routePath: string;
    imagePath: string | null;
    best_score: number | null;
    times_played: number;
    last_played: string | null;
    total_duration: number;
}

interface CategoryResults {
    category: string;
    games: GameResult[];
}

interface ResultsProps {
    results: CategoryResults[];
}

function formatDuration(seconds: number): string {
    if (seconds < 60) {
return `${seconds}s`;
}

    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
}

function formatDate(dateStr: string | null): string {
    if (!dateStr) {
return 'Never';
}

    const date = new Date(dateStr);

    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

export default function Results({ results }: ResultsProps) {
    const [activeCategory, setActiveCategory] = useState(results[0]?.category ?? '');

    const categoryResults = results.find((r) => r.category === activeCategory);

    return (
        <>
            <Head title="Game Results" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                {/* Header */}
                <div className="flex items-center gap-4">
                    
                    <div>
                        <h1 className="text-3xl font-black tracking-tight">Game Results</h1>
                        <p className="mt-1 text-sm font-medium text-neutral-500">
                            View your scores and progress across all games
                        </p>
                    </div>
                </div>

                {/* Category filter tabs */}
                <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2">
                    {results.map((r) => (
                        <button
                            key={r.category}
                            onClick={() => setActiveCategory(r.category)}
                            className={`whitespace-nowrap rounded-full px-6 py-3 text-sm font-black transition-all ${
                                activeCategory === r.category
                                    ? 'bg-[#FF4B4B] text-white shadow-lg'
                                    : 'bg-neutral-100 text-neutral-600 hover:bg-[#FFDFDF] hover:text-[#FF4B4B]'
                            }`}
                        >
                            {r.category}
                        </button>
                    ))}
                </div>

                {/* Games grid */}
                {categoryResults && categoryResults.games.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
                        {categoryResults.games.map((game) => (
                            <div
                                key={game.id}
                                className="overflow-hidden rounded-3xl border border-neutral-100 bg-white shadow-md"
                            >
                                {/* Game header */}
                <div className="flex items-center gap-4 bg-gradient-to-br from-[#FFDFDF] to-orange-50 p-5">
                                    {game.imagePath ? (
                                        <img
                                            src={game.imagePath}
                                            alt={game.name}
                                            className="size-16 rounded-2xl object-cover shadow-sm"
                                        />
                                    ) : (
                                        <div className="flex size-16 items-center justify-center rounded-2xl bg-neutral-200 text-3xl">
                                            <Gamepad2 className="size-8 text-neutral-400" />
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-neutral-900">{game.name}</h3>
                                        <Link
                                            href={`/games/${game.routePath}`}
                                            className="inline-flex items-center gap-1 text-sm font-semibold text-[#FF4B4B] hover:text-[#D62B2B]"
                                        >
                                            Play again <ArrowLeft className="size-3 rotate-180" />
                                        </Link>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-px bg-neutral-100">
                                    <div className="flex flex-col items-center gap-1 bg-white p-4">
                                        <Trophy className="size-5 text-amber-500" />
                                        <span className="text-2xl font-black text-neutral-900">
                                            {game.best_score ?? '-'}
                                        </span>
                                        <span className="text-xs font-medium text-neutral-400">Best Score</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-1 bg-white p-4">
                                        <Gamepad2 className="size-5 text-blue-500" />
                                        <span className="text-2xl font-black text-neutral-900">
                                            {game.times_played}
                                        </span>
                                        <span className="text-xs font-medium text-neutral-400">Times Played</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-1 bg-white p-4">
                                        <Clock className="size-5 text-purple-500" />
                                        <span className="text-2xl font-black text-neutral-900">
                                            {formatDuration(game.total_duration)}
                                        </span>
                                        <span className="text-xs font-medium text-neutral-400">Total Time</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-1 bg-white p-4">
                                        <BarChart3 className="size-5 text-green-500" />
                                        <span className="text-xs font-medium text-neutral-400 leading-tight text-center">
                                            Last played
                                        </span>
                                        <span className="text-sm font-bold text-neutral-700 text-center">
                                            {formatDate(game.last_played)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center gap-4 py-20 text-neutral-400">
                        <Star className="size-16" />
                        <p className="text-lg font-medium">No games played yet in this category.</p>
                        <Link
                            href="/dashboard"
                            className="rounded-full bg-[#FF4B4B] px-6 py-3 text-sm font-black text-white shadow-lg transition-colors hover:bg-[#D62B2B]"
                        >
                            Start Playing
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}