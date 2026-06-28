<?php

namespace App\Filament\Resources\OnboardingQuestions\Tables;

use App\Models\OnboardingQuestion;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class OnboardingQuestionsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('step_id')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('order')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('question')
                    ->searchable()
                    ->limit(60),
                TextColumn::make('type')
                    ->badge()
                    ->searchable(),
                TextColumn::make('choices_count')
                    ->counts('choices')
                    ->label('Choices'),
                IconColumn::make('is_required')
                    ->boolean(),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('step_id')
            ->filters([
                SelectFilter::make('step_id')
                    ->options(fn (): array => OnboardingQuestion::query()
                        ->orderBy('step_id')
                        ->pluck('step_id', 'step_id')
                        ->mapWithKeys(fn (int $stepId): array => [$stepId => "Step {$stepId}"])
                        ->all()),
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
