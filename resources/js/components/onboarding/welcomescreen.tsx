import { useTranslation } from 'react-i18next';

export default function WelcomeScreen({ onNext }: { onNext: () => void }) {
    const { t } = useTranslation();

    return (
        <div className="w-full max-w-2xl text-center">
            <div className="rounded-[40px] border border-neutral-100 bg-white p-6 shadow-xl sm:p-8 md:p-10 dark:border-zinc-800 dark:bg-zinc-900">
                <h1 className="mb-4 text-3xl font-black text-neutral-900 sm:mb-6 sm:text-4xl md:text-5xl dark:text-white">
                    {t('lets_learn_about_your_child')}
                </h1>
                <p className="mb-8 text-lg leading-relaxed text-neutral-500 sm:mb-10 sm:text-xl dark:text-zinc-400">
                    {t('onboarding_subtitle')}
                </p>
                <button
                    onClick={onNext}
                    className="rounded-full bg-red-600 px-12 py-4 text-lg font-black text-white shadow-lg shadow-red-100 transition-colors hover:bg-red-700 active:scale-95"
                >
                    {t('get_started')}
                </button>
            </div>
        </div>
    );
}
