<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class UserProfile extends Model
{
    protected $fillable = [
        'user_id',
        'child_name',
        'age',
        'gender',
        'evaluated_status',
        'speech_level',
        'diagnosed_conditions',
        'speaking_skills',
        'understanding_language',
        'recognition_skills',
        'understanding_concepts',
        'thinking_skills',
        'social_play_skills',
        'interests',
    ];

    protected $casts = [
        'diagnosed_conditions' => 'array',
        'speaking_skills' => 'array',
        'understanding_language' => 'array',
        'recognition_skills' => 'array',
        'understanding_concepts' => 'array',
        'thinking_skills' => 'array',
        'social_play_skills' => 'array',
        'interests' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function diagnoses(): HasMany
    {
        return $this->hasMany(Diagnosis::class, 'user_id', 'user_id');
    }
}