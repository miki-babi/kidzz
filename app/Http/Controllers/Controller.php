<?php

namespace App\Http\Controllers;

use App\Models\Game;
use Illuminate\Support\Collection;

abstract class Controller
{
    /**
     * @param  Collection<int, Game>  $games
     * @return array{games: Collection<int, array<string, mixed>>, recommended_game_ids: array<int, int>}
     */
    protected function gameCatalogPayload(Collection $games, bool $hasActiveAccount, int $freeGamesLimit = 2): array
    {
        $orderedGames = $games->values();

        $recommendedGames = $orderedGames
            ->sortBy(fn (Game $game): int => crc32($game->routePath ?: (string) $game->id))
            ->take(3)
            ->values();

        $recommendedGameIds = $recommendedGames->pluck('id')->all();

        $remainingGames = $orderedGames
            ->reject(fn (Game $game): bool => in_array($game->id, $recommendedGameIds, true))
            ->values();

        $catalog = $recommendedGames
            ->map(fn (Game $game): array => $this->gameCardPayload($game, 'Recommended'))
            ->concat($remainingGames->map(fn (Game $game): array => $this->gameCardPayload($game, $game->category ?? 'Other')))
            ->values()
            ->map(function (array $game, int $index) use ($hasActiveAccount, $freeGamesLimit): array {
                return [
                    ...$game,
                    'is_free' => $hasActiveAccount || $index < $freeGamesLimit,
                    'is_locked' => ! $hasActiveAccount && $index >= $freeGamesLimit,
                ];
            });

        return [
            'games' => $catalog,
            'recommended_game_ids' => $recommendedGameIds,
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function gameCardPayload(Game $game, string $category): array
    {
        return [
            'id' => $game->id,
            'name' => $game->name,
            'description' => $game->description,
            'category' => $category,
            'routePath' => $game->routePath,
            'imagePath' => $game->thumbnail,
        ];
    }
}
