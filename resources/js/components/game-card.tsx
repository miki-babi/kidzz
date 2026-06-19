import { Link } from '@inertiajs/react';
import { Lock, PlayCircle } from 'lucide-react';

export interface GameCardData {
    id: number;
    name: string;
    description: string | null;
    category: string | null;
    routePath: string;
    imagePath: string | null;
    is_free: boolean;
    is_locked: boolean;
}

type Props = {
    game: GameCardData;
    href: string;
    showPlayButton?: boolean;
    onLockedClick?: () => void;
};

export default function GameCard({ game, href, showPlayButton = true, onLockedClick }: Props) {
    const content = (
        <div className="group relative overflow-hidden rounded-[2rem] bg-[#E8EDF2] shadow-[-6px_-6px_12px_rgba(255,255,255,0.9),6px_6px_12px_rgba(0,0,0,0.06)] transition-all duration-300 hover:shadow-[-8px_-8px_16px_rgba(255,255,255,0.9),8px_8px_16px_rgba(0,0,0,0.1)] hover:-translate-y-1">
            <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20">
                {game.imagePath ? (
                    <img
                        src={game.imagePath}
                        alt={game.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-6xl font-black text-red-500/30">
                        {game.name.slice(0, 1)}
                    </div>
                )}

                {game.is_locked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-neutral-950/60 backdrop-blur-sm">
                        <div className="rounded-full bg-white/10 p-4 text-white">
                            <Lock className="h-8 w-8" />
                        </div>
                    </div>
                )}
            </div>

            <div className="space-y-3 p-5">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <h3 className="truncate text-lg font-black text-neutral-900 dark:text-white">
                            {game.name}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-sm font-medium text-neutral-500">
                            {game.description ?? 'A playful learning activity.'}
                        </p>
                    </div>
                    <span
                        className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-widest ${
                            game.is_free
                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300'
                                : 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300'
                        }`}
                    >
                        {game.is_free ? 'Free' : 'Locked'}
                    </span>
                </div>

                <div className="flex items-center justify-between pt-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                        {game.category ?? 'Other'}
                    </span>

                    {showPlayButton && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-red-600 px-4 py-2 text-sm font-black text-white transition-colors group-hover:bg-red-700">
                            <PlayCircle className="h-4 w-4" />
                            {game.is_locked ? 'Unlock' : 'Play'}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );

    if (game.is_locked && onLockedClick) {
        return (
            <button type="button" onClick={onLockedClick} className="text-left">
                {content}
            </button>
        );
    }

    return (
        <Link href={href}>
            {content}
        </Link>
    );
}
