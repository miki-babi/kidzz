<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OnboardingChoiceScore extends Model
{
    protected $fillable = [
        'choice_id',
        'skill_id',
        'score',
    ];

    protected function casts(): array
    {
        return [
            'score' => 'integer',
        ];
    }

    public function choice(): BelongsTo
    {
        return $this->belongsTo(OnboardingQuestionChoice::class, 'choice_id');
    }

    public function skill(): BelongsTo
    {
        return $this->belongsTo(Skill::class);
    }
}
