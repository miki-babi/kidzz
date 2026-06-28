export type OnboardingQuestionType =
    | 'single_choice'
    | 'multi_choice'
    | 'text'
    | 'number';

export interface OnboardingChoice {
    id: number;
    label: string;
    value: string;
}

export interface OnboardingQuestion {
    id: number;
    question: string;
    type: OnboardingQuestionType;
    isRequired: boolean;
    order: number;
    placeholder: string | null;
    defaultChoiceId: number | null;
    choices: OnboardingChoice[];
}

export interface OnboardingStep {
    stepId: number;
    questions: OnboardingQuestion[];
}

export interface QuestionAnswer {
    choiceId?: number;
    choiceIds?: number[];
    value?: string;
}

export type OnboardingAnswers = Record<number, QuestionAnswer>;
