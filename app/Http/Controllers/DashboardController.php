<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $games = Game::query()
            ->orderBy('category')
            ->orderBy('name')
            ->get();

        $recommendedGameIds = $games->shuffle()->take(3)->pluck('id')->all();

        $user = request()->user();
        $hasActiveAccount = $user instanceof User
            && $user->paymentTrackings()
                ->where('plan_type', 'premium')
                ->where('is_active', true)
                ->exists();

        $gamesWithAccess = $games->values()->map(function (Game $game, int $index) use ($hasActiveAccount, $recommendedGameIds): array {
            $category = in_array($game->id, $recommendedGameIds, true)
                ? 'Recommended'
                : ($game->category ?? 'Other');

            return [
                'id' => $game->id,
                'name' => $game->name,
                'description' => $game->description,
                'category' => $category,
                'routePath' => $game->routePath,
                'imagePath' => $game->imagePath,
                'is_free' => $hasActiveAccount || $index < 2,
                'is_locked' => ! $hasActiveAccount && $index >= 2,
            ];
        });

        Log::info('Dashboard loaded.', [
            'user_id' => $user?->id,
            'games_count' => $games->count(),
            'has_active_account' => $hasActiveAccount,
            'free_games_limit' => 2,
            'recommended_game_ids' => $recommendedGameIds,
        ]);

        return Inertia::render('dashboard', [
            'games' => $gamesWithAccess,
            'hasActiveAccount' => $hasActiveAccount,
            'freeGamesLimit' => 2,
            'recommendedCategory' => 'Recommended',
        ]);
    }
}
