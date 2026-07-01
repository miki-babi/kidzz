<?php

namespace Database\Seeders;

use App\Enums\OnboardingQuestionType;
use App\Models\OnboardingChoiceScore;
use App\Models\OnboardingQuestion;
use App\Models\OnboardingQuestionChoice;
use App\Models\Skill;
use Illuminate\Database\Seeder;
use Illuminate\Support\Collection;

class OnboardingQuestionSeeder extends Seeder
{
    /** @var Collection<string, Skill> */
    private Collection $skills;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->skills = Skill::query()->get()->keyBy('slug');

        OnboardingQuestion::query()->delete();

        $this->seedBasicInformation();
        $this->seedProfessionalEvaluation();
        $this->seedDiagnoses();
        $this->seedCommunication();
        $this->seedSpeakingSkills();
        $this->seedUnderstandingLanguage();
        $this->seedLearningConcepts();
        $this->seedThinkingSkills();
        $this->seedSocialPlaySkills();
        $this->seedInterests();
    }

    private function seedBasicInformation(): void
    {
        $this->createTextQuestion(
            stepId: 1,
            order: 1,
            question: "What is your child's name?",
            valueKey: 'child_name',
        );

        $ageQuestion = $this->createQuestion(
            stepId: 1,
            order: 2,
            question: 'Age range',
            type: OnboardingQuestionType::SingleChoice,
        );

        $ageRanges = [
            ['label' => '0 - 3 years', 'value' => '2'],
            ['label' => '4 - 6 years', 'value' => '5'],
            ['label' => '7 - 9 years', 'value' => '8'],
            ['label' => '10 - 12 years', 'value' => '11'],
            ['label' => '12+ years', 'value' => '12'],
        ];

        foreach ($ageRanges as $index => $range) {
            $this->createChoice($ageQuestion, $range['label'], $range['value'], $index);
        }

        $genderQuestion = $this->createQuestion(
            stepId: 1,
            order: 3,
            question: 'Gender (optional)',
            type: OnboardingQuestionType::SingleChoice,
            isRequired: false,
        );

        $this->createChoice($genderQuestion, 'Male', 'male', 0);
        $this->createChoice($genderQuestion, 'Female', 'female', 1);
    }

    private function seedProfessionalEvaluation(): void
    {
        $question = $this->createQuestion(
            stepId: 2,
            order: 1,
            question: 'Has your child been evaluated by a therapist, psychologist, or doctor?',
            type: OnboardingQuestionType::SingleChoice,
        );

        $this->createChoice($question, 'Yes', 'yes', 0);
        $this->createChoice($question, 'No', 'no', 1);
        $this->createChoice($question, 'In Progress', 'in_progress', 2);
    }

    private function seedDiagnoses(): void
    {
        $question = $this->createQuestion(
            stepId: 3,
            order: 1,
            question: 'Does your child have any diagnoses? (Select all that apply)',
            type: OnboardingQuestionType::MultiChoice,
            isRequired: false,
        );

        $diagnoses = [
            'Autism Spectrum Disorder (ASD)',
            'Speech Delay',
            'ADHD',
            'Developmental Delay',
            'Down Syndrome',
            'Intellectual Disability',
            'Hearing Impairment',
            'Other',
            'No Diagnosis',
        ];

        foreach ($diagnoses as $index => $diagnosis) {
            $this->createChoice($question, $diagnosis, str($diagnosis)->slug()->toString(), $index);
        }
    }

    private function seedCommunication(): void
    {
        $question = $this->createQuestion(
            stepId: 4,
            order: 1,
            question: 'How does your child communicate?',
            type: OnboardingQuestionType::SingleChoice,
        );

        $levels = [
            ['label' => 'Speaks in full sentences', 'value' => 'full_sentences', 'scores' => ['language' => 30, 'communication' => 25, 'social-interaction' => 10]],
            ['label' => 'Speaks in short phrases', 'value' => 'short_phrases', 'scores' => ['language' => 20, 'communication' => 20, 'social-interaction' => 8]],
            ['label' => 'Uses single words', 'value' => 'single_words', 'scores' => ['language' => 10, 'communication' => 15, 'social-interaction' => 5]],
            ['label' => 'Can answer yes/no', 'value' => 'yes_no', 'scores' => ['language' => 8, 'communication' => 12, 'social-interaction' => 4]],
            ['label' => 'Uses gestures or pointing', 'value' => 'gestures', 'scores' => ['language' => 5, 'communication' => 10, 'social-interaction' => 6]],
            ['label' => 'Non-verbal', 'value' => 'nonverbal', 'scores' => ['language' => 0, 'communication' => 5, 'social-interaction' => 3]],
        ];

        foreach ($levels as $index => $level) {
            $choice = $this->createChoice($question, $level['label'], $level['value'], $index);
            $this->attachScores($choice, $level['scores']);
        }
    }

    private function seedSpeakingSkills(): void
    {
        $this->seedYesNoSometimesStep(
            stepId: 5,
            skills: [
                'Say their name',
                'Ask for what they want',
                'Answer simple questions',
                'Understand simple questions',
                'Follow a conversation',
            ],
            skillSlugs: ['language', 'communication'],
        );
    }

    private function seedUnderstandingLanguage(): void
    {
        $this->seedYesNoSometimesStep(
            stepId: 6,
            skills: [
                'Follows 1-step instructions',
                'Follows 2-step instructions',
                'Responds when called by name',
                'Understands conversations at home',
                'Understands emotions like happy, sad, angry',
            ],
            skillSlugs: ['language', 'communication', 'attention'],
        );
    }

    private function seedLearningConcepts(): void
    {
        $question = $this->createQuestion(
            stepId: 7,
            order: 1,
            question: 'What does your child recognize? (Select all that apply)',
            type: OnboardingQuestionType::MultiChoice,
            isRequired: false,
        );

        $concepts = [
            ['label' => 'Colors', 'value' => 'colors', 'scores' => ['matching' => 5, 'memory' => 3]],
            ['label' => 'Shapes', 'value' => 'shapes', 'scores' => ['matching' => 5, 'patterns' => 3]],
            ['label' => 'Numbers', 'value' => 'numbers', 'scores' => ['memory' => 5, 'sequencing' => 3]],
            ['label' => 'Letters', 'value' => 'letters', 'scores' => ['language' => 5, 'memory' => 3]],
            ['label' => 'Animals', 'value' => 'animals', 'scores' => ['memory' => 4, 'matching' => 3]],
            ['label' => 'Body Parts', 'value' => 'body_parts', 'scores' => ['language' => 4, 'memory' => 3]],
        ];

        foreach ($concepts as $index => $concept) {
            $choice = $this->createChoice($question, $concept['label'], $concept['value'], $index);
            $this->attachScores($choice, $concept['scores']);
        }
    }

    private function seedThinkingSkills(): void
    {
        $this->seedYesNoSometimesStep(
            stepId: 8,
            skills: [
                'Big vs Small',
                'More vs Less',
                'Same vs Different',
                'First / Next / Last',
                'Yesterday / Today / Tomorrow',
            ],
            skillSlugs: ['patterns', 'sequencing', 'memory'],
        );
    }

    private function seedSocialPlaySkills(): void
    {
        $this->seedYesNoSometimesStep(
            stepId: 9,
            skills: [
                'Enjoys music',
                'Enjoys singing',
                'Enjoys dancing',
                'Enjoys pretend play',
                'Plays with other children',
                'Prefers playing alone',
                'Takes turns during games',
                'Maintains eye contact',
            ],
            skillSlugs: ['social', 'social-interaction'],
        );
    }

    private function seedInterests(): void
    {
        $question = $this->createQuestion(
            stepId: 10,
            order: 1,
            question: 'What does your child enjoy? (Select all that apply)',
            type: OnboardingQuestionType::MultiChoice,
            isRequired: false,
        );

        $interests = [
            'Music',
            'Animals',
            'Vehicles',
            'Numbers',
            'Letters',
            'Puzzles',
            'Drawing',
            'Stories',
            'Nature',
            'Technology',
        ];

        foreach ($interests as $index => $interest) {
            $this->createChoice($question, $interest, str($interest)->slug()->toString(), $index);
        }
    }

    /**
     * @param  list<string>  $skills
     * @param  list<string>  $skillSlugs
     */
    private function seedYesNoSometimesStep(int $stepId, array $skills, array $skillSlugs): void
    {
        foreach ($skills as $order => $skillLabel) {
            $question = $this->createQuestion(
                stepId: $stepId,
                order: $order + 1,
                question: $skillLabel,
                type: OnboardingQuestionType::SingleChoice,
            );

            $yesChoice = $this->createChoice($question, 'Yes', 'yes', 0);
            $noChoice = $this->createChoice($question, 'No', 'no', 1);
            $sometimesChoice = $this->createChoice($question, 'Sometimes', 'sometimes', 2);

            $yesScores = [];
            $noScores = [];
            $sometimesScores = [];

            foreach ($skillSlugs as $slug) {
                $yesScores[$slug] = 10;
                $noScores[$slug] = -5;
                $sometimesScores[$slug] = 5;
            }

            $this->attachScores($yesChoice, $yesScores);
            $this->attachScores($noChoice, $noScores);
            $this->attachScores($sometimesChoice, $sometimesScores);
        }
    }

    private function createTextQuestion(int $stepId, int $order, string $question, string $valueKey): OnboardingQuestion
    {
        return $this->createQuestion(
            stepId: $stepId,
            order: $order,
            question: $question,
            type: OnboardingQuestionType::Text,
        );
    }

    private function createQuestion(
        int $stepId,
        int $order,
        string $question,
        OnboardingQuestionType $type,
        bool $isRequired = true,
    ): OnboardingQuestion {
        return OnboardingQuestion::query()->create([
            'step_id' => $stepId,
            'question' => $question,
            'type' => $type,
            'is_required' => $isRequired,
            'order' => $order,
        ]);
    }

    private function createChoice(
        OnboardingQuestion $question,
        string $label,
        string $value,
        int $order,
    ): OnboardingQuestionChoice {
        return $question->choices()->create([
            'label' => $label,
            'value' => $value,
            'order' => $order,
        ]);
    }

    /**
     * @param  array<string, int>  $scores
     */
    private function attachScores(OnboardingQuestionChoice $choice, array $scores): void
    {
        foreach ($scores as $slug => $score) {
            $skill = $this->skills->get($slug);

            if ($skill === null) {
                continue;
            }

            OnboardingChoiceScore::query()->create([
                'choice_id' => $choice->id,
                'skill_id' => $skill->id,
                'score' => $score,
            ]);
        }
    }
}
