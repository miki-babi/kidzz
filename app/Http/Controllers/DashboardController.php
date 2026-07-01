<?php

namespace App\Http\Controllers;

use App\Models\Game;
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

        $user = request()->user();
        $hasActiveAccount = $user !== null
            && $user->paymentTrackings()
                ->where('plan_type', 'premium')
                ->where('is_active', true)
                ->exists();

        // Align with Games page configuration
        $recommendedCategory = 'Recommended';
        $catalog = $this->gameCatalogPayload($games, $hasActiveAccount);

        Log::info('Dashboard loaded with unified catalog.', [
            'user_id' => $user?->id,
            'games_count' => $games->count(),
            'has_active_account' => $hasActiveAccount,
            'free_games_limit' => 2,
            'recommended_category' => $recommendedCategory,
            'recommended_game_ids' => $catalog['recommended_game_ids'] ?? [],
        ]);

        return Inertia::render('dashboard', [
            'games' => $catalog['games'],
            'hasActiveAccount' => $hasActiveAccount,
            'freeGamesLimit' => 2,
            'recommendedCategory' => $recommendedCategory,
            'demoPrice' => 9.99, // Ensure demoPrice is sent down to prevent layout crashes
        ]);
    }
}
