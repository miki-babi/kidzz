import { Head } from '@inertiajs/react';
/* @chisel-registration */
/* @end-chisel-registration */
import {
  Sparkles,
  Heart,
  ChevronRight,
  Phone,
  BarChart3,
  Calendar,
  Star,
  Award,
  Zap,
  Target,
  BookOpen,
  Users,
} from 'lucide-react';
import { SiNextdotjs, SiReact, SiTailwindcss, SiTypescript } from 'react-icons/si';
import HeroSection from '@/components/hero';
import LogoLoop from '@/components/LogoLoop';
import LanguageSwitcher from '@/components/languageSwitcher';
import { useTranslation } from 'react-i18next';

export default function Landing() {
  const { t } = useTranslation();
  const techLogos = [
   { src: "/asset/logos/donkeylogo.png", alt: "Company 1", href: "https://company1.com" },
  { src: "/asset/logos/hage.png", alt: "Company 2", href: "https://company2.com" },
  { src: "/asset/logos/medanit.png", alt: "Company 3", href: "https://company3.com" },
  { src: "/asset/logos/logo1.png", alt: "Company 3", href: "https://company3.com" },
  { src: "/asset/logos/image.png", alt: "Company 3", href: "https://company3.com" },
  { src: "/asset/logos/hyatlogo.png", alt: "Company 3", href: "https://company3.com" },
  { src: "/asset/logos/yenehealth.png", alt: "Company 3", href: "https://company3.com" },
  ];

  return (
    <>
      <Head title="Lifeline Addis - Learn Through Play" />

      {/* ================= HERO SECTION ================= */}
      <HeroSection />

      {/* ================= PARTNERS / TRUST SECTION (Duolingo style) ================= */}
      <section className="py-12 bg-white dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-xs md:text-sm font-extrabold tracking-[0.2em] text-[#777777] dark:text-zinc-500 mb-8 uppercase">
            {t('partners_heading')}
          </h2>

          <div className="flex gap-8 md:gap-12 items-center justify-items-center opacity-85 hover:opacity-100 transition-opacity">
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
      <section className="py-20 px-6 lg:px-8 bg-white dark:bg-zinc-950  ">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left Column: Image with Duolingo-style card */}
            <div className="relative">
              {/* Decorative blobs */}
              <div className="absolute -left-6 -top-6 h-48 w-48 rounded-full bg-[#FFC800]/20 blur-2xl"></div>
              <div className="absolute right-6 -bottom-6 h-64 w-64 rounded-full bg-[#58CC02]/10 blur-3xl"></div>

              <div className="relative z-10 p-0 overflow-hidden">
                <div className="relative overflow-hidden">
                  <img
                    src="/asset/game2.png"
                    alt="Interactive learning game"
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const el = document.getElementById('feature-unlock-fallback');
                      if (el) el.classList.remove('hidden');
                    }}
                  />
                  {/* Playful badge overlay */}
                  <div className="absolute bottom-4 left-4 bg-[#FFC800] text-[#3C3C3C] font-extrabold text-xs px-5 py-2 rounded-full shadow-md flex items-center gap-1.5">
                    <Zap className="h-3.5 w-3.5" /> 150+ Interactive Games
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Punchy text */}
            <div className="space-y-6 text-left lg:pl-6">
              <div className="inline-flex items-center gap-2 bg-[#E5F5E1] text-[#58CC02] font-extrabold text-xs px-4 py-2 rounded-full uppercase tracking-wider dark:bg-[#58CC02]/10">
                <Sparkles className="h-4 w-4" /> {t('feature_comprehensive_tag')}
              </div>

              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#3C3C3C] dark:text-white leading-[1.1]">
                {t('feature_unlock_title')}
              </h2>

              <p className="text-lg text-[#777777] dark:text-zinc-400 leading-relaxed font-medium">
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
      <section className="py-16 bg-[#FAFAFA] border-y border-[#E5E5E5] dark:bg-zinc-900/50 dark:border-zinc-800/40">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#FFC800] text-[#3C3C3C] font-extrabold text-sm px-6 py-2 rounded-full">
            ⭐ {t('comprehensive_solutions_heading')}
          </div>
          <p className="text-[#777777] dark:text-zinc-400 max-w-xl mx-auto font-semibold leading-relaxed text-lg">
            {t('comprehensive_solutions_body')}
          </p>
        </div>
      </section>

      {/* ================= FEATURE 2: PROGRESS TRACKING (Duolingo-style gamified stats) ================= */}
      <section className="py-20 px-6 lg:px-8 bg-white dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Column: Text */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 bg-[#E8F0FE] text-[#1CB0F6] font-extrabold text-xs px-4 py-2 rounded-full uppercase tracking-wider dark:bg-[#1CB0F6]/10">
                <BarChart3 className="h-4 w-4" /> {t('analytics_tag')}
              </div>

              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#3C3C3C] dark:text-white leading-[1.1]">
                {t('feature_data_title')}
              </h2>

              <p className="text-lg text-[#777777] dark:text-zinc-400 leading-relaxed font-medium">
                {t('feature_data_body')}
              </p>
            </div>

            {/* Right Column: Gamified Dashboard */}
            <div className="lg:col-span-7">
              <div className="card-duo p-6 shadow-md">
                {/* Top Section */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E5E5] pb-5 mb-5 dark:border-zinc-800">
                  <div className="flex items-center gap-3">
                    <img src="/asset/maskot/maskot_head.png" className="h-10 w-10 rounded-full  flex items-center justify-center text-white font-black text-lg" />
                          {/* src="/asset/maskot/maskot_head.png"
                    </div> */}
                    <div>
                      <h3 className="font-extrabold text-[#3C3C3C] dark:text-zinc-200 text-base">Yonas M.</h3>
                      <p className="text-[11px] font-bold text-[#777777] uppercase tracking-wider">Daily Progress</p>
                    </div>
                  </div>
                  <div className="flex gap-2 text-xs font-bold">
                    <span className="inline-flex items-center gap-1 bg-[#FFC800] text-[#3C3C3C] rounded-full px-3 py-1.5">
                      🔥 7-Day Streak
                    </span>
                    <span className="inline-flex items-center gap-1 bg-[#CE82FF] text-white rounded-full px-3 py-1.5">
                      ⭐ 1,240 XP
                    </span>
                  </div>
                </div>

                {/* Chunky Progress Bars (gamified) */}
                <div className="space-y-5 mb-6">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-extrabold text-[#3C3C3C] dark:text-zinc-300 flex items-center gap-1.5">
                        <Target className="h-3.5 w-3.5 text-[#58CC02]" /> Focus Duration
                      </span>
                      <span className="text-xs font-black text-[#58CC02]">42 min</span>
                    </div>
                    <div className="progress-duo">
                      <div className="bg-[#58CC02] w-[70%]"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-extrabold text-[#3C3C3C] dark:text-zinc-300 flex items-center gap-1.5">
                        <Award className="h-3.5 w-3.5 text-[#1CB0F6]" /> Task Accuracy
                      </span>
                      <span className="text-xs font-black text-[#1CB0F6]">94.8%</span>
                    </div>
                    <div className="progress-duo">
                      <div className="bg-[#1CB0F6] w-[95%]"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-extrabold text-[#3C3C3C] dark:text-zinc-300 flex items-center gap-1.5">
                        <BookOpen className="h-3.5 w-3.5 text-[#CE82FF]" /> Skills Mastered
                      </span>
                      <span className="text-xs font-black text-[#CE82FF]">12/20</span>
                    </div>
                    <div className="progress-duo">
                      <div className="bg-[#CE82FF] w-[60%]"></div>
                    </div>
                  </div>
                </div>

                {/* Weekly Overview */}
                <div className="bg-[#F7F7F7] rounded-2xl p-4 dark:bg-zinc-900">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-extrabold text-[#3C3C3C] dark:text-zinc-300">This Week</span>
                    <span className="text-[10px] font-bold text-[#777777]">▲ 12% improvement</span>
                  </div>
                  <div className="flex items-end gap-2 h-20">
                    {[
                      { day: 'Mon', val: 60, color: '#58CC02' },
                      { day: 'Tue', val: 75, color: '#58CC02' },
                      { day: 'Wed', val: 45, color: '#FFC800' },
                      { day: 'Thu', val: 80, color: '#58CC02' },
                      { day: 'Fri', val: 90, color: '#1CB0F6' },
                      { day: 'Sat', val: 70, color: '#58CC02' },
                      { day: 'Sun', val: 85, color: '#CE82FF' },
                    ].map((item) => (
                      <div key={item.day} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          className="w-full rounded-full transition-all"
                          style={{
                            height: `${item.val}%`,
                            backgroundColor: item.color,
                            borderRadius: '8px 8px 4px 4px',
                          }}
                        ></div>
                        <span className="text-[9px] font-bold text-[#777777]">{item.day}</span>
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
      <section className="py-20 px-6 lg:px-8 bg-[#FAFAFA] dark:bg-zinc-950 border-t border-[#E5E5E5] dark:border-zinc-800">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Column: Angled device mockups */}
            <div className="lg:col-span-7 flex flex-col sm:flex-row items-center justify-center gap-6 lg:pr-6 relative">
              {/* Decorative character peeking from behind */}
              <div className="absolute -left-4 top-0 z-20 hidden sm:block">
                <img src="/asset/maskot/maskot_head.png" className="h-16 w-16  flex items-center justify-center text-4xl float-duo" />
                                              {/* <img  className="h-14 w-14 rounded-full flex items-center justify-center text-3xl  float-duo" /> */}

                {/* </div> */}
              </div>

              {/* Phone mockup - angled */}
              <div className="relative w-56 h-[380px] rounded-[2rem] border-[6px] border-[#3C3C3C] bg-[#3C3C3C] shadow-xl overflow-hidden shrink-0 transform -rotate-6 hover:rotate-0 transition-transform duration-500 dark:border-zinc-700">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-4 w-24 bg-[#3C3C3C] rounded-b-xl z-30"></div>
                <div className="h-full w-full bg-white p-4 pt-6 flex flex-col justify-between">
                  {/* Mini game UI */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] font-black text-[#58CC02] bg-[#E5F5E1] px-2 py-0.5 rounded-full">Level 3</span>
                      <span className="text-[8px] font-bold">⭐ 45</span>
                    </div>
                    <div className="bg-[#FFC800]/10 rounded-2xl p-3 text-center">
                      <span className="text-2xl">🍎</span>
                      <p className="text-[8px] font-bold text-[#3C3C3C] mt-1">Find the apple!</p>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {['🍎', '🍊', '🍇'].map((fruit, i) => (
                        <div key={i} className="aspect-square rounded-xl bg-[#F7F7F7] flex items-center justify-center text-xl">
                          {fruit}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="w-full bg-[#E5E5E5] rounded-full h-1.5 overflow-hidden">
                      <div className="bg-[#58CC02] h-full w-[60%] rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tablet mockup - angled opposite */}
              <div className="relative w-72 h-48 rounded-[1.5rem] border-[6px] border-[#3C3C3C] bg-[#3C3C3C] shadow-xl overflow-hidden shrink-0 transform rotate-3 hover:rotate-0 transition-transform duration-500 dark:border-zinc-700">
                <div className="h-full w-full bg-gradient-to-br from-[#58CC02] to-[#3F9100] p-4 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="bg-white/20 backdrop-blur-sm text-white text-[8px] font-black px-2 py-1 rounded-full">⭐ 1,240 XP</span>
                    <span className="bg-white/20 backdrop-blur-sm text-white text-[8px] font-black px-2 py-1 rounded-full">🔥 7 days</span>
                  </div>
                  <div className="text-center">
                    <img src="/asset//game3.png" alt="Tablet game" className="w-full h-auto rounded-xl shadow-md" />
                    <p className="text-white font-extrabold text-sm mt-1">Keep going!</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5 text-center">
                    <span className="text-white text-[9px] font-bold">Lesson 5 of 8</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Text */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 bg-[#F0E8FF] text-[#CE82FF] font-extrabold text-xs px-4 py-2 rounded-full uppercase tracking-wider dark:bg-[#CE82FF]/10">
                <Phone className="h-4 w-4" /> {t('mobile_tablet_tag')}
              </div>

              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#3C3C3C] dark:text-white leading-[1.1]">
                {t('feature_parental_title')}
              </h2>

              <p className="text-lg text-[#777777] dark:text-zinc-400 leading-relaxed font-medium">
                {t('feature_parental_body')}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS (Speech bubbles) ================= */}
      <section id="community" className="py-20 px-6 lg:px-8 bg-white dark:bg-zinc-950 border-t border-[#E5E5E5] dark:border-zinc-800">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#FFDFDF] text-[#FF4B4B] font-extrabold text-sm px-6 py-2 rounded-full">
              ❤️ {t('testimonials_heading')} <Heart className="inline-block h-4 w-4 fill-current" /> {t('testimonials_love')}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Testimonial 1 - Speech bubble style */}
            <div className="speech-bubble bg-[#F7F7F7] border-2 border-[#E5E5E5] p-6 text-left dark:bg-zinc-900 dark:border-zinc-800">
              <p className="text-[#3C3C3C] dark:text-zinc-300 text-sm leading-relaxed font-semibold mb-6">
                "{t('testimonial_1')}"
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#FFC800] flex items-center justify-center text-lg shadow-sm">
                  👨
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-[#3C3C3C] dark:text-zinc-200">{t('testimonial_1_author')}</h4>
                  <span className="text-[10px] font-bold text-[#777777] uppercase tracking-wider">{t('testimonial_1_role')}</span>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="speech-bubble bg-[#F7F7F7] border-2 border-[#E5E5E5] p-6 text-left dark:bg-zinc-900 dark:border-zinc-800">
              <p className="text-[#3C3C3C] dark:text-zinc-300 text-sm leading-relaxed font-semibold mb-6">
                "{t('testimonial_2')}"
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#1CB0F6] flex items-center justify-center text-lg shadow-sm">
                  👩
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-[#3C3C3C] dark:text-zinc-200">{t('testimonial_2_author')}</h4>
                  <span className="text-[10px] font-bold text-[#777777] uppercase tracking-wider">{t('testimonial_2_role')}</span>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="speech-bubble bg-[#F7F7F7] border-2 border-[#E5E5E5] p-6 text-left dark:bg-zinc-900 dark:border-zinc-800">
              <p className="text-[#3C3C3C] dark:text-zinc-300 text-sm leading-relaxed font-semibold mb-6">
                "{t('testimonial_3')}"
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#CE82FF] flex items-center justify-center text-lg shadow-sm">
                  👨
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-[#3C3C3C] dark:text-zinc-200">{t('testimonial_3_author')}</h4>
                  <span className="text-[10px] font-bold text-[#777777] uppercase tracking-wider">{t('testimonial_3_role')}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= THE LIFELINE TEAM (Duolingo style - headshot grid) ================= */}
      <section id="about" className="py-20 px-6 lg:px-8 bg-white dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Column: Text */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 bg-[#E5F5E1] text-[#58CC02] font-extrabold text-xs px-4 py-2 rounded-full uppercase tracking-wider dark:bg-[#58CC02]/10">
                <Users className="h-4 w-4" /> {t('team_heading')}
              </div>

              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#3C3C3C] dark:text-white leading-[1.1]">
                {t('team_heading')}
              </h2>

              <p className="text-lg text-[#777777] dark:text-zinc-400 leading-relaxed font-medium">
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
              <div className="flex flex-wrap gap-4 justify-center">
               <img src="/asset/team.png" alt="Team" className="w-full h-auto rounded-lg shadow-md" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= RECENT NEWS (Duolingo-style clean cards) ================= */}
      <section className="py-20 px-6 lg:px-8 bg-[#FAFAFA] dark:bg-zinc-950 border-t border-[#E5E5E5] dark:border-zinc-800">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#E8F0FE] text-[#1CB0F6] font-extrabold text-sm px-6 py-2 rounded-full">
              📰 {t('news_heading')}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Card 1 */}
            <div className="group card-duo p-0 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
              <div className="relative aspect-[16/10] bg-[#F7F7F7] overflow-hidden flex items-center justify-center">
                <img
                  src="/asset/autismday.png"
                  alt="Autism Acceptance Month"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#58CC02]"></div>
              </div>
              <div className="p-6 text-left space-y-3">
                <div className="inline-flex items-center gap-1 bg-[#E5F5E1] text-[#58CC02] text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  {t('news_tag_announcements')}
                </div>
                <h3 className="text-base font-extrabold text-[#3C3C3C] leading-snug group-hover:text-[#58CC02] transition-colors dark:text-zinc-200">
                  {t('news_1_title')}
                </h3>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group card-duo p-0 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
              <div className="relative aspect-[16/10] bg-[#F7F7F7] overflow-hidden flex items-center justify-center">
                <img
                  src="/asset/crownclub.png"
                  alt="Crowen Club"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#CE82FF]"></div>
              </div>
              <div className="p-6 text-left space-y-3">
                <div className="inline-flex items-center gap-1 bg-[#F0E8FF] text-[#CE82FF] text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  {t('news_tag_community')}
                </div>
                <h3 className="text-base font-extrabold text-[#3C3C3C] leading-snug group-hover:text-[#CE82FF] transition-colors dark:text-zinc-200">
                  {t('news_2_title')}
                </h3>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group card-duo p-0 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
              <div className="relative aspect-[16/10] bg-[#F7F7F7] overflow-hidden flex items-center justify-center">
                <img
                  src="/asset/meet.png"
                  alt="Understanding Chromosome 21"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#FFC800]"></div>
              </div>
              <div className="p-6 text-left space-y-3">
                <div className="inline-flex items-center gap-1 bg-[#FFF8E0] text-[#E2A600] text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  {t('news_tag_insights')}
                </div>
                <h3 className="text-base font-extrabold text-[#3C3C3C] leading-snug group-hover:text-[#FF9600] transition-colors dark:text-zinc-200">
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