<?php

namespace App\Filament\Resources\Games\Tables;

use App\Enums\GameLevel;
use App\Enums\GameStatus;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class GamesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('imagePath')
                    ->label('Thumbnail')
                    ->disk('public')
                    ->square()
                    ->imageHeight(40),
                TextColumn::make('name')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('routePath')
                    ->label('Route path')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('status')
                    ->badge()
                    ->formatStateUsing(fn (GameStatus $state): string => $state->label())
                    ->sortable(),
                TextColumn::make('level')
                    ->formatStateUsing(fn (GameLevel $state): string => $state->label())
                    ->sortable(),
                TextColumn::make('category')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
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
