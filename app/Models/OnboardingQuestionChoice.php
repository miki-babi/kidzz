<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class OnboardingQuestionChoice extends Model
{
    protected $fillable = [
        'question_id',
        'label',
        'value',
        'order',
    ];

    protected function casts(): array
    {
        return [
            'order' => 'integer',
        ];
    }

    public function question(): BelongsTo
    {
        return $this->belongsTo(OnboardingQuestion::class, 'question_id');
    }

    public function choiceScores(): HasMany
    {
        return $this->hasMany(OnboardingChoiceScore::class, 'choice_id');
    }
}
