import { router } from '@inertiajs/react';
import { useState, useEffect, useCallback } from 'react';
import { GameShell } from '@/components/game/GameShell';
import type { CheckResult } from '@/components/game/GameShell';
import { RewardOverlay } from '@/components/game/RewardOverlay';
import { playPop, playSuccess, playWrong, speak } from '@/lib/feedback';
import { elapsedGameSeconds, useGameStartTime } from '@/lib/game-timing';
import { completeGame } from '@/lib/store';

interface Round {
    weather: string;
    label: string;
    answer: string;
    choices: { key: string; emoji: string }[];
}

const ROUNDS: Round[] = [
    {
        weather: '☀️',
        label: 'It is sunny and hot',
        answer: 'tshirt',
        choices: [
            { key: 'tshirt', emoji: '👕' },
            { key: 'jacket', emoji: '🧥' },
            { key: 'scarf', emoji: '🧣' },
        ],
    },
    {
        weather: '❄️',
        label: 'It is cold and snowy',
        answer: 'jacket',
        choices: [
            { key: 'tshirt', emoji: '👕' },
            { key: 'jacket', emoji: '🧥' },
            { key: 'shorts', emoji: '🩳' },
        ],
    },
];

export function Dressing() {
    const [round, setRound] = useState(0);
    const [selected, setSelected] = useState<string | null>(null);
    const [checkResult, setCheckResult] = useState<CheckResult>('idle');
    const [shake, setShake] = useState<string | null>(null);
    const [won, setWon] = useState(false);
    const startTime = useGameStartTime();
    const r = ROUNDS[round];

    useEffect(() => {
        speak(`${r.label}. What should we wear?`);
    }, [r.label]);

    const pick = useCallback((key: string) => {
        playPop();
        setSelected(key);
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
            setSelected(null);
            setCheckResult('idle');

            return;
        }

        if (round + 1 >= ROUNDS.length) {
            const duration = elapsedGameSeconds(startTime.current);
            completeGame('dressing', 'dressing', 100);
            router.post('/games/dressing/result', { score: 100, duration });
            setTimeout(() => setWon(true), 400);
        } else {
            setSelected(null);
            setCheckResult('idle');
            setRound(round + 1);
        }
    }, [checkResult, round, startTime]);

    return (
        <GameShell
            instruction={r.label}
            mascot="🦉"
            totalRounds={ROUNDS.length}
            currentRound={round + (checkResult === 'correct' ? 1 : 0)}
            checkEnabled={selected !== null}
            onCheck={handleCheck}
            checkResult={checkResult}
            correctAnswer={
                r.choices.find((c) => c.key === r.answer)?.emoji ?? ''
            }
            onNext={handleNext}
        >
            <div className="flex w-full max-w-xl flex-col items-center gap-8">
                {/* Weather display */}
                <div className="flex flex-col items-center gap-2">
                    <span className="text-[6rem] leading-none">
                        {r.weather}
                    </span>
                </div>

                {/* Choice cards */}
                <div className="flex gap-4">
                    {r.choices.map((c) => {
                        const isSelected = selected === c.key;

                        return (
                            <button
                                key={c.key}
                                onClick={() => pick(c.key)}
                                className={`flex size-28 items-center justify-center rounded-2xl border-2 text-6xl transition-all duration-150 active:scale-[0.95] ${
                                    isSelected
                                        ? 'border-[#1CB0F6] bg-[#DDF4FF] shadow-[0_4px_0_#0E7DB3]'
                                        : 'border-[#E5E5E5] bg-white shadow-[0_4px_0_#D0D0D0] hover:-translate-y-0.5 hover:shadow-[0_6px_0_#D0D0D0]'
                                } ${shake === c.key ? 'animate-wiggle' : ''}`}
                            >
                                {c.emoji}
                            </button>
                        );
                    })}
                </div>
            </div>

            {won && <RewardOverlay stars={3} gameRoute="dressing" />}
        </GameShell>
    );
}
