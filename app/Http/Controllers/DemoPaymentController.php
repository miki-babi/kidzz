<?php

namespace App\Http\Controllers;

use App\Models\PaymentTracking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class DemoPaymentController extends Controller
{
    public function create(Request $request)
    {
        Log::info('Demo payment page opened.', [
            'user_id' => $request->user()?->id,
            'route' => '/pay',
        ]);

        return Inertia::render('payments/demo', [
            'game' => null,
            'price' => 9.99,
        ]);
    }

    public function store(Request $request)
    {
        Log::info('Demo payment submit started.', [
            'user_id' => $request->user()?->id,
            'route' => '/pay',
            'payload_keys' => array_keys($request->all()),
        ]);

        $validated = $request->validate([
            'cardholder_name' => ['required', 'string'],
            'email' => ['required', 'string'],
            'card_number' => ['required', 'string'],
            'expiry' => ['required', 'string'],
            'cvc' => ['required', 'string'],
        ]);

        $user = $request->user();

        $tracking = PaymentTracking::updateOrCreate(
            ['user_id' => $user->id],
            [
                'plan_type' => 'premium',
                'is_active' => true,
                'starts_at' => now(),
                'expires_at' => now()->addYear(),
                'payment_reference' => 'DEMO-PAY-'.$user->id,
                'notes' => 'Demo payment completed via fake checkout.',
            ],
        );

        Log::info('Demo payment tracking stored.', [
            'user_id' => $user->id,
            'tracking_id' => $tracking->id,
            'plan_type' => $tracking->plan_type,
            'is_active' => $tracking->is_active,
            'payment_reference' => $tracking->payment_reference,
        ]);

        $request->session()->flash('status', 'Payment completed. Your premium access is now active.');

        Log::info('Demo payment redirecting to games page.', [
            'user_id' => $user->id,
            'redirect_to' => route('games'),
        ]);

        return redirect()
            ->route('games')
            ->with('status', 'Payment completed. Your premium access is now active.');
    }
}
