<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\GameScore;
use App\Models\GameHistory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GameController extends Controller
{
    public function index()
    {
        $games = Game::all();

        return Inertia::render('games', [
            'games' => $games,
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

        return response()->json(['message' => 'Game result saved successfully']);
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