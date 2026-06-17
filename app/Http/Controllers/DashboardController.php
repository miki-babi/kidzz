<?php

namespace App\Http\Controllers;

use App\Models\Game;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $games = Game::all();

        return Inertia::render('dashboard', [
            'games' => $games,
        ]);
    }
}