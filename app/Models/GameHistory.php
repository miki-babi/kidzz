<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GameHistory extends Model
{
    protected $fillable = [
        'user_id',
        'game_id',
        'game_score_id',
        'played_at',
        'duration',
    ];

    protected $casts = [
        'played_at' => 'datetime',
        'duration' => 'integer',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function game(): BelongsTo
    {
        return $this->belongsTo(Game::class);
    }

    public function gameScore(): BelongsTo
    {
        return $this->belongsTo(GameScore::class);
    }
}