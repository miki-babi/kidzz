<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\User as SocialiteUser;
use Tests\TestCase;

class GoogleAuthenticationTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        config([
            'services.google.client_id' => 'test-client-id',
            'services.google.client_secret' => 'test-client-secret',
            'services.google.redirect' => 'http://localhost/auth/google/callback',
        ]);
    }

    public function test_google_redirect_route_returns_redirect_response(): void
    {
        Socialite::fake('google');

        $response = $this->get(route('auth.google.redirect'));

        $response->assertRedirect();
    }

    public function test_google_callback_creates_new_user_and_authenticates(): void
    {
        Socialite::fake('google', SocialiteUser::fake([
            'id' => 'google-123',
            'sub' => 'google-123',
            'name' => 'Google User',
            'email' => 'google@example.com',
            'email_verified' => true,
            'verified_email' => true,
        ]));

        $response = $this->get(route('auth.google.callback'));

        $response->assertRedirect(route('dashboard', absolute: false));
        $this->assertAuthenticated();

        $this->assertDatabaseHas('users', [
            'name' => 'Google User',
            'email' => 'google@example.com',
            'google_id' => 'google-123',
        ]);

        $user = User::query()->where('email', 'google@example.com')->first();

        $this->assertNotNull($user?->email_verified_at);
        $this->assertNull($user?->password);
    }

    public function test_google_callback_logs_in_existing_user_matched_by_google_id(): void
    {
        $user = User::factory()->create([
            'google_id' => 'google-456',
            'email' => 'existing@example.com',
        ]);

        Socialite::fake('google', SocialiteUser::fake([
            'id' => 'google-456',
            'name' => 'Existing User',
            'email' => 'existing@example.com',
            'verified_email' => true,
        ]));

        $response = $this->get(route('auth.google.callback'));

        $response->assertRedirect(route('dashboard', absolute: false));
        $this->assertAuthenticatedAs($user);
    }

    public function test_google_callback_links_google_id_to_existing_email_user(): void
    {
        $user = User::factory()->create([
            'email' => 'linked@example.com',
            'google_id' => null,
            'email_verified_at' => null,
        ]);

        Socialite::fake('google', SocialiteUser::fake([
            'id' => 'google-789',
            'sub' => 'google-789',
            'name' => 'Linked User',
            'email' => 'linked@example.com',
            'email_verified' => true,
            'verified_email' => true,
        ]));

        $response = $this->get(route('auth.google.callback'));

        $response->assertRedirect(route('dashboard', absolute: false));
        $this->assertAuthenticatedAs($user);

        $user->refresh();

        $this->assertSame('google-789', $user->google_id);
        $this->assertNotNull($user->email_verified_at);
    }

    public function test_users_with_two_factor_enabled_skip_challenge_when_using_google(): void
    {
        $user = User::factory()->withTwoFactor()->create([
            'google_id' => 'google-2fa',
            'email' => 'twofa@example.com',
        ]);

        Socialite::fake('google', SocialiteUser::fake([
            'id' => 'google-2fa',
            'name' => 'Two Factor User',
            'email' => 'twofa@example.com',
            'verified_email' => true,
        ]));

        $response = $this->get(route('auth.google.callback'));

        $response->assertRedirect(route('dashboard', absolute: false));
        $this->assertAuthenticatedAs($user);
    }
}
