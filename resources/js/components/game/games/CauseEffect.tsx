import { useState, useEffect, useRef } from "react";
import { router } from "@inertiajs/react";
import { GameShell } from "@/components/game/GameShell";
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
    <GameShell title="Help The Plant" instruction="What does the plant need?">
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
            className={`flex size-28 items-center justify-center rounded-4xl bg-card text-6xl shadow-pop transition-transform active:scale-95 ${shake === c.key ? "animate-wiggle" : ""
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
