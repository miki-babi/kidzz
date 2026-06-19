import { router } from "@inertiajs/react";
import { useState, useEffect, useRef } from "react";
import { GameShell } from "@/components/game/GameShell";
import { RewardOverlay } from "@/components/game/RewardOverlay";
import { playPop, playSuccess, playWrong, speak } from "@/lib/feedback";
import { completeGame } from "@/lib/store";

interface Step {
  key: string;
  emoji: string;
  label: string;
}

// correct order top-to-bottom
const STEPS: Step[] = [
  { key: "pick", emoji: "🪥", label: "Pick Brush" },
  { key: "paste", emoji: "🧴", label: "Add Paste" },
  { key: "brush", emoji: "😬", label: "Brush Teeth" },
  { key: "rinse", emoji: "🚿", label: "Rinse" },
];

function shuffle<T>(a: T[]): T[] {
  return [...a].sort(() => Math.random() - 0.5);
}

export function Sequencing() {
  const [pool] = useState(() => shuffle(STEPS));
  const [order, setOrder] = useState<string[]>([]);
  const [shake, setShake] = useState<string | null>(null);
  const [won, setWon] = useState(false);
  const startTime = useRef(Date.now());

  useEffect(() => {
    speak("Put the steps in the right order");
  }, []);

  function tap(step: Step) {
    if (order.includes(step.key)) {
return;
}

    const expected = STEPS[order.length].key;

    if (step.key === expected) {
      playSuccess();
      const next = [...order, step.key];
      setOrder(next);

      if (next.length >= STEPS.length) {
        const duration = Math.round((Date.now() - startTime.current) / 1000);
        completeGame("sequencing", "sequencing", 100);
        router.post("/games/sequencing/result", { score: 100, duration });
        setTimeout(() => setWon(true), 500);
      }
    } else {
      playWrong();
      setShake(step.key);
      setTimeout(() => setShake(null), 400);
    }
  }

  return (
    <GameShell title="Brush Teeth Order" instruction="What comes first? Tap in order">
      <div className="flex w-full max-w-md flex-col gap-4">
        {pool.map((s) => {
          const idx = order.indexOf(s.key);
          const placed = idx >= 0;

          return (
            <button
              key={s.key}
              onClick={() => {
                playPop();
                tap(s);
              }}
              className={`flex min-h-[88px] items-center gap-4 rounded-4xl bg-[#E8EDF2] p-4 shadow-[-6px_-6px_12px_rgba(255,255,255,0.9),6px_6px_12px_rgba(0,0,0,0.06)] transition-all duration-200 hover:shadow-[-8px_-8px_16px_rgba(255,255,255,0.9),8px_8px_16px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 active:shadow-[inset_-4px_-4px_8px_rgba(255,255,255,0.9),inset_4px_4px_8px_rgba(0,0,0,0.1)] active:translate-y-0.5 active:scale-[0.97] ${shake === s.key ? "animate-wiggle" : ""
                } ${placed ? "bg-green-50 shadow-[inset_-4px_-4px_8px_rgba(255,255,255,0.9),inset_4px_4px_8px_rgba(0,0,0,0.06)] ring-4 ring-green-500" : ""}`}
            >
              <span className="text-5xl">{s.emoji}</span>
              <span className="flex-1 text-left text-2xl font-extrabold text-foreground">{s.label}</span>
              {placed && (
                <span className="flex size-10 items-center justify-center rounded-full bg-green-500 text-xl font-extrabold text-white shadow-[inset_-2px_-2px_4px_rgba(255,255,255,0.3),inset_2px_2px_4px_rgba(0,0,0,0.15)]">
                  {idx + 1}
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
