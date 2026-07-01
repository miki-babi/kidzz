<?php

namespace App\Filament\Resources\OnboardingQuestions\Pages;

use App\Filament\Resources\OnboardingQuestions\OnboardingQuestionResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListOnboardingQuestions extends ListRecords
{
    protected static string $resource = OnboardingQuestionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
