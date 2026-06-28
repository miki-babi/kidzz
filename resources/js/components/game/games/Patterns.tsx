import { router } from '@inertiajs/react';
import { useState, useEffect, useCallback } from 'react';
import { GameShell } from '@/components/game/GameShell';
import type { CheckResult } from '@/components/game/GameShell';
import { RewardOverlay } from '@/components/game/RewardOverlay';
import { playPop, playSuccess, playWrong, speak } from '@/lib/feedback';
import { elapsedGameSeconds, useGameStartTime } from '@/lib/game-timing';
import { completeGame } from '@/lib/store';

/* ─────────────────────────────────────────────
   Duolingo-style Pattern Completion
   ─────────────────────────────────────────────
   Sequence row: uniform white square cards with flat border
   Question mark: dashed border card with light tint
   Choice cards: letterpress buttons with 4px bottom shadow
   Selection: blue border (#1CB0F6) + light blue tint
   ───────────────────────────────────────────── */

interface Round {
    seq: string[];
    answer: string;
    choices: string[];
}

const ROUNDS: Round[] = [
    {
        seq: ['🔴', '🔵', '🔴', '🔵'],
        answer: '🔴',
        choices: ['🔴', '🔵', '🟢'],
    },
    {
        seq: ['🟢', '🟢', '🟡', '🟢', '🟢'],
        answer: '🟡',
        choices: ['🔴', '🟡', '🟢'],
    },
    {
        seq: ['⭐', '🌙', '⭐', '🌙'],
        answer: '⭐',
        choices: ['🌙', '⭐', '☀️'],
    },
];

const CARD_CLASS =
    'flex size-20 items-center justify-center rounded-2xl border-2 border-[#E5E5E5] bg-white text-5xl';

const DASHED_CARD_CLASS =
    'flex size-20 items-center justify-center rounded-2xl border-2 border-dashed border-[#B8B8B8] bg-[#F5F5F5] text-5xl text-[#B8B8B8]';

export function Patterns() {
    const [round, setRound] = useState(0);
    const [selected, setSelected] = useState<string | null>(null);
    const [checkResult, setCheckResult] = useState<CheckResult>('idle');
    const [shake, setShake] = useState<string | null>(null);
    const [won, setWon] = useState(false);
    const startTime = useGameStartTime();
    const r = ROUNDS[round];

    useEffect(() => {
        speak('What comes next?');
    }, [round]);

    const pick = useCallback((c: string) => {
        playPop();
        setSelected(c);
        setCheckResult('idle');
    }, []);

    const handleCheck = useCallback(() => {
        if (!selected) {
            return;
        }

        if (selected === r.answer) {
            playSuccess();
            setCheckResult('correct');
        } else {
            playWrong();
            setCheckResult('incorrect');
            setShake(selected);
            setTimeout(() => setShake(null), 400);
        }
    }, [selected, r.answer]);

    const handleNext = useCallback(() => {
        if (checkResult === 'incorrect') {
            // Allow user to retry
            setSelected(null);
            setCheckResult('idle');

            return;
        }

        if (round + 1 >= ROUNDS.length) {
            const duration = elapsedGameSeconds(startTime.current);
            completeGame('patterns', 'patterns', 100);
            router.post('/games/patterns/result', { score: 100, duration });
            setTimeout(() => setWon(true), 400);
        } else {
            setSelected(null);
            setCheckResult('idle');
            setRound(round + 1);
        }
    }, [checkResult, round, startTime]);

    return (
        <GameShell
            instruction="What comes next?"
            mascot="🦉"
            totalRounds={ROUNDS.length}
            currentRound={round + (checkResult === 'correct' ? 1 : 0)}
            checkEnabled={selected !== null}
            onCheck={handleCheck}
            checkResult={checkResult}
            correctAnswer={r.answer}
            onNext={handleNext}
        >
            <div className="flex w-full max-w-xl flex-col items-center gap-10">
                {/* ═══ SEQUENCE ROW (Target Area) ═══ */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                    {r.seq.map((s, i) => (
                        <span key={i} className={CARD_CLASS}>
                            {s}
                        </span>
                    ))}

                    {/* Dashed "?" slot card */}
                    <span className={DASHED_CARD_CLASS}>
                        {selected ? selected : '?'}
                    </span>
                </div>

                {/* ═══ CHOICE CARDS (Tactile Blocks) ═══ */}
                <div className="flex gap-4">
                    {r.choices.map((c) => {
                        const isSelected = selected === c;

                        return (
                            <button
                                key={c}
                                onClick={() => pick(c)}
                                className={`flex size-24 items-center justify-center rounded-2xl border-2 text-6xl transition-all duration-150 active:scale-[0.95] ${
                                    isSelected
                                        ? 'border-[#1CB0F6] bg-[#DDF4FF] shadow-[0_4px_0_#0E7DB3]'
                                        : 'border-[#E5E5E5] bg-white shadow-[0_4px_0_#D0D0D0] hover:-translate-y-0.5 hover:shadow-[0_6px_0_#D0D0D0]'
                                } ${shake === c ? 'animate-wiggle' : ''}`}
                            >
                                {c}
                            </button>
                        );
                    })}
                </div>
            </div>

            {won && <RewardOverlay stars={3} gameRoute="patterns" />}
        </GameShell>
    );
}
