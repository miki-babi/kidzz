import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

interface LanguageSwitcherProps {
    className?: string;
}

export default function LanguageSwitcher({
    className = '',
}: LanguageSwitcherProps) {
    const { i18n: i18nInstance } = useTranslation();
    const currentLanguage = i18nInstance.language;

    return (
        <div
            className={`flex items-center gap-1 rounded-full border border-white/20 bg-white/10 p-1 backdrop-blur-sm ${className}`}
        >
            <button
                onClick={() => i18n.changeLanguage('en')}
                className={`rounded-full px-3 py-1.5 text-xs font-bold transition-all duration-200 ${
                    currentLanguage === 'en'
                        ? 'bg-white text-neutral-900 shadow-sm'
                        : 'text-current opacity-70 hover:opacity-100'
                }`}
            >
                EN
            </button>
            <button
                onClick={() => i18n.changeLanguage('am')}
                className={`rounded-full px-3 py-1.5 text-xs font-bold transition-all duration-200 ${
                    currentLanguage === 'am'
                        ? 'bg-white text-neutral-900 shadow-sm'
                        : 'text-current opacity-70 hover:opacity-100'
                }`}
            >
                አማ
            </button>
        </div>
    );
}
