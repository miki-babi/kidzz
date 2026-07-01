<?php

namespace App\Filament\Resources\OnboardingQuestions\Pages;

use App\Filament\Resources\OnboardingQuestions\OnboardingQuestionResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditOnboardingQuestion extends EditRecord
{
    protected static string $resource = OnboardingQuestionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
