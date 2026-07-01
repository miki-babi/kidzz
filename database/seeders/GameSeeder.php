<?php

namespace Database\Seeders;

use App\Models\Game;
use Illuminate\Database\Seeder;

class GameSeeder extends Seeder
{
    public function run(): void
    {
        $games = [
            [
                'name' => 'Tap The Star',
                'description' => 'Tap the star as many times as you can!',
                'category' => 'Sensory Space',
                'routePath' => 'tap-star',
                'imagePath' => 'https://images.unsplash.com/photo-1617174620573-030919b52a55?w=600',
            ],
            [
                'name' => 'Match Colors',
                'description' => 'Match the colors together!',
                'category' => 'Sensory Space',
                'routePath' => 'match-colors',
                'imagePath' => 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=600',
            ],
            [
                'name' => 'Fruit Basket',
                'description' => 'Sort fruits and veggies into the right baskets.',
                'category' => 'Communication Skill',
                'routePath' => 'sorting',
                'imagePath' => 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600',
            ],
            [
                'name' => 'Continue Pattern',
                'description' => 'What comes next in the pattern?',
                'category' => 'Communication Skill',
                'routePath' => 'patterns',
                'imagePath' => 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600',
            ],
            [
                'name' => 'Flip Cards',
                'description' => 'Find the matching pairs by flipping cards.',
                'category' => 'Communication Skill',
                'routePath' => 'memory',
                'imagePath' => 'https://images.unsplash.com/photo-1599305090598-fe179d501227?w=600',
            ],
            [
                'name' => 'Brush Teeth Order',
                'description' => 'Put the brushing steps in the right order.',
                'category' => 'Daily Routine',
                'routePath' => 'sequencing',
                'imagePath' => 'https://images.unsplash.com/photo-1627918451163-f2bd34346e91?w=600',
            ],
            [
                'name' => 'Help The Plant',
                'description' => 'What does the plant need to grow?',
                'category' => 'Daily Routine',
                'routePath' => 'cause-effect',
                'imagePath' => 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600',
            ],
            [
                'name' => 'Find The Feeling',
                'description' => 'Tap the matching emotion face.',
                'category' => 'Daily Routine',
                'routePath' => 'emotions',
                'imagePath' => 'https://images.unsplash.com/photo-1520206159579-53d3d29bb442?w=600',
            ],
            [
                'name' => 'Wash Hands',
                'description' => 'Follow the steps to wash your hands.',
                'category' => 'Daily Routine',
                'routePath' => 'handwashing',
                'imagePath' => 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600',
            ],
            [
                'name' => 'Dress For Weather',
                'description' => 'Choose the right outfit for the weather.',
                'category' => 'Daily Routine',
                'routePath' => 'dressing',
                'imagePath' => 'https://images.unsplash.com/photo-1627918451163-f2bd34346e91?w=600',
            ],
        ];

        foreach ($games as $game) {
            Game::firstOrCreate(
                ['routePath' => $game['routePath']],
                $game
            );
        }
    }
}
