<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Translation\PotentiallyTranslatedString;

class TargetSkillScores implements ValidationRule
{
    /**
     * @param  Closure(string, ?string=): PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if ($value === null || $value === []) {
            return;
        }

        if (! is_array($value)) {
            $fail('Target skills must be a list of skill score ranges.');

            return;
        }

        $skillIds = [];

        foreach ($value as $index => $item) {
            if (! is_array($item)) {
                $fail('Each target skill entry must include a skill and score range.');

                return;
            }

            $skillId = $item['skill_id'] ?? null;

            if (blank($skillId)) {
                $fail('Each target skill must have a skill selected.');

                return;
            }

            if (in_array($skillId, $skillIds, true)) {
                $fail('Each skill can only be added once to target skills.');

                return;
            }

            $skillIds[] = $skillId;

            if (! NumericRangeString::isValid($item['score_range'] ?? null)) {
                $fail('Each target skill score must be a range like 2-20 or 0-3.');

                return;
            }
        }
    }
}
