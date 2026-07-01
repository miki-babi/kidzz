<?php

namespace App\Actions\Auth;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Laravel\Socialite\Contracts\User as SocialiteUser;
use RuntimeException;

class AuthenticateGoogleUser
{
    public function authenticate(SocialiteUser $googleUser): User
    {
        $googleId = $googleUser->getId();
        $email = $googleUser->getEmail();

        if ($googleId === null || $email === null) {
            throw new RuntimeException('Google did not return the required user information.');
        }

        return DB::transaction(function () use ($googleUser, $googleId, $email): User {
            $user = User::query()->where('google_id', $googleId)->first();

            if ($user !== null) {
                return $user;
            }

            $user = User::query()->where('email', $email)->first();

            if ($user !== null) {
                $user->google_id = $googleId;

                if ($user->email_verified_at === null && $this->isEmailVerified($googleUser)) {
                    $user->email_verified_at = now();
                }

                $user->save();

                return $user;
            }

            $user = User::create([
                'name' => $googleUser->getName() ?? strstr($email, '@', true),
                'email' => $email,
                'google_id' => $googleId,
            ]);

            if ($this->isEmailVerified($googleUser)) {
                $user->email_verified_at = now();
                $user->save();
            }

            return $user;
        });
    }

    private function isEmailVerified(SocialiteUser $googleUser): bool
    {
        $raw = $googleUser->getRaw();

        return filter_var($raw['verified_email'] ?? $raw['email_verified'] ?? false, FILTER_VALIDATE_BOOLEAN);
    }
}
