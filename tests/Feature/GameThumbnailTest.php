<?php

namespace Tests\Feature;

use App\Enums\GameStatus;
use App\Models\Game;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class GameThumbnailTest extends TestCase
{
    use RefreshDatabase;

    public function test_thumbnail_accessor_resolves_public_disk_paths(): void
    {
        Storage::fake('public');

        $game = Game::query()->create([
            'name' => 'Tap The Star',
            'routePath' => 'tap-star',
            'imagePath' => 'games/thumbnails/tap-star.jpg',
            'status' => GameStatus::Active,
        ]);

        $this->assertSame(
            Storage::disk('public')->url('games/thumbnails/tap-star.jpg'),
            $game->thumbnail,
        );
    }

    public function test_thumbnail_accessor_passes_through_external_urls(): void
    {
        $externalUrl = 'https://images.unsplash.com/photo-1617174620573-030919b52a55?w=600';

        $game = Game::query()->create([
            'name' => 'Tap The Star',
            'routePath' => 'tap-star',
            'imagePath' => $externalUrl,
            'status' => GameStatus::Active,
        ]);

        $this->assertSame($externalUrl, $game->thumbnail);
    }

    public function test_games_page_exposes_resolved_thumbnail_urls(): void
    {
        Storage::fake('public');

        $user = User::factory()->create([
            'onboarded' => true,
        ]);

        Game::query()->create([
            'name' => 'Tap The Star',
            'description' => 'Tap quickly.',
            'category' => 'Sensory Space',
            'routePath' => 'tap-star',
            'imagePath' => 'games/thumbnails/tap-star.jpg',
            'status' => GameStatus::Active,
        ]);

        $expectedUrl = Storage::disk('public')->url('games/thumbnails/tap-star.jpg');

        $this->actingAs($user)
            ->get(route('games'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('games')
                ->has('games', 1)
                ->where('games.0.imagePath', $expectedUrl),
            );
    }

    public function test_dashboard_exposes_resolved_thumbnail_urls(): void
    {
        Storage::fake('public');

        $user = User::factory()->create([
            'onboarded' => true,
        ]);

        Game::query()->create([
            'name' => 'Match Colors',
            'description' => 'Match the colors.',
            'category' => 'Sensory Space',
            'routePath' => 'match-colors',
            'imagePath' => 'games/thumbnails/match-colors.jpg',
            'status' => GameStatus::Active,
        ]);

        $expectedUrl = Storage::disk('public')->url('games/thumbnails/match-colors.jpg');

        $this->actingAs($user)
            ->get(route('dashboard'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('dashboard')
                ->has('games', 1)
                ->where('games.0.imagePath', $expectedUrl),
            );
    }
}
