import i18n from "i18next";
import { useTranslation } from "react-i18next";

interface LanguageSwitcherProps {
    className?: string;
}

export default function LanguageSwitcher({ className = "" }: LanguageSwitcherProps) {
    const { i18n: i18nInstance } = useTranslation();
    const currentLanguage = i18nInstance.language;

    return (
        <div className={`flex items-center gap-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-1 ${className}`}>
            <button
                onClick={() => i18n.changeLanguage("en")}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                    currentLanguage === "en"
                        ? "bg-white text-neutral-900 shadow-sm"
                        : "text-current opacity-70 hover:opacity-100"
                }`}
            >
                EN
            </button>
            <button
                onClick={() => i18n.changeLanguage("am")}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                    currentLanguage === "am"
                        ? "bg-white text-neutral-900 shadow-sm"
                        : "text-current opacity-70 hover:opacity-100"
                }`}
            >
                አማ
            </button>
        </div>
    );
}