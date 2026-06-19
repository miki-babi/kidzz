import { router } from "@inertiajs/react";
import { useState, useEffect, useRef } from "react";
import { GameShell } from "@/components/game/GameShell";
import { RewardOverlay } from "@/components/game/RewardOverlay";
import { playPop, playSuccess, playWrong, speak } from "@/lib/feedback";
import { completeGame } from "@/lib/store";

interface Round {
  weather: string;
  label: string;
  answer: string;
  choices: { key: string; emoji: string }[];
}

const ROUNDS: Round[] = [
  {
    weather: "☀️",
    label: "It is sunny and hot",
    answer: "tshirt",
    choices: [
      { key: "tshirt", emoji: "👕" },
      { key: "jacket", emoji: "🧥" },
      { key: "scarf", emoji: "🧣" },
    ],
  },
  {
    weather: "❄️",
    label: "It is cold and snowy",
    answer: "jacket",
    choices: [
      { key: "tshirt", emoji: "👕" },
      { key: "jacket", emoji: "🧥" },
      { key: "shorts", emoji: "🩳" },
    ],
  },
];

export function Dressing() {
  const [round, setRound] = useState(0);
  const [shake, setShake] = useState<string | null>(null);
  const [won, setWon] = useState(false);
  const startTime = useRef(Date.now());
  const r = ROUNDS[round];

  useEffect(() => {
    speak(`${r.label}. What should we wear?`);
  }, [r.label]);

  function pick(key: string) {
    if (key === r.answer) {
      playSuccess();

      if (round + 1 >= ROUNDS.length) {
        const duration = Math.round((Date.now() - startTime.current) / 1000);
        completeGame("dressing", "dressing", 100);
        router.post("/games/dressing/result", { score: 100, duration });
        setTimeout(() => setWon(true), 400);
      } else {
        setTimeout(() => setRound(round + 1), 400);
      }
    } else {
      playWrong();
      setShake(key);
      setTimeout(() => setShake(null), 400);
    }
  }

  return (
    <GameShell title="Dress For Weather" instruction={r.label}>
      <div className="mb-10 flex flex-col items-center gap-2">
        <span className="text-[7rem] leading-none">{r.weather}</span>
      </div>
      <div className="flex gap-5">
        {r.choices.map((c) => (
          <button
            key={c.key}
            onClick={() => {
              playPop();
              pick(c.key);
            }}
            className={`flex size-28 items-center justify-center rounded-4xl bg-[#E8EDF2] text-6xl shadow-[-6px_-6px_12px_rgba(255,255,255,0.9),6px_6px_12px_rgba(0,0,0,0.06)] transition-all duration-200 hover:shadow-[-8px_-8px_16px_rgba(255,255,255,0.9),8px_8px_16px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 active:shadow-[inset_-4px_-4px_8px_rgba(255,255,255,0.9),inset_4px_4px_8px_rgba(0,0,0,0.1)] active:translate-y-0.5 active:scale-[0.97] ${shake === c.key ? "animate-wiggle" : ""
              }`}
          >
            {c.emoji}
          </button>
        ))}
      </div>
      {won && <RewardOverlay stars={3} gameRoute="dressing" />}
    </GameShell>
  );
}
