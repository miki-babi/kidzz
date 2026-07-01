<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\GameHistory;
use App\Models\GameScore;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class GameController extends Controller
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

        $recommendedCategory = 'Recommended';
        $catalog = $this->gameCatalogPayload($games, $hasActiveAccount);

        Log::info('Games page loaded.', [
            'user_id' => $user?->id,
            'games_count' => $games->count(),
            'has_active_account' => $hasActiveAccount,
            'free_games_limit' => 2,
            'recommended_category' => $recommendedCategory,
            'recommended_game_ids' => $catalog['recommended_game_ids'],
        ]);

        return Inertia::render('games', [
            'games' => $catalog['games'],
            'hasActiveAccount' => $hasActiveAccount,
            'freeGamesLimit' => 2,
            'recommendedCategory' => $recommendedCategory,
            'demoPrice' => 9.99,
        ]);
    }

    public function show(Game $game)
    {
        return Inertia::render('games/show', [
            'game' => $game,
        ]);
    }

    public function storeResult(Request $request, Game $game)
    {
        $validated = $request->validate([
            'score' => 'required|integer|min:0|max:100',
            'duration' => 'required|integer|min:0', // in seconds
        ]);

        $user = $request->user();

        // Create or update the score (keep the best score)
        $gameScore = GameScore::where('user_id', $user->id)
            ->where('game_id', $game->id)
            ->first();

        if ($gameScore) {
            $gameScore->update([
                'score' => max($gameScore->score, $validated['score']),
            ]);
        } else {
            $gameScore = GameScore::create([
                'user_id' => $user->id,
                'game_id' => $game->id,
                'score' => $validated['score'],
            ]);
        }

        // Record the history entry
        GameHistory::create([
            'user_id' => $user->id,
            'game_id' => $game->id,
            'game_score_id' => $gameScore->id,
            'played_at' => now(),
            'duration' => $validated['duration'],
        ]);

        return Inertia::back();
    }

    public function results(Request $request)
    {
        $user = $request->user();

        $games = Game::with(['gameScores' => function ($query) use ($user) {
            $query->where('user_id', $user->id);
        }, 'gameHistories' => function ($query) use ($user) {
            $query->where('user_id', $user->id)->orderBy('played_at', 'desc');
        }])->get();

        // Group results by category
        $results = $games->groupBy('category')->map(function ($games, $category) {
            return [
                'category' => $category,
                'games' => $games->map(function ($game) {
                    $score = $game->gameScores->first();
                    $histories = $game->gameHistories;

                    return [
                        'id' => $game->id,
                        'name' => $game->name,
                        'routePath' => $game->routePath,
                        'imagePath' => $game->imagePath,
                        'best_score' => $score ? $score->score : null,
                        'times_played' => $histories->count(),
                        'last_played' => $histories->first()?->played_at,
                        'total_duration' => $histories->sum('duration'),
                    ];
                }),
            ];
        })->values();

        return Inertia::render('games/results', [
            'results' => $results,
        ]);
    }
}
