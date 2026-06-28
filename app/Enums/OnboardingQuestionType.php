<?php

namespace App\Enums;

enum OnboardingQuestionType: string
{
    case SingleChoice = 'single_choice';
    case MultiChoice = 'multi_choice';
    case Text = 'text';
    case Number = 'number';

    public function label(): string
    {
        return match ($this) {
            self::SingleChoice => 'Single choice',
            self::MultiChoice => 'Multiple choice',
            self::Text => 'Text',
            self::Number => 'Number',
        };
    }
}
