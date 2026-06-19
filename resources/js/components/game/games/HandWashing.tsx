import { router } from "@inertiajs/react";
import { useState, useEffect, useRef } from "react";
import { GameShell } from "@/components/game/GameShell";
import { RewardOverlay } from "@/components/game/RewardOverlay";
import { playPop, playSuccess, speak } from "@/lib/feedback";
import { completeGame } from "@/lib/store";

interface Scene {
  voice: string;
  action: string; // emoji button
  visual: string;
}

const SCENES: Scene[] = [
  { voice: "Turn on the water", action: "🚰", visual: "🚰" },
  { voice: "Use the soap", action: "🧼", visual: "🫧" },
  { voice: "Rub your hands together", action: "👐", visual: "🤲" },
  { voice: "Rinse your hands", action: "💧", visual: "💦" },
  { voice: "Dry your hands", action: "🧻", visual: "✨" },
];

export function HandWashing() {
  const [step, setStep] = useState(0);
  const [won, setWon] = useState(false);
  const startTime = useRef(Date.now());
  const scene = SCENES[step];

  useEffect(() => {
    if (scene) {
speak(scene.voice);
}
  }, [step, scene]);

  function tap() {
    playSuccess();

    if (step + 1 >= SCENES.length) {
      const duration = Math.round((Date.now() - startTime.current) / 1000);
      completeGame("handwashing", "hygiene", 100);
      router.post("/games/handwashing/result", { score: 100, duration });
      setTimeout(() => setWon(true), 500);
    } else {
      setTimeout(() => setStep(step + 1), 400);
    }
  }

  return (
    <GameShell title="Wash Hands" instruction={scene?.voice}>
      <div className="flex w-full max-w-md flex-col items-center gap-10">
        {/* progress dots */}
        <div className="flex gap-2">
          {SCENES.map((_, i) => (
            <span
              key={i}
              className={`size-4 rounded-full bg-[#E8EDF2] shadow-[-2px_-2px_4px_rgba(255,255,255,0.9),2px_2px_4px_rgba(0,0,0,0.06)] ${i <= step ? "bg-green-500 shadow-[inset_-2px_-2px_4px_rgba(255,255,255,0.3),inset_2px_2px_4px_rgba(0,0,0,0.15)]" : ""}`}
            />
          ))}
        </div>

        <div className="flex h-56 w-full items-center justify-center rounded-4xl bg-[#E8EDF2] text-[7rem] shadow-[inset_-4px_-4px_8px_rgba(255,255,255,0.9),inset_4px_4px_8px_rgba(0,0,0,0.06)]">
          <span key={step} className="animate-pop">{scene.visual}</span>
        </div>

        <button
          onClick={() => {
            playPop();
            tap();
          }}
          className="flex size-32 items-center justify-center rounded-full bg-[#D2232A] text-7xl shadow-[-6px_-6px_12px_rgba(255,255,255,0.9),6px_6px_12px_rgba(0,0,0,0.06)] transition-all duration-200 hover:shadow-[-8px_-8px_16px_rgba(255,255,255,0.9),8px_8px_16px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 active:shadow-[inset_-4px_-4px_8px_rgba(255,255,255,0.3),inset_4px_4px_8px_rgba(0,0,0,0.15)] active:translate-y-0.5 active:scale-[0.93]"
          aria-label={scene.voice}
        >
          {scene.action}
        </button>
      </div>
      {won && <RewardOverlay stars={3} gameRoute="handwashing" />}
    </GameShell>
  );
}
