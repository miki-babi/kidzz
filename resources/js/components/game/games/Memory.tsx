import { router } from "@inertiajs/react";
import { useState, useEffect, useRef } from "react";
import { GameShell } from "@/components/game/GameShell";
import { RewardOverlay } from "@/components/game/RewardOverlay";
import { playPop, playSuccess, playWrong, speak } from "@/lib/feedback";
import { completeGame } from "@/lib/store";

const FACES = ["🐶", "🐱", "🐵"];

interface Card {
  id: number;
  face: string;
}

function build(): Card[] {
  return [...FACES, ...FACES]
    .map((face, id) => ({ id, face }))
    .sort(() => Math.random() - 0.5);
}

export function Memory() {
  const [cards] = useState(build);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [done, setDone] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [won, setWon] = useState(false);
  const startTime = useRef(Date.now());

  useEffect(() => {
    speak("Find the matching pairs");
  }, []);

  function flip(card: Card) {
    if (busy || flipped.includes(card.id) || done.includes(card.face)) {
return;
}

    playPop();
    const next = [...flipped, card.id];
    setFlipped(next);

    if (next.length === 2) {
      const [a, b] = next.map((id) => cards.find((c) => c.id === id)!);

      if (a.face === b.face) {
        playSuccess();
        const nd = [...done, a.face];
        setDone(nd);
        setFlipped([]);

        if (nd.length >= FACES.length) {
          const duration = Math.round((Date.now() - startTime.current) / 1000);
          completeGame("memory", "memory", 100);
          router.post("/games/memory/result", { score: 100, duration });
          setTimeout(() => setWon(true), 500);
        }
      } else {
        playWrong();
        setBusy(true);
        setTimeout(() => {
          setFlipped([]);
          setBusy(false);
        }, 900);
      }
    }
  }

  return (
    <GameShell title="Flip Cards" instruction="Find the pairs">
      <div className="grid grid-cols-3 gap-4">
        {cards.map((card) => {
          const show = flipped.includes(card.id) || done.includes(card.face);

          return (
            <button
              key={card.id}
              onClick={() => flip(card)}
              className={`flex size-28 items-center justify-center rounded-4xl text-6xl shadow-pop transition-transform active:scale-95 ${show ? "animate-pop bg-card" : "bg-primary"
                } ${done.includes(card.face) ? "opacity-40" : ""}`}
            >
              {show ? card.face : "❓"}
            </button>
          );
        })}
      </div>
      {won && <RewardOverlay stars={3} gameRoute="memory" />}
    </GameShell>
  );
}
