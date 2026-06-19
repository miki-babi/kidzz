import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { playCheer, speak } from "@/lib/feedback";

interface RewardOverlayProps {
  stars: number;
  gameRoute?: string;
}

/** Duolingo-style celebration overlay with star burst, XP, and progress. */
export function RewardOverlay({ stars, gameRoute }: RewardOverlayProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 300);
    playCheer();
    speak("Great job!");
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 px-6 text-center transition-all duration-500 ${show ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      style={{ backgroundColor: "rgba(250, 250, 250, 0.97)" }}
    >
      {/* Star burst */}
      <div className="flex gap-3">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="text-6xl sm:text-7xl transition-all duration-500"
            style={{
              opacity: i < stars ? 1 : 0.15,
              transform: show ? "scale(1) rotate(0deg)" : "scale(0) rotate(-30deg)",
              transitionDelay: `${i * 0.15}s`,
              filter: i < stars ? "none" : "grayscale(1)",
            }}
          >
            ⭐
          </span>
        ))}
      </div>

      {/* Title */}
      <div className="flex items-center gap-3">

        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#58CC02] tracking-tight">
          Great Job!
        </h2>
      </div>
      <p className="text-base font-bold text-[#777777] -mt-2">You earned</p>

  
      {/* Action buttons */}
      {gameRoute && (
        <Link
          href={`/games/${gameRoute}`}
          className="btn-duo-outline w-full max-w-sm justify-center py-4 text-lg font-extrabold"
        >
          Play Again ↻
        </Link>
      )}
      <Link
        href="/dashboard"
        className={`btn-duo-green w-full max-w-sm justify-center py-4 text-lg font-extrabold uppercase tracking-wide ${gameRoute ? "" : "mt-2"
          }`}
      >
        Continue
      </Link>

    </div>
  );
}