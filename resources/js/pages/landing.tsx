import { Head } from '@inertiajs/react';
/* @chisel-registration */
/* @end-chisel-registration */
import {
    Sparkles,
    Heart,
    Phone,
    BarChart3,
    Award,
    Zap,
    Target,
    BookOpen,
    Users,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import HeroSection from '@/components/hero';
import LogoLoop from '@/components/LogoLoop';

export default function Landing() {
    const { t } = useTranslation();
    const techLogos = [
        {
            src: '/asset/logos/donkeylogo.png',
            alt: 'Company 1',
            href: 'https://company1.com',
        },
        {
            src: '/asset/logos/hage.png',
            alt: 'Company 2',
            href: 'https://company2.com',
        },
        {
            src: '/asset/logos/medanit.png',
            alt: 'Company 3',
            href: 'https://company3.com',
        },
        {
            src: '/asset/logos/logo1.png',
            alt: 'Company 3',
            href: 'https://company3.com',
        },
        {
            src: '/asset/logos/image.png',
            alt: 'Company 3',
            href: 'https://company3.com',
        },
        {
            src: '/asset/logos/hyatlogo.png',
            alt: 'Company 3',
            href: 'https://company3.com',
        },
        {
            src: '/asset/logos/yenehealth.png',
            alt: 'Company 3',
            href: 'https://company3.com',
        },
    ];

    return (
        <>
            <Head title="Lifeline Addis - Learn Through Play" />

            {/* ================= HERO SECTION ================= */}
            <HeroSection />

            {/* ================= PARTNERS / TRUST SECTION (Duolingo style) ================= */}
            <section className="bg-white py-12 dark:bg-zinc-950">
                <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
                    <h2 className="mb-8 text-xs font-extrabold tracking-[0.2em] text-[#777777] uppercase md:text-sm dark:text-zinc-500">
                        {t('partners_heading')}
                    </h2>

                    <div className="flex items-center justify-items-center gap-8 opacity-85 transition-opacity hover:opacity-100 md:gap-12">
                        <LogoLoop
                            logos={techLogos}
                            speed={100}
                            direction="left"
                            logoHeight={50}
                            gap={60}
                            hoverSpeed={0}
                            scaleOnHover
                            fadeOut
                            fadeOutColor="#ffffff"
                            ariaLabel="Technology partners"
                        />
                    </div>
                </div>
            </section>

            {/* ================= FEATURE 1: PLAY & LEARN (Duolingo style - punchy alternating) ================= */}
            <section className="bg-white px-6 py-20 lg:px-8 dark:bg-zinc-950">
                <div className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
                        {/* Left Column: Image with Duolingo-style card */}
                        <div className="relative">
                            {/* Decorative blobs */}
                            <div className="absolute -top-6 -left-6 h-48 w-48 rounded-full bg-[#FFC800]/20 blur-2xl"></div>
                            <div className="absolute right-6 -bottom-6 h-64 w-64 rounded-full bg-[#58CC02]/10 blur-3xl"></div>

                            <div className="relative z-10 overflow-hidden p-0">
                                <div className="relative overflow-hidden">
                                    <img
                                        src="/asset/game2.png"
                                        alt="Interactive learning game"
                                        className="h-auto w-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.style.display =
                                                'none';
                                            const el = document.getElementById(
                                                'feature-unlock-fallback',
                                            );

                                            if (el) {
                                                el.classList.remove('hidden');
                                            }
                                        }}
                                    />
                                    {/* Playful badge overlay */}
                                    <div className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-[#FFC800] px-5 py-2 text-xs font-extrabold text-[#3C3C3C] shadow-md">
                                        <Zap className="h-3.5 w-3.5" /> 150+
                                        Interactive Games
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Punchy text */}
                        <div className="space-y-6 text-left lg:pl-6">
                            <div className="inline-flex items-center gap-2 rounded-full bg-[#E5F5E1] px-4 py-2 text-xs font-extrabold tracking-wider text-[#58CC02] uppercase dark:bg-[#58CC02]/10">
                                <Sparkles className="h-4 w-4" />{' '}
                                {t('feature_comprehensive_tag')}
                            </div>

                            <h2 className="text-4xl leading-[1.1] font-extrabold tracking-tight text-[#3C3C3C] sm:text-5xl dark:text-white">
                                {t('feature_unlock_title')}
                            </h2>

                            <p className="text-lg leading-relaxed font-medium text-[#777777] dark:text-zinc-400">
                                {t('feature_unlock_body')}
                            </p>

                            <div className="pt-2">
                                <a
                                    href="#services"
                                    className="btn-duo-red inline-flex items-center gap-2 px-8 py-3.5 text-base"
                                >
                                    {t('learn_more')}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= COMPREHENSIVE SOLUTIONS TRANSITION (simplified) ================= */}
            <section className="border-y border-[#E5E5E5] bg-[#FAFAFA] py-16 dark:border-zinc-800/40 dark:bg-zinc-900/50">
                <div className="mx-auto max-w-4xl space-y-4 px-6 text-center lg:px-8">
                    <div className="inline-flex items-center gap-2 rounded-full bg-[#FFC800] px-6 py-2 text-sm font-extrabold text-[#3C3C3C]">
                        ⭐ {t('comprehensive_solutions_heading')}
                    </div>
                    <p className="mx-auto max-w-xl text-lg leading-relaxed font-semibold text-[#777777] dark:text-zinc-400">
                        {t('comprehensive_solutions_body')}
                    </p>
                </div>
            </section>

            {/* ================= FEATURE 2: PROGRESS TRACKING (Duolingo-style gamified stats) ================= */}
            <section className="bg-white px-6 py-20 lg:px-8 dark:bg-zinc-950">
                <div className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
                        {/* Left Column: Text */}
                        <div className="space-y-6 text-left lg:col-span-5">
                            <div className="inline-flex items-center gap-2 rounded-full bg-[#E8F0FE] px-4 py-2 text-xs font-extrabold tracking-wider text-[#1CB0F6] uppercase dark:bg-[#1CB0F6]/10">
                                <BarChart3 className="h-4 w-4" />{' '}
                                {t('analytics_tag')}
                            </div>

                            <h2 className="text-4xl leading-[1.1] font-extrabold tracking-tight text-[#3C3C3C] sm:text-5xl dark:text-white">
                                {t('feature_data_title')}
                            </h2>

                            <p className="text-lg leading-relaxed font-medium text-[#777777] dark:text-zinc-400">
                                {t('feature_data_body')}
                            </p>
                        </div>

                        {/* Right Column: Gamified Dashboard */}
                        <div className="lg:col-span-7">
                            <div className="card-duo p-6 shadow-md">
                                {/* Top Section */}
                                <div className="mb-5 flex flex-col justify-between gap-4 border-b border-[#E5E5E5] pb-5 sm:flex-row sm:items-center dark:border-zinc-800">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src="/asset/maskot/maskot_head.png"
                                            className="flex h-10 w-10 items-center justify-center rounded-full text-lg font-black text-white"
                                        />
                                        {/* src="/asset/maskot/maskot_head.png"
                    </div> */}
                                        <div>
                                            <h3 className="text-base font-extrabold text-[#3C3C3C] dark:text-zinc-200">
                                                Yonas M.
                                            </h3>
                                            <p className="text-[11px] font-bold tracking-wider text-[#777777] uppercase">
                                                Daily Progress
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 text-xs font-bold">
                                        <span className="inline-flex items-center gap-1 rounded-full bg-[#FFC800] px-3 py-1.5 text-[#3C3C3C]">
                                            🔥 7-Day Streak
                                        </span>
                                        <span className="inline-flex items-center gap-1 rounded-full bg-[#CE82FF] px-3 py-1.5 text-white">
                                            ⭐ 1,240 XP
                                        </span>
                                    </div>
                                </div>

                                {/* Chunky Progress Bars (gamified) */}
                                <div className="mb-6 space-y-5">
                                    <div>
                                        <div className="mb-1.5 flex items-center justify-between">
                                            <span className="flex items-center gap-1.5 text-xs font-extrabold text-[#3C3C3C] dark:text-zinc-300">
                                                <Target className="h-3.5 w-3.5 text-[#58CC02]" />{' '}
                                                Focus Duration
                                            </span>
                                            <span className="text-xs font-black text-[#58CC02]">
                                                42 min
                                            </span>
                                        </div>
                                        <div className="progress-duo">
                                            <div className="w-[70%] bg-[#58CC02]"></div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="mb-1.5 flex items-center justify-between">
                                            <span className="flex items-center gap-1.5 text-xs font-extrabold text-[#3C3C3C] dark:text-zinc-300">
                                                <Award className="h-3.5 w-3.5 text-[#1CB0F6]" />{' '}
                                                Task Accuracy
                                            </span>
                                            <span className="text-xs font-black text-[#1CB0F6]">
                                                94.8%
                                            </span>
                                        </div>
                                        <div className="progress-duo">
                                            <div className="w-[95%] bg-[#1CB0F6]"></div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="mb-1.5 flex items-center justify-between">
                                            <span className="flex items-center gap-1.5 text-xs font-extrabold text-[#3C3C3C] dark:text-zinc-300">
                                                <BookOpen className="h-3.5 w-3.5 text-[#CE82FF]" />{' '}
                                                Skills Mastered
                                            </span>
                                            <span className="text-xs font-black text-[#CE82FF]">
                                                12/20
                                            </span>
                                        </div>
                                        <div className="progress-duo">
                                            <div className="w-[60%] bg-[#CE82FF]"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Weekly Overview */}
                                <div className="rounded-2xl bg-[#F7F7F7] p-4 dark:bg-zinc-900">
                                    <div className="mb-3 flex items-center justify-between">
                                        <span className="text-xs font-extrabold text-[#3C3C3C] dark:text-zinc-300">
                                            This Week
                                        </span>
                                        <span className="text-[10px] font-bold text-[#777777]">
                                            ▲ 12% improvement
                                        </span>
                                    </div>
                                    <div className="flex h-20 items-end gap-2">
                                        {[
                                            {
                                                day: 'Mon',
                                                val: 60,
                                                color: '#58CC02',
                                            },
                                            {
                                                day: 'Tue',
                                                val: 75,
                                                color: '#58CC02',
                                            },
                                            {
                                                day: 'Wed',
                                                val: 45,
                                                color: '#FFC800',
                                            },
                                            {
                                                day: 'Thu',
                                                val: 80,
                                                color: '#58CC02',
                                            },
                                            {
                                                day: 'Fri',
                                                val: 90,
                                                color: '#1CB0F6',
                                            },
                                            {
                                                day: 'Sat',
                                                val: 70,
                                                color: '#58CC02',
                                            },
                                            {
                                                day: 'Sun',
                                                val: 85,
                                                color: '#CE82FF',
                                            },
                                        ].map((item) => (
                                            <div
                                                key={item.day}
                                                className="flex flex-1 flex-col items-center gap-1"
                                            >
                                                <div
                                                    className="w-full rounded-full transition-all"
                                                    style={{
                                                        height: `${item.val}%`,
                                                        backgroundColor:
                                                            item.color,
                                                        borderRadius:
                                                            '8px 8px 4px 4px',
                                                    }}
                                                ></div>
                                                <span className="text-[9px] font-bold text-[#777777]">
                                                    {item.day}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= FEATURE 3: ANYWHERE LEARNING (Duolingo-style angled mockups) ================= */}
            <section className="border-t border-[#E5E5E5] bg-[#FAFAFA] px-6 py-20 lg:px-8 dark:border-zinc-800 dark:bg-zinc-950">
                <div className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
                        {/* Left Column: Angled device mockups */}
                        <div className="relative flex flex-col items-center justify-center gap-6 sm:flex-row lg:col-span-7 lg:pr-6">
                            {/* Decorative character peeking from behind */}
                            <div className="absolute top-0 -left-4 z-20 hidden sm:block">
                                <img
                                    src="/asset/maskot/maskot_head.png"
                                    className="flex h-16 w-16 float-duo items-center justify-center text-4xl"
                                />
                                {/* <img  className="h-14 w-14 rounded-full flex items-center justify-center text-3xl  float-duo" /> */}

                                {/* </div> */}
                            </div>

                            {/* Phone mockup - angled */}
                            <div className="relative h-[380px] w-56 shrink-0 -rotate-6 transform overflow-hidden rounded-[2rem] border-[6px] border-[#3C3C3C] bg-[#3C3C3C] shadow-xl transition-transform duration-500 hover:rotate-0 dark:border-zinc-700">
                                <div className="absolute top-0 left-1/2 z-30 h-4 w-24 -translate-x-1/2 rounded-b-xl bg-[#3C3C3C]"></div>
                                <div className="flex h-full w-full flex-col justify-between bg-white p-4 pt-6">
                                    {/* Mini game UI */}
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="rounded-full bg-[#E5F5E1] px-2 py-0.5 text-[8px] font-black text-[#58CC02]">
                                                Level 3
                                            </span>
                                            <span className="text-[8px] font-bold">
                                                ⭐ 45
                                            </span>
                                        </div>
                                        <div className="rounded-2xl bg-[#FFC800]/10 p-3 text-center">
                                            <span className="text-2xl">🍎</span>
                                            <p className="mt-1 text-[8px] font-bold text-[#3C3C3C]">
                                                Find the apple!
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-3 gap-1.5">
                                            {['🍎', '🍊', '🍇'].map(
                                                (fruit, i) => (
                                                    <div
                                                        key={i}
                                                        className="flex aspect-square items-center justify-center rounded-xl bg-[#F7F7F7] text-xl"
                                                    >
                                                        {fruit}
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#E5E5E5]">
                                            <div className="h-full w-[60%] rounded-full bg-[#58CC02]"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tablet mockup - angled opposite */}
                            <div className="relative h-48 w-72 shrink-0 rotate-3 transform overflow-hidden rounded-[1.5rem] border-[6px] border-[#3C3C3C] bg-[#3C3C3C] shadow-xl transition-transform duration-500 hover:rotate-0 dark:border-zinc-700">
                                <div className="flex h-full w-full flex-col justify-between bg-gradient-to-br from-[#58CC02] to-[#3F9100] p-4">
                                    <div className="flex items-center justify-between">
                                        <span className="rounded-full bg-white/20 px-2 py-1 text-[8px] font-black text-white backdrop-blur-sm">
                                            ⭐ 1,240 XP
                                        </span>
                                        <span className="rounded-full bg-white/20 px-2 py-1 text-[8px] font-black text-white backdrop-blur-sm">
                                            🔥 7 days
                                        </span>
                                    </div>
                                    <div className="text-center">
                                        <img
                                            src="/asset//game3.png"
                                            alt="Tablet game"
                                            className="h-auto w-full rounded-xl shadow-md"
                                        />
                                        <p className="mt-1 text-sm font-extrabold text-white">
                                            Keep going!
                                        </p>
                                    </div>
                                    <div className="rounded-full bg-white/20 px-3 py-1.5 text-center backdrop-blur-sm">
                                        <span className="text-[9px] font-bold text-white">
                                            Lesson 5 of 8
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Text */}
                        <div className="space-y-6 text-left lg:col-span-5">
                            <div className="inline-flex items-center gap-2 rounded-full bg-[#F0E8FF] px-4 py-2 text-xs font-extrabold tracking-wider text-[#CE82FF] uppercase dark:bg-[#CE82FF]/10">
                                <Phone className="h-4 w-4" />{' '}
                                {t('mobile_tablet_tag')}
                            </div>

                            <h2 className="text-4xl leading-[1.1] font-extrabold tracking-tight text-[#3C3C3C] sm:text-5xl dark:text-white">
                                {t('feature_parental_title')}
                            </h2>

                            <p className="text-lg leading-relaxed font-medium text-[#777777] dark:text-zinc-400">
                                {t('feature_parental_body')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= TESTIMONIALS (Speech bubbles) ================= */}
            <section
                id="community"
                className="border-t border-[#E5E5E5] bg-white px-6 py-20 lg:px-8 dark:border-zinc-800 dark:bg-zinc-950"
            >
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto mb-16 max-w-3xl space-y-4 text-center">
                        <div className="inline-flex items-center gap-2 rounded-full bg-[#FFDFDF] px-6 py-2 text-sm font-extrabold text-[#FF4B4B]">
                            ❤️ {t('testimonials_heading')}{' '}
                            <Heart className="inline-block h-4 w-4 fill-current" />{' '}
                            {t('testimonials_love')}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {/* Testimonial 1 - Speech bubble style */}
                        <div className="speech-bubble border-2 border-[#E5E5E5] bg-[#F7F7F7] p-6 text-left dark:border-zinc-800 dark:bg-zinc-900">
                            <p className="mb-6 text-sm leading-relaxed font-semibold text-[#3C3C3C] dark:text-zinc-300">
                                "{t('testimonial_1')}"
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFC800] text-lg shadow-sm">
                                    👨
                                </div>
                                <div>
                                    <h4 className="text-sm font-extrabold text-[#3C3C3C] dark:text-zinc-200">
                                        {t('testimonial_1_author')}
                                    </h4>
                                    <span className="text-[10px] font-bold tracking-wider text-[#777777] uppercase">
                                        {t('testimonial_1_role')}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial 2 */}
                        <div className="speech-bubble border-2 border-[#E5E5E5] bg-[#F7F7F7] p-6 text-left dark:border-zinc-800 dark:bg-zinc-900">
                            <p className="mb-6 text-sm leading-relaxed font-semibold text-[#3C3C3C] dark:text-zinc-300">
                                "{t('testimonial_2')}"
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1CB0F6] text-lg shadow-sm">
                                    👩
                                </div>
                                <div>
                                    <h4 className="text-sm font-extrabold text-[#3C3C3C] dark:text-zinc-200">
                                        {t('testimonial_2_author')}
                                    </h4>
                                    <span className="text-[10px] font-bold tracking-wider text-[#777777] uppercase">
                                        {t('testimonial_2_role')}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial 3 */}
                        <div className="speech-bubble border-2 border-[#E5E5E5] bg-[#F7F7F7] p-6 text-left dark:border-zinc-800 dark:bg-zinc-900">
                            <p className="mb-6 text-sm leading-relaxed font-semibold text-[#3C3C3C] dark:text-zinc-300">
                                "{t('testimonial_3')}"
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#CE82FF] text-lg shadow-sm">
                                    👨
                                </div>
                                <div>
                                    <h4 className="text-sm font-extrabold text-[#3C3C3C] dark:text-zinc-200">
                                        {t('testimonial_3_author')}
                                    </h4>
                                    <span className="text-[10px] font-bold tracking-wider text-[#777777] uppercase">
                                        {t('testimonial_3_role')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= THE LIFELINE TEAM (Duolingo style - headshot grid) ================= */}
            <section
                id="about"
                className="bg-white px-6 py-20 lg:px-8 dark:bg-zinc-950"
            >
                <div className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
                        {/* Left Column: Text */}
                        <div className="space-y-6 text-left lg:col-span-5">
                            <div className="inline-flex items-center gap-2 rounded-full bg-[#E5F5E1] px-4 py-2 text-xs font-extrabold tracking-wider text-[#58CC02] uppercase dark:bg-[#58CC02]/10">
                                <Users className="h-4 w-4" />{' '}
                                {t('team_heading')}
                            </div>

                            <h2 className="text-4xl leading-[1.1] font-extrabold tracking-tight text-[#3C3C3C] sm:text-5xl dark:text-white">
                                {t('team_heading')}
                            </h2>

                            <p className="text-lg leading-relaxed font-medium text-[#777777] dark:text-zinc-400">
                                {t('team_body')}
                            </p>

                            <div className="pt-2">
                                <a
                                    href="#about"
                                    className="btn-duo-outline inline-flex items-center gap-2 px-8 py-3.5 text-base"
                                >
                                    {t('team_cta')}
                                </a>
                            </div>
                        </div>

                        {/* Right Column: Headshot grid */}
                        <div className="lg:col-span-7">
                            <div className="flex flex-wrap justify-center gap-4">
                                <img
                                    src="/asset/team.png"
                                    alt="Team"
                                    className="h-auto w-full rounded-lg shadow-md"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= RECENT NEWS (Duolingo-style clean cards) ================= */}
            <section className="border-t border-[#E5E5E5] bg-[#FAFAFA] px-6 py-20 lg:px-8 dark:border-zinc-800 dark:bg-zinc-950">
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto mb-16 max-w-3xl space-y-4 text-center">
                        <div className="inline-flex items-center gap-2 rounded-full bg-[#E8F0FE] px-6 py-2 text-sm font-extrabold text-[#1CB0F6]">
                            📰 {t('news_heading')}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {/* Card 1 */}
                        <div className="group cursor-pointer overflow-hidden card-duo p-0 transition-all duration-300 hover:shadow-lg">
                            <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-[#F7F7F7]">
                                <img
                                    src="/asset/autismday.png"
                                    alt="Autism Acceptance Month"
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                                {/* Top accent bar */}
                                <div className="absolute top-0 right-0 left-0 h-1.5 bg-[#58CC02]"></div>
                            </div>
                            <div className="space-y-3 p-6 text-left">
                                <div className="inline-flex items-center gap-1 rounded-full bg-[#E5F5E1] px-3 py-1 text-[9px] font-extrabold tracking-wider text-[#58CC02] uppercase">
                                    {t('news_tag_announcements')}
                                </div>
                                <h3 className="text-base leading-snug font-extrabold text-[#3C3C3C] transition-colors group-hover:text-[#58CC02] dark:text-zinc-200">
                                    {t('news_1_title')}
                                </h3>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="group cursor-pointer overflow-hidden card-duo p-0 transition-all duration-300 hover:shadow-lg">
                            <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-[#F7F7F7]">
                                <img
                                    src="/asset/crownclub.png"
                                    alt="Crowen Club"
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                                <div className="absolute top-0 right-0 left-0 h-1.5 bg-[#CE82FF]"></div>
                            </div>
                            <div className="space-y-3 p-6 text-left">
                                <div className="inline-flex items-center gap-1 rounded-full bg-[#F0E8FF] px-3 py-1 text-[9px] font-extrabold tracking-wider text-[#CE82FF] uppercase">
                                    {t('news_tag_community')}
                                </div>
                                <h3 className="text-base leading-snug font-extrabold text-[#3C3C3C] transition-colors group-hover:text-[#CE82FF] dark:text-zinc-200">
                                    {t('news_2_title')}
                                </h3>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="group cursor-pointer overflow-hidden card-duo p-0 transition-all duration-300 hover:shadow-lg">
                            <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-[#F7F7F7]">
                                <img
                                    src="/asset/meet.png"
                                    alt="Understanding Chromosome 21"
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                                <div className="absolute top-0 right-0 left-0 h-1.5 bg-[#FFC800]"></div>
                            </div>
                            <div className="space-y-3 p-6 text-left">
                                <div className="inline-flex items-center gap-1 rounded-full bg-[#FFF8E0] px-3 py-1 text-[9px] font-extrabold tracking-wider text-[#E2A600] uppercase">
                                    {t('news_tag_insights')}
                                </div>
                                <h3 className="text-base leading-snug font-extrabold text-[#3C3C3C] transition-colors group-hover:text-[#FF9600] dark:text-zinc-200">
                                    {t('news_3_title')}
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
