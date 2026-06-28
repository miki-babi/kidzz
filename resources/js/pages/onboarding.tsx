import { Head, router } from '@inertiajs/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CompleteScreen from '@/components/onboarding/complete-screen';
import StepScreen from '@/components/onboarding/step-screen';
import WelcomeScreen from '@/components/onboarding/welcomescreen';
import LanguageSwitcher from '@/components/languageSwitcher';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/onboarding';
import type {
    OnboardingAnswers,
    OnboardingStep,
} from '@/types/onboarding';

interface OnboardingProps {
    steps: OnboardingStep[];
}

function buildSubmissionPayload(answers: OnboardingAnswers) {
    return Object.entries(answers).map(([questionId, answer]) => {
        const payload: {
            question_id: number;
            choice_id?: number;
            choice_ids?: number[];
            value?: string;
        } = {
            question_id: Number(questionId),
        };

        if (answer.choiceId !== undefined) {
            payload.choice_id = answer.choiceId;
        }

        if (answer.choiceIds !== undefined) {
            payload.choice_ids = answer.choiceIds;
        }

        if (answer.value !== undefined) {
            payload.value = answer.value;
        }

        return payload;
    });
}

const STEP_TRANSITION_MS = 600;

export default function Onboarding({ steps }: OnboardingProps) {
    const [currentScreen, setCurrentScreen] = useState(1);
    const [answers, setAnswers] = useState<OnboardingAnswers>({});
    const [processing, setProcessing] = useState(false);
    const [transitioning, setTransitioning] = useState(false);
    const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
    const { t } = useTranslation();

    useEffect(() => {
        return () => {
            if (transitionTimeoutRef.current) {
                clearTimeout(transitionTimeoutRef.current);
            }
        };
    }, []);

    const sortedSteps = useMemo(
        () => [...steps].sort((a, b) => a.stepId - b.stepId),
        [steps],
    );

    const totalScreens = sortedSteps.length + 2;
    const progress = (currentScreen / totalScreens) * 100;

    const updateAnswer = (
        questionId: number,
        answer: OnboardingAnswers[number],
    ) => {
        setAnswers((previous) => ({
            ...previous,
            [questionId]: answer,
        }));
    };

    const nextScreen = () => {
        if (transitioning || currentScreen >= totalScreens) {
            return;
        }

        setTransitioning(true);

        transitionTimeoutRef.current = setTimeout(() => {
            setCurrentScreen((previous) => previous + 1);
            setTransitioning(false);
        }, STEP_TRANSITION_MS);
    };

    const prevScreen = () => {
        if (currentScreen > 1) {
            setCurrentScreen((previous) => previous - 1);
        }
    };

    const handleSubmit = () => {
        setProcessing(true);

        router.post(store.url(), {
            answers: buildSubmissionPayload(answers),
        });
    };

    const renderScreen = () => {
        if (currentScreen === 1) {
            return <WelcomeScreen onNext={nextScreen} />;
        }

        if (currentScreen === totalScreens) {
            return (
                <CompleteScreen
                    onSubmit={handleSubmit}
                    processing={processing}
                />
            );
        }

        const step = sortedSteps[currentScreen - 2];

        if (!step) {
            return null;
        }

        return (
            <StepScreen
                step={step}
                answers={answers}
                onAnswerChange={updateAnswer}
                onNext={nextScreen}
                onPrev={prevScreen}
            />
        );
    };

    return (
        <>
            <Head title="Onboarding" />
            <div className="relative flex h-dvh flex-col overflow-hidden bg-[#FDFDFC] dark:bg-zinc-950">
                <LanguageSwitcher className="absolute top-4 right-4 z-10" />
                {currentScreen > 1 && currentScreen < totalScreens && (
                    <div className="shrink-0 px-4 pt-16 pb-4 sm:px-6">
                        <div className="mx-auto w-full max-w-2xl">
                            <div className="mb-2 flex items-center justify-between">
                                <span className="text-sm font-medium text-neutral-600 dark:text-zinc-400">
                                    {t('onboarding_step_of', {
                                        current: currentScreen,
                                        total: totalScreens,
                                    })}
                                </span>
                                <span className="text-sm font-medium text-red-600 dark:text-red-400">
                                    {Math.round(progress)}%
                                </span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-neutral-200 dark:bg-zinc-700">
                                <div
                                    className="h-2 rounded-full bg-red-600 transition-all duration-300 dark:bg-red-500"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    </div>
                )}
                <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto px-4 py-4 sm:px-6">
                    {transitioning ? (
                        <div
                            className="flex w-full max-w-2xl flex-col items-center justify-center gap-4 rounded-[40px] border border-neutral-100 bg-white p-10 shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
                            role="status"
                            aria-live="polite"
                        >
                            <Spinner className="size-10 text-red-600 dark:text-red-400" />
                            <p className="text-lg font-bold text-neutral-600 dark:text-zinc-400">
                                {t('onboarding_loading_next')}
                            </p>
                        </div>
                    ) : (
                        renderScreen()
                    )}
                </div>
            </div>
        </>
    );
}
