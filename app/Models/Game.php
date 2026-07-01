<?php

namespace App\Models;

use App\Enums\GameLevel;
use App\Enums\GameStatus;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Game extends Model
{
    protected $fillable = [
        'name',
        'description',
        'category',
        'routePath',
        'imagePath',
        'status',
        'level',
        'min_age',
        'max_age',
        'target_skills',
        'skill_awards',
        'learning_objectives',
        'sensory_characteristics',
        'gameplay',
    ];

    protected function casts(): array
    {
        return [
            'status' => GameStatus::class,
            'level' => GameLevel::class,
            'min_age' => 'integer',
            'max_age' => 'integer',
            'target_skills' => 'array',
            'skill_awards' => 'array',
            'learning_objectives' => 'array',
            'sensory_characteristics' => 'array',
            'gameplay' => 'array',
        ];
    }

    public function getRouteKeyName(): string
    {
        return 'routePath';
    }

    /**
     * @return Attribute<string|null, never>
     */
    protected function thumbnail(): Attribute
    {
        return Attribute::get(function (): ?string {
            $path = $this->imagePath;

            if ($path === null || $path === '') {
                return null;
            }

            if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) {
                return $path;
            }

            return Storage::disk('public')->url($path);
        });
    }
}
