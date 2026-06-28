<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Skill extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description',
        'category',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function scores(): HasMany
    {
        return $this->hasMany(Score::class);
    }

    public function choiceScores(): HasMany
    {
        return $this->hasMany(OnboardingChoiceScore::class);
    }
}
