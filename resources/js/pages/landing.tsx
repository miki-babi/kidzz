import { Head } from '@inertiajs/react';
/* @chisel-registration */
/* @end-chisel-registration */
import {
  ShoppingCart,
  ArrowRight,
  Sparkles,
  MessageSquare,
  Users,
  TrendingUp,
  Play,
  Heart,
  ChevronRight,
  Phone,
  Tablet,
  Award,
  Globe,
  Star,
  CheckCircle,
  Activity,
  UserCheck,
  Stethoscope,
  BarChart3,
  Calendar,
  Lock,
  ArrowUpRight
} from 'lucide-react';
import { SiNextdotjs, SiReact, SiTailwindcss, SiTypescript } from 'react-icons/si';
import Card from '@/components/card';
import HeroSection from '@/components/hero';
import LogoLoop from '@/components/LogoLoop';

export default function Landing() {
  const techLogos = [
    { node: <SiReact />, title: "React", href: "https://react.dev" },
    { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
    { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
    { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  ];

  return (
    <>
      <Head title="Lifeline Addis - Special Education at Home" />

      {/* ================= HERO SECTION ================= */}
      <HeroSection />

        {/* ================= PARTNERS / TRUST SECTION ================= */}
        <section className="py-12 border-b border-neutral-100/80 bg-white dark:border-zinc-800/40 dark:bg-zinc-950">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <h2 className="text-xs md:text-sm font-bold tracking-[0.15em] text-neutral-400 dark:text-zinc-500 mb-8">
              Our Partners
            </h2>

            <div className="flex gap-8 md:gap-12 items-center justify-items-center opacity-85 hover:opacity-100 transition-opacity">

              <LogoLoop
                logos={techLogos}
                speed={100}
                direction="left"
                logoHeight={60}
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

        {/* ================= FEATURE 1: COMPREHENSIVE UNLOCK POTENTIAL ================= */}
        <section className="py-20 px-6 lg:px-8 bg-white dark:bg-zinc-950">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

              {/* Left Column: Image with outline */}
              <div className="relative">
                {/* Watermark badge in background */}
                <div className="absolute -left-6 -top-6 h-48 w-48 rounded-full bg-red-100/50 blur-2xl dark:bg-red-950/20"></div>
                <div className="absolute right-6 -bottom-6 h-64 w-64 rounded-full bg-blue-100/50 blur-3xl dark:bg-blue-950/15"></div>

                <div className="relative z-10">
                  <div className="relative overflow-hidden flex items-center justify-center dark:bg-zinc-800/30 dark:rounded-2xl">
                    <img
                      src="/asset/game2.png"
                      alt="Unlock Potential"
                      className="w-full h-full object-cover dark:opacity-90"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const el = document.getElementById('feature-unlock-fallback');
                        if (el) {
                          el.classList.remove('hidden');
                        }
                      }}
                    />

                    <div className="absolute bottom-4 left-4 bg-red-600/80 text-white font-extrabold text-xs px-4 py-2 rounded-full shadow-md dark:bg-zinc-900/90 dark:text-indigo-400">
                      150+ Interactive Tasks
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Text */}
              <div className="space-y-6 text-left lg:pl-6">
                <div className="inline-flex items-center gap-1.5 text-xs font-black tracking-widest text-red-600 dark:text-red-500 uppercase">
                  <Sparkles className="h-4.5 w-4.5" /> Comprehensive
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight">
                  Unlock Potential.
                </h2>

                <p className="text-base sm:text-lg text-neutral-500 dark:text-zinc-400 leading-relaxed font-medium">
                  Access 150+ specialized tools, 100% data-driven and personalized.
                </p>

                <div className="pt-2">
                  <a
                    href="#services"
                    className="inline-flex items-center gap-2 bg-[#D2232A] hover:bg-red-700 text-white font-bold px-8 py-3.5 rounded-full text-sm transition-all shadow-lg shadow-red-500/10 hover:scale-102 active:scale-98 dark:bg-[#B01E24] dark:hover:bg-red-700"
                  >
                    Learn more
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ================= COMPREHENSIVE SOLUTIONS TRANSITION ================= */}
        <section className="py-16 bg-neutral-50 border-y border-neutral-100 dark:bg-zinc-900/50 dark:border-zinc-800/40">
          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center space-y-4">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-neutral-800 dark:text-zinc-200">
              Comprehensive Solutions
            </h2>
            <p className="text-neutral-500 dark:text-zinc-400 max-w-xl mx-auto font-medium leading-relaxed">
              Unlock Potential. Access 150+ specialized tools, 100% data-driven and personalized.
            </p>
          </div>
        </section>

        {/* ================= FEATURE 2: DATA-DRIVEN APPROACH ================= */}
        <section className="py-20 px-6 lg:px-8 bg-white dark:bg-zinc-950">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

              {/* Left Column: Text */}
              <div className="lg:col-span-5 space-y-6 text-left">
                <div className="inline-flex items-center gap-1.5 text-xs font-black tracking-widest text-red-600 dark:text-blue-500 uppercase">
                  <BarChart3 className="h-4.5 w-4.5" /> Analytics
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight">
                  Data-Driven Approach
                </h2>

                <p className="text-neutral-500 dark:text-zinc-400 leading-relaxed font-medium">
                  Comprehensive tools allow monitoring digital interactions, tracking progress, manual parent updates, task patterns, and detailed reports that evaluate patient, therapy, and developmental progress.
                </p>
              </div>

              {/* Right Column: Dashboard Mockup Drawing */}
              <div className="lg:col-span-7">
                <div className="relative bg-white border border-neutral-100 shadow-2xl rounded-[2.5rem] p-4 dark:bg-zinc-900 dark:border-zinc-800">

                  {/* Dashboard Visual Shell */}
                  <div className="bg-neutral-50 rounded-[2rem] p-6 text-left border border-neutral-100/50 dark:bg-zinc-950/60 dark:border-zinc-800/40">

                    {/* Top Controls Mockup */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200/60 pb-5 mb-5 dark:border-zinc-800/60">
                      <div>
                        <h3 className="font-extrabold text-neutral-800 dark:text-zinc-200 text-base leading-tight">Child Performance Dashboard</h3>
                        <p className="text-[10px] font-bold text-neutral-400 mt-0.5 uppercase tracking-wider">Patient: Yonas M.</p>
                      </div>

                      {/* Date & Filter Badges */}
                      <div className="flex gap-2 text-xs">
                        <span className="inline-flex items-center gap-1 bg-white border border-neutral-200/80 rounded-full px-3 py-1 font-semibold text-neutral-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400">
                          <Calendar className="h-3.5 w-3.5" /> Last 30 Days
                        </span>
                        <span className="inline-flex items-center gap-1 bg-red-50 text-red-600 rounded-full px-3 py-1 font-bold dark:bg-red-500/10 dark:text-red-400">
                          Live Metrics
                        </span>
                      </div>
                    </div>

                    {/* Dashboard Grid Content */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                      <div className="bg-white border border-neutral-100 rounded-2xl p-4 shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
                        <div className="text-[10px] font-bold text-neutral-400 uppercase">Focus Duration</div>
                        <div className="text-2xl font-black text-neutral-800 dark:text-zinc-200 mt-1">42 min</div>
                        <div className="text-[9px] font-semibold text-emerald-600 mt-1">▲ 12% vs last week</div>
                      </div>
                      <div className="bg-white border border-neutral-100 rounded-2xl p-4 shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
                        <div className="text-[10px] font-bold text-neutral-400 uppercase">Task Accuracy</div>
                        <div className="text-2xl font-black text-neutral-800 dark:text-zinc-200 mt-1">94.8%</div>
                        <div className="text-[9px] font-semibold text-emerald-600 mt-1">▲ 3.4% high success</div>
                      </div>
                      <div className="bg-white border border-neutral-100 rounded-2xl p-4 shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
                        <div className="text-[10px] font-bold text-neutral-400 uppercase">Therapist Logs</div>
                        <div className="text-2xl font-black text-neutral-800 dark:text-zinc-200 mt-1">12 Filed</div>
                        <div className="text-[9px] font-semibold text-neutral-500 mt-1">All sessions verified</div>
                      </div>
                    </div>

                    {/* Chart Mockup */}
                    <div className="bg-white border border-neutral-100 rounded-2xl p-5 shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-xs font-bold text-neutral-800 dark:text-zinc-200">Cognitive & Motor Progress Graph</div>
                        <div className="flex items-center gap-3 text-[10px] font-bold">
                          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-red-500"></span> Motor Skill</span>
                          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-blue-500"></span> Cognitive</span>
                        </div>
                      </div>

                      {/* Mock Chart drawing in SVG */}
                      <div className="h-44 w-full relative">
                        <svg className="w-full h-full" viewBox="0 0 400 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                          {/* Grid Lines */}
                          <line x1="0" y1="30" x2="400" y2="30" stroke="#f1f5f9" strokeWidth="1" className="dark:stroke-zinc-800" />
                          <line x1="0" y1="70" x2="400" y2="70" stroke="#f1f5f9" strokeWidth="1" className="dark:stroke-zinc-800" />
                          <line x1="0" y1="110" x2="400" y2="110" stroke="#f1f5f9" strokeWidth="1" className="dark:stroke-zinc-800" />

                          {/* Area Gradient */}
                          <defs>
                            <linearGradient id="gradient-motor" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.15" />
                              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.0" />
                            </linearGradient>
                            <linearGradient id="gradient-cog" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
                              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>

                          {/* Motor Progress Path */}
                          <path d="M0 120 C 50 110, 100 80, 150 90 C 200 100, 250 50, 300 40 C 350 30, 400 10, 400 10 L 400 150 L 0 150 Z" fill="url(#gradient-motor)" />
                          <path d="M0 120 C 50 110, 100 80, 150 90 C 200 100, 250 50, 300 40 C 350 30, 400 10, 400 10" stroke="#ef4444" strokeWidth="3.5" strokeLinecap="round" />

                          {/* Cognitive Progress Path */}
                          <path d="M0 135 C 60 120, 120 100, 180 75 C 240 50, 300 65, 360 45 C 380 35, 400 25, 400 25 L 400 150 L 0 150 Z" fill="url(#gradient-cog)" />
                          <path d="M0 135 C 60 120, 120 100, 180 75 C 240 50, 300 65, 360 45 C 380 35, 400 25, 400 25" stroke="#3b82f6" strokeWidth="3" strokeDasharray="2 2" strokeLinecap="round" />

                          {/* Highlighting node */}
                          <circle cx="300" cy="40" r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
                          <circle cx="180" cy="75" r="5" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
                        </svg>
                      </div>

                      {/* X Axis labels */}
                      <div className="flex justify-between text-[8px] font-bold text-neutral-400 mt-2 uppercase tracking-widest">
                        <span>Week 1</span>
                        <span>Week 2</span>
                        <span>Week 3</span>
                        <span>Week 4</span>
                      </div>
                    </div>

                  </div>

                  {/* Absolute image overlay tag referencing /asset/feature_dashboard.png in hidden/onError config */}
                  <img
                    src="/asset/feature_dashboard.png"
                    alt="Dashboard mockup asset"
                    className="absolute inset-0 w-full h-full object-cover rounded-[2.5rem] p-4 opacity-0 pointer-events-none"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ================= FEATURE 3: PARENTAL INSIGHTS & GUIDED PROGRESS ================= */}
        <section className="py-20 px-6 lg:px-8 bg-white dark:bg-zinc-950">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

              {/* Left Column: Device Mockups */}
              <div className="lg:col-span-7 flex flex-col sm:flex-row items-center justify-center gap-8 lg:pr-6">

                {/* 1. Mobile Phone Mockup */}
                <div className="relative w-64 h-[440px] rounded-[2.75rem] border-[10px] border-zinc-900 bg-zinc-900 shadow-2xl overflow-hidden shrink-0 dark:border-zinc-800">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 h-5 w-28 bg-zinc-900 rounded-b-2xl z-30 dark:bg-zinc-800"></div>

                  {/* Content */}
                  <div className="h-full w-full bg-white p-4 pt-8 text-left text-neutral-800 flex flex-col justify-between select-none dark:bg-zinc-900 dark:text-zinc-200">
                    <div className="space-y-4">
                      {/* Mobile Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="h-6 w-6 rounded-full bg-neutral-100 flex items-center justify-center text-[10px]">👩</span>
                          <div className="text-[9px] font-bold leading-tight text-neutral-800 dark:text-zinc-200">Yonas's Mom</div>
                        </div>
                        <span className="text-[8px] font-black bg-red-50 text-red-600 px-2 py-0.5 rounded-full dark:bg-red-500/10 dark:text-red-400">Pro Portal</span>
                      </div>

                      {/* Today's Goal card */}
                      <div className="bg-red-50/70 border border-red-100 rounded-2xl p-3 text-left dark:bg-red-950/15 dark:border-red-900/30">
                        <h4 className="text-[10px] font-black text-red-700 dark:text-red-400">Daily Milestone Goal</h4>
                        <p className="text-[9px] text-red-600/90 font-semibold mt-1">Complete Calm Garden level 2</p>

                        <div className="h-1.5 w-full bg-red-100/60 rounded-full mt-2.5 overflow-hidden dark:bg-red-950/30">
                          <div className="h-full w-[70%] bg-red-600 rounded-full"></div>
                        </div>
                      </div>

                      {/* Insights summary list */}
                      <div className="space-y-2">
                        <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Reports & logs</div>

                        <div className="flex items-center justify-between border-b border-neutral-100 pb-2 dark:border-zinc-800">
                          <span className="text-[9px] font-bold text-neutral-600 dark:text-zinc-400">Speech Exercises</span>
                          <span className="text-[9px] font-extrabold text-green-600">92% score</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-neutral-100 pb-2 dark:border-zinc-800">
                          <span className="text-[9px] font-bold text-neutral-600 dark:text-zinc-400">Routine Checklists</span>
                          <span className="text-[9px] font-extrabold text-green-600">100% complete</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-neutral-100 pb-2 dark:border-zinc-800">
                          <span className="text-[9px] font-bold text-neutral-600 dark:text-zinc-400">Sensory Integration</span>
                          <span className="text-[9px] font-extrabold text-amber-500">25 min tracked</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom banner mockup */}
                    <div className="bg-neutral-50 rounded-xl p-2.5 border border-neutral-100 flex items-center justify-between dark:bg-zinc-950 dark:border-zinc-800">
                      <div className="text-[9px] font-bold text-neutral-800 dark:text-zinc-200">Weekly Digest ready</div>
                      <span className="text-[9px] text-red-600 font-black flex items-center">Open <ChevronRight className="h-3 w-3" /></span>
                    </div>
                  </div>

                  {/* image asset tag overlay in case of local file loaded */}
                  <img
                    src="/asset/feature_mobile_progress.png"
                    alt="Mobile screen mockup"
                    className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>

                {/* 2. Tablet Game Mockup (Landscape) */}
                <div className="relative w-80 h-56 rounded-[2rem] border-[10px] border-zinc-900 bg-zinc-900 shadow-2xl overflow-hidden shrink-0 dark:border-zinc-800">
                  {/* Tablet Camera notch left */}
                  <div className="absolute top-1/2 left-0.5 -translate-y-1/2 h-3.5 w-1 bg-zinc-900 rounded-r-md z-30 dark:bg-zinc-800"></div>

                  {/* Content (Cartoon Game Representation) */}
                  <div className="h-full w-full bg-gradient-to-b from-[#87CEEB] to-[#E0F6FF] relative flex flex-col justify-between p-4 overflow-hidden select-none">

                    {/* Clouds */}
                    <div className="absolute top-4 left-6 h-5 w-14 bg-white/80 rounded-full blur-[1px]"></div>
                    <div className="absolute top-6 right-8 h-4 w-10 bg-white/85 rounded-full blur-[0.5px]"></div>

                    {/* Game header: score & task */}
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="bg-white/20 backdrop-blur-md rounded-full px-3 py-1 text-[9px] font-black text-white border border-white/20 flex items-center gap-1">
                        🍎 <span>Fruits Collected: 3/5</span>
                      </div>

                      <div className="bg-amber-400 text-neutral-900 rounded-full h-6 w-6 flex items-center justify-center font-black text-xs shadow-md">
                        35
                      </div>
                    </div>

                    {/* Cute cartoon character and platforms */}
                    <div className="relative h-20 w-full">
                      {/* Character */}
                      <div className="absolute left-10 bottom-1 flex flex-col items-center">
                        <div className="h-8 w-8 rounded-full bg-rose-500 border border-white flex items-center justify-center text-base shadow-md animate-bounce">
                          🦁
                        </div>
                        <div className="h-1 w-6 bg-black/10 rounded-full blur-[0.5px] mt-0.5"></div>
                      </div>

                      {/* Collectable item */}
                      <div className="absolute left-32 top-1 animate-pulse">
                        <span className="text-sm">🍎</span>
                      </div>

                      {/* Platforms (SVG green hills) */}
                      <svg className="absolute bottom-0 w-full h-8" viewBox="0 0 300 30" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                        <path d="M0 20 C 50 12, 100 12, 150 22 C 200 32, 250 8, 300 18 L 300 30 L 0 30 Z" fill="#22C55E" />
                        <path d="M0 22 C 50 14, 100 14, 150 24 C 200 34, 250 10, 300 20" stroke="#16A34A" strokeWidth="2" />
                      </svg>
                    </div>
                  </div>

                  {/* image asset tag overlay in case of local file loaded */}
                  <img
                    src="/asset/feature_tablet_game.png"
                    alt="Tablet game mockup"
                    className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>

              </div>

              {/* Right Column: Text */}
              <div className="lg:col-span-5 space-y-6 text-left">
                <div className="inline-flex items-center gap-1.5 text-xs font-black tracking-widest text-red-600 dark:text-red-500 uppercase">
                  <Phone className="h-4.5 w-4.5" /> Mobile & Tablet
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight">
                  Parental Insights & Guided Progress
                </h2>

                <p className="text-neutral-500 dark:text-zinc-400 leading-relaxed font-medium">
                  Simple insights & guides for growing progress trackers, simple learning and sample game.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ================= TESTIMONIALS ================= */}
        <section id="community" className="py-20 px-6 lg:px-8 border-t border-neutral-100 bg-white dark:border-zinc-800/40 dark:bg-zinc-950">
          <div className="mx-auto max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                Parents <Heart className="inline-block h-6 w-6 text-red-600 fill-current animate-pulse mx-1" /> Lifeline
              </h2>
              <div className="h-1 w-12 bg-red-600 rounded-full mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              {/* Testimonial 1 */}
              <div className="bg-neutral-50 rounded-3xl p-8 border border-neutral-100 flex flex-col justify-between text-left dark:bg-zinc-900 dark:border-zinc-800">
                <p className="text-neutral-600 dark:text-zinc-400 text-sm leading-relaxed font-medium mb-8">
                  "The parental supervision dashboard has given me parents' peace of mind regarding screen time."
                </p>

                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center text-lg font-bold text-red-600 dark:bg-red-500/10">
                    👨
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-800 dark:text-zinc-200">Ethiopian parents</h4>
                    <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Parent</span>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-neutral-50 rounded-3xl p-8 border border-neutral-100 flex flex-col justify-between text-left dark:bg-zinc-900 dark:border-zinc-800">
                <p className="text-neutral-600 dark:text-zinc-400 text-sm leading-relaxed font-medium mb-8">
                  "The kids-friendly environment is perfect for my child, and they love the interactive games."
                </p>

                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-600 dark:bg-blue-500/10">
                    👩
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-800 dark:text-zinc-200">Asnak Tadesse</h4>
                    <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Parent</span>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-neutral-50 rounded-3xl p-8 border border-neutral-100 flex flex-col justify-between text-left dark:bg-zinc-900 dark:border-zinc-800">
                <p className="text-neutral-600 dark:text-zinc-400 text-sm leading-relaxed font-medium mb-8">
                  "Excellent customer service and therapist tools. The developmental tracking has really helped."
                </p>

                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-lg font-bold text-purple-600 dark:bg-purple-500/10">
                    👨
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-800 dark:text-zinc-200">Ethiopian parents</h4>
                    <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Therapist</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ================= THE LIFELINE TEAM ================= */}
        <section id="about" className="py-20 px-6 lg:px-8 bg-white dark:bg-zinc-950">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

              {/* Left Column: Text */}
              <div className="lg:col-span-5 space-y-6 text-left">
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight">
                  The Lifeline Team
                </h2>

                <p className="text-base sm:text-lg text-neutral-500 dark:text-zinc-400 leading-relaxed font-medium">
                  Lifeline is created by medical specialists, professionals in education, therapists and educators, and content creators.
                </p>

                <div className="pt-2">
                  <a
                    href="#about"
                    className="inline-flex items-center gap-2 bg-[#D2232A] hover:bg-red-700 text-white font-bold px-8 py-3.5 rounded-full text-sm transition-all shadow-lg shadow-red-500/10 hover:scale-102 active:scale-98 dark:bg-[#B01E24] dark:hover:bg-red-700"
                  >
                    Learn more
                  </a>
                </div>
              </div>

              {/* Right Column: Image */}
              <div className="lg:col-span-7">
                <div className="border border-neutral-100 shadow-2xl rounded-[2.5rem] dark:bg-zinc-900 dark:border-zinc-800">
                  <div className="relative rounded-[2rem] overflow-hidden flex items-center justify-center dark:bg-zinc-800/30">
                    <img
                      src="/asset/team2.png"
                      alt="The Lifeline Team"
                      className="w-full h-full object-cover dark:opacity-90"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const el = document.getElementById('team-photo-fallback');
                        if (el) {
                          el.classList.remove('hidden');
                        }
                      }}
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ================= RECENT NEWS ================= */}
        <section className="py-20 px-6 lg:px-8 bg-white dark:bg-zinc-950">
          <div className="mx-auto max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                Recent News
              </h2>
              <div className="h-1 w-12 bg-red-600 rounded-full mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              {/* Card 1 */}
              <div className="group bg-neutral-50 rounded-[2.5rem] border border-neutral-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 dark:bg-zinc-900 dark:border-zinc-800">
                <div className="relative aspect-[16/10] bg-neutral-100 overflow-hidden dark:bg-zinc-800 flex items-center justify-center">
                  <img
                    src="/asset/autismday.png"
                    alt="Celebrating Autism Acceptance Month"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 dark:opacity-90"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const el = document.getElementById('news-1-fallback');
                      if (el) {
                        el.classList.remove('hidden');
                      }
                    }}
                  />
                </div>
                <div className="p-8 text-left space-y-3">
                  <span className="text-[10px] font-black text-red-600 uppercase tracking-widest dark:text-red-500">Announcements</span>
                  <h3 className="text-lg font-bold text-neutral-800 leading-snug group-hover:text-red-600 transition-colors dark:text-zinc-200 dark:group-hover:text-red-500">
                    Celebrating Autism Acceptance Month with a Special Office!
                  </h3>
                </div>
              </div>

              {/* Card 2 */}
              <div className="group bg-neutral-50 rounded-[2.5rem] border border-neutral-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 dark:bg-zinc-900 dark:border-zinc-800">
                <div className="relative aspect-[16/10] bg-neutral-100 overflow-hidden dark:bg-zinc-800 flex items-center justify-center">
                  <img
                    src="/asset/crownclub.png"
                    alt="Crowen Club"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 dark:opacity-90"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const el = document.getElementById('news-2-fallback');
                      if (el) {
                        el.classList.remove('hidden');
                      }
                    }}
                  />
                </div>
                <div className="p-8 text-left space-y-3">
                  <span className="text-[10px] font-black text-red-600 uppercase tracking-widest dark:text-red-500">Community</span>
                  <h3 className="text-lg font-bold text-neutral-800 leading-snug group-hover:text-red-600 transition-colors dark:text-zinc-200 dark:group-hover:text-red-500">
                    Crowen Club: Designed for Little Hands & Bio Image cleans.
                  </h3>
                </div>
              </div>

              {/* Card 3 */}
              <div className="group bg-neutral-50 rounded-[2.5rem] border border-neutral-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 dark:bg-zinc-900 dark:border-zinc-800">
                <div className="relative aspect-[16/10] bg-neutral-100 overflow-hidden dark:bg-zinc-800 flex items-center justify-center">
                  <img
                    src="/asset/meet.png"
                    alt="Understanding Chromosome 21"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 dark:opacity-90"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const el = document.getElementById('news-3-fallback');
                      if (el) {
                        el.classList.remove('hidden');
                      }
                    }}
                  />
                </div>
                <div className="p-8 text-left space-y-3">
                  <span className="text-[10px] font-black text-red-600 uppercase tracking-widest dark:text-red-500">Insights</span>
                  <h3 className="text-lg font-bold text-neutral-800 leading-snug group-hover:text-red-600 transition-colors dark:text-zinc-200 dark:group-hover:text-red-500">
                    Understanding Chromosome 21 and Down Syndrome
                  </h3>
                </div>
              </div>

            </div>
          </div>
        </section>
    </>
  );
}