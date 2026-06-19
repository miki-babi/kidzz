import { router } from "@inertiajs/react";
import { useState, useEffect, useRef, useCallback } from "react";
import { GameShell, type CheckResult } from "@/components/game/GameShell";
import { RewardOverlay } from "@/components/game/RewardOverlay";
import { playPop, playSuccess, playWrong, speak } from "@/lib/feedback";
import { completeGame } from "@/lib/store";
import type { SkillId } from "@/lib/worlds";

interface MatchItem {
  key: string;
  label: string;
  isColor?: boolean;
  color?: string;
}

interface MatchPairsProps {
  gameId: string;
  skill: SkillId;
  title: string;
  instruction: string;
  items: MatchItem[];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function MatchPairs({ gameId, skill, title, instruction, items }: MatchPairsProps) {
  const [bottom] = useState(() => shuffle(items));
  const [selected, setSelected] = useState<string | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [checkResult, setCheckResult] = useState<CheckResult>("idle");
  const [wrong, setWrong] = useState<string | null>(null);
  const [won, setWon] = useState(false);
  const startTime = useRef(Date.now());

  useEffect(() => {
    speak(instruction);
  }, [instruction]);

  function renderFace(it: MatchItem, big = false) {
    if (it.isColor) {
      return (
        <span
          className={`block rounded-full ${big ? "size-16" : "size-12"}`}
          style={{ backgroundColor: it.color }}
        />
      );
    }
    return <span className={big ? "text-4xl" : "text-3xl"}>{it.label}</span>;
  }

  const tapTop = useCallback(
    (key: string) => {
      const isDone = matched.includes(key);
      if (isDone || checkResult !== "idle") return;
      playPop();
      setSelected(key);
    },
    [matched, checkResult],
  );

  const tapBottom = useCallback(
    (it: MatchItem) => {
      if (matched.includes(it.key) || won || checkResult !== "idle") return;

      if (selected === it.key) {
        playSuccess();
        const next = [...matched, it.key];
        setMatched(next);
        setSelected(null);

        if (next.length >= items.length) {
          const duration = Math.round((Date.now() - startTime.current) / 1000);
          completeGame(gameId, skill, 100);
          router.post(`/games/${gameId}/result`, { score: 100, duration });
          setTimeout(() => setWon(true), 500);
        }
      } else {
        playWrong();
        setWrong(it.key);
        setTimeout(() => setWrong(null), 400);
      }
    },
    [selected, matched, items.length, gameId, skill, won, checkResult],
  );

  return (
    <GameShell
      instruction={instruction}
      mascot="🦉"
      totalRounds={items.length}
      currentRound={matched.length}
      checkEnabled={true}
      onCheck={() => {}}
      checkResult={checkResult}
      onNext={() => {}}
    >
      <div className="flex w-full max-w-xl flex-col gap-6">
        {/* Top row - items to match */}
        <div className="flex flex-wrap justify-center gap-3">
          {items.map((it) => {
            const isDone = matched.includes(it.key);
            const isSelected = selected === it.key;

            return (
              <button
                key={it.key}
                onClick={() => tapTop(it.key)}
                className={`flex size-24 items-center justify-center rounded-2xl border-2 transition-all duration-150 active:scale-[0.95] ${
                  isDone
                    ? "border-[#58CC02] bg-[#D7FFB8] opacity-40 shadow-[0_4px_0_#3F9100]"
                    : isSelected
                      ? "border-[#1CB0F6] bg-[#DDF4FF] shadow-[0_4px_0_#0E7DB3]"
                      : "border-[#E5E5E5] bg-white shadow-[0_4px_0_#D0D0D0] hover:-translate-y-0.5 hover:shadow-[0_6px_0_#D0D0D0]"
                }`}
              >
                {renderFace(it, true)}
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-[#E5E5E5]" />
          <span className="text-base font-bold text-[#777777]">Match below</span>
          <div className="h-px flex-1 bg-[#E5E5E5]" />
        </div>

        {/* Bottom row - shuffled choices */}
        <div className="flex flex-wrap justify-center gap-3">
          {bottom.map((it) => {
            const isDone = matched.includes(it.key);

            return (
              <button
                key={it.key}
                onClick={() => tapBottom(it)}
                className={`flex size-24 items-center justify-center rounded-2xl border-2 transition-all duration-150 active:scale-[0.95] ${
                  isDone
                    ? "border-[#58CC02] bg-[#D7FFB8] shadow-[0_4px_0_#3F9100]"
                    : "border-[#E5E5E5] bg-white shadow-[0_4px_0_#D0D0D0] hover:-translate-y-0.5 hover:shadow-[0_6px_0_#D0D0D0]"
                } ${wrong === it.key ? "animate-wiggle" : ""}`}
              >
                {renderFace(it)}
              </button>
            );
          })}
        </div>
      </div>

      {won && <RewardOverlay stars={3} gameRoute={gameId} />}
    </GameShell>
  );
}