import { Link } from "@inertiajs/react";
import { useEffect } from "react";
import { playCheer, speak } from "@/lib/feedback";

interface RewardOverlayProps {
  stars: number; // 1-3
  gameRoute?: string; // optional route path to enable "Play Again" button
}

/** Simple, non-overstimulating celebration shown after an activity. */
export function RewardOverlay({ stars, gameRoute }: RewardOverlayProps) {

  useEffect(() => {
    playCheer();
    speak("Great job!");
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-[#E8EDF2]/95 px-6 text-center">
      <div className="flex gap-3">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="animate-pop text-7xl"
            style={{ animationDelay: `${i * 0.18}s`, opacity: i < stars ? 1 : 0.2 }}
          >
            ⭐
          </span>
        ))}
      </div>

      <h2 className="text-5xl text-green-600">Great Job!</h2>

      <div className="flex gap-4 text-2xl font-bold text-foreground">
        <span className="rounded-2xl bg-[#E8EDF2] px-5 py-3 shadow-[-4px_-4px_8px_rgba(255,255,255,0.9),4px_4px_8px_rgba(0,0,0,0.06)]">+20 XP</span>
        <span className="rounded-2xl bg-[#E8EDF2] px-5 py-3 shadow-[-4px_-4px_8px_rgba(255,255,255,0.9),4px_4px_8px_rgba(0,0,0,0.06)]">+5 🪙</span>
      </div>

      <div className="flex w-full max-w-sm gap-3">
        {gameRoute && (
          <Link
            href={`/games/${gameRoute}`}
            className="flex flex-1 min-h-[88px] items-center justify-center rounded-3xl bg-[#E8EDF2] text-2xl font-extrabold text-foreground shadow-[-6px_-6px_12px_rgba(255,255,255,0.9),6px_6px_12px_rgba(0,0,0,0.06)] transition-all duration-200 hover:shadow-[-8px_-8px_16px_rgba(255,255,255,0.9),8px_8px_16px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 active:shadow-[inset_-4px_-4px_8px_rgba(255,255,255,0.9),inset_4px_4px_8px_rgba(0,0,0,0.1)] active:translate-y-0.5 active:scale-[0.97]"
          >
            Play Again ↻
          </Link>
        )}
        <Link
          href="/dashboard"
          className={`flex min-h-[88px] items-center justify-center rounded-3xl bg-[#D2232A] text-3xl font-extrabold text-white shadow-[-6px_-6px_12px_rgba(255,255,255,0.9),6px_6px_12px_rgba(0,0,0,0.06)] transition-all duration-200 hover:shadow-[-8px_-8px_16px_rgba(255,255,255,0.9),8px_8px_16px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 active:shadow-[inset_-4px_-4px_8px_rgba(255,255,255,0.9),inset_4px_4px_8px_rgba(0,0,0,0.1)] active:translate-y-0.5 active:scale-[0.97] ${gameRoute ? 'flex-1' : 'w-full max-w-sm'}`}
        >
          Next →
        </Link>
      </div>
    </div>
  );
}