import { router } from "@inertiajs/react";
import { useState, useEffect, useRef } from "react";
import { GameShell, type CheckResult } from "@/components/game/GameShell";
import { RewardOverlay } from "@/components/game/RewardOverlay";
import { playPop, playSuccess, playWrong, speak } from "@/lib/feedback";
import { completeGame } from "@/lib/store";

interface Item {
  key: string;
  emoji: string;
  cat: "fruit" | "veg";
}

const ITEMS: Item[] = [
  { key: "apple", emoji: "🍎", cat: "fruit" },
  { key: "banana", emoji: "🍌", cat: "fruit" },
  { key: "orange", emoji: "🍊", cat: "fruit" },
  { key: "carrot", emoji: "🥕", cat: "veg" },
  { key: "broccoli", emoji: "🥦", cat: "veg" },
  { key: "corn", emoji: "🌽", cat: "veg" },
];

export function Sorting() {
  const [done, setDone] = useState<string[]>([]);
  const [selected, setSelected] = useState<Item | null>(null);
  const [glow, setGlow] = useState<string | null>(null);
  const [shake, setShake] = useState<string | null>(null);
  const [checkResult] = useState<CheckResult>("idle");
  const [won, setWon] = useState(false);
  const startTime = useRef(Date.now());

  useEffect(() => {
    speak("Put the food in the right basket");
  }, []);

  function drop(cat: "fruit" | "veg") {
    if (!selected) {
return;
}

    if (selected.cat === cat) {
      playSuccess();
      setGlow(cat);
      setTimeout(() => setGlow(null), 500);
      const next = [...done, selected.key];
      setDone(next);
      setSelected(null);

      if (next.length >= ITEMS.length) {
        const duration = Math.round((Date.now() - startTime.current) / 1000);
        completeGame("sorting", "sorting", 100);
        router.post("/games/sorting/result", { score: 100, duration });
        setTimeout(() => setWon(true), 500);
      }
    } else {
      playWrong();
      setShake(cat);
      setTimeout(() => setShake(null), 400);
    }
  }

  const remaining = ITEMS.filter((i) => !done.includes(i.key));

  return (
    <GameShell
      instruction="Tap a food, then its basket"
      mascot="🦉"
      totalRounds={ITEMS.length}
      currentRound={done.length}
      checkEnabled={true}
      onCheck={() => {}}
      checkResult={checkResult}
      onNext={() => {}}
    >
      <div className="flex w-full max-w-xl flex-col gap-8">
        <div className="flex min-h-[120px] flex-wrap items-center justify-center gap-4">
          {remaining.map((it) => (
            <button
              key={it.key}
              onClick={() => {
                playPop();
                setSelected(it);
              }}
              className={`flex size-24 items-center justify-center rounded-4xl bg-[#E8EDF2] text-6xl shadow-[-6px_-6px_12px_rgba(255,255,255,0.9),6px_6px_12px_rgba(0,0,0,0.06)] transition-all duration-200 hover:shadow-[-8px_-8px_16px_rgba(255,255,255,0.9),8px_8px_16px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 active:shadow-[inset_-4px_-4px_8px_rgba(255,255,255,0.9),inset_4px_4px_8px_rgba(0,0,0,0.1)] active:translate-y-0.5 active:scale-[0.97] ${selected?.key === it.key ? "ring-4 ring-neutral-800" : ""
                }`}
            >
              {it.emoji}
            </button>
          ))}
        </div>

        <div className="flex justify-center gap-5">
          {(["fruit", "veg"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => drop(cat)}
              className={`flex min-h-[160px] flex-1 flex-col items-center justify-center gap-2 rounded-4xl bg-[#E8EDF2] p-4 shadow-[-6px_-6px_12px_rgba(255,255,255,0.9),6px_6px_12px_rgba(0,0,0,0.06)] transition-all duration-200 hover:shadow-[-8px_-8px_16px_rgba(255,255,255,0.9),8px_8px_16px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 active:shadow-[inset_-4px_-4px_8px_rgba(255,255,255,0.9),inset_4px_4px_8px_rgba(0,0,0,0.1)] active:translate-y-0.5 active:scale-[0.97] ${shake === cat ? "animate-wiggle" : ""
                } ${glow === cat ? "bg-green-50 shadow-[inset_-4px_-4px_8px_rgba(255,255,255,0.9),inset_4px_4px_8px_rgba(0,0,0,0.06)] ring-4 ring-green-500" : ""}`}
            >
              <span className="text-6xl">{cat === "fruit" ? "🍓" : "🥬"}</span>
              <span className="text-xl font-extrabold text-foreground">
                {cat === "fruit" ? "Fruits" : "Veggies"}
              </span>
            </button>
          ))}
        </div>
      </div>
      {won && <RewardOverlay stars={3} gameRoute="sorting" />}
    </GameShell>
  );
}
