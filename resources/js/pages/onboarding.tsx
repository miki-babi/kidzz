import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import WelcomeScreen from '@/components/onboarding/welcomescreen';
import { store } from '@/routes/onboarding';

interface OnboardingData {
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
                {currentScreen > 1 && currentScreen < 12 && (
                    <div className="w-full max-w-2xl mb-8">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-neutral-600 dark:text-zinc-400">Step {currentScreen} of {totalScreens}</span>
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


function BasicInformationScreen({ data, updateData, onNext, onPrev }: { data: OnboardingData; updateData: (key: keyof OnboardingData, value: any) => void; onNext: () => void; onPrev: () => void }) {
    return (
        <div className="w-full max-w-2xl">
            <div className="bg-white dark:bg-zinc-900 rounded-[40px] border border-neutral-100 dark:border-zinc-800 shadow-xl p-12">
                <h2 className="text-3xl font-black mb-8 text-neutral-900 dark:text-white">Tell us about your child</h2>
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-neutral-700 dark:text-zinc-300 mb-2">Age</label>
                        <input
                            type="number"
                            value={data.age || ''}
                            onChange={(e) => updateData('age', e.target.value)}
                            className="w-full px-6 py-4 rounded-2xl border border-neutral-200 dark:border-zinc-700 focus:border-red-600 dark:focus:border-red-500 focus:outline-none transition-colors text-lg bg-white dark:bg-zinc-800 text-neutral-900 dark:text-white"
                            placeholder="Enter age"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-neutral-700 dark:text-zinc-300 mb-2">Gender (optional)</label>
                        <select
                            value={data.gender || ''}
                            onChange={(e) => updateData('gender', e.target.value)}
                            className="w-full px-6 py-4 rounded-2xl border border-neutral-200 dark:border-zinc-700 focus:border-red-600 dark:focus:border-red-500 focus:outline-none transition-colors text-lg bg-white dark:bg-zinc-800 text-neutral-900 dark:text-white"
                        >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                            <option value="prefer-not-to-say">Prefer not to say</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-between mt-10">
                    <button
                        onClick={onPrev}
                        className="px-8 py-3 rounded-full font-bold text-neutral-600 dark:text-zinc-400 hover:bg-neutral-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                        Back
                    </button>
                    <button
                        onClick={onNext}
                        className="bg-red-600 dark:bg-red-600 text-white px-8 py-3 rounded-full font-black shadow-lg shadow-red-100 dark:shadow-red-900/30 hover:bg-red-700 dark:hover:bg-red-700 transition-colors active:scale-95"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

function ProfessionalEvaluationScreen({ data, updateData, onNext, onPrev }: { data: OnboardingData; updateData: (key: keyof OnboardingData, value: any) => void; onNext: () => void; onPrev: () => void }) {
    return (
        <div className="w-full max-w-2xl">
            <div className="bg-white dark:bg-zinc-900 rounded-[40px] border border-neutral-100 dark:border-zinc-800 shadow-xl p-12">
                <h2 className="text-3xl font-black mb-4 text-neutral-900 dark:text-white">Has your child been evaluated?</h2>
                <p className="text-lg text-neutral-500 dark:text-zinc-400 mb-8">Has your child been evaluated by a therapist, psychologist, or doctor?</p>
                <div className="space-y-4">
                    {['Yes', 'No', 'In Progress'].map((option) => (
                        <button
                            key={option}
                            onClick={() => updateData('evaluated', option)}
                            className={`w-full px-6 py-4 rounded-2xl border-2 text-left font-bold text-lg transition-all ${
                                data.evaluated === option
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
                        Back
                    </button>
                    <button
                        onClick={onNext}
                        className="bg-red-600 dark:bg-red-600 text-white px-8 py-3 rounded-full font-black shadow-lg shadow-red-100 dark:shadow-red-900/30 hover:bg-red-700 dark:hover:bg-red-700 transition-colors active:scale-95"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

function DiagnosesScreen({ data, toggleMultiSelect, onNext, onPrev }: { data: OnboardingData; toggleMultiSelect: (key: keyof OnboardingData, value: string) => void; onNext: () => void; onPrev: () => void }) {
    const diagnoses = [
        'Autism Spectrum Disorder (ASD)',
        'Speech Delay',
        'ADHD',
        'Developmental Delay',
        'Down Syndrome',
        'Intellectual Disability',
        'Hearing Impairment',
        'Other',
        'No Diagnosis'
    ];

    return (
        <div className="w-full max-w-2xl">
            <div className="bg-white dark:bg-zinc-900 rounded-[40px] border border-neutral-100 dark:border-zinc-800 shadow-xl p-12">
                <h2 className="text-3xl font-black mb-4 text-neutral-900 dark:text-white">Has your child been diagnosed with any of these?</h2>
                <p className="text-lg text-neutral-500 dark:text-zinc-400 mb-8">Select all that apply</p>
                <div className="space-y-3">
                    {diagnoses.map((diagnosis) => (
                        <button
                            key={diagnosis}
                            onClick={() => toggleMultiSelect('diagnoses', diagnosis)}
                            className={`w-full px-6 py-4 rounded-2xl border-2 text-left font-bold text-lg transition-all ${
                                (data.diagnoses || []).includes(diagnosis)
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
                        Back
                    </button>
                    <button
                        onClick={onNext}
                        className="bg-red-600 dark:bg-red-600 text-white px-8 py-3 rounded-full font-black shadow-lg shadow-red-100 dark:shadow-red-900/30 hover:bg-red-700 dark:hover:bg-red-700 transition-colors active:scale-95"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

function CommunicationScreen({ data, updateData, onNext, onPrev }: { data: OnboardingData; updateData: (key: keyof OnboardingData, value: any) => void; onNext: () => void; onPrev: () => void }) {
    const speechLevels = [
        'Speaks in full sentences',
        'Speaks in short phrases',
        'Uses single words',
        'Can answer yes/no',
        'Uses gestures or pointing',
        'Non-verbal'
    ];

    return (
        <div className="w-full max-w-2xl">
            <div className="bg-white dark:bg-zinc-900 rounded-[40px] border border-neutral-100 dark:border-zinc-800 shadow-xl p-12">
                <h2 className="text-3xl font-black mb-4 text-neutral-900 dark:text-white">How does your child communicate?</h2>
                <p className="text-lg text-neutral-500 dark:text-zinc-400 mb-8">Speech Level</p>
                <div className="space-y-3">
                    {speechLevels.map((level) => (
                        <button
                            key={level}
                            onClick={() => updateData('speechLevel', level)}
                            className={`w-full px-6 py-4 rounded-2xl border-2 text-left font-bold text-lg transition-all ${
                                data.speechLevel === level
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
                        Back
                    </button>
                    <button
                        onClick={onNext}
                        className="bg-red-600 dark:bg-red-600 text-white px-8 py-3 rounded-full font-black shadow-lg shadow-red-100 dark:shadow-red-900/30 hover:bg-red-700 dark:hover:bg-red-700 transition-colors active:scale-95"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

function SpeakingSkillsScreen({ data, updateYesNoSometimes, onNext, onPrev }: { data: OnboardingData; updateYesNoSometimes: (key: keyof OnboardingData, field: string, value: string) => void; onNext: () => void; onPrev: () => void }) {
    const skills = [
        'Say their name',
        'Ask for what they want',
        'Answer simple questions',
        'Understand simple questions',
        'Follow a conversation'
    ];

    const options = ['Yes', 'No', 'Sometimes'];

    return (
        <div className="w-full max-w-2xl">
            <div className="bg-white dark:bg-zinc-900 rounded-[40px] border border-neutral-100 dark:border-zinc-800 shadow-xl p-12">
                <h2 className="text-3xl font-black mb-8 text-neutral-900 dark:text-white">What can your child do?</h2>
                <div className="space-y-6">
                    {skills.map((skill) => (
                        <div key={skill}>
                            <p className="font-bold text-neutral-700 dark:text-zinc-300 mb-3">{skill}</p>
                            <div className="flex gap-3">
                                {options.map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => updateYesNoSometimes('speakingSkills', skill, option)}
                                        className={`flex-1 px-4 py-3 rounded-xl border-2 font-bold transition-all ${
                                            (data.speakingSkills?.[skill] === option)
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
                        Back
                    </button>
                    <button
                        onClick={onNext}
                        className="bg-red-600 dark:bg-red-600 text-white px-8 py-3 rounded-full font-black shadow-lg shadow-red-100 dark:shadow-red-900/30 hover:bg-red-700 dark:hover:bg-red-700 transition-colors active:scale-95"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

function UnderstandingLanguageScreen({ data, updateYesNoSometimes, onNext, onPrev }: { data: OnboardingData; updateYesNoSometimes: (key: keyof OnboardingData, field: string, value: string) => void; onNext: () => void; onPrev: () => void }) {
    const skills = [
        'Follows 1-step instructions',
        'Follows 2-step instructions',
        'Responds when called by name',
        'Understands conversations at home',
        'Understands emotions like happy, sad, angry'
    ];

    const options = ['Yes', 'No', 'Sometimes'];

    return (
        <div className="w-full max-w-2xl">
            <div className="bg-white dark:bg-zinc-900 rounded-[40px] border border-neutral-100 dark:border-zinc-800 shadow-xl p-12">
                <h2 className="text-3xl font-black mb-4 text-neutral-900 dark:text-white">Understanding and Listening</h2>
                <div className="space-y-6">
                    {skills.map((skill) => (
                        <div key={skill}>
                            <p className="font-bold text-neutral-700 dark:text-zinc-300 mb-3">{skill}</p>
                            <div className="flex gap-3">
                                {options.map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => updateYesNoSometimes('understandingLanguage', skill, option)}
                                        className={`flex-1 px-4 py-3 rounded-xl border-2 font-bold transition-all ${
                                            (data.understandingLanguage?.[skill] === option)
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
                        Back
                    </button>
                    <button
                        onClick={onNext}
                        className="bg-red-600 dark:bg-red-600 text-white px-8 py-3 rounded-full font-black shadow-lg shadow-red-100 dark:shadow-red-900/30 hover:bg-red-700 dark:hover:bg-red-700 transition-colors active:scale-95"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

function LearningConceptsScreen({ data, toggleMultiSelect, onNext, onPrev }: { data: OnboardingData; toggleMultiSelect: (key: keyof OnboardingData, value: string) => void; onNext: () => void; onPrev: () => void }) {
    const concepts = [
        'Colors',
        'Shapes',
        'Numbers',
        'Letters',
        'Animals',
        'Body Parts'
    ];

    return (
        <div className="w-full max-w-2xl">
            <div className="bg-white dark:bg-zinc-900 rounded-[40px] border border-neutral-100 dark:border-zinc-800 shadow-xl p-12">
                <h2 className="text-3xl font-black mb-4 text-neutral-900 dark:text-white">What does your child recognize?</h2>
                <p className="text-lg text-neutral-500 dark:text-zinc-400 mb-8">Select all that apply</p>
                <div className="space-y-3">
                    {concepts.map((concept) => (
                        <button
                            key={concept}
                            onClick={() => toggleMultiSelect('learningConcepts', concept)}
                            className={`w-full px-6 py-4 rounded-2xl border-2 text-left font-bold text-lg transition-all ${
                                (data.learningConcepts || []).includes(concept)
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
                        Back
                    </button>
                    <button
                        onClick={onNext}
                        className="bg-red-600 dark:bg-red-600 text-white px-8 py-3 rounded-full font-black shadow-lg shadow-red-100 dark:shadow-red-900/30 hover:bg-red-700 dark:hover:bg-red-700 transition-colors active:scale-95"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

function ThinkingSkillsScreen({ data, updateYesNoSometimes, onNext, onPrev }: { data: OnboardingData; updateYesNoSometimes: (key: keyof OnboardingData, field: string, value: string) => void; onNext: () => void; onPrev: () => void }) {
    const skills = [
        'Big vs Small',
        'More vs Less',
        'Same vs Different',
        'First / Next / Last',
        'Yesterday / Today / Tomorrow'
    ];

    const options = ['Yes', 'No', 'Sometimes'];

    return (
        <div className="w-full max-w-2xl">
            <div className="bg-white dark:bg-zinc-900 rounded-[40px] border border-neutral-100 dark:border-zinc-800 shadow-xl p-12">
                <h2 className="text-3xl font-black mb-4 text-neutral-900 dark:text-white">Understanding Concepts</h2>
                <div className="space-y-6">
                    {skills.map((skill) => (
                        <div key={skill}>
                            <p className="font-bold text-neutral-700 dark:text-zinc-300 mb-3">{skill}</p>
                            <div className="flex gap-3">
                                {options.map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => updateYesNoSometimes('thinkingSkills', skill, option)}
                                        className={`flex-1 px-4 py-3 rounded-xl border-2 font-bold transition-all ${
                                            (data.thinkingSkills?.[skill] === option)
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
                        Back
                    </button>
                    <button
                        onClick={onNext}
                        className="bg-red-600 dark:bg-red-600 text-white px-8 py-3 rounded-full font-black shadow-lg shadow-red-100 dark:shadow-red-900/30 hover:bg-red-700 dark:hover:bg-red-700 transition-colors active:scale-95"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

function SocialPlaySkillsScreen({ data, updateYesNoSometimes, onNext, onPrev }: { data: OnboardingData; updateYesNoSometimes: (key: keyof OnboardingData, field: string, value: string) => void; onNext: () => void; onPrev: () => void }) {
    const skills = [
        'Enjoys music',
        'Enjoys singing',
        'Enjoys dancing',
        'Enjoys pretend play',
        'Plays with other children',
        'Prefers playing alone',
        'Takes turns during games',
        'Maintains eye contact'
    ];

    const options = ['Yes', 'No', 'Sometimes'];

    return (
        <div className="w-full max-w-2xl">
            <div className="bg-white dark:bg-zinc-900 rounded-[40px] border border-neutral-100 dark:border-zinc-800 shadow-xl p-12">
                <h2 className="text-3xl font-black mb-4 text-neutral-900 dark:text-white">Play and Social Skills</h2>
                <div className="space-y-6">
                    {skills.map((skill) => (
                        <div key={skill}>
                            <p className="font-bold text-neutral-700 dark:text-zinc-300 mb-3">{skill}</p>
                            <div className="flex gap-3">
                                {options.map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => updateYesNoSometimes('socialPlaySkills', skill, option)}
                                        className={`flex-1 px-4 py-3 rounded-xl border-2 font-bold transition-all ${
                                            (data.socialPlaySkills?.[skill] === option)
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
                        Back
                    </button>
                    <button
                        onClick={onNext}
                        className="bg-red-600 dark:bg-red-600 text-white px-8 py-3 rounded-full font-black shadow-lg shadow-red-100 dark:shadow-red-900/30 hover:bg-red-700 dark:hover:bg-red-700 transition-colors active:scale-95"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

function InterestsScreen({ data, toggleMultiSelect, onNext, onPrev }: { data: OnboardingData; toggleMultiSelect: (key: keyof OnboardingData, value: string) => void; onNext: () => void; onPrev: () => void }) {
    const interests = [
        'Music',
        'Animals',
        'Vehicles',
        'Numbers',
        'Letters',
        'Puzzles',
        'Drawing',
        'Stories',
        'Nature',
        'Technology'
    ];

    return (
        <div className="w-full max-w-2xl">
            <div className="bg-white dark:bg-zinc-900 rounded-[40px] border border-neutral-100 dark:border-zinc-800 shadow-xl p-12">
                <h2 className="text-3xl font-black mb-4 text-neutral-900 dark:text-white">What does your child enjoy?</h2>
                <p className="text-lg text-neutral-500 dark:text-zinc-400 mb-8">Select all that apply</p>
                <div className="space-y-3">
                    {interests.map((interest) => (
                        <button
                            key={interest}
                            onClick={() => toggleMultiSelect('interests', interest)}
                            className={`w-full px-6 py-4 rounded-2xl border-2 text-left font-bold text-lg transition-all ${
                                (data.interests || []).includes(interest)
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
                        Back
                    </button>
                    <button
                        onClick={onNext}
                        className="bg-red-600 dark:bg-red-600 text-white px-8 py-3 rounded-full font-black shadow-lg shadow-red-100 dark:shadow-red-900/30 hover:bg-red-700 dark:hover:bg-red-700 transition-colors active:scale-95"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

function CompleteScreen({ data, onSubmit, processing }: { data: OnboardingData; onSubmit: () => void; processing: boolean }) {
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
                <h1 className="text-4xl md:text-5xl font-black mb-6 text-neutral-900 dark:text-white">Your child's profile is ready</h1>
                <p className="text-xl text-neutral-500 dark:text-zinc-400 mb-10 leading-relaxed">
                    We've selected activities based on your answers.
                </p>
                <button
                    onClick={onSubmit}
                    disabled={processing}
                    className="inline-block bg-red-600 dark:bg-red-600 text-white px-12 py-4 rounded-full font-black text-lg shadow-lg shadow-red-100 dark:shadow-red-900/30 hover:bg-red-700 dark:hover:bg-red-700 transition-colors active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {processing ? 'Saving...' : 'View Recommended Games'}
                </button>
            </div>
        </div>
    );
}