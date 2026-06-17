<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Game extends Model
{
    protected $fillable = [
        'name',
        'description',
        'category',
        'routePath',
        'imagePath',
    ];

    public function getRouteKeyName(): string
    {
        return 'routePath';
    }

    public function gameScores(): HasMany
    {
        return $this->hasMany(GameScore::class);
    }

    public function gameHistories(): HasMany
    {
        return $this->hasMany(GameHistory::class);
    }
}