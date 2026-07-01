<?php

namespace App\Filament\Resources\OnboardingQuestions\Schemas;

use App\Enums\OnboardingQuestionType;
use App\Models\OnboardingQuestion;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class OnboardingQuestionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('question')
                    ->required()
                    ->columnSpanFull(),
                TextInput::make('step_id')
                    ->required()
                    ->numeric()
                    ->minValue(1),
                Select::make('type')
                    ->options(collect(OnboardingQuestionType::cases())->mapWithKeys(
                        fn (OnboardingQuestionType $type): array => [$type->value => $type->label()],
                    )->all())
                    ->required(),
                Toggle::make('is_required')
                    ->default(true),
                TextInput::make('order')
                    ->numeric()
                    ->default(0)
                    ->required(),
                TextInput::make('placeholder')
                    ->label('Dropdown placeholder')
                    ->placeholder('Select an option...')
                    ->maxLength(255)
                    ->columnSpanFull(),
                Select::make('default_choice_id')
                    ->label('Default choice')
                    ->options(function (?OnboardingQuestion $record): array {
                        if ($record === null) {
                            return [];
                        }

                        return $record->choices()
                            ->orderBy('order')
                            ->pluck('label', 'id')
                            ->all();
                    })
                    ->nullable()
                    ->searchable(),
                Repeater::make('choices')
                    ->relationship()
                    ->orderColumn('order')
                    ->label('Choices')
                    ->schema([
                        TextInput::make('label')
                            ->required(),
                        TextInput::make('value')
                            ->required(),
                        TextInput::make('order')
                            ->numeric()
                            ->default(0),
                        Repeater::make('choiceScores')
                            ->relationship()
                            ->label('Skill Scores')
                            ->schema([
                                Select::make('skill_id')
                                    ->relationship(
                                        name: 'skill',
                                        titleAttribute: 'name',
                                        modifyQueryUsing: fn ($query) => $query->where('is_active', true),
                                    )
                                    ->required()
                                    ->searchable()
                                    ->preload()
                                    ->distinct(),
                                TextInput::make('score')
                                    ->numeric()
                                    ->required(),
                            ])
                            ->columns(2)
                            ->addActionLabel('Add Skill')
                            ->collapsible()
                            ->defaultItems(0),
                    ])
                    ->collapsible()
                    ->itemLabel(fn (array $state): ?string => $state['label'] ?? null)
                    ->columnSpanFull()
                    ->defaultItems(0),
            ]);
    }
}
