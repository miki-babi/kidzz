<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
}
