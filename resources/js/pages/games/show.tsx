import type {ComponentType, JSX} from 'react';
import { CauseEffect } from '@/components/game/games/CauseEffect';
import { Dressing } from '@/components/game/games/Dressing';
import { Emotions } from '@/components/game/games/Emotions';
import { HandWashing } from '@/components/game/games/HandWashing';
import { MatchColors } from '@/components/game/games/MatchColors';
import { Memory } from '@/components/game/games/Memory';
import { Patterns } from '@/components/game/games/Patterns';
import { Sequencing } from '@/components/game/games/Sequencing';
import { Sorting } from '@/components/game/games/Sorting';
import { TapStar } from '@/components/game/games/TapStar';

interface Game {
    id: number;
    name: string;
    description: string | null;
    category: string | null;
    routePath: string;
    imagePath: string | null;
}

const GAME_COMPONENTS: Record<string, ComponentType> = {
    'tap-star': TapStar,
    'match-colors': MatchColors,
    sorting: Sorting,
    patterns: Patterns,
    memory: Memory,
    sequencing: Sequencing,
    'cause-effect': CauseEffect,
    emotions: Emotions,
    handwashing: HandWashing,
    dressing: Dressing,
};

export default function GameShow({ game }: { game: Game }): JSX.Element {
    const Component = GAME_COMPONENTS[game.routePath];

    if (!Component) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
                <div className="text-center">
                    <h1 className="text-4xl font-bold">Game Not Found</h1>
                    <p className="mt-2 text-muted-foreground">
                        The game "{game.name}" has no component registered.
                    </p>
                </div>
            </div>
        );
    }

    return <Component />;
}