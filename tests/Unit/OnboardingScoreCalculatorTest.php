<?php

namespace Tests\Unit;

use App\Enums\OnboardingQuestionType;
use App\Models\OnboardingAnswer;
use App\Models\OnboardingChoiceScore;
use App\Models\OnboardingQuestion;
use App\Models\OnboardingQuestionChoice;
use App\Models\Skill;
use App\Models\User;
use App\Services\OnboardingScoreCalculator;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OnboardingScoreCalculatorTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_sums_choice_scores_from_user_answers(): void
    {
        $user = User::factory()->create();

        $language = Skill::query()->create([
            'name' => 'Language',
            'slug' => 'language',
            'category' => 'Communication',
            'is_active' => true,
        ]);

        $communication = Skill::query()->create([
            'name' => 'Communication',
            'slug' => 'communication',
            'category' => 'Communication',
            'is_active' => true,
        ]);

        $question = OnboardingQuestion::query()->create([
            'step_id' => 1,
            'question' => 'How does your child communicate?',
            'type' => OnboardingQuestionType::SingleChoice,
            'is_required' => true,
            'order' => 1,
        ]);

        $choice = OnboardingQuestionChoice::query()->create([
            'question_id' => $question->id,
            'label' => 'Uses short sentences',
            'value' => 'short_phrases',
            'order' => 0,
        ]);

        OnboardingChoiceScore::query()->create([
            'choice_id' => $choice->id,
            'skill_id' => $language->id,
            'score' => 30,
        ]);

        OnboardingChoiceScore::query()->create([
            'choice_id' => $choice->id,
            'skill_id' => $communication->id,
            'score' => 25,
        ]);

        OnboardingAnswer::query()->create([
            'user_id' => $user->id,
            'question_id' => $question->id,
            'choice_id' => $choice->id,
        ]);

        $totals = app(OnboardingScoreCalculator::class)->calculate($user);

        $this->assertCount(2, $totals);
        $this->assertSame(30, $totals->firstWhere('skill_id', $language->id)['score']);
        $this->assertSame(25, $totals->firstWhere('skill_id', $communication->id)['score']);
    }

    public function test_it_includes_negative_scores(): void
    {
        $user = User::factory()->create();

        $memory = Skill::query()->create([
            'name' => 'Memory',
            'slug' => 'memory',
            'category' => 'Foundation',
            'is_active' => true,
        ]);

        $question = OnboardingQuestion::query()->create([
            'step_id' => 1,
            'question' => 'Can your child remember instructions?',
            'type' => OnboardingQuestionType::SingleChoice,
            'is_required' => true,
            'order' => 1,
        ]);

        $noChoice = OnboardingQuestionChoice::query()->create([
            'question_id' => $question->id,
            'label' => 'No',
            'value' => 'no',
            'order' => 0,
        ]);

        OnboardingChoiceScore::query()->create([
            'choice_id' => $noChoice->id,
            'skill_id' => $memory->id,
            'score' => -10,
        ]);

        OnboardingAnswer::query()->create([
            'user_id' => $user->id,
            'question_id' => $question->id,
            'choice_id' => $noChoice->id,
        ]);

        $totals = app(OnboardingScoreCalculator::class)->calculate($user);

        $this->assertSame(-10, $totals->first()['score']);
    }
}
