import { useTranslation } from 'react-i18next';

interface CompleteScreenProps {
    onSubmit: () => void;
    processing: boolean;
}

export default function CompleteScreen({
    onSubmit,
    processing,
}: CompleteScreenProps) {
    const { t } = useTranslation();

    return (
        <div className="w-full max-w-2xl text-center">
            <div className="rounded-[40px] border border-neutral-100 bg-white p-6 shadow-xl sm:p-8 md:p-10 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="mb-6 sm:mb-8">
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 sm:mb-6 sm:h-24 sm:w-24 dark:bg-red-500/20">
                        <svg
                            className="h-12 w-12 text-red-600 dark:text-red-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                </div>
                <h1 className="mb-4 text-3xl font-black text-neutral-900 sm:mb-6 sm:text-4xl md:text-5xl dark:text-white">
                    {t('complete_title')}
                </h1>
                <p className="mb-8 text-lg leading-relaxed text-neutral-500 sm:mb-10 sm:text-xl dark:text-zinc-400">
                    {t('complete_subtitle')}
                </p>
                <button
                    type="button"
                    onClick={onSubmit}
                    disabled={processing}
                    className="inline-block rounded-full bg-red-600 px-12 py-4 text-lg font-black text-white shadow-lg shadow-red-100 transition-colors hover:bg-red-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-red-600 dark:shadow-red-900/30 dark:hover:bg-red-700"
                >
                    {processing ? t('saving') : t('view_recommended_games')}
                </button>
            </div>
        </div>
    );
}
