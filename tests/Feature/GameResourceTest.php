<?php

namespace Tests\Feature;

use App\Enums\GameLevel;
use App\Enums\GameStatus;
use App\Filament\Resources\Games\Pages\CreateGame;
use App\Filament\Resources\Games\Pages\EditGame;
use App\Models\Game;
use App\Models\Skill;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Livewire\Livewire;
use Tests\TestCase;

class GameResourceTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_create_game_with_custom_metadata(): void
    {
        Storage::fake('public');

        $thumbnailPath = UploadedFile::fake()
            ->image('emotion-match.jpg')
            ->store('games/thumbnails', 'public');

        $admin = User::factory()->create([
            'is_admin' => true,
        ]);

        $skill = Skill::query()->create([
            'name' => 'Communication',
            'slug' => 'communication',
            'category' => 'Communication',
            'is_active' => true,
        ]);

        $this->actingAs($admin);

        Livewire::test(CreateGame::class)
            ->fillForm([
                'name' => 'Emotion Match',
                'description' => 'Match facial expressions with emotions.',
                'routePath' => 'emotion-match',
                'imagePath' => [$thumbnailPath],
                'category' => 'Social Skills',
                'status' => GameStatus::Active->value,
                'level' => GameLevel::Two->value,
                'min_age' => 4,
                'max_age' => 10,
                'target_skills' => [
                    [
                        'skill_id' => $skill->id,
                        'score_range' => '60-80',
                    ],
                ],
                'skill_awards' => [
                    [
                        'skill_id' => $skill->id,
                        'award' => 10,
                    ],
                ],
                'sensory_characteristics' => [
                    ['key' => 'sound_intensity', 'value' => 'low'],
                    ['key' => 'haptic_feedback', 'value' => 'none'],
                ],
                'gameplay' => [
                    ['key' => 'number_of_rounds', 'value' => '10'],
                    ['key' => 'hint_available', 'value' => 'true'],
                ],
                'learning_objectives' => [
                    ['objective' => 'Emotion Recognition'],
                    ['objective' => 'Social Understanding'],
                ],
            ])
            ->call('create')
            ->assertHasNoFormErrors();

        $game = Game::query()->where('routePath', 'emotion-match')->first();

        $this->assertNotNull($game);
        $this->assertSame($thumbnailPath, $game->imagePath);
        $this->assertSame('Emotion Match', $game->name);
        $this->assertSame(GameStatus::Active, $game->status);
        $this->assertSame(GameLevel::Two, $game->level);
        $this->assertSame(4, $game->min_age);
        $this->assertSame(10, $game->max_age);
        $this->assertSame($skill->id, $game->target_skills[0]['skill_id']);
        $this->assertSame('60-80', $game->target_skills[0]['score_range']);
        $this->assertSame('none', $game->sensory_characteristics[1]['value']);
        $this->assertSame(['Emotion Recognition', 'Social Understanding'], $game->learning_objectives);
    }

    public function test_admin_can_edit_game_and_add_new_repeater_rows(): void
    {
        Storage::fake('public');

        $thumbnailPath = UploadedFile::fake()
            ->image('emotions.jpg')
            ->store('games/thumbnails', 'public');

        $admin = User::factory()->create([
            'is_admin' => true,
        ]);

        $game = Game::query()->create([
            'name' => 'Find The Feeling',
            'description' => 'Tap the matching emotion face.',
            'category' => 'Daily Routine',
            'routePath' => 'emotions',
            'imagePath' => $thumbnailPath,
            'status' => GameStatus::Active,
            'sensory_characteristics' => [
                ['key' => 'sound_intensity', 'value' => 'low'],
            ],
        ]);

        $this->actingAs($admin);

        Livewire::test(EditGame::class, ['record' => $game->getRouteKey()])
            ->fillForm([
                'sensory_characteristics' => [
                    ['key' => 'sound_intensity', 'value' => 'low'],
                    ['key' => 'visual_stimulation', 'value' => 'moderate'],
                    ['key' => 'custom_sensory_note', 'value' => 'dimmed background'],
                ],
            ])
            ->call('save')
            ->assertHasNoFormErrors();

        $game->refresh();

        $this->assertSame('moderate', $game->sensory_characteristics[1]['value']);
        $this->assertSame('dimmed background', $game->sensory_characteristics[2]['value']);
    }

    public function test_target_skill_scores_must_be_numeric_ranges(): void
    {
        $admin = User::factory()->create([
            'is_admin' => true,
        ]);

        $skill = Skill::query()->create([
            'name' => 'Attention',
            'slug' => 'attention',
            'category' => 'Foundation',
            'is_active' => true,
        ]);

        $this->actingAs($admin);

        Livewire::test(CreateGame::class)
            ->fillForm([
                'name' => 'Invalid Scores',
                'routePath' => 'invalid-scores',
                'status' => GameStatus::Active->value,
                'target_skills' => [
                    [
                        'skill_id' => $skill->id,
                        'score_range' => '80',
                    ],
                ],
            ])
            ->call('create')
            ->assertHasFormErrors(['target_skills']);

        Livewire::test(CreateGame::class)
            ->fillForm([
                'name' => 'Invalid Range Order',
                'routePath' => 'invalid-range-order',
                'status' => GameStatus::Active->value,
                'target_skills' => [
                    [
                        'skill_id' => $skill->id,
                        'score_range' => '20-2',
                    ],
                ],
            ])
            ->call('create')
            ->assertHasFormErrors(['target_skills']);
    }

    public function test_route_path_is_required_and_unique(): void
    {
        $admin = User::factory()->create([
            'is_admin' => true,
        ]);

        Game::query()->create([
            'name' => 'Existing Game',
            'routePath' => 'existing-game',
            'status' => GameStatus::Active,
        ]);

        $this->actingAs($admin);

        Livewire::test(CreateGame::class)
            ->fillForm([
                'name' => 'Duplicate Route',
                'routePath' => 'existing-game',
                'status' => GameStatus::Active->value,
            ])
            ->call('create')
            ->assertHasFormErrors(['routePath' => 'unique']);

        Livewire::test(CreateGame::class)
            ->fillForm([
                'name' => 'Missing Route',
                'routePath' => null,
                'status' => GameStatus::Active->value,
            ])
            ->call('create')
            ->assertHasFormErrors(['routePath' => 'required']);
    }
}
