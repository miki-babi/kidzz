import { router } from "@inertiajs/react";
import { useState, useEffect, useRef } from "react";
import { GameShell } from "@/components/game/GameShell";
import { RewardOverlay } from "@/components/game/RewardOverlay";
import { playPop, playSuccess, playWrong, speak } from "@/lib/feedback";
import { completeGame } from "@/lib/store";

interface Round {
  seq: string[];
  answer: string;
  choices: string[];
}

const ROUNDS: Round[] = [
  { seq: ["🔴", "🔵", "🔴", "🔵"], answer: "🔴", choices: ["🔴", "🔵", "🟢"] },
  { seq: ["🟢", "🟢", "🟡", "🟢", "🟢"], answer: "🟡", choices: ["🔴", "🟡", "🟢"] },
  { seq: ["⭐", "🌙", "⭐", "🌙"], answer: "⭐", choices: ["🌙", "⭐", "☀️"] },
];

export function Patterns() {
  const [round, setRound] = useState(0);
  const [shake, setShake] = useState<string | null>(null);
  const [won, setWon] = useState(false);
  const startTime = useRef(Date.now());
  const r = ROUNDS[round];

  useEffect(() => {
    speak("What comes next?");
  }, [round]);

  function pick(c: string) {
    if (c === r.answer) {
      playSuccess();

      if (round + 1 >= ROUNDS.length) {
        const duration = Math.round((Date.now() - startTime.current) / 1000);
        completeGame("patterns", "patterns", 100);
        router.post("/games/patterns/result", { score: 100, duration });
        setTimeout(() => setWon(true), 400);
      } else {
        setTimeout(() => setRound(round + 1), 400);
      }
    } else {
      playWrong();
      setShake(c);
      setTimeout(() => setShake(null), 400);
    }
  }

  return (
    <GameShell title="Continue Pattern" instruction="What comes next?">
      <div className="flex w-full max-w-xl flex-col items-center gap-12">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {r.seq.map((s, i) => (
            <span key={i} className="text-6xl">{s}</span>
          ))}
          <span className="flex size-16 items-center justify-center rounded-3xl bg-[#E8EDF2] text-5xl text-neutral-800 shadow-[inset_-4px_-4px_8px_rgba(255,255,255,0.9),inset_4px_4px_8px_rgba(0,0,0,0.06)]">
            ?
          </span>
        </div>

        <div className="flex gap-5">
          {r.choices.map((c) => (
            <button
              key={c}
              onClick={() => {
                playPop();
                pick(c);
              }}
              className={`flex size-24 items-center justify-center rounded-4xl bg-[#E8EDF2] text-6xl shadow-[-6px_-6px_12px_rgba(255,255,255,0.9),6px_6px_12px_rgba(0,0,0,0.06)] transition-all duration-200 hover:shadow-[-8px_-8px_16px_rgba(255,255,255,0.9),8px_8px_16px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 active:shadow-[inset_-4px_-4px_8px_rgba(255,255,255,0.9),inset_4px_4px_8px_rgba(0,0,0,0.1)] active:translate-y-0.5 active:scale-[0.97] ${shake === c ? "animate-wiggle" : ""
                }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      {won && <RewardOverlay stars={3} gameRoute="patterns" />}
    </GameShell>
  );
}
