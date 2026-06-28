<?php

namespace Tests\Feature;

use App\Enums\OnboardingQuestionType;
use App\Filament\Resources\OnboardingQuestions\Pages\CreateOnboardingQuestion;
use App\Models\OnboardingChoiceScore;
use App\Models\OnboardingQuestion;
use App\Models\OnboardingQuestionChoice;
use App\Models\Skill;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Livewire\Livewire;
use Tests\TestCase;

class OnboardingQuestionResourceTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_create_question_with_choices_and_skill_scores(): void
    {
        $admin = User::factory()->create([
            'is_admin' => true,
        ]);

        $skill = Skill::query()->create([
            'name' => 'Language',
            'slug' => 'language',
            'category' => 'Communication',
            'is_active' => true,
        ]);

        $this->actingAs($admin);

        Livewire::test(CreateOnboardingQuestion::class)
            ->fillForm([
                'step_id' => 1,
                'question' => 'How does your child communicate?',
                'type' => OnboardingQuestionType::SingleChoice->value,
                'is_required' => true,
                'order' => 1,
                'choices' => [
                    [
                        'label' => 'Uses short sentences',
                        'value' => 'short_phrases',
                        'order' => 0,
                        'choiceScores' => [
                            [
                                'skill_id' => $skill->id,
                                'score' => 30,
                            ],
                        ],
                    ],
                ],
            ])
            ->call('create')
            ->assertHasNoFormErrors();

        $question = OnboardingQuestion::query()->first();

        $this->assertNotNull($question);
        $this->assertSame('How does your child communicate?', $question->question);

        $choice = OnboardingQuestionChoice::query()->first();

        $this->assertNotNull($choice);
        $this->assertSame('Uses short sentences', $choice->label);

        $choiceScore = OnboardingChoiceScore::query()->first();

        $this->assertNotNull($choiceScore);
        $this->assertSame($skill->id, $choiceScore->skill_id);
        $this->assertSame(30, $choiceScore->score);
    }
}
