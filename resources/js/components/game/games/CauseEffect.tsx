import { router } from "@inertiajs/react";
import { useState, useEffect, useRef } from "react";
import { GameShell, type CheckResult } from "@/components/game/GameShell";
import { RewardOverlay } from "@/components/game/RewardOverlay";
import { playPop, playSuccess, playWrong, speak } from "@/lib/feedback";
import { completeGame } from "@/lib/store";

const CHOICES = [
  { key: "water", emoji: "💧", correct: true },
  { key: "candy", emoji: "🍫", correct: false },
  { key: "ball", emoji: "⚽", correct: false },
];

export function CauseEffect() {
  const [plant, setPlant] = useState("🥀");
  const [shake, setShake] = useState<string | null>(null);
  const [checkResult] = useState<CheckResult>("idle");
  const [won, setWon] = useState(false);
  const startTime = useRef(Date.now());

  useEffect(() => {
    speak("The plant is sad. What does it need?");
  }, []);

  function pick(c: (typeof CHOICES)[number]) {
    if (c.correct) {
      playSuccess();
      setPlant("🌱");
      setTimeout(() => setPlant("🌻"), 500);
      const duration = Math.round((Date.now() - startTime.current) / 1000);
      completeGame("cause-effect", "cause-effect", 100);
      router.post("/games/cause-effect/result", { score: 100, duration });
      setTimeout(() => setWon(true), 1100);
    } else {
      playWrong();
      setShake(c.key);
      setTimeout(() => setShake(null), 400);
    }
  }

  return (
    <GameShell
      instruction="What does the plant need?"
      mascot="🦉"
      totalRounds={1}
      currentRound={won ? 1 : 0}
      checkEnabled={true}
      onCheck={() => {}}
      checkResult={checkResult}
      onNext={() => {}}
    >
      <div className="mb-12 flex h-48 items-end justify-center">
        <span className="animate-pop text-[8rem] leading-none" key={plant}>
          {plant}
        </span>
      </div>

      <div className="flex gap-5">
        {CHOICES.map((c) => (
          <button
            key={c.key}
            onClick={() => {
              playPop();
              pick(c);
            }}
            className={`flex size-28 items-center justify-center rounded-4xl bg-[#E8EDF2] text-6xl shadow-[-6px_-6px_12px_rgba(255,255,255,0.9),6px_6px_12px_rgba(0,0,0,0.06)] transition-all duration-200 hover:shadow-[-8px_-8px_16px_rgba(255,255,255,0.9),8px_8px_16px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 active:shadow-[inset_-4px_-4px_8px_rgba(255,255,255,0.9),inset_4px_4px_8px_rgba(0,0,0,0.1)] active:translate-y-0.5 active:scale-[0.97] ${shake === c.key ? "animate-wiggle" : ""
              }`}
          >
            {c.emoji}
          </button>
        ))}
      </div>
      {won && <RewardOverlay stars={3} gameRoute="cause-effect" />}
    </GameShell>
  );
}
