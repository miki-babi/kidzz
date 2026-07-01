import type { OnboardingQuestion } from '@/types/onboarding';

interface TextQuestionProps {
    question: OnboardingQuestion;
    value?: string;
    onChange: (value: string) => void;
}

export default function TextQuestion({
    question,
    value = '',
    onChange,
}: TextQuestionProps) {
    return (
        <div>
            <label
                htmlFor={`question-${question.id}`}
                className="mb-2 block text-sm font-bold text-neutral-700 dark:text-zinc-300"
            >
                {question.question}
            </label>
            <input
                id={`question-${question.id}`}
                type={question.type === 'number' ? 'number' : 'text'}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="w-full rounded-2xl border-2 border-neutral-200 bg-white px-6 py-4 text-lg font-bold text-neutral-900 placeholder-neutral-400 transition-colors focus:border-red-600 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500 dark:focus:border-red-500"
            />
        </div>
    );
}
