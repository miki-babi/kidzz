import { useTranslation } from "react-i18next";

export default function WelcomeScreen({ onNext }: { onNext: () => void }) {
    const { t } = useTranslation();
    return (
        <div className="w-full max-w-2xl text-center">
            <div className="bg-white rounded-[40px] border border-neutral-100 shadow-xl p-12">
                <h1 className="text-4xl md:text-5xl font-black mb-6 text-neutral-900">{t('lets_learn_about_your_child')}</h1>
                <p className="text-xl text-neutral-500 mb-10 leading-relaxed">
                    {t('onboarding_subtitle')}
                </p>
                <button
                    onClick={onNext}
                    className="bg-red-600 text-white px-12 py-4 rounded-full font-black text-lg shadow-lg shadow-red-100 hover:bg-red-700 transition-colors active:scale-95"
                >
                    {t('get_started')}
                </button>
            </div>
        </div>
    );
}