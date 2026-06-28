import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function HeroSection() {
    const { t } = useTranslation();

    return (
        <section className="px-6 py-8 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
                    {/* Left Content */}
                    <div className="flex-1 space-y-8 text-center lg:text-left">
                        {/* Mascot character */}
                        <div className="flex items-center justify-center gap-3 lg:justify-start">
                            <img
                                src="/asset/maskot/maskot_head.png"
                                className="flex h-14 w-14 float-duo items-center justify-center rounded-full text-3xl"
                            />

                            <span className="text-sm font-extrabold tracking-widest text-[#777777] uppercase">
                                {t('hero_tag')}
                            </span>
                        </div>

                        <h1 className="text-5xl leading-[1.1] font-extrabold tracking-tight text-[#3C3C3C] sm:text-6xl lg:text-7xl dark:text-white">
                            {t('hero_title')}
                        </h1>

                        <p className="max-w-xl text-lg leading-relaxed font-semibold text-[#777777] sm:text-xl dark:text-zinc-400">
                            {t('hero_subtitle')}
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
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
                    <div className="flex flex-1 items-center justify-center">
                        <div className="relative">
                            {/* Background decorative circles */}
                            <div className="absolute -top-8 -right-8 h-64 w-64 blur-2xl"></div>
                            <div className="absolute -bottom-8 -left-8 h-48 w-48 rounded-full bg-[#58CC02]/15 blur-2xl"></div>

                            {/* Main illustration */}
                            <div className="relative p-2">
                                <div className="overflow-hidden bg-white p-4">
                                    <img
                                        src="/asset/hero4.png"
                                        alt="Child learning through play"
                                        className="h-auto w-full max-w-[500px] rounded-2xl object-contain"
                                        onError={(e) => {
                                            e.currentTarget.style.display =
                                                'none';
                                            const parent =
                                                e.currentTarget.parentElement;

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
                            <div className="absolute -bottom-4 -left-4 rounded-2xl border-2 border-[#E5E5E5] bg-white px-4 py-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl">⭐</span>
                                    <div>
                                        <div className="text-xs font-bold text-[#3C3C3C]">
                                            {t('hero_badge_title')}
                                        </div>
                                        <div className="text-[10px] font-semibold text-[#777777]">
                                            {t('hero_badge_sub')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
