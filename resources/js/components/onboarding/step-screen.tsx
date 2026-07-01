import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import MultiChoiceQuestion from '@/components/onboarding/multi-choice-question';
import SingleChoiceQuestion from '@/components/onboarding/single-choice-question';
import TextQuestion from '@/components/onboarding/text-question';
import type {
    OnboardingAnswers,
    OnboardingQuestion,
    OnboardingStep,
} from '@/types/onboarding';

interface StepScreenProps {
    step: OnboardingStep;
    answers: OnboardingAnswers;
    onAnswerChange: (questionId: number, answer: OnboardingAnswers[number]) => void;
    onNext: () => void;
    onPrev: () => void;
}

function renderQuestion(
    question: OnboardingQuestion,
    answers: OnboardingAnswers,
    onAnswerChange: StepScreenProps['onAnswerChange'],
) {
    const answer = answers[question.id];

    switch (question.type) {
        case 'single_choice':
            return (
                <SingleChoiceQuestion
                    key={question.id}
                    question={question}
                    value={answer?.choiceId}
                    onChange={(choiceId) =>
                        onAnswerChange(question.id, { choiceId })
                    }
                />
            );
        case 'multi_choice':
            return (
                <MultiChoiceQuestion
                    key={question.id}
                    question={question}
                    value={answer?.choiceIds}
                    onChange={(choiceIds) =>
                        onAnswerChange(question.id, { choiceIds })
                    }
                />
            );
        case 'text':
        case 'number':
            return (
                <TextQuestion
                    key={question.id}
                    question={question}
                    value={answer?.value}
                    onChange={(value) =>
                        onAnswerChange(question.id, { value })
                    }
                />
            );
        default:
            return null;
    }
}

function isQuestionAnswered(
    question: OnboardingQuestion,
    answer?: OnboardingAnswers[number],
): boolean {
    if (!question.isRequired) {
        return true;
    }

    switch (question.type) {
        case 'single_choice':
            return answer?.choiceId !== undefined;
        case 'multi_choice':
            return (answer?.choiceIds?.length ?? 0) > 0;
        case 'text':
        case 'number':
            return Boolean(answer?.value?.trim());
        default:
            return false;
    }
}

export default function StepScreen({
    step,
    answers,
    onAnswerChange,
    onNext,
    onPrev,
}: StepScreenProps) {
    const { t } = useTranslation();

    useEffect(() => {
        step.questions.forEach((question) => {
            if (
                question.type === 'single_choice' &&
                question.defaultChoiceId !== null &&
                answers[question.id]?.choiceId === undefined
            ) {
                onAnswerChange(question.id, {
                    choiceId: question.defaultChoiceId,
                });
            }
        });
    }, [step.stepId]);

    const canContinue = step.questions.every((question) =>
        isQuestionAnswered(question, answers[question.id]),
    );

    return (
        <div className="w-full max-w-2xl">
            <div className="rounded-[40px] border border-neutral-100 bg-white p-6 shadow-xl sm:p-8 md:p-10 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="space-y-6">
                    {step.questions.map((question) =>
                        renderQuestion(question, answers, onAnswerChange),
                    )}
                </div>

                <div className="mt-8 flex justify-between sm:mt-10">
                    <button
                        type="button"
                        onClick={onPrev}
                        className="rounded-full px-8 py-3 font-bold text-neutral-600 transition-colors hover:bg-neutral-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                    >
                        {t('back')}
                    </button>
                    <button
                        type="button"
                        onClick={onNext}
                        disabled={!canContinue}
                        className="rounded-full bg-red-600 px-8 py-3 font-black text-white shadow-lg shadow-red-100 transition-colors hover:bg-red-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-red-600 dark:shadow-red-900/30 dark:hover:bg-red-700"
                    >
                        {t('next')}
                    </button>
                </div>
            </div>
        </div>
    );
}
