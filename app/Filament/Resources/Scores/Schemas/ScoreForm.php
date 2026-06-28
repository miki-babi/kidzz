<?php

namespace App\Filament\Resources\Scores\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class ScoreForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('user_id')
                    ->relationship('user', 'name')
                    ->required(),
                Select::make('skill_id')
                    ->relationship('skill', 'name')
                    ->required(),
                TextInput::make('score')
                    ->required()
                    ->numeric(),
            ]);
    }
}
