<?php

namespace App\Http\Controllers;

use App\Models\PaymentTracking;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class PaymentTrackingController extends Controller
{
    public function index()
    {
        $trackings = PaymentTracking::query()
            ->with('user')
            ->latest()
            ->get();

        return Inertia::render('payment-tracking/index', [
            'trackings' => $trackings,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => ['required', 'integer', 'exists:users,id'],
            'plan_type' => ['required', Rule::in(['free', 'premium'])],
            'is_active' => ['required', 'boolean'],
            'starts_at' => ['nullable', 'date'],
            'expires_at' => ['nullable', 'date', 'after_or_equal:starts_at'],
            'payment_reference' => ['nullable', 'string', 'max:255'],
            'notes' => ['nullable', 'string'],
        ]);

        $tracking = PaymentTracking::create($validated);

        return response()->json([
            'message' => 'Payment tracking created successfully.',
            'tracking' => $tracking,
        ], 201);
    }

    public function update(Request $request, PaymentTracking $paymentTracking)
    {
        $validated = $request->validate([
            'plan_type' => ['required', Rule::in(['free', 'premium'])],
            'is_active' => ['required', 'boolean'],
            'starts_at' => ['nullable', 'date'],
            'expires_at' => ['nullable', 'date', 'after_or_equal:starts_at'],
            'payment_reference' => ['nullable', 'string', 'max:255'],
            'notes' => ['nullable', 'string'],
        ]);

        $paymentTracking->update($validated);

        return response()->json([
            'message' => 'Payment tracking updated successfully.',
            'tracking' => $paymentTracking->refresh(),
        ]);
    }
}
