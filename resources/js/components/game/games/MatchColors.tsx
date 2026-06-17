import { MatchPairs } from '@/components/game/games/MatchPairs';

const COLORS = [
  { key: 'red', label: '🔴', isColor: true, color: '#ef4444' },
  { key: 'blue', label: '🔵', isColor: true, color: '#3b82f6' },
  { key: 'green', label: '🟢', isColor: true, color: '#22c55e' },
  { key: 'yellow', label: '🟡', isColor: true, color: '#eab308' },
];

export function MatchColors() {
  return (
    <MatchPairs
      gameId="match-colors"
      skill="matching"
      title="Match Colors"
      instruction="Tap the matching colors"
      items={COLORS}
    />
  );
}