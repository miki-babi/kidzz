import { Head, router } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import WelcomeScreen from '@/components/onboarding/welcomescreen';
import { store } from '@/routes/onboarding';
import LanguageSwitcher from '@/components/languageSwitcher';
import { useTranslation } from "react-i18next";


interface OnboardingData {
    childName?: string;
    age?: string;
    gender?: string;
    evaluated?: string;
    diagnoses?: string[];
    speechLevel?: string;
    speakingSkills?: Record<string, string>;
    understandingLanguage?: Record<string, string>;
    learningConcepts?: string[];
    thinkingSkills?: Record<string, string>;
    socialPlaySkills?: Record<string, string>;
    interests?: string[];
}

export default function Onboarding() {
    const [currentScreen, setCurrentScreen] = useState(1);
    const [data, setData] = useState<OnboardingData>({});
    const [processing, setProcessing] = useState(false);
    const { t } = useTranslation();

    const totalScreens = 12;
    const progress = (currentScreen / totalScreens) * 100;

    const updateData = (key: keyof OnboardingData, value: any) => {
        setData(prev => ({ ...prev, [key]: value }));
    };

    const nextScreen = () => {
        if (currentScreen < totalScreens) {
            setCurrentScreen(prev => prev + 1);
        }
    };

    const prevScreen = () => {
        if (currentScreen > 1) {
            setCurrentScreen(prev => prev - 1);
        }
    };

    const toggleMultiSelect = (key: keyof OnboardingData, value: string) => {
        const currentArray = (data[key] as string[]) || [];
        const newArray = currentArray.includes(value)
            ? currentArray.filter(item => item !== value)
            : [...currentArray, value];
        updateData(key, newArray);
    };

    const updateYesNoSometimes = (key: keyof OnboardingData, field: string, value: string) => {
        updateData(key, { ...(data[key] as Record<string, string>), [field]: value });
    };

    const handleSubmit = () => {
        setProcessing(true);

        router.post(store.url(), {
            childName: data.childName,
            age: data.age ? parseInt(data.age) : undefined,
            gender: data.gender,
            evaluated: data.evaluated,
            diagnoses: data.diagnoses,
            speechLevel: data.speechLevel,
            speakingSkills: data.speakingSkills,
            understandingLanguage: data.understandingLanguage,
            learningConcepts: data.learningConcepts,
            thinkingSkills: data.thinkingSkills,
            socialPlaySkills: data.socialPlaySkills,
            interests: data.interests,
        });
    };

    const renderScreen = () => {
        switch (currentScreen) {
            case 1:
                return <WelcomeScreen onNext={nextScreen} />;
            case 2:
                return <BasicInformationScreen data={data} updateData={updateData} onNext={nextScreen} onPrev={prevScreen} />;
            case 3:
                return <ProfessionalEvaluationScreen data={data} updateData={updateData} onNext={nextScreen} onPrev={prevScreen} />;
            case 4:
                return <DiagnosesScreen data={data} toggleMultiSelect={toggleMultiSelect} onNext={nextScreen} onPrev={prevScreen} />;
            case 5:
                return <CommunicationScreen data={data} updateData={updateData} onNext={nextScreen} onPrev={prevScreen} />;
            case 6:
                return <SpeakingSkillsScreen data={data} updateYesNoSometimes={updateYesNoSometimes} onNext={nextScreen} onPrev={prevScreen} />;
            case 7:
                return <UnderstandingLanguageScreen data={data} updateYesNoSometimes={updateYesNoSometimes} onNext={nextScreen} onPrev={prevScreen} />;
            case 8:
                return <LearningConceptsScreen data={data} toggleMultiSelect={toggleMultiSelect} onNext={nextScreen} onPrev={prevScreen} />;
            case 9:
                return <ThinkingSkillsScreen data={data} updateYesNoSometimes={updateYesNoSometimes} onNext={nextScreen} onPrev={prevScreen} />;
            case 10:
                return <SocialPlaySkillsScreen data={data} updateYesNoSometimes={updateYesNoSometimes} onNext={nextScreen} onPrev={prevScreen} />;
            case 11:
                return <InterestsScreen data={data} toggleMultiSelect={toggleMultiSelect} onNext={nextScreen} onPrev={prevScreen} />;
            case 12:
                return <CompleteScreen data={data} onSubmit={handleSubmit} processing={processing} />;
            default:
                return null;
        }
    };

    return (
        <>
            <Head title="Onboarding" />
            <div className="min-h-screen bg-[#FDFDFC] dark:bg-zinc-950 flex flex-col items-center justify-center p-6">
                <LanguageSwitcher className="absolute top-4 right-4" />
                {currentScreen > 1 && currentScreen < 12 && (
                    <div className="w-full max-w-2xl mb-8">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-neutral-600 dark:text-zinc-400">{t('onboarding_step_of', { current: currentScreen, total: totalScreens })}</span>
                            <span className="text-sm font-medium text-red-600 dark:text-red-400">{Math.round(progress)}%</span>
                        </div>
                        <div className="w-full bg-neutral-200 dark:bg-zinc-700 rounded-full h-2">
                            <div
                                className="bg-red-600 dark:bg-red-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                )}
                {renderScreen()}
            </div>
        </>
    );
}

const AGE_RANGES = [
    { label: '0 - 3 years', value: 2 },
    { label: '4 - 6 years', value: 5 },
    { label: '7 - 9 years', value: 8 },
    { label: '10 - 12 years', value: 11 },
    { label: '12+ years', value: 12 }
];

// Sub-component for the Jackpot-style Picker
function AgeSlotPicker({
    value,
    onChange
}: {
    value: number | string;
    onChange: (val: number) => void;
}) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const ITEM_HEIGHT = 56; // 3.5rem matching h-14

    // Find the index of the object that matches the current stored numeric value
    // Default to the first element (index 0) if no match is found
    const activeIndex = AGE_RANGES.findIndex((range) => range.value === value);
    const safeActiveIndex = activeIndex !== -1 ? activeIndex : 0;

    // Sync scroll position if the value changes from outside the picker
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = safeActiveIndex * ITEM_HEIGHT;
        }
    }, [safeActiveIndex]);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const scrollTop = e.currentTarget.scrollTop;
        const index = Math.round(scrollTop / ITEM_HEIGHT);

        // Ensure the computed scroll index matches our range boundaries
        if (index >= 0 && index < AGE_RANGES.length && index !== safeActiveIndex) {
            // Emit the underlying median value, NOT the UI loop index
            onChange(AGE_RANGES[index].value);
        }
    };

    return (
        <div className="relative w-full  mx-auto h-30 bg-neutral-50 dark:bg-zinc-800/50 rounded-2xl border border-neutral-200 dark:border-zinc-700 overflow-hidden">
            {/* Top and Bottom Vignette Overlays */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-neutral-50 dark:from-zinc-900 to-transparent pointer-events-none z-10" />
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-neutral-50 dark:from-zinc-900 to-transparent pointer-events-none z-10" />

            {/* Target Window Indicator */}
            <div className="absolute top-8 left-2 right-2 h-14 border-2 border-red-600 dark:border-red-500 rounded-xl pointer-events-none z-10 bg-red-50/10 dark:bg-red-500/5" />

            {/* Scrollable Container */}
            <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="h-full overflow-y-scroll snap-y snap-mandatory scrollbar-none py-8"
                style={{ scrollbarWidth: 'none' }}
            >
                {AGE_RANGES.map((range, index) => {
                    const isSelected = index === safeActiveIndex;
                    return (
                        <div
                            key={range.label}
                            className={`h-14 flex items-center justify-center snap-center font-black transition-all duration-200 select-none ${
                                isSelected
                                    ? 'text-2xl text-red-600 dark:text-red-500 scale-110'
                                    : 'text-lg text-neutral-400 dark:text-zinc-600'
                            }`}
                        >
                            {range.label}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
function BasicInformationScreen({
    data,
    updateData,
    onNext,
    onPrev,
}: {
    data: any; // Replace with OnboardingData type
    updateData: (key: any, value: any) => void;
    onNext: () => void;
    onPrev: () => void;
}) {
    const { t } = useTranslation();

    return (
        <div className="w-full max-w-2xl">
            <div className="bg-white dark:bg-zinc-900 rounded-[40px] border border-neutral-100 dark:border-zinc-800 shadow-xl p-12">
                <h2 className="text-3xl font-black mb-8 text-neutral-900 dark:text-white">
                    {t('basic_info_title')}
                </h2>

                <div className="space-y-8">
                    {/* Child Name Input */}
                    <div>
                        <label
                            htmlFor="childName"
                            className="block text-sm font-bold text-neutral-700 dark:text-zinc-300 mb-2"
                        >
                            {t('child_name_label')}
                        </label>
                        <input
                            id="childName"
                            type="text"
                            value={data.childName || ''}
                            onChange={(e) => updateData('childName', e.target.value)}
                            placeholder={t('child_name_placeholder')}
                            className="w-full px-6 py-4 rounded-2xl border-2 border-neutral-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-neutral-900 dark:text-white font-bold text-lg placeholder-neutral-400 dark:placeholder-zinc-500 focus:outline-none focus:border-red-600 dark:focus:border-red-500 transition-colors"
                        />
                    </div>

                    {/* Age Picker Section */}
                    <div>
                        <label className="block  text-sm font-bold text-neutral-700 dark:text-zinc-300 mb-4">
                            {t('age_label')}
                        </label>
                        <AgeSlotPicker
                            value={data.age}
                            onChange={(newValue) => updateData('age', newValue)}
                        />
                    </div>

                    {/* Gender Selection */}
                    <div>
                        <label className="block text-sm font-bold text-neutral-700 dark:text-zinc-300 mb-2">
                            {t('gender_label')}
                        </label>
                        <div className="space-y-4">
                            {[
                                { value: 'male', label: t('gender_male') },
                                { value: 'female', label: t('gender_female') },
                            ].map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => {
                                        const newValue = data.gender === option.value ? '' : option.value;
                                        updateData('gender', newValue);
                                    }}
                                    className={`w-full px-6 py-4 rounded-2xl border-2 text-left font-bold text-lg transition-all ${data.gender === option.value
                                            ? 'border-red-600 dark:border-red-500 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400'
                                            : 'border-neutral-200 dark:border-zinc-700 hover:border-neutral-300 dark:hover:border-zinc-600 text-neutral-700 dark:text-zinc-300'
                                        }`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-10">
                    <button
                        onClick={onPrev}
                        className="px-8 py-3 rounded-full font-bold text-neutral-600 dark:text-zinc-400 hover:bg-neutral-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                        {t('back')}
                    </button>
                    <button
                        onClick={onNext}
                        className="bg-red-600 dark:bg-red-600 text-white px-8 py-3 rounded-full font-black shadow-lg shadow-red-100 dark:shadow-red-900/30 hover:bg-red-700 dark:hover:bg-red-700 transition-colors active:scale-95"
                    >
                        {t('next')}
                    </button>
                </div>
            </div>
        </div>
    );
}

function ProfessionalEvaluationScreen({ data, updateData, onNext, onPrev }: { data: OnboardingData; updateData: (key: keyof OnboardingData, value: any) => void; onNext: () => void; onPrev: () => void }) {
    const { t } = useTranslation();
    return (
        <div className="w-full max-w-2xl">
            <div className="bg-white dark:bg-zinc-900 rounded-[40px] border border-neutral-100 dark:border-zinc-800 shadow-xl p-12">
                <h2 className="text-3xl font-black mb-4 text-neutral-900 dark:text-white">{t('professional_eval_title')}</h2>
                <p className="text-lg text-neutral-500 dark:text-zinc-400 mb-8">{t('professional_eval_subtitle')}</p>
                <div className="space-y-4">
                    {[t('eval_yes'), t('eval_no'), t('eval_in_progress')].map((option) => (
                        <button
                            key={option}
                            onClick={() => updateData('evaluated', option)}
                            className={`w-full px-6 py-4 rounded-2xl border-2 text-left font-bold text-lg transition-all ${data.evaluated === option
                                ? 'border-red-600 dark:border-red-500 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400'
                                : 'border-neutral-200 dark:border-zinc-700 hover:border-neutral-300 dark:hover:border-zinc-600 text-neutral-700 dark:text-zinc-300'
                                }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
                <div className="flex justify-between mt-10">
                    <button
                        onClick={onPrev}
                        className="px-8 py-3 rounded-full font-bold text-neutral-600 dark:text-zinc-400 hover:bg-neutral-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                        {t('back')}
                    </button>
                    <button
                        onClick={onNext}
                        className="bg-red-600 dark:bg-red-600 text-white px-8 py-3 rounded-full font-black shadow-lg shadow-red-100 dark:shadow-red-900/30 hover:bg-red-700 dark:hover:bg-red-700 transition-colors active:scale-95"
                    >
                        {t('next')}
                    </button>
                </div>
            </div>
        </div>
    );
}

function DiagnosesScreen({ data, toggleMultiSelect, onNext, onPrev }: { data: OnboardingData; toggleMultiSelect: (key: keyof OnboardingData, value: string) => void; onNext: () => void; onPrev: () => void }) {
    const { t } = useTranslation();
    const diagnoses = [
        t('diagnosis_asd'),
        t('diagnosis_speech_delay'),
        t('diagnosis_adhd'),
        t('diagnosis_developmental_delay'),
        t('diagnosis_down_syndrome'),
        t('diagnosis_intellectual_disability'),
        t('diagnosis_hearing_impairment'),
        t('diagnosis_other'),
        t('diagnosis_none')
    ];

    return (
        <div className="w-full max-w-2xl">
            <div className="bg-white dark:bg-zinc-900 rounded-[40px] border border-neutral-100 dark:border-zinc-800 shadow-xl p-12">
                <h2 className="text-3xl font-black mb-4 text-neutral-900 dark:text-white">{t('diagnoses_title')}</h2>
                <p className="text-lg text-neutral-500 dark:text-zinc-400 mb-8">{t('select_all_that_apply')}</p>
                <div className="space-y-3">
                    {diagnoses.map((diagnosis) => (
                        <button
                            key={diagnosis}
                            onClick={() => toggleMultiSelect('diagnoses', diagnosis)}
                            className={`w-full px-6 py-4 rounded-2xl border-2 text-left font-bold text-lg transition-all ${(data.diagnoses || []).includes(diagnosis)
                                ? 'border-red-600 dark:border-red-500 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400'
                                : 'border-neutral-200 dark:border-zinc-700 hover:border-neutral-300 dark:hover:border-zinc-600 text-neutral-700 dark:text-zinc-300'
                                }`}
                        >
                            {diagnosis}
                        </button>
                    ))}
                </div>
                <div className="flex justify-between mt-10">
                    <button
                        onClick={onPrev}
                        className="px-8 py-3 rounded-full font-bold text-neutral-600 dark:text-zinc-400 hover:bg-neutral-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                        {t('back')}
                    </button>
                    <button
                        onClick={onNext}
                        className="bg-red-600 dark:bg-red-600 text-white px-8 py-3 rounded-full font-black shadow-lg shadow-red-100 dark:shadow-red-900/30 hover:bg-red-700 dark:hover:bg-red-700 transition-colors active:scale-95"
                    >
                        {t('next')}
                    </button>
                </div>
            </div>
        </div>
    );
}

function CommunicationScreen({ data, updateData, onNext, onPrev }: { data: OnboardingData; updateData: (key: keyof OnboardingData, value: any) => void; onNext: () => void; onPrev: () => void }) {
    const { t } = useTranslation();
    const speechLevels = [
        t('speech_full_sentences'),
        t('speech_short_phrases'),
        t('speech_single_words'),
        t('speech_yes_no'),
        t('speech_gestures'),
        t('speech_nonverbal')
    ];

    return (
        <div className="w-full max-w-2xl">
            <div className="bg-white dark:bg-zinc-900 rounded-[40px] border border-neutral-100 dark:border-zinc-800 shadow-xl p-12">
                <h2 className="text-3xl font-black mb-4 text-neutral-900 dark:text-white">{t('communication_title')}</h2>
                <p className="text-lg text-neutral-500 dark:text-zinc-400 mb-8">{t('speech_level_label')}</p>
                <div className="space-y-3">
                    {speechLevels.map((level) => (
                        <button
                            key={level}
                            onClick={() => updateData('speechLevel', level)}
                            className={`w-full px-6 py-4 rounded-2xl border-2 text-left font-bold text-lg transition-all ${data.speechLevel === level
                                ? 'border-red-600 dark:border-red-500 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400'
                                : 'border-neutral-200 dark:border-zinc-700 hover:border-neutral-300 dark:hover:border-zinc-600 text-neutral-700 dark:text-zinc-300'
                                }`}
                        >
                            {level}
                        </button>
                    ))}
                </div>
                <div className="flex justify-between mt-10">
                    <button
                        onClick={onPrev}
                        className="px-8 py-3 rounded-full font-bold text-neutral-600 dark:text-zinc-400 hover:bg-neutral-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                        {t('back')}
                    </button>
                    <button
                        onClick={onNext}
                        className="bg-red-600 dark:bg-red-600 text-white px-8 py-3 rounded-full font-black shadow-lg shadow-red-100 dark:shadow-red-900/30 hover:bg-red-700 dark:hover:bg-red-700 transition-colors active:scale-95"
                    >
                        {t('next')}
                    </button>
                </div>
            </div>
        </div>
    );
}

function SpeakingSkillsScreen({ data, updateYesNoSometimes, onNext, onPrev }: { data: OnboardingData; updateYesNoSometimes: (key: keyof OnboardingData, field: string, value: string) => void; onNext: () => void; onPrev: () => void }) {
    const { t } = useTranslation();
    const skills = [
        t('skill_say_name'),
        t('skill_ask_want'),
        t('skill_answer_simple'),
        t('skill_understand_simple'),
        t('skill_follow_conversation')
    ];

    const options = [t('yes'), t('no'), t('sometimes')];

    return (
        <div className="w-full max-w-2xl">
            <div className="bg-white dark:bg-zinc-900 rounded-[40px] border border-neutral-100 dark:border-zinc-800 shadow-xl p-12">
                <h2 className="text-3xl font-black mb-8 text-neutral-900 dark:text-white">{t('speaking_skills_title')}</h2>
                <div className="space-y-6">
                    {skills.map((skill) => (
                        <div key={skill}>
                            <p className="font-bold text-neutral-700 dark:text-zinc-300 mb-3">{skill}</p>
                            <div className="flex gap-3">
                                {options.map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => updateYesNoSometimes('speakingSkills', skill, option)}
                                        className={`flex-1 px-4 py-3 rounded-xl border-2 font-bold transition-all ${(data.speakingSkills?.[skill] === option)
                                            ? 'border-red-600 dark:border-red-500 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400'
                                            : 'border-neutral-200 dark:border-zinc-700 hover:border-neutral-300 dark:hover:border-zinc-600 text-neutral-700 dark:text-zinc-300'
                                            }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between mt-10">
                    <button
                        onClick={onPrev}
                        className="px-8 py-3 rounded-full font-bold text-neutral-600 dark:text-zinc-400 hover:bg-neutral-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                        {t('back')}
                    </button>
                    <button
                        onClick={onNext}
                        className="bg-red-600 dark:bg-red-600 text-white px-8 py-3 rounded-full font-black shadow-lg shadow-red-100 dark:shadow-red-900/30 hover:bg-red-700 dark:hover:bg-red-700 transition-colors active:scale-95"
                    >
                        {t('next')}
                    </button>
                </div>
            </div>
        </div>
    );
}

function UnderstandingLanguageScreen({ data, updateYesNoSometimes, onNext, onPrev }: { data: OnboardingData; updateYesNoSometimes: (key: keyof OnboardingData, field: string, value: string) => void; onNext: () => void; onPrev: () => void }) {
    const { t } = useTranslation();
    const skills = [
        t('skill_follow_1step'),
        t('skill_follow_2step'),
        t('skill_respond_name'),
        t('skill_understand_home'),
        t('skill_understand_emotions')
    ];

    const options = [t('yes'), t('no'), t('sometimes')];

    return (
        <div className="w-full max-w-2xl">
            <div className="bg-white dark:bg-zinc-900 rounded-[40px] border border-neutral-100 dark:border-zinc-800 shadow-xl p-12">
                <h2 className="text-3xl font-black mb-4 text-neutral-900 dark:text-white">{t('understanding_title')}</h2>
                <div className="space-y-6">
                    {skills.map((skill) => (
                        <div key={skill}>
                            <p className="font-bold text-neutral-700 dark:text-zinc-300 mb-3">{skill}</p>
                            <div className="flex gap-3">
                                {options.map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => updateYesNoSometimes('understandingLanguage', skill, option)}
                                        className={`flex-1 px-4 py-3 rounded-xl border-2 font-bold transition-all ${(data.understandingLanguage?.[skill] === option)
                                            ? 'border-red-600 dark:border-red-500 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400'
                                            : 'border-neutral-200 dark:border-zinc-700 hover:border-neutral-300 dark:hover:border-zinc-600 text-neutral-700 dark:text-zinc-300'
                                            }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between mt-10">
                    <button
                        onClick={onPrev}
                        className="px-8 py-3 rounded-full font-bold text-neutral-600 dark:text-zinc-400 hover:bg-neutral-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                        {t('back')}
                    </button>
                    <button
                        onClick={onNext}
                        className="bg-red-600 dark:bg-red-600 text-white px-8 py-3 rounded-full font-black shadow-lg shadow-red-100 dark:shadow-red-900/30 hover:bg-red-700 dark:hover:bg-red-700 transition-colors active:scale-95"
                    >
                        {t('next')}
                    </button>
                </div>
            </div>
        </div>
    );
}

function LearningConceptsScreen({ data, toggleMultiSelect, onNext, onPrev }: { data: OnboardingData; toggleMultiSelect: (key: keyof OnboardingData, value: string) => void; onNext: () => void; onPrev: () => void }) {
    const { t } = useTranslation();
    const concepts = [
        t('concept_colors'),
        t('concept_shapes'),
        t('concept_numbers'),
        t('concept_letters'),
        t('concept_animals'),
        t('concept_body_parts')
    ];

    return (
        <div className="w-full max-w-2xl">
            <div className="bg-white dark:bg-zinc-900 rounded-[40px] border border-neutral-100 dark:border-zinc-800 shadow-xl p-12">
                <h2 className="text-3xl font-black mb-4 text-neutral-900 dark:text-white">{t('learning_concepts_title')}</h2>
                <p className="text-lg text-neutral-500 dark:text-zinc-400 mb-8">{t('select_all_that_apply')}</p>
                <div className="space-y-3">
                    {concepts.map((concept) => (
                        <button
                            key={concept}
                            onClick={() => toggleMultiSelect('learningConcepts', concept)}
                            className={`w-full px-6 py-4 rounded-2xl border-2 text-left font-bold text-lg transition-all ${(data.learningConcepts || []).includes(concept)
                                ? 'border-red-600 dark:border-red-500 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400'
                                : 'border-neutral-200 dark:border-zinc-700 hover:border-neutral-300 dark:hover:border-zinc-600 text-neutral-700 dark:text-zinc-300'
                                }`}
                        >
                            {concept}
                        </button>
                    ))}
                </div>
                <div className="flex justify-between mt-10">
                    <button
                        onClick={onPrev}
                        className="px-8 py-3 rounded-full font-bold text-neutral-600 dark:text-zinc-400 hover:bg-neutral-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                        {t('back')}
                    </button>
                    <button
                        onClick={onNext}
                        className="bg-red-600 dark:bg-red-600 text-white px-8 py-3 rounded-full font-black shadow-lg shadow-red-100 dark:shadow-red-900/30 hover:bg-red-700 dark:hover:bg-red-700 transition-colors active:scale-95"
                    >
                        {t('next')}
                    </button>
                </div>
            </div>
        </div>
    );
}

function ThinkingSkillsScreen({ data, updateYesNoSometimes, onNext, onPrev }: { data: OnboardingData; updateYesNoSometimes: (key: keyof OnboardingData, field: string, value: string) => void; onNext: () => void; onPrev: () => void }) {
    const { t } = useTranslation();
    const skills = [
        t('concept_big_small'),
        t('concept_more_less'),
        t('concept_same_different'),
        t('concept_first_last'),
        t('concept_yesterday_tomorrow')
    ];

    const options = [t('yes'), t('no'), t('sometimes')];

    return (
        <div className="w-full max-w-2xl">
            <div className="bg-white dark:bg-zinc-900 rounded-[40px] border border-neutral-100 dark:border-zinc-800 shadow-xl p-12">
                <h2 className="text-3xl font-black mb-4 text-neutral-900 dark:text-white">{t('thinking_skills_title')}</h2>
                <div className="space-y-6">
                    {skills.map((skill) => (
                        <div key={skill}>
                            <p className="font-bold text-neutral-700 dark:text-zinc-300 mb-3">{skill}</p>
                            <div className="flex gap-3">
                                {options.map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => updateYesNoSometimes('thinkingSkills', skill, option)}
                                        className={`flex-1 px-4 py-3 rounded-xl border-2 font-bold transition-all ${(data.thinkingSkills?.[skill] === option)
                                            ? 'border-red-600 dark:border-red-500 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400'
                                            : 'border-neutral-200 dark:border-zinc-700 hover:border-neutral-300 dark:hover:border-zinc-600 text-neutral-700 dark:text-zinc-300'
                                            }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between mt-10">
                    <button
                        onClick={onPrev}
                        className="px-8 py-3 rounded-full font-bold text-neutral-600 dark:text-zinc-400 hover:bg-neutral-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                        {t('back')}
                    </button>
                    <button
                        onClick={onNext}
                        className="bg-red-600 dark:bg-red-600 text-white px-8 py-3 rounded-full font-black shadow-lg shadow-red-100 dark:shadow-red-900/30 hover:bg-red-700 dark:hover:bg-red-700 transition-colors active:scale-95"
                    >
                        {t('next')}
                    </button>
                </div>
            </div>
        </div>
    );
}

function SocialPlaySkillsScreen({ data, updateYesNoSometimes, onNext, onPrev }: { data: OnboardingData; updateYesNoSometimes: (key: keyof OnboardingData, field: string, value: string) => void; onNext: () => void; onPrev: () => void }) {
    const { t } = useTranslation();
    const skills = [
        t('skill_enjoys_music'),
        t('skill_enjoys_singing'),
        t('skill_enjoys_dancing'),
        t('skill_enjoys_pretend'),
        t('skill_plays_children'),
        t('skill_prefers_alone'),
        t('skill_takes_turns'),
        t('skill_eye_contact')
    ];

    const options = [t('yes'), t('no'), t('sometimes')];

    return (
        <div className="w-full max-w-2xl">
            <div className="bg-white dark:bg-zinc-900 rounded-[40px] border border-neutral-100 dark:border-zinc-800 shadow-xl p-12">
                <h2 className="text-3xl font-black mb-4 text-neutral-900 dark:text-white">{t('social_skills_title')}</h2>
                <div className="space-y-6">
                    {skills.map((skill) => (
                        <div key={skill}>
                            <p className="font-bold text-neutral-700 dark:text-zinc-300 mb-3">{skill}</p>
                            <div className="flex gap-3">
                                {options.map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => updateYesNoSometimes('socialPlaySkills', skill, option)}
                                        className={`flex-1 px-4 py-3 rounded-xl border-2 font-bold transition-all ${(data.socialPlaySkills?.[skill] === option)
                                            ? 'border-red-600 dark:border-red-500 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400'
                                            : 'border-neutral-200 dark:border-zinc-700 hover:border-neutral-300 dark:hover:border-zinc-600 text-neutral-700 dark:text-zinc-300'
                                            }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between mt-10">
                    <button
                        onClick={onPrev}
                        className="px-8 py-3 rounded-full font-bold text-neutral-600 dark:text-zinc-400 hover:bg-neutral-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                        {t('back')}
                    </button>
                    <button
                        onClick={onNext}
                        className="bg-red-600 dark:bg-red-600 text-white px-8 py-3 rounded-full font-black shadow-lg shadow-red-100 dark:shadow-red-900/30 hover:bg-red-700 dark:hover:bg-red-700 transition-colors active:scale-95"
                    >
                        {t('next')}
                    </button>
                </div>
            </div>
        </div>
    );
}

function InterestsScreen({ data, toggleMultiSelect, onNext, onPrev }: { data: OnboardingData; toggleMultiSelect: (key: keyof OnboardingData, value: string) => void; onNext: () => void; onPrev: () => void }) {
    const { t } = useTranslation();
    const interests = [
        t('interest_music'),
        t('interest_animals'),
        t('interest_vehicles'),
        t('interest_numbers'),
        t('interest_letters'),
        t('interest_puzzles'),
        t('interest_drawing'),
        t('interest_stories'),
        t('interest_nature'),
        t('interest_technology')
    ];

    return (
        <div className="w-full max-w-2xl">
            <div className="bg-white dark:bg-zinc-900 rounded-[40px] border border-neutral-100 dark:border-zinc-800 shadow-xl p-12">
                <h2 className="text-3xl font-black mb-4 text-neutral-900 dark:text-white">{t('interests_title')}</h2>
                <p className="text-lg text-neutral-500 dark:text-zinc-400 mb-8">{t('select_all_that_apply')}</p>
                <div className="space-y-3">
                    {interests.map((interest) => (
                        <button
                            key={interest}
                            onClick={() => toggleMultiSelect('interests', interest)}
                            className={`w-full px-6 py-4 rounded-2xl border-2 text-left font-bold text-lg transition-all ${(data.interests || []).includes(interest)
                                ? 'border-red-600 dark:border-red-500 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400'
                                : 'border-neutral-200 dark:border-zinc-700 hover:border-neutral-300 dark:hover:border-zinc-600 text-neutral-700 dark:text-zinc-300'
                                }`}
                        >
                            {interest}
                        </button>
                    ))}
                </div>
                <div className="flex justify-between mt-10">
                    <button
                        onClick={onPrev}
                        className="px-8 py-3 rounded-full font-bold text-neutral-600 dark:text-zinc-400 hover:bg-neutral-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                        {t('back')}
                    </button>
                    <button
                        onClick={onNext}
                        className="bg-red-600 dark:bg-red-600 text-white px-8 py-3 rounded-full font-black shadow-lg shadow-red-100 dark:shadow-red-900/30 hover:bg-red-700 dark:hover:bg-red-700 transition-colors active:scale-95"
                    >
                        {t('next')}
                    </button>
                </div>
            </div>
        </div>
    );
}

function CompleteScreen({ onSubmit, processing }: { data: OnboardingData; onSubmit: () => void; processing: boolean }) {
    const { t } = useTranslation();
    return (
        <div className="w-full max-w-2xl text-center">
            <div className="bg-white dark:bg-zinc-900 rounded-[40px] border border-neutral-100 dark:border-zinc-800 shadow-xl p-12">
                <div className="mb-8">
                    <div className="w-24 h-24 bg-red-100 dark:bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-12 h-12 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-black mb-6 text-neutral-900 dark:text-white">{t('complete_title')}</h1>
                <p className="text-xl text-neutral-500 dark:text-zinc-400 mb-10 leading-relaxed">
                    {t('complete_subtitle')}
                </p>
                <button
                    onClick={onSubmit}
                    disabled={processing}
                    className="inline-block bg-red-600 dark:bg-red-600 text-white px-12 py-4 rounded-full font-black text-lg shadow-lg shadow-red-100 dark:shadow-red-900/30 hover:bg-red-700 dark:hover:bg-red-700 transition-colors active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {processing ? t('saving') : t('view_recommended_games')}
                </button>
            </div>
        </div>
    );
}