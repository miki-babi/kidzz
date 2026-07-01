<?php

use App\Http\Controllers\Auth\GoogleAuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DemoPaymentController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\OnboardingController;
use App\Http\Controllers\PaymentTrackingController;
use App\Http\Middleware\EnsureOnboarded;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'landing')->name('home');

Route::middleware('guest')->prefix('auth/google')->name('auth.google.')->group(function () {
    Route::get('redirect', [GoogleAuthController::class, 'redirect'])->name('redirect');
    Route::get('callback', [GoogleAuthController::class, 'callback'])->name('callback');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/onboarding', [OnboardingController::class, 'show'])->name('onboarding');

    Route::post('/onboarding', [OnboardingController::class, 'store'])->name('onboarding.store');

    Route::middleware([EnsureOnboarded::class])->group(function () {
        Route::get('/parents', function () {
            return inertia('parents/index');
        })->name('parents.index');

        Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
        Route::get('/games', [GameController::class, 'index'])->name('games');
        Route::get('/games/results', [GameController::class, 'results'])->name('games.results');

        Route::get('/games/{game}', [GameController::class, 'show'])->name('games.show');
        Route::post('/games/{game}/result', [GameController::class, 'storeResult'])->name('games.result.store');
        Route::get('/pay', [DemoPaymentController::class, 'create'])->name('pay.create');
        Route::post('/pay', [DemoPaymentController::class, 'store'])->name('pay.store');

        Route::get('/payment-trackings', [PaymentTrackingController::class, 'index'])->name('payment-trackings.index');
        Route::post('/payment-trackings', [PaymentTrackingController::class, 'store'])->name('payment-trackings.store');
        Route::patch('/payment-trackings/{paymentTracking}', [PaymentTrackingController::class, 'update'])->name('payment-trackings.update');
    });
});

require __DIR__.'/settings.php';
