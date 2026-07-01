<?php

namespace App\Models;

use App\Enums\OnboardingQuestionType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class OnboardingQuestion extends Model
{
    protected $fillable = [
        'step_id',
        'question',
        'type',
        'is_required',
        'order',
        'placeholder',
        'default_choice_id',
    ];

    protected function casts(): array
    {
        return [
            'step_id' => 'integer',
            'type' => OnboardingQuestionType::class,
            'is_required' => 'boolean',
            'order' => 'integer',
            'default_choice_id' => 'integer',
        ];
    }

    public function defaultChoice(): BelongsTo
    {
        return $this->belongsTo(OnboardingQuestionChoice::class, 'default_choice_id');
    }

    public function choices(): HasMany
    {
        return $this->hasMany(OnboardingQuestionChoice::class, 'question_id')->orderBy('order');
    }

    public function answers(): HasMany
    {
        return $this->hasMany(OnboardingAnswer::class, 'question_id');
    }
}
