<?php

namespace App\Http\Requests;

use App\Enums\OnboardingQuestionType;
use App\Models\OnboardingQuestion;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreOnboardingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'answers' => ['required', 'array'],
            'answers.*.question_id' => ['required', 'integer', Rule::exists('onboarding_questions', 'id')],
            'answers.*.choice_id' => ['nullable', 'integer', Rule::exists('onboarding_question_choices', 'id')],
            'answers.*.choice_ids' => ['nullable', 'array'],
            'answers.*.choice_ids.*' => ['integer', Rule::exists('onboarding_question_choices', 'id')],
            'answers.*.value' => ['nullable', 'string', 'max:255'],
        ];
    }

    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator): void {
            if ($validator->errors()->isNotEmpty()) {
                return;
            }

            $questions = OnboardingQuestion::query()
                ->with('choices')
                ->get()
                ->keyBy('id');

            $answersByQuestion = collect($this->input('answers', []))->keyBy('question_id');

            foreach ($questions as $questionId => $question) {
                if (! $question->is_required) {
                    continue;
                }

                if (! $answersByQuestion->has($questionId)) {
                    $validator->errors()->add(
                        "answers.{$questionId}",
                        "An answer is required for: {$question->question}",
                    );
                }
            }

            foreach ($this->input('answers', []) as $index => $answer) {
                $question = $questions->get($answer['question_id'] ?? null);

                if ($question === null) {
                    continue;
                }

                $validChoiceIds = $question->choices->pluck('id')->all();

                match ($question->type) {
                    OnboardingQuestionType::SingleChoice => $this->validateSingleChoice($validator, $index, $answer, $validChoiceIds),
                    OnboardingQuestionType::MultiChoice => $this->validateMultiChoice($validator, $index, $answer, $validChoiceIds),
                    OnboardingQuestionType::Text => $this->validateTextAnswer($validator, $index, $answer),
                    OnboardingQuestionType::Number => $this->validateNumberAnswer($validator, $index, $answer),
                };
            }
        });
    }

    /**
     * @param  list<int>  $validChoiceIds
     */
    private function validateSingleChoice(Validator $validator, int $index, array $answer, array $validChoiceIds): void
    {
        if (! isset($answer['choice_id'])) {
            $validator->errors()->add("answers.{$index}.choice_id", 'A choice is required for this question.');

            return;
        }

        if (! in_array((int) $answer['choice_id'], $validChoiceIds, true)) {
            $validator->errors()->add("answers.{$index}.choice_id", 'The selected choice does not belong to this question.');
        }
    }

    /**
     * @param  list<int>  $validChoiceIds
     */
    private function validateMultiChoice(Validator $validator, int $index, array $answer, array $validChoiceIds): void
    {
        $choiceIds = $answer['choice_ids'] ?? [];

        if ($choiceIds === []) {
            return;
        }

        foreach ($choiceIds as $choiceIndex => $choiceId) {
            if (! in_array((int) $choiceId, $validChoiceIds, true)) {
                $validator->errors()->add(
                    "answers.{$index}.choice_ids.{$choiceIndex}",
                    'One or more selected choices do not belong to this question.',
                );
            }
        }
    }

    private function validateTextAnswer(Validator $validator, int $index, array $answer): void
    {
        if (! filled($answer['value'] ?? null)) {
            $validator->errors()->add("answers.{$index}.value", 'A text answer is required for this question.');
        }
    }

    private function validateNumberAnswer(Validator $validator, int $index, array $answer): void
    {
        if (! isset($answer['value']) || ! is_numeric($answer['value'])) {
            $validator->errors()->add("answers.{$index}.value", 'A numeric answer is required for this question.');
        }
    }
}
