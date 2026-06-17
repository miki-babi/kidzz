<?php

namespace App\Http\Controllers;

use App\Models\Diagnosis;
use App\Models\UserProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OnboardingController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'age' => 'nullable|integer',
            'gender' => 'nullable|string',
            'evaluated' => 'nullable|string',
            'diagnoses' => 'nullable|array',
            'diagnoses.*' => 'string',
            'speechLevel' => 'nullable|string',
            'speakingSkills' => 'nullable|array',
            'understandingLanguage' => 'nullable|array',
            'learningConcepts' => 'nullable|array',
            'thinkingSkills' => 'nullable|array',
            'socialPlaySkills' => 'nullable|array',
            'interests' => 'nullable|array',
            'interests.*' => 'string',
        ]);

        $user = Auth::user();

        // Create or update user profile
        $profile = UserProfile::updateOrCreate(
            ['user_id' => $user->id],
            [
                'age' => $validated['age'] ?? null,
                'gender' => $validated['gender'] ?? null,
                'evaluated_status' => $validated['evaluated'] ?? null,
                'speech_level' => $validated['speechLevel'] ?? null,
                'speaking_skills' => $validated['speakingSkills'] ?? null,
                'understanding_language' => $validated['understandingLanguage'] ?? null,
                'recognition_skills' => $validated['learningConcepts'] ?? null,
                'thinking_skills' => $validated['thinkingSkills'] ?? null,
                'social_play_skills' => $validated['socialPlaySkills'] ?? null,
                'interests' => $validated['interests'] ?? null,
            ]
        );

        // Handle diagnoses
        if (! empty($validated['diagnoses'])) {
            // Remove existing diagnoses for this user
            Diagnosis::where('user_id', $user->id)->delete();

            foreach ($validated['diagnoses'] as $diagnosisName) {
                Diagnosis::create([
                    'name' => $diagnosisName,
                    'user_id' => $user->id,
                ]);
            }
        }

        // Mark user as onboarded
        $user->update(['onboarded' => true]);

        return redirect()->route('dashboard')->with('success', 'Profile completed successfully!');
    }
}