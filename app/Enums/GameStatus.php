<?php

namespace App\Enums;

enum GameStatus: string
{
    case Active = 'active';
    case Draft = 'draft';
    case Inactive = 'inactive';

    public function label(): string
    {
        return match ($this) {
            self::Active => 'Active',
            self::Draft => 'Draft',
            self::Inactive => 'Inactive',
        };
    }
}
