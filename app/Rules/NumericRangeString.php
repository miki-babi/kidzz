<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Translation\PotentiallyTranslatedString;

class NumericRangeString implements ValidationRule
{
    public static function isValid(mixed $value): bool
    {
        if (! is_string($value) || ! preg_match('/^\d+-\d+$/', $value)) {
            return false;
        }

        [$minimum, $maximum] = array_map(intval(...), explode('-', $value, 2));

        return $minimum <= $maximum;
    }

    /**
     * @param  Closure(string, ?string=): PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (! self::isValid($value)) {
            $fail('The :attribute must be a numeric range like 2-20 or 0-3.');
        }
    }
}
