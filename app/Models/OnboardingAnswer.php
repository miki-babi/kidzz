<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OnboardingAnswer extends Model
{
    protected $fillable = [
        'user_id',
        'question_id',
        'choice_id',
        'value',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function question(): BelongsTo
    {
        return $this->belongsTo(OnboardingQuestion::class, 'question_id');
    }

    public function choice(): BelongsTo
    {
        return $this->belongsTo(OnboardingQuestionChoice::class, 'choice_id');
    }
}
