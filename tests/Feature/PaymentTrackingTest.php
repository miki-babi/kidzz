<?php

namespace Tests\Feature;

use App\Models\Game;
use App\Models\PaymentTracking;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class PaymentTrackingTest extends TestCase
{
    use RefreshDatabase;

    public function test_free_accounts_only_unlock_the_first_two_games(): void
    {
        $user = User::factory()->create([
            'onboarded' => true,
        ]);

        foreach ([
            [
                'name' => 'Tap The Star',
                'description' => 'Tap quickly.',
                'category' => 'Foundation Skills',
                'routePath' => 'tap-star',
                'imagePath' => null,
            ],
            [
                'name' => 'Match Colors',
                'description' => 'Match the colors.',
                'category' => 'Foundation Skills',
                'routePath' => 'match-colors',
                'imagePath' => null,
            ],
            [
                'name' => 'Brush Teeth Order',
                'description' => 'Sequence the steps.',
                'category' => 'Cognitive Skills',
                'routePath' => 'sequencing',
                'imagePath' => null,
            ],
        ] as $gameData) {
            Game::query()->create($gameData);
        }

        $response = $this->actingAs($user)->get(route('games'));

        $response->assertOk()->assertInertia(fn (Assert $page) => $page
            ->component('games')
            ->where('hasActiveAccount', false)
            ->where('freeGamesLimit', 2)
            ->where('recommendedCategory', 'Foundation Skills')
            ->has('games', 3)
            ->where('games.0.is_free', true)
            ->where('games.1.is_free', true)
            ->where('games.2.is_locked', true),
        );
    }

    public function test_premium_accounts_unlock_all_games(): void
    {
        $user = User::factory()->create([
            'onboarded' => true,
        ]);

        PaymentTracking::query()->create([
            'user_id' => $user->id,
            'plan_type' => 'premium',
            'is_active' => true,
            'payment_reference' => 'INV-1001',
        ]);

        foreach ([
            [
                'name' => 'Tap The Star',
                'description' => 'Tap quickly.',
                'category' => 'Foundation Skills',
                'routePath' => 'tap-star',
                'imagePath' => null,
            ],
            [
                'name' => 'Match Colors',
                'description' => 'Match the colors.',
                'category' => 'Foundation Skills',
                'routePath' => 'match-colors',
                'imagePath' => null,
            ],
            [
                'name' => 'Brush Teeth Order',
                'description' => 'Sequence the steps.',
                'category' => 'Cognitive Skills',
                'routePath' => 'sequencing',
                'imagePath' => null,
            ],
        ] as $gameData) {
            Game::query()->create($gameData);
        }

        $response = $this->actingAs($user)->get(route('games'));

        $response->assertOk()->assertInertia(fn (Assert $page) => $page
            ->component('games')
            ->where('hasActiveAccount', true)
            ->has('games', 3)
            ->where('games.0.is_locked', false)
            ->where('games.1.is_locked', false)
            ->where('games.2.is_locked', false),
        );
    }
}
