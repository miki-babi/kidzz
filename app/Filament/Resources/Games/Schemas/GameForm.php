<?php

namespace App\Filament\Resources\Games\Schemas;

use App\Enums\GameLevel;
use App\Enums\GameStatus;
use App\Models\Skill;
use App\Rules\NumericRangeString;
use App\Rules\TargetSkillScores;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Schema;

class GameForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Tabs::make('Game')
                    ->tabs([
                        Tab::make('Basic')
                            ->schema([
                                TextInput::make('name')
                                    ->required()
                                    ->maxLength(255),
                                Textarea::make('description')
                                    ->columnSpanFull(),
                                TextInput::make('routePath')
                                    ->label('Route path')
                                    ->required()
                                    ->unique(ignoreRecord: true)
                                    ->maxLength(255),
                                FileUpload::make('imagePath')
                                    ->label('Thumbnail')
                                    ->image()
                                    ->disk('public')
                                    ->directory('games/thumbnails')
                                    ->visibility('public')
                                    ->imageEditor(),
                                TextInput::make('category')
                                    ->maxLength(255),
                                Select::make('status')
                                    ->options(collect(GameStatus::cases())->mapWithKeys(
                                        fn (GameStatus $status): array => [$status->value => $status->label()],
                                    )->all())
                                    ->default(GameStatus::Active->value)
                                    ->required(),
                                Select::make('level')
                                    ->options(collect(GameLevel::cases())->mapWithKeys(
                                        fn (GameLevel $level): array => [$level->value => $level->label()],
                                    )->all())
                                    ->default(GameLevel::One->value)
                                    ->required(),
                                TextInput::make('min_age')
                                    ->label('Minimum age')
                                    ->numeric()
                                    ->minValue(0)
                                    ->maxValue(255)
                                    ->nullable(),
                                TextInput::make('max_age')
                                    ->label('Maximum age')
                                    ->numeric()
                                    ->minValue(0)
                                    ->maxValue(255)
                                    ->gte('min_age')
                                    ->nullable(),
                            ]),
                        Tab::make('Target Skills')
                            ->schema([
                                Repeater::make('target_skills')
                                    ->schema([
                                        Select::make('skill_id')
                                            ->label('Skill')
                                            ->options(fn (): array => Skill::query()
                                                ->where('is_active', true)
                                                ->orderBy('name')
                                                ->pluck('name', 'id')
                                                ->all())
                                            ->searchable()
                                            ->preload()
                                            ->required()
                                            ->distinct(),
                                        TextInput::make('score_range')
                                            ->label('Score range')
                                            ->placeholder('e.g. 2-20')
                                            ->required()
                                            ->rule(new NumericRangeString),
                                    ])
                                    ->columns(2)
                                    ->addActionLabel('Add skill')
                                    ->reorderable()
                                    ->rules([new TargetSkillScores])
                                    ->itemLabel(fn (array $state): ?string => Skill::query()
                                        ->find($state['skill_id'] ?? null)?->name)
                                    ->columnSpanFull(),
                            ]),
                        Tab::make('Skill Awards')
                            ->schema([
                                Repeater::make('skill_awards')
                                    ->schema([
                                        Select::make('skill_id')
                                            ->label('Skill')
                                            ->options(fn (): array => Skill::query()
                                                ->where('is_active', true)
                                                ->orderBy('name')
                                                ->pluck('name', 'id')
                                                ->all())
                                            ->searchable()
                                            ->preload()
                                            ->required()
                                            ->distinct(),
                                        TextInput::make('award')
                                            ->label('Award')
                                            ->numeric()
                                            ->minValue(0)
                                            ->required(),
                                    ])
                                    ->columns(2)
                                    ->addActionLabel('Add skill award')
                                    ->reorderable()
                                    ->itemLabel(fn (array $state): ?string => Skill::query()
                                        ->find($state['skill_id'] ?? null)?->name)
                                    ->columnSpanFull(),
                            ]),
                        Tab::make('Sensory')
                            ->schema([
                                self::keyValueRepeater('sensory_characteristics', 'Add characteristic'),
                            ]),
                        Tab::make('Gameplay')
                            ->schema([
                                self::keyValueRepeater('gameplay', 'Add property'),
                            ]),
                        Tab::make('Learning Objectives')
                            ->schema([
                                Repeater::make('learning_objectives')
                                    ->simple(
                                        TextInput::make('objective')
                                            ->label('Objective')
                                            ->required(),
                                    )
                                    ->addActionLabel('Add objective')
                                    ->reorderable()
                                    ->columnSpanFull(),
                            ]),
                    ])
                    ->columnSpanFull(),
            ]);
    }

    private static function keyValueRepeater(string $name, string $addActionLabel): Repeater
    {
        return Repeater::make($name)
            ->schema([
                TextInput::make('key')
                    ->label('Key')
                    ->required(),
                TextInput::make('value')
                    ->label('Value'),
            ])
            ->columns(2)
            ->addActionLabel($addActionLabel)
            ->reorderable()
            ->itemLabel(fn (array $state): ?string => $state['key'] ?? null)
            ->columnSpanFull();
    }
}
