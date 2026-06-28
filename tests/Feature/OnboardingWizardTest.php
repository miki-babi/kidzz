<?php

namespace Tests\Feature;

use App\Enums\OnboardingQuestionType;
use App\Models\OnboardingQuestion;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class OnboardingWizardTest extends TestCase
{
    use RefreshDatabase;

    public function test_onboarded_users_are_redirected_from_onboarding_page(): void
    {
        $user = User::factory()->create([
            'onboarded' => true,
        ]);

        $this->actingAs($user)
            ->get(route('onboarding'))
            ->assertRedirect(route('dashboard'));
    }

    public function test_onboarding_page_returns_grouped_steps(): void
    {
        $user = User::factory()->create([
            'onboarded' => false,
        ]);

        $question = OnboardingQuestion::query()->create([
            'step_id' => 1,
            'question' => 'What is your child\'s name?',
            'type' => OnboardingQuestionType::Text,
            'is_required' => true,
            'order' => 1,
        ]);

        $choiceQuestion = OnboardingQuestion::query()->create([
            'step_id' => 1,
            'question' => 'Gender (optional)',
            'type' => OnboardingQuestionType::SingleChoice,
            'is_required' => false,
            'order' => 2,
            'placeholder' => 'Select gender (optional)',
        ]);

        $choice = $choiceQuestion->choices()->create([
            'label' => 'Male',
            'value' => 'male',
            'order' => 0,
        ]);

        $choiceQuestion->update([
            'default_choice_id' => $choice->id,
        ]);

        $this->actingAs($user)
            ->get(route('onboarding'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('onboarding')
                ->has('steps', 1)
                ->where('steps.0.stepId', 1)
                ->has('steps.0.questions', 2)
                ->where('steps.0.questions.0.id', $question->id)
                ->where('steps.0.questions.1.placeholder', 'Select gender (optional)')
                ->where('steps.0.questions.1.defaultChoiceId', $choice->id)
                ->where('steps.0.questions.1.choices.0.id', $choice->id),
            );
    }

    public function test_onboarding_store_persists_answers_and_marks_user_onboarded(): void
    {
        $user = User::factory()->create([
            'onboarded' => false,
        ]);

        $textQuestion = OnboardingQuestion::query()->create([
            'step_id' => 1,
            'question' => 'What is your child\'s name?',
            'type' => OnboardingQuestionType::Text,
            'is_required' => true,
            'order' => 1,
        ]);

        $choiceQuestion = OnboardingQuestion::query()->create([
            'step_id' => 1,
            'question' => 'Age range',
            'type' => OnboardingQuestionType::SingleChoice,
            'is_required' => true,
            'order' => 2,
        ]);

        $choice = $choiceQuestion->choices()->create([
            'label' => '4 - 6 years',
            'value' => '5',
            'order' => 0,
        ]);

        $this->actingAs($user)
            ->post(route('onboarding.store'), [
                'answers' => [
                    [
                        'question_id' => $textQuestion->id,
                        'value' => 'Alex',
                    ],
                    [
                        'question_id' => $choiceQuestion->id,
                        'choice_id' => $choice->id,
                    ],
                ],
            ])
            ->assertRedirect(route('dashboard'));

        $user->refresh();

        $this->assertTrue($user->onboarded);
        $this->assertDatabaseHas('onboarding_answers', [
            'user_id' => $user->id,
            'question_id' => $textQuestion->id,
            'value' => 'Alex',
        ]);
        $this->assertDatabaseHas('onboarding_answers', [
            'user_id' => $user->id,
            'question_id' => $choiceQuestion->id,
            'choice_id' => $choice->id,
        ]);
        $this->assertDatabaseHas('user_profiles', [
            'user_id' => $user->id,
            'child_name' => 'Alex',
            'age' => 5,
        ]);
    }

    public function test_onboarding_store_validates_required_questions(): void
    {
        $user = User::factory()->create([
            'onboarded' => false,
        ]);

        $question = OnboardingQuestion::query()->create([
            'step_id' => 1,
            'question' => 'What is your child\'s name?',
            'type' => OnboardingQuestionType::Text,
            'is_required' => true,
            'order' => 1,
        ]);

        $this->actingAs($user)
            ->post(route('onboarding.store'), [
                'answers' => [],
            ])
            ->assertSessionHasErrors();

        $this->assertFalse($user->fresh()->onboarded);
        $this->assertDatabaseMissing('onboarding_answers', [
            'user_id' => $user->id,
            'question_id' => $question->id,
        ]);
    }

    public function test_onboarding_store_rejects_invalid_choice_for_question(): void
    {
        $user = User::factory()->create([
            'onboarded' => false,
        ]);

        $question = OnboardingQuestion::query()->create([
            'step_id' => 1,
            'question' => 'Age range',
            'type' => OnboardingQuestionType::SingleChoice,
            'is_required' => true,
            'order' => 1,
        ]);

        $otherQuestion = OnboardingQuestion::query()->create([
            'step_id' => 2,
            'question' => 'Gender (optional)',
            'type' => OnboardingQuestionType::SingleChoice,
            'is_required' => false,
            'order' => 1,
        ]);

        $validChoice = $question->choices()->create([
            'label' => '4 - 6 years',
            'value' => '5',
            'order' => 0,
        ]);

        $invalidChoice = $otherQuestion->choices()->create([
            'label' => 'Male',
            'value' => 'male',
            'order' => 0,
        ]);

        $this->actingAs($user)
            ->post(route('onboarding.store'), [
                'answers' => [
                    [
                        'question_id' => $question->id,
                        'choice_id' => $invalidChoice->id,
                    ],
                ],
            ])
            ->assertSessionHasErrors();

        $this->assertFalse($user->fresh()->onboarded);
        $this->assertDatabaseMissing('onboarding_answers', [
            'user_id' => $user->id,
            'choice_id' => $validChoice->id,
        ]);
    }
}
