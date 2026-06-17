<?php

namespace Tests\Feature;

use App\Models\Game;
use App\Models\PaymentTracking;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DemoPaymentFlowTest extends TestCase
{
    use RefreshDatabase;

    public function test_fake_payment_flow_unlocks_premium_access(): void
    {
        $user = User::factory()->create([
            'onboarded' => true,
        ]);

        $game = Game::query()->create([
            'name' => 'Brush Teeth Order',
            'description' => 'Sequence the steps.',
            'category' => 'Cognitive Skills',
            'routePath' => 'sequencing',
            'imagePath' => null,
        ]);

        $this->actingAs($user)
            ->post(route('pay.store'), [
                'cardholder_name' => 'Demo Parent',
                'email' => 'demo@example.com',
                'card_number' => '4111111111111111',
                'expiry' => '12/30',
                'cvc' => '123',
            ])
            ->assertRedirect(route('games'))
            ->assertSessionHas('status', 'Payment completed. Your premium access is now active.');

        $this->assertDatabaseHas('payment_trackings', [
            'user_id' => $user->id,
            'plan_type' => 'premium',
            'is_active' => true,
        ]);

        $tracking = PaymentTracking::query()->where('user_id', $user->id)->first();

        $this->assertNotNull($tracking);
        $this->assertTrue($tracking->isPremium());

        $response = $this->actingAs($user)->get(route('games'));

        $response->assertOk();
    }
}
