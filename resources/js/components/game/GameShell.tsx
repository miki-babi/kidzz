import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';

/* ─────────────────────────────────────────────
   Duolingo Three-Tier Lesson Shell
   ─────────────────────────────────────────────
   1. Top Header : close (✕) + progress bar + lives
   2. Content    : mascot speech bubble + arena area
   3. Sticky Footer : check / correct / incorrect bar
   ───────────────────────────────────────────── */

export type CheckResult = 'idle' | 'correct' | 'incorrect';

interface GameShellProps {
    /** Short lesson title (not shown prominently, used for meta) */
    title?: string;
    /** Instruction text that goes in the speech bubble */
    instruction: string;
    /** Mascot element shown on the left of the speech bubble */
    mascot?: ReactNode;
    /* Progress tracking */
    totalRounds: number;
    currentRound: number;
    /** Optional lives counter (shows heart on the right) */
    lives?: number;
    /** The game content */
    children: ReactNode;
    /* Check bar state */
    /** True when user has made a selection and CHECK should be enabled */
    checkEnabled: boolean;
    /** Callback when the user clicks CHECK */
    onCheck: () => void;
    /** The current result state of the last check */
    checkResult: CheckResult;
    /** Text to display as the correct answer when the user got it wrong */
    correctAnswer?: string;
    /** Callback for the CONTINUE / GOT IT button after feedback */
    onNext: () => void;
    /** If true, the game is over and we show final actions (pass-through) */
    done?: boolean;
}

export function GameShell({
    instruction,
    totalRounds,
    currentRound,
    lives,
    children,
    checkEnabled,
    onCheck,
    checkResult,
    correctAnswer,
    onNext,
}: GameShellProps) {
    const [resultVisible, setResultVisible] = useState(false);

    // Animate result state
    useEffect(() => {
        if (checkResult === 'idle') {
            return;
        }

        const t = setTimeout(() => setResultVisible(true), 50);

        return () => {
            clearTimeout(t);
            setResultVisible(false);
        };
    }, [checkResult]);

    const progressPct =
        totalRounds > 0
            ? Math.round(
                  (Math.min(currentRound, totalRounds) / totalRounds) * 100,
              )
            : 0;

    return (
        <div className="no-select flex min-h-screen flex-col bg-[#FAFAFA]">
            {/* ═══ HEADER ═══ */}
            <header className="flex items-center gap-3 px-4 pt-4 pb-2">
                {/* Close button */}
                <a
                    href="/dashboard"
                    aria-label="Close lesson"
                    className="flex size-12 shrink-0 items-center justify-center rounded-xl border-2 border-[#E5E5E5] bg-white text-2xl font-bold text-[#3C3C3C] transition-all duration-100 hover:border-[#FF4B4B] hover:text-[#FF4B4B] active:scale-[0.93]"
                >
                    ✕
                </a>

                {/* Progress bar */}
                <div className="flex-1">
                    <div className="progress-duo">
                        <div
                            className="bg-[#58CC02] transition-all duration-500 ease-out"
                            style={{ width: `${progressPct}%` }}
                        />
                    </div>
                </div>

                {/* Lives (optional) */}
                {lives !== undefined && (
                    <div className="flex shrink-0 items-center gap-1.5 rounded-xl border-2 border-[#E5E5E5] bg-white px-3 py-2">
                        <span className="text-xl">❤️</span>
                        <span className="text-base font-extrabold text-[#FF4B4B]">
                            {lives}
                        </span>
                    </div>
                )}
            </header>

            {/* ═══ PROMPT / SPEECH BUBBLE ═══ */}
            <div className="flex items-start gap-3 px-4 py-3">
                {/* Mascot */}
                <div className="flex size-14 shrink-0 items-center justify-center rounded-full border-2 border-[#E5E5E5] bg-white">
                    <img
                        src="/asset/maskot/maskot_head.png"
                        alt="Maskot thumbs up"
                        className="h-10 w-10 object-contain"
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                        }}
                    />
                </div>

                {/* Speech bubble */}
                <div className="speech-bubble relative max-w-[calc(100%-4rem)] rounded-2xl border-2 border-[#E5E5E5] bg-white px-5 py-3.5">
                    <p className="text-xl leading-tight font-extrabold text-[#3C3C3C]">
                        {instruction}
                    </p>
                </div>
            </div>

            {/* ═══ MAIN CONTENT AREA ═══ */}
            <main className="flex flex-1 flex-col items-center overflow-y-auto px-4 py-4">
                {children}
            </main>

            {/* ═══ STICKY FOOTER — CHECK BAR ═══ */}
            <div className="sticky bottom-0 z-30 border-t-2 border-[#E5E5E5] bg-white px-4 py-4">
                {checkResult === 'idle' && (
                    <button
                        onClick={onCheck}
                        disabled={!checkEnabled}
                        className={`w-full rounded-2xl py-4 text-center text-lg font-extrabold tracking-wide uppercase transition-all duration-150 active:scale-[0.97] ${
                            checkEnabled
                                ? 'btn-duo-green cursor-pointer'
                                : 'cursor-not-allowed bg-[#E5E5E5] text-[#A0A0A0]'
                        }`}
                    >
                        Check
                    </button>
                )}

                {checkResult === 'correct' && resultVisible && (
                    <div className="flex flex-col items-center gap-3">
                        <div className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[#D7FFB8] py-4">
                            <span className="text-3xl">🎉</span>
                            <span className="text-2xl font-extrabold text-[#58CC02]">
                                Excellent!
                            </span>
                        </div>
                        <button
                            onClick={onNext}
                            className="btn-duo-green w-full cursor-pointer py-4 text-lg font-extrabold tracking-wide uppercase"
                        >
                            Continue
                        </button>
                    </div>
                )}

                {checkResult === 'incorrect' && resultVisible && (
                    <div className="flex flex-col items-center gap-3">
                        <div className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[#FFDFDF] py-4">
                            <span className="text-2xl font-extrabold text-[#FF4B4B]">
                                Correct answer:
                            </span>
                            <span className="text-2xl font-extrabold text-[#3C3C3C]">
                                {correctAnswer ?? ''}
                            </span>
                        </div>
                        <button
                            onClick={onNext}
                            className="w-full cursor-pointer rounded-2xl border-2 border-[#E5E5E5] bg-white py-4 text-lg font-extrabold tracking-wide text-[#3C3C3C] uppercase transition-all duration-150 hover:border-[#D62B2B] hover:text-[#D62B2B] active:scale-[0.97]"
                        >
                            Got it
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
