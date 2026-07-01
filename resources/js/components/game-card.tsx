import { Link } from '@inertiajs/react';
import { Lock, PlayCircle, Zap } from 'lucide-react';

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

// Duolingo-style vector illustration placeholder based on game name
function getGameEmoji(name: string): string {
    const emojiMap: Record<string, string> = {
        'Brush Teeth': '🪥',
        'Hand Washing': '🧼',
        Dressing: '👕',
        Emotions: '😊',
        'Match Colors': '🎨',
        Memory: '🧠',
        Patterns: '🔷',
        Sorting: '📦',
        Sequencing: '🧩',
        'Cause & Effect': '⚡',
        CauseEffect: '⚡',
    };

    for (const [key, emoji] of Object.entries(emojiMap)) {
        if (name.toLowerCase().includes(key.toLowerCase())) {
            return emoji;
        }
    }

    return '🎮';
}

export default function GameCard({
    game,
    href,
    showPlayButton = true,
    onLockedClick,
}: Props) {
    const content = (
        <div
            className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-200 ${
                game.is_locked
                    ? 'border-neutral-200 bg-neutral-100/80'
                    : 'border-[#E5E5E5] bg-white hover:-translate-y-0.5 hover:border-[#cccccc]'
            }`}
        >
            {/* Visual / Illustration Area */}
            <div
                className={`relative aspect-[16/10] overflow-hidden ${
                    game.is_locked
                        ? ' '
                        : 'bg-gradient-to-br from-[#F7F7F8] to-[#E8E8EC]'
                }`}
            >
                {game.imagePath ? (
                    <img
                        src={game.imagePath}
                        alt={game.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <span className="text-7xl">
                            {getGameEmoji(game.name)}
                        </span>
                    </div>
                )}

            </div>

            {/* Content Area */}
            <div className="space-y-3 p-4">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                        <h3 className="truncate text-lg font-black text-[#3C3C3C]">
                            {game.name}
                        </h3>
                        <p className="mt-0.5 line-clamp-1 text-sm font-medium text-[#777777]">
                            {game.description ?? 'A playful learning activity.'}
                        </p>
                    </div>
                </div>

                {/* Full-width Duolingo-style action button */}
                {showPlayButton && (
                    <button
                        type="button"
                        onClick={(e) => {
                            if (game.is_locked && onLockedClick) {
                                e.preventDefault();
                                e.stopPropagation();
                                onLockedClick();
                            }
                        }}
                        className={`relative w-full overflow-hidden rounded-xl py-3 text-center text-sm font-black tracking-wider uppercase transition-all active:translate-y-0.5 ${
                            game.is_locked
                                ? 'bg-[#FF9600] text-white shadow-[0_4px_0_#CC7800] hover:translate-y-px hover:shadow-[0_3px_0_#CC7800] active:shadow-[0_1px_0_#CC7800]'
                                : 'btn-duo-red text-white hover:translate-y-px active:shadow-[0_1px_0_#3FA002]'
                        }`}
                    >
                        {game.is_locked ? (
                            <span className="flex items-center justify-center gap-2">
                                <Lock className="h-4 w-4" />
                                Unlock
                            </span>
                        ) : (
                            <span className="flex items-center justify-center gap-2">
                                <PlayCircle className="h-4 w-4" fill="white" />
                                Play
                            </span>
                        )}
                    </button>
                )}

                {/* Category & free/locked badge row */}
                <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold tracking-widest text-neutral-400 uppercase">
                        {game.category ?? 'Other'}
                    </span>
                    {game.is_free && !game.is_locked && (
                        <span className="inline-flex items-center gap-1 rounded-full border-2 border-[#58CC02] bg-[#DDF4D4] px-2.5 py-0.5 text-[10px] font-black tracking-wider text-[#3FA002] uppercase">
                            <Zap className="h-3 w-3" />
                            Free
                        </span>
                    )}
                    {game.is_locked && (
                        <span className="inline-flex items-center gap-1 rounded-full border-2 border-[#FF9600] bg-[#FFF0D4] px-2.5 py-0.5 text-[10px] font-black tracking-wider text-[#CC7800] uppercase">
                            <Lock className="h-3 w-3" />
                            Locked
                        </span>
                    )}
                </div>
            </div>
        </div>
    );

    if (game.is_locked && onLockedClick) {
        return (
            <button
                type="button"
                onClick={onLockedClick}
                className="w-full text-left"
            >
                {content}
            </button>
        );
    }

    return (
        <Link href={href} className="block">
            {content}
        </Link>
    );
}
