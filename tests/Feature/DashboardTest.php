<?php

namespace Tests\Feature;

use App\Models\PaymentTracking;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_to_the_login_page()
    {
        $response = $this->get(route('dashboard'));
        $response->assertRedirect(route('login'));
    }

    public function test_authenticated_users_can_visit_the_dashboard()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $response = $this->get(route('dashboard'));
        $response->assertOk();
    }

    public function test_dashboard_exposes_locked_games_for_free_accounts(): void
    {
        $user = User::factory()->create([
            'onboarded' => true,
        ]);

        $this->actingAs($user)
            ->get(route('dashboard'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('dashboard')
                ->where('hasActiveAccount', false)
                ->where('freeGamesLimit', 2),
            );
    }

    public function test_dashboard_marks_premium_accounts_as_active(): void
    {
        $user = User::factory()->create([
            'onboarded' => true,
        ]);

        PaymentTracking::query()->create([
            'user_id' => $user->id,
            'plan_type' => 'premium',
            'is_active' => true,
        ]);

        $this->actingAs($user)
            ->get(route('dashboard'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('dashboard')
                ->where('hasActiveAccount', true)
                ->where('freeGamesLimit', 2),
            );
    }
}
