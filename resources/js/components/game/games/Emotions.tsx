import { router } from "@inertiajs/react";
import { useState, useEffect, useRef, useCallback } from "react";
import { GameShell, type CheckResult } from "@/components/game/GameShell";
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
  const [selected, setSelected] = useState<string | null>(null);
  const [checkResult, setCheckResult] = useState<CheckResult>("idle");
  const [shake, setShake] = useState<string | null>(null);
  const [won, setWon] = useState(false);
  const startTime = useRef(Date.now());
  const target = ROUNDS[round];

  useEffect(() => {
    speak(`Tap the ${target} face`);
  }, [target]);

  const pick = useCallback((key: string) => {
    playPop();
    setSelected(key);
    setCheckResult("idle");
  }, []);

  const handleCheck = useCallback(() => {
    if (!selected) return;
    if (selected === target) {
      playSuccess();
      setCheckResult("correct");
    } else {
      playWrong();
      setCheckResult("incorrect");
      setShake(selected);
      setTimeout(() => setShake(null), 400);
    }
  }, [selected, target]);

  const handleNext = useCallback(() => {
    if (checkResult === "incorrect") {
      setSelected(null);
      setCheckResult("idle");
      return;
    }

    if (round + 1 >= ROUNDS.length) {
      const duration = Math.round((Date.now() - startTime.current) / 1000);
      completeGame("emotions", "social", 100);
      router.post("/games/emotions/result", { score: 100, duration });
      setTimeout(() => setWon(true), 400);
    } else {
      setSelected(null);
      setCheckResult("idle");
      setRound(round + 1);
    }
  }, [checkResult, round, selected]);

  return (
    <GameShell
      instruction={`Tap the ${target} face`}
      mascot="🦉"
      totalRounds={ROUNDS.length}
      currentRound={round + (checkResult === "correct" ? 1 : 0)}
      checkEnabled={selected !== null}
      onCheck={handleCheck}
      checkResult={checkResult}
      correctAnswer={FACES.find((f) => f.key === target)?.emoji ?? ""}
      onNext={handleNext}
    >
      <div className="grid grid-cols-2 gap-4">
        {FACES.map((f) => {
          const isSelected = selected === f.key;

          return (
            <button
              key={f.key}
              onClick={() => pick(f.key)}
              className={`flex size-32 items-center justify-center rounded-2xl border-2 text-7xl transition-all duration-150 active:scale-[0.95] ${
                isSelected
                  ? "border-[#1CB0F6] bg-[#DDF4FF] shadow-[0_4px_0_#0E7DB3]"
                  : "border-[#E5E5E5] bg-white shadow-[0_4px_0_#D0D0D0] hover:-translate-y-0.5 hover:shadow-[0_6px_0_#D0D0D0]"
              } ${shake === f.key ? "animate-wiggle" : ""}`}
            >
              {f.emoji}
            </button>
          );
        })}
      </div>

      {won && <RewardOverlay stars={3} gameRoute="emotions" />}
    </GameShell>
  );
}