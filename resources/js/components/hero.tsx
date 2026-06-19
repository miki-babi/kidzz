import { Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

export default function HeroSection() {
    const { t } = useTranslation();

    return (
        <section className="px-6 py-8 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Left Content */}
                    <div className="flex-1 text-center lg:text-left space-y-8">
                        {/* Mascot character */}
                        <div className="flex items-center justify-center lg:justify-start gap-3">
                            <img src="/asset/maskot/maskot_head.png" className="h-14 w-14 rounded-full flex items-center justify-center text-3xl  float-duo" />
                             
                            <span className="text-sm font-extrabold text-[#777777] uppercase tracking-widest">
                                {t('hero_tag')}
                            </span>
                        </div>

                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-[#3C3C3C] dark:text-white">
                            {t('hero_title')}
                        </h1>

                        <p className="text-lg sm:text-xl text-[#777777] max-w-xl leading-relaxed font-semibold dark:text-zinc-400">
                            {t('hero_subtitle')}
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                            <Link
                                href="/games"
                                className="btn-duo-red inline-flex items-center gap-2 px-10 py-4 text-lg shadow-md glow-duo"
                            >
                                {t('hero_cta')}
                            </Link>
                            <Link
                                href="/register"
                                className="btn-duo-outline inline-flex items-center gap-2 px-8 py-4 text-lg"
                            >
                                {t('hero_cta_alt')}
                            </Link>
                        </div>

                        
                    </div>

                    {/* Right Content - Mascot and illustration */}
                    <div className="flex-1 flex items-center justify-center">
                        <div className="relative">
                            {/* Background decorative circles */}
                            <div className="absolute -top-8 -right-8 h-64 w-64 rounded-full bg-[#FFC800]/20 blur-2xl"></div>
                            <div className="absolute -bottom-8 -left-8 h-48 w-48 rounded-full bg-[#58CC02]/15 blur-2xl"></div>

                            {/* Main illustration */}
                            <div className="relative bg-gradient-to-br from-[#58CC02] to-[#3F9100] rounded-[32px] p-2 shadow-xl">
                                <div className="bg-white rounded-[28px] p-4 overflow-hidden">
                                    <img
                                        src="/asset/hero4.png"
                                        alt="Child learning through play"
                                        className="w-full max-w-[420px] h-auto object-contain rounded-2xl"
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                            const parent = e.currentTarget.parentElement;
                                            if (parent) {
                                                parent.innerHTML = `
                                                    <div class="flex items-center justify-center h-80 w-80 bg-[#F7F7F7] rounded-2xl">
                                                        <span class="text-8xl">🦁</span>
                                                    </div>
                                                `;
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Floating badge */}
                            <div className="absolute -bottom-4 -left-4 bg-white border-2 border-[#E5E5E5] rounded-2xl px-4 py-3 shadow-md float-duo">
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl">⭐</span>
                                    <div>
                                        <div className="text-xs font-bold text-[#3C3C3C]">{t('hero_badge_title')}</div>
                                        <div className="text-[10px] font-semibold text-[#777777]">{t('hero_badge_sub')}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}