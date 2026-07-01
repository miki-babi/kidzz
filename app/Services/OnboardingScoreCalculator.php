<?php

namespace App\Services;

use App\Models\OnboardingAnswer;
use App\Models\User;
use Illuminate\Support\Collection;

class OnboardingScoreCalculator
{
    /**
     * Calculate total skill scores from a user's onboarding answers.
     *
     * @return Collection<int, array{skill_id: int, skill_name: string, score: int}>
     */
    public function calculate(User $user): Collection
    {
        $answers = OnboardingAnswer::query()
            ->where('user_id', $user->id)
            ->whereNotNull('choice_id')
            ->with(['choice.choiceScores.skill'])
            ->get();

        $totals = [];

        foreach ($answers as $answer) {
            foreach ($answer->choice?->choiceScores ?? [] as $choiceScore) {
                $skillId = $choiceScore->skill_id;

                if (! isset($totals[$skillId])) {
                    $totals[$skillId] = [
                        'skill_id' => $skillId,
                        'skill_name' => $choiceScore->skill->name,
                        'score' => 0,
                    ];
                }

                $totals[$skillId]['score'] += $choiceScore->score;
            }
        }

        return collect($totals)->values();
    }
}
