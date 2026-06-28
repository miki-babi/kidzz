import { router } from '@inertiajs/react';
import { useState, useEffect, useCallback } from 'react';
import { GameShell } from '@/components/game/GameShell';
import type { CheckResult } from '@/components/game/GameShell';
import { RewardOverlay } from '@/components/game/RewardOverlay';
import { playPop, playSuccess, playWrong, speak } from '@/lib/feedback';
import { elapsedGameSeconds, useGameStartTime } from '@/lib/game-timing';
import { completeGame } from '@/lib/store';

/* ─────────────────────────────────────────────
   Duolingo-style Sequential Ordering
   ─────────────────────────────────────────────
   Cards: rectangular with 16px radius, 4px bottom shadow
   Content: numbered badge | icon frame | bold left-aligned text
   Selected card: blue border + light blue tint
   ───────────────────────────────────────────── */

interface Step {
    key: string;
    emoji: string;
    label: string;
}

// correct order top-to-bottom
const STEPS: Step[] = [
    { key: 'pick', emoji: '🪥', label: 'Pick Brush' },
    { key: 'paste', emoji: '🧴', label: 'Add Paste' },
    { key: 'brush', emoji: '😬', label: 'Brush Teeth' },
    { key: 'rinse', emoji: '🚿', label: 'Rinse' },
];

function shuffle<T>(a: T[]): T[] {
    return [...a].sort(() => Math.random() - 0.5);
}

export function Sequencing() {
    const [pool] = useState(() => shuffle(STEPS));
    const [order, setOrder] = useState<string[]>([]);
    const [checkResult, setCheckResult] = useState<CheckResult>('idle');
    const [shake, setShake] = useState<string | null>(null);
    const [won, setWon] = useState(false);
    const startTime = useGameStartTime();

    useEffect(() => {
        speak('Put the steps in the right order');
    }, []);

    const tap = useCallback(
        (step: Step) => {
            if (order.includes(step.key) || checkResult !== 'idle') {
                return;
            }

            playPop();
            const expected = STEPS[order.length].key;

            if (step.key === expected) {
                playSuccess();
                const next = [...order, step.key];
                setOrder(next);
            } else {
                playWrong();
                setShake(step.key);
                setTimeout(() => setShake(null), 400);
            }
        },
        [order, checkResult],
    );

    const handleCheck = useCallback(() => {
        if (order.length < STEPS.length) {
            return;
        }

        // All placed correctly - check if any wrong
        const allCorrect = order.every((key, i) => key === STEPS[i].key);

        if (allCorrect) {
            playSuccess();
            setCheckResult('correct');
            const duration = elapsedGameSeconds(startTime.current);
            completeGame('sequencing', 'sequencing', 100);
            router.post('/games/sequencing/result', { score: 100, duration });
            setTimeout(() => setWon(true), 500);
        } else {
            playWrong();
            setCheckResult('incorrect');
        }
    }, [order, startTime]);

    const handleNext = useCallback(() => {
        if (checkResult === 'incorrect') {
            // Reset and let user try again
            setOrder([]);
            setCheckResult('idle');
        }
    }, [checkResult]);

    const allPlaced = order.length >= STEPS.length;

    return (
        <GameShell
            instruction="Put the steps in the right order"
            mascot="🦉"
            totalRounds={1}
            currentRound={allPlaced ? 1 : 0}
            checkEnabled={allPlaced}
            onCheck={handleCheck}
            checkResult={checkResult}
            correctAnswer={STEPS.map((s) => s.label).join(' → ')}
            onNext={handleNext}
        >
            <div className="flex w-full max-w-md flex-col gap-3">
                {pool.map((s) => {
                    const idx = order.indexOf(s.key);
                    const placed = idx >= 0;

                    return (
                        <button
                            key={s.key}
                            onClick={() => tap(s)}
                            disabled={checkResult !== 'idle'}
                            className={`flex min-h-[80px] w-full items-center gap-4 rounded-2xl border-2 bg-white px-4 py-3 text-left transition-all duration-150 active:scale-[0.98] ${
                                placed
                                    ? 'border-[#1CB0F6] bg-[#DDF4FF] shadow-[0_4px_0_#0E7DB3]'
                                    : 'border-[#E5E5E5] shadow-[0_4px_0_#D0D0D0] hover:-translate-y-0.5 hover:shadow-[0_6px_0_#D0D0D0]'
                            } ${shake === s.key ? 'animate-wiggle' : ''} ${
                                checkResult !== 'idle'
                                    ? 'pointer-events-none opacity-70'
                                    : ''
                            }`}
                        >
                            {/* Numbered Index Badge */}
                            <span
                                className={`flex size-10 shrink-0 items-center justify-center rounded-full text-lg font-extrabold transition-all ${
                                    placed
                                        ? 'bg-[#1CB0F6] text-white shadow-[inset_0_-2px_0_#0E7DB3]'
                                        : 'border-2 border-[#E5E5E5] bg-white text-[#B8B8B8]'
                                }`}
                            >
                                {placed ? idx + 1 : '—'}
                            </span>

                            {/* Icon Frame */}
                            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border-2 border-[#E5E5E5] bg-white text-3xl">
                                {s.emoji}
                            </span>

                            {/* Label */}
                            <span className="flex-1 text-left text-lg font-bold text-[#3C3C3C]">
                                {s.label}
                            </span>

                            {/* Placed check */}
                            {placed && (
                                <span className="text-2xl text-[#1CB0F6]">
                                    ✓
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>

            {won && <RewardOverlay stars={3} gameRoute="sequencing" />}
        </GameShell>
    );
}
