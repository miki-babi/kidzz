<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Collection;

class OnboardingStepResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        /** @var array{stepId: int, questions: Collection} $step */
        $step = $this->resource;

        return [
            'stepId' => $step['stepId'],
            'questions' => OnboardingQuestionResource::collection($step['questions'])
                ->resolve($request),
        ];
    }
}
