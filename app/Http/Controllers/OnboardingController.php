<?php

namespace App\Http\Controllers;

use App\Enums\OnboardingQuestionType;
use App\Http\Requests\StoreOnboardingRequest;
use App\Http\Resources\OnboardingStepResource;
use App\Models\Diagnosis;
use App\Models\OnboardingAnswer;
use App\Models\OnboardingQuestion;
use App\Models\UserProfile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class OnboardingController extends Controller
{
    public function show(): Response|RedirectResponse
    {
        $user = Auth::user();

        if ($user?->onboarded) {
            return redirect()->route('dashboard');
        }

        $steps = OnboardingQuestion::query()
            ->with(['choices' => fn ($query) => $query->orderBy('order')])
            ->orderBy('step_id')
            ->orderBy('order')
            ->get()
            ->groupBy('step_id')
            ->map(fn ($questions, $stepId) => [
                'stepId' => (int) $stepId,
                'questions' => $questions->values(),
            ])
            ->values();

        return Inertia::render('onboarding', [
            'steps' => OnboardingStepResource::collection($steps)->resolve(),
        ]);
    }

    public function store(StoreOnboardingRequest $request): RedirectResponse
    {
        $user = Auth::user();
        $validated = $request->validated();

        DB::transaction(function () use ($user, $validated): void {
            OnboardingAnswer::query()->where('user_id', $user->id)->delete();

            $profileData = [];

            foreach ($validated['answers'] as $answer) {
                $question = OnboardingQuestion::query()->find($answer['question_id']);

                if ($question === null) {
                    continue;
                }

                match ($question->type) {
                    OnboardingQuestionType::SingleChoice => $this->storeSingleChoiceAnswer($user->id, $answer, $profileData),
                    OnboardingQuestionType::MultiChoice => $this->storeMultiChoiceAnswers($user->id, $answer, $profileData),
                    OnboardingQuestionType::Text, OnboardingQuestionType::Number => $this->storeValueAnswer($user->id, $answer, $profileData),
                };
            }

            if ($profileData !== []) {
                UserProfile::query()->updateOrCreate(
                    ['user_id' => $user->id],
                    $profileData,
                );
            }

            $this->syncDiagnoses($user->id, $validated['answers']);

            $user->update(['onboarded' => true]);
        });

        return redirect()->route('dashboard')->with('success', 'Profile completed successfully!');
    }

    /**
     * @param  array<string, mixed>  $answer
     * @param  array<string, mixed>  $profileData
     */
    private function storeSingleChoiceAnswer(int $userId, array $answer, array &$profileData): void
    {
        OnboardingAnswer::query()->create([
            'user_id' => $userId,
            'question_id' => $answer['question_id'],
            'choice_id' => $answer['choice_id'],
        ]);

        $this->mapProfileFields($answer['question_id'], $answer['choice_id'], null, $profileData);
    }

    /**
     * @param  array<string, mixed>  $answer
     * @param  array<string, mixed>  $profileData
     */
    private function storeMultiChoiceAnswers(int $userId, array $answer, array &$profileData): void
    {
        foreach ($answer['choice_ids'] ?? [] as $choiceId) {
            OnboardingAnswer::query()->create([
                'user_id' => $userId,
                'question_id' => $answer['question_id'],
                'choice_id' => $choiceId,
            ]);
        }
    }

    /**
     * @param  array<string, mixed>  $answer
     * @param  array<string, mixed>  $profileData
     */
    private function storeValueAnswer(int $userId, array $answer, array &$profileData): void
    {
        OnboardingAnswer::query()->create([
            'user_id' => $userId,
            'question_id' => $answer['question_id'],
            'value' => $answer['value'],
        ]);

        $this->mapProfileFields($answer['question_id'], null, $answer['value'], $profileData);
    }

    /**
     * @param  array<string, mixed>  $profileData
     */
    private function mapProfileFields(int $questionId, ?int $choiceId, ?string $value, array &$profileData): void
    {
        $question = OnboardingQuestion::query()->with('choices')->find($questionId);

        if ($question === null) {
            return;
        }

        if ($question->type === OnboardingQuestionType::Text && str_contains(strtolower($question->question), 'name')) {
            $profileData['child_name'] = $value;

            return;
        }

        if ($question->type !== OnboardingQuestionType::SingleChoice || $choiceId === null) {
            return;
        }

        $choice = $question->choices->firstWhere('id', $choiceId);

        if ($choice === null) {
            return;
        }

        if ($question->question === 'Age range') {
            $profileData['age'] = (int) $choice->value;

            return;
        }

        if ($question->question === 'Gender (optional)') {
            $profileData['gender'] = $choice->value;

            return;
        }

        if (str_contains(strtolower($question->question), 'evaluated')) {
            $profileData['evaluated_status'] = $choice->label;

            return;
        }

        if (str_contains(strtolower($question->question), 'communicate')) {
            $profileData['speech_level'] = $choice->label;
        }
    }

    /**
     * @param  list<array<string, mixed>>  $answers
     */
    private function syncDiagnoses(int $userId, array $answers): void
    {
        $diagnosisQuestion = OnboardingQuestion::query()
            ->where('type', OnboardingQuestionType::MultiChoice)
            ->where('question', 'like', '%diagnos%')
            ->first();

        if ($diagnosisQuestion === null) {
            return;
        }

        $answer = collect($answers)->firstWhere('question_id', $diagnosisQuestion->id);
        $choiceIds = $answer['choice_ids'] ?? [];

        Diagnosis::query()->where('user_id', $userId)->delete();

        if ($choiceIds === []) {
            return;
        }

        $choices = $diagnosisQuestion->choices()->whereIn('id', $choiceIds)->get();

        foreach ($choices as $choice) {
            Diagnosis::query()->create([
                'user_id' => $userId,
                'name' => $choice->label,
            ]);
        }
    }
}
