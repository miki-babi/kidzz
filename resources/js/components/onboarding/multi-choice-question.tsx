import type { OnboardingQuestion } from '@/types/onboarding';

interface MultiChoiceQuestionProps {
    question: OnboardingQuestion;
    value?: number[];
    onChange: (choiceIds: number[]) => void;
}

export default function MultiChoiceQuestion({
    question,
    value = [],
    onChange,
}: MultiChoiceQuestionProps) {
    const toggleChoice = (choiceId: number) => {
        const nextValue = value.includes(choiceId)
            ? value.filter((id) => id !== choiceId)
            : [...value, choiceId];

        onChange(nextValue);
    };

    return (
        <div className="space-y-3">
            <p className="font-bold text-neutral-700 dark:text-zinc-300">
                {question.question}
            </p>
            <div className="space-y-3">
                {question.choices.map((choice) => (
                    <button
                        key={choice.id}
                        type="button"
                        onClick={() => toggleChoice(choice.id)}
                        className={`w-full rounded-2xl border-2 px-6 py-4 text-left text-lg font-bold transition-all ${
                            value.includes(choice.id)
                                ? 'border-red-600 bg-red-50 text-red-600 dark:border-red-500 dark:bg-red-500/10 dark:text-red-400'
                                : 'border-neutral-200 text-neutral-700 hover:border-neutral-300 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-600'
                        }`}
                    >
                        {choice.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
