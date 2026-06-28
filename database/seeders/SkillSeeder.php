<?php

namespace Database\Seeders;

use App\Models\Skill;
use Illuminate\Database\Seeder;

class SkillSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $skills = [
            ['name' => 'Attention', 'slug' => 'attention', 'category' => 'Foundation', 'description' => 'Focus and sustained attention'],
            ['name' => 'Matching', 'slug' => 'matching', 'category' => 'Foundation', 'description' => 'Visual matching skills'],
            ['name' => 'Sorting', 'slug' => 'sorting', 'category' => 'Foundation', 'description' => 'Categorization and sorting'],
            ['name' => 'Patterns', 'slug' => 'patterns', 'category' => 'Foundation', 'description' => 'Pattern recognition'],
            ['name' => 'Memory', 'slug' => 'memory', 'category' => 'Foundation', 'description' => 'Working and visual memory'],
            ['name' => 'Sequencing', 'slug' => 'sequencing', 'category' => 'Cognitive', 'description' => 'Order and sequence understanding'],
            ['name' => 'Cause & Effect', 'slug' => 'cause-effect', 'category' => 'Cognitive', 'description' => 'Understanding actions and outcomes'],
            ['name' => 'Social', 'slug' => 'social', 'category' => 'Social', 'description' => 'Social awareness and interaction'],
            ['name' => 'Hygiene', 'slug' => 'hygiene', 'category' => 'Daily Living', 'description' => 'Self-care routines'],
            ['name' => 'Dressing', 'slug' => 'dressing', 'category' => 'Daily Living', 'description' => 'Dressing and clothing skills'],
            ['name' => 'Language', 'slug' => 'language', 'category' => 'Communication', 'description' => 'Expressive and receptive language'],
            ['name' => 'Communication', 'slug' => 'communication', 'category' => 'Communication', 'description' => 'Functional communication skills'],
            ['name' => 'Social Interaction', 'slug' => 'social-interaction', 'category' => 'Social', 'description' => 'Peer and social play skills'],
        ];

        foreach ($skills as $skill) {
            Skill::query()->updateOrCreate(
                ['slug' => $skill['slug']],
                [
                    'name' => $skill['name'],
                    'description' => $skill['description'],
                    'category' => $skill['category'],
                    'is_active' => true,
                ],
            );
        }
    }
}
