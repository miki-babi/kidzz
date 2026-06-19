import { router } from "@inertiajs/react";
import { useState, useEffect, useRef } from "react";
import { GameShell } from "@/components/game/GameShell";
import { RewardOverlay } from "@/components/game/RewardOverlay";
import { playPop, playSuccess, playWrong, speak } from "@/lib/feedback";
import { completeGame } from "@/lib/store";

const FACES = [
  { key: "happy", emoji: "🙂", name: "happy" },
  { key: "sad", emoji: "😢", name: "sad" },
  { key: "angry", emoji: "😡", name: "angry" },
  { key: "scared", emoji: "😨", name: "scared" },
];

const ROUNDS = ["happy", "sad", "angry"];

export function Emotions() {
  const [round, setRound] = useState(0);
  const [shake, setShake] = useState<string | null>(null);
  const [won, setWon] = useState(false);
  const startTime = useRef(Date.now());
  const target = ROUNDS[round];

  useEffect(() => {
    speak(`Tap the ${target} face`);
  }, [target]);

  function pick(key: string) {
    if (key === target) {
      playSuccess();

      if (round + 1 >= ROUNDS.length) {
        const duration = Math.round((Date.now() - startTime.current) / 1000);
        completeGame("emotions", "social", 100);
        router.post("/games/emotions/result", { score: 100, duration });
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
    <GameShell title="Find The Feeling" instruction={`Tap the ${target} face`}>
      <div className="grid grid-cols-2 gap-5">
        {FACES.map((f) => (
          <button
            key={f.key}
            onClick={() => {
              playPop();
              pick(f.key);
            }}
            className={`flex size-32 items-center justify-center rounded-4xl bg-[#E8EDF2] text-7xl shadow-[-6px_-6px_12px_rgba(255,255,255,0.9),6px_6px_12px_rgba(0,0,0,0.06)] transition-all duration-200 hover:shadow-[-8px_-8px_16px_rgba(255,255,255,0.9),8px_8px_16px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 active:shadow-[inset_-4px_-4px_8px_rgba(255,255,255,0.9),inset_4px_4px_8px_rgba(0,0,0,0.1)] active:translate-y-0.5 active:scale-[0.97] ${shake === f.key ? "animate-wiggle" : ""
              }`}
          >
            {f.emoji}
          </button>
        ))}
      </div>
      {won && <RewardOverlay stars={3} gameRoute="emotions" />}
    </GameShell>
  );
}
