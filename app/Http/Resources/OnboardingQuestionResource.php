<?php

namespace App\Http\Resources;

use App\Models\OnboardingQuestion;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin OnboardingQuestion
 */
class OnboardingQuestionResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'question' => $this->question,
            'type' => $this->type->value,
            'isRequired' => $this->is_required,
            'order' => $this->order,
            'placeholder' => $this->placeholder,
            'defaultChoiceId' => $this->default_choice_id,
            'choices' => $this->whenLoaded('choices', fn () => $this->choices->map(fn ($choice) => [
                'id' => $choice->id,
                'label' => $choice->label,
                'value' => $choice->value,
            ])),
        ];
    }
}
