<?php

namespace App\Enums;

enum GameLevel: int
{
    case One = 1;
    case Two = 2;
    case Three = 3;

    public function label(): string
    {
        return match ($this) {
            self::One => 'Level 1',
            self::Two => 'Level 2',
            self::Three => 'Level 3',
        };
    }
}
