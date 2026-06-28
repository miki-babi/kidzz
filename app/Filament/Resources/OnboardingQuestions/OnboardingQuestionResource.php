<?php

namespace App\Filament\Resources\OnboardingQuestions;

use App\Filament\Resources\OnboardingQuestions\Pages\CreateOnboardingQuestion;
use App\Filament\Resources\OnboardingQuestions\Pages\EditOnboardingQuestion;
use App\Filament\Resources\OnboardingQuestions\Pages\ListOnboardingQuestions;
use App\Filament\Resources\OnboardingQuestions\Schemas\OnboardingQuestionForm;
use App\Filament\Resources\OnboardingQuestions\Tables\OnboardingQuestionsTable;
use App\Models\OnboardingQuestion;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class OnboardingQuestionResource extends Resource
{
    protected static ?string $model = OnboardingQuestion::class;

    protected static ?string $recordTitleAttribute = 'question';

    protected static ?string $navigationLabel = 'Onboarding Questions';

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedClipboardDocumentList;

    public static function form(Schema $schema): Schema
    {
        return OnboardingQuestionForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return OnboardingQuestionsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListOnboardingQuestions::route('/'),
            'create' => CreateOnboardingQuestion::route('/create'),
            'edit' => EditOnboardingQuestion::route('/{record}/edit'),
        ];
    }
}
