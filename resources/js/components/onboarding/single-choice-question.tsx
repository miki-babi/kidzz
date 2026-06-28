import { useTranslation } from 'react-i18next';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { OnboardingQuestion } from '@/types/onboarding';

interface SingleChoiceQuestionProps {
    question: OnboardingQuestion;
    value?: number;
    onChange: (choiceId: number) => void;
}

export default function SingleChoiceQuestion({
    question,
    value,
    onChange,
}: SingleChoiceQuestionProps) {
    const { t } = useTranslation();
    const placeholder =
        question.placeholder ?? t('onboarding_select_option');

    return (
        <div className="space-y-3">
            <label
                htmlFor={`question-${question.id}`}
                className="block font-bold text-neutral-700 dark:text-zinc-300"
            >
                {question.question}
            </label>
            <Select
                value={value !== undefined ? String(value) : undefined}
                onValueChange={(choiceId) => onChange(Number(choiceId))}
            >
                <SelectTrigger
                    id={`question-${question.id}`}
                    className="h-12 w-full rounded-2xl border-2 border-neutral-200 bg-white px-4 text-base font-bold text-neutral-900 shadow-none focus-visible:border-red-600 focus-visible:ring-red-600/20 data-[placeholder]:text-neutral-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus-visible:border-red-500 dark:data-[placeholder]:text-zinc-500"
                >
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                    {question.choices.map((choice) => (
                        <SelectItem
                            key={choice.id}
                            value={String(choice.id)}
                            className="text-base font-bold"
                        >
                            {choice.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
