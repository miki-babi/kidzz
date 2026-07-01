<?php

namespace App\Http\Controllers\Auth;

use App\Actions\Auth\AuthenticateGoogleUser;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\InvalidStateException;
use RuntimeException;
use Symfony\Component\HttpFoundation\RedirectResponse as SymfonyRedirectResponse;

class GoogleAuthController extends Controller
{
    public function redirect(): SymfonyRedirectResponse
    {
        return Socialite::driver('google')->redirect();
    }

    public function callback(AuthenticateGoogleUser $authenticateGoogleUser): RedirectResponse
    {
        try {
            $googleUser = Socialite::driver('google')->user();
            $user = $authenticateGoogleUser->authenticate($googleUser);
        } catch (InvalidStateException) {
            return redirect()->route('login')->withErrors([
                'email' => 'Google sign-in failed. Please try again.',
            ]);
        } catch (RuntimeException) {
            return redirect()->route('login')->withErrors([
                'email' => 'Google did not provide the required account information.',
            ]);
        }

        Auth::login($user, remember: true);

        return redirect()->intended(route('dashboard', absolute: false));
    }
}
