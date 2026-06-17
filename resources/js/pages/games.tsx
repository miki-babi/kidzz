import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import LandingHeader from '@/components/landing-header';
import Footer from '@/components/footer';
import { ALL_GAMES, SKILL_LABELS, findWorldOfGame, type GameDef } from '@/lib/worlds';
import { useCurrentProfile } from '@/lib/store';

interface DbGame {
    id: number;
    name: string;
    description: string | null;
    category: string | null;
    routePath: string;
    imagePath: string | null;
}

// Local description map for games (static GameDef doesn't carry descriptions)
const GAME_DESCRIPTIONS: Record<string, string> = {
    'tap-star': 'Tap the star as many times as you can!',
    'match-colors': 'Match the colors together!',
    'sorting': 'Sort fruits and veggies into the right baskets.',
    'patterns': 'What comes next in the pattern?',
    'memory': 'Find the matching pairs by flipping cards.',
    'sequencing': 'Put the brushing steps in the right order.',
    'cause-effect': 'What does the plant need to grow?',
    'emotions': 'Tap the matching emotion face.',
    'handwashing': 'Follow the steps to wash your hands.',
    'dressing': 'Choose the right outfit for the weather.',
};

const SKILL_COLORS: Record<string, string> = {
  attention: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  matching: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  sorting: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  patterns: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
  memory: 'bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-300',
  sequencing: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300',
  'cause-effect': 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300',
  social: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300',
  hygiene: 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300',
  dressing: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300',
  eating: 'bg-lime-100 text-lime-800 dark:bg-lime-900/40 dark:text-lime-300',
};

function getStaticGame(routePath: string): GameDef | undefined {
  return ALL_GAMES.find((g) => g.id === routePath);
}

function GameCard({ game }: { game: GameDef }) {
  const profile = useCurrentProfile();
  const completed = profile?.completed.includes(game.id);
  const description = GAME_DESCRIPTIONS[game.id] ?? 'A fun learning game!';

  return (
    <Link
      href={`/games/${game.id}`}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-neutral-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1"
    >
      {completed && (
        <span className="absolute right-3 top-3 z-10 flex size-6 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white shadow">
          ✓
        </span>
      )}

      {/* Hero image area — medium emoji on a gradient backdrop */}
      <div className="flex h-36 items-center justify-center overflow-hidden bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20">
        <span className="text-5xl transition-transform duration-700 group-hover:scale-110">
          {game.emoji}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h4 className="mb-2 text-lg font-bold text-neutral-900">{game.title}</h4>
        <p className="mb-5 flex-1 text-sm leading-relaxed text-neutral-500">
          {description}
        </p>

        {/* Bottom bar with skill badge + play button */}
        <div className="flex items-center justify-between border-t border-neutral-50 pt-4">
          <span
            className={`rounded-full px-3 py-1.5 text-[11px] font-semibold ${SKILL_COLORS[game.skill] ?? 'bg-neutral-100 text-neutral-500'}`}
          >
            {SKILL_LABELS[game.skill]}
          </span>
          <span className="inline-block rounded-full bg-red-600 px-5 py-2 text-sm font-black text-white shadow transition-colors hover:bg-red-700 active:scale-95">
            Play
          </span>
        </div>
      </div>
    </Link>
  );
}

function dbGameToDef(dbGame: DbGame): GameDef | null {
  const staticGame = getStaticGame(dbGame.routePath);

  if (staticGame) {
    return staticGame;
  }

  return null;
}

interface GamesProps {
  games: DbGame[];
}

export default function Games({ games }: GamesProps) {
  const profile = useCurrentProfile();
  const [activeCategory, setActiveCategory] = useState('Foundation Skills');

  // Use DB games if available, fall back to ALL_GAMES
  const gameDefs: GameDef[] =
    games && games.length > 0
      ? games.map(dbGameToDef).filter((g): g is GameDef => g !== null)
      : ALL_GAMES;

  // Derive unique category names from each game's parent world
  const categories = [...new Set(gameDefs.map((g) => findWorldOfGame(g.id)?.title ?? 'Other'))];

  const filteredGames = gameDefs.filter((g) => {
    const world = findWorldOfGame(g.id);
    return (world?.title ?? 'Other') === activeCategory;
  });

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1b1b18] font-sans antialiased selection:bg-red-500 selection:text-white dark:bg-[#09090b] dark:text-[#f4f4f5]">
      <LandingHeader />

      <Head title="Games" />

      <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
        {/* Profile summary header */}
        {profile && (
          <div className="flex items-center gap-4 rounded-[40px] border border-neutral-100 bg-white p-4 shadow-xl dark:border-sidebar-border">
            <span className="text-5xl">{profile.avatar}</span>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-neutral-900">{profile.name}</h2>
              <p className="text-sm font-medium text-neutral-500">
                Level {profile.level} · ⭐ {profile.stars} · 🪙 {profile.coins} · {profile.xp} XP
              </p>
            </div>
            <span className="text-3xl font-black text-red-600">
              Lv.{profile.level}
            </span>
          </div>
        )}

        {/* Section heading + category filter bar — matching dashboard.tsx */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-4xl font-black tracking-tighter md:text-6xl">Choose a Game</h2>
            <p className="mt-2 text-sm font-medium text-neutral-500">
              Tap a game below to start playing
            </p>
          </div>
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap rounded-full px-6 py-3 text-sm font-black transition-all ${
                  activeCategory === cat
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Game cards grid — matching dashboard.tsx layout */}
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <p className="py-12 text-center text-lg font-medium text-neutral-400">
            No games in this category yet.
          </p>
        )}
      </div>

      <Footer />
    </div>
  );
}