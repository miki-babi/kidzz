import { Head } from '@inertiajs/react';
import {
    Target,
    ClipboardCheck,
    BookOpen,
    Trophy,
    Crown,
    Flame,
    MessageCircle,
    Users,
    Brain,
    Lightbulb,
    Heart,
    Puzzle,
    User,
    Stethoscope,
    FileText,
    Volume2,
    Zap,
    CheckCircle2,
    Circle,
    ArrowUpRight,
} from 'lucide-react';
import AppDashboardLayout from '@/layouts/app/app-dashboard-layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Progress Report',
        href: '/parents',
    },
];

// Demo data mapped from onboarding.tsx fields (mock/demo only)
const demoProgress = {
    focusDuration: 42,
    focusMax: 60,
    taskAccuracy: 94.8,
    skillsMastered: 12,
    skillsTotal: 20,
    weeklyImprovement: 12,
    weekData: [
        { day: 'Mon', minutes: 35, accuracy: 88 },
        { day: 'Tue', minutes: 40, accuracy: 90 },
        { day: 'Wed', minutes: 38, accuracy: 92 },
        { day: 'Thu', minutes: 45, accuracy: 93 },
        { day: 'Fri', minutes: 42, accuracy: 94.8 },
        { day: 'Sat', minutes: 0, accuracy: 0 },
        { day: 'Sun', minutes: 0, accuracy: 0 },
    ],
    basicInformation: 100,
    professionalEvaluation: 100,
    diagnoses: 80,
    communication: 72,
    speakingSkills: 78,
    understandingLanguage: 85,
    learningConcepts: 60,
    thinkingSkills: 70,
    socialPlaySkills: 65,
    interestsEngagement: 90,
};

// ─── DUOLINGO-STYLE COMPONENTS ───

function getSkillLevel(value: number): { level: number; tier: string; color: string } {
    if (value >= 100) return { level: 5, tier: 'GOLD', color: '#FFD700' };
    if (value >= 80) return { level: 4, tier: 'GOLD', color: '#FFD700' };
    if (value >= 60) return { level: 3, tier: 'SILVER', color: '#A78BFA' };
    if (value >= 40) return { level: 2, tier: 'BRONZE', color: '#E5A365' };
    return { level: 1, tier: 'BRONZE', color: '#E5A365' };
}

function getTierBorder(tier: string): string {
    if (tier === 'GOLD') return 'border-[#FFD700] shadow-[0_3px_0_#D4A800]';
    if (tier === 'SILVER') return 'border-[#A78BFA] shadow-[0_3px_0_#8B6AE0]';
    return 'border-[#E5A365] shadow-[0_3px_0_#C48A4A]';
}

// Chunky 3D metric badge
function MetricBadge({
    icon: Icon,
    value,
    label,
    bgColor,
    iconColor,
    suffix,
}: {
    icon: any;
    value: number | string;
    label: string;
    bgColor: string;
    iconColor: string;
    suffix?: string;
}) {
    return (
        <div className="flex flex-col items-center gap-3 rounded-2xl border-2 border-[#E5E5E5] bg-white p-5 shadow-[0_4px_0_#C4C4C4] transition-all active:translate-y-0.5">
            <div
                className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-[#E5E5E5] shadow-[0_3px_0_#C4C4C4]"
                style={{ backgroundColor: bgColor }}
            >
                <Icon className="h-8 w-8" style={{ color: iconColor }} strokeWidth={2.5} />
            </div>
            <div className="text-center">
                <span className="block text-3xl font-black text-[#3C3C3C]">
                    {value}{suffix || ''}
                </span>
                <span className="block text-[11px] font-black uppercase tracking-widest text-[#777777]">
                    {label}
                </span>
            </div>
        </div>
    );
}

// Level-based skill card with tier icon frame
function LevelSkillCard({
    title,
    value,
    color,
    icon: Icon,
}: {
    title: string;
    value: number;
    color: string;
    icon: any;
}) {
    const { level, tier, color: tierColor } = getSkillLevel(value);
    const isGold = tier === 'GOLD';

    return (
        <div className="rounded-2xl border-2 border-[#E5E5E5] bg-white p-5 shadow-[0_4px_0_#C4C4C4]">
            <div className="flex items-center gap-3 mb-4">
                <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl border-2 ${getTierBorder(tier)}`}
                    style={{ backgroundColor: isGold ? '#FFF3C7' : '#F7F7F8' }}
                >
                    <Icon className="h-6 w-6" style={{ color: tierColor }} />
                </div>
                <div className="flex-1">
                    <h3 className="text-sm font-black text-[#3C3C3C]">{title}</h3>
                    <span
                        className="inline-block mt-0.5 rounded-md px-2 py-0.5 text-[10px] font-black uppercase tracking-wider"
                        style={{ backgroundColor: tierColor + '22', color: tierColor }}
                    >
                        {tier}
                    </span>
                </div>
                <div className="flex items-center justify-center rounded-xl bg-[#F7F7F8] border-2 border-[#E5E5E5] px-3 py-1.5 shadow-[0_2px_0_#C4C4C4]">
                    <span className="text-lg font-black text-[#3C3C3C]">Lv{level}</span>
                </div>
            </div>

            {/* Thick 3D progress track */}
            <div className="h-5 w-full rounded-full bg-[#E5E5E5] overflow-hidden border-2 border-[#E5E5E5]">
                <div
                    className={`h-full rounded-full transition-all duration-500 ${color}`}
                    style={{
                        width: `${value}%`,
                        boxShadow: 'inset 0 -2px 0 rgba(0,0,0,0.15), inset 0 2px 0 rgba(255,255,255,0.4)',
                    }}
                />
            </div>
            <div className="flex items-center justify-between mt-2">
                <span className="text-xs font-bold text-[#777777]">Progress to next level</span>
                <span className="text-xs font-black text-[#3C3C3C]">{value}%</span>
            </div>
        </div>
    );
}

// Streak matrix - daily checkboxes
function StreakMatrix({ data }: { data: { day: string; minutes: number }[] }) {
    const dayLabels = ['M', 'T', 'W', 'Th', 'F', 'S', 'Su'];
    return (
        <div className="flex items-center justify-between gap-2 py-2">
            {data.map((d, i) => {
                const completed = d.minutes > 0;
                return (
                    <div key={d.day} className="flex flex-col items-center gap-1.5">
                        <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                                completed
                                    ? 'border-[#FF4B4B] bg-[#FF4B4B] shadow-[0_3px_0_#B30000]'
                                    : 'border-[#E5E5E5] bg-white shadow-[0_2px_0_#C4C4C4]'
                            }`}
                        >
                            {completed ? (
                                <Flame className="h-5 w-5 text-white" fill="white" />
                            ) : (
                                <Circle className="h-5 w-5 text-[#C4C4C4]" />
                            )}
                        </div>
                        <span className="text-[11px] font-black text-[#777777]">{dayLabels[i]}</span>
                    </div>
                );
            })}
        </div>
    );
}

// Weekly chart with 3D bars and milestone line
function WeeklyChart({ data }: { data: { day: string; minutes: number; accuracy: number }[] }) {
    const dailyGoal = 40;
    const maxMinutes = Math.max(...data.map((d) => d.minutes), dailyGoal);
    const goalPercent = (dailyGoal / maxMinutes) * 100;

    return (
        <div className="mt-4">
            {/* Streak matrix */}
            <StreakMatrix data={data} />

            {/* Bar chart with 3D bars */}
            <div className="mt-4 relative">
                {/* Milestone goal line */}
                <div
                    className="absolute left-0 right-0 border-t-2 border-dashed border-[#FF4B4B] z-10"
                    style={{ bottom: `${goalPercent}%` }}
                >
                    <span className="absolute -top-3 right-0 text-[10px] font-black uppercase tracking-wider text-[#FF4B4B]">
                        Daily Goal
                    </span>
                </div>

                <div className="flex items-end justify-between gap-2 h-32">
                    {data.map((day) => {
                        const heightPercent = day.minutes > 0 ? (day.minutes / maxMinutes) * 100 : 0;
                        const hitGoal = day.minutes >= dailyGoal;
                        return (
                            <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                                <div className="w-full flex flex-col items-center justify-end h-24 relative">
                                    {day.minutes > 0 ? (
                                        <div className="relative w-full max-w-[36px]">
                                            {/* Base weight shadow */}
                                            <div
                                                className="absolute bottom-0 left-0.5 right-0.5 h-2 rounded-b-lg bg-neutral-400"
                                                style={{ height: '6px' }}
                                            />
                                            {/* Main bar */}
                                            <div
                                                className={`w-full rounded-t-lg border-2 border-[#E5E5E5] relative overflow-hidden transition-all duration-300 ${
                                                    hitGoal ? 'bg-[#FF9600]' : 'bg-[#58CC02]'
                                                }`}
                                                style={{
                                                    height: `${heightPercent}%`,
                                                    boxShadow: '0 3px 0 #C4C4C4',
                                                }}
                                            >
                                                {/* Shiny highlight */}
                                                {hitGoal && (
                                                    <div className="absolute top-1 left-1 right-1 h-1 rounded-full bg-white/40" />
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="w-full max-w-[36px] rounded-t-lg bg-neutral-100 h-full border-2 border-[#E5E5E5]" />
                                    )}
                                </div>
                                <span className="text-[11px] font-black text-[#777777]">{day.day}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Improvement badge */}
            <div className="mt-4 flex items-center justify-between">
                <div className="inline-flex items-center gap-2 rounded-full border-2 border-[#E5E5E5] bg-[#FFF3C7] px-4 py-1.5 shadow-[0_2px_0_#C4C4C4]">
                    <Zap className="h-4 w-4 text-[#FF9600]" fill="#FF9600" />
                    <span className="text-xs font-black text-[#3C3C3C]">On Fire! +12% 🎉</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-[#777777]">
                    <ArrowUpRight className="h-4 w-4 text-[#58CC02]" />
                    <span>vs last week</span>
                </div>
            </div>
        </div>
    );
}

export default function ParentsIndex() {
    const p = demoProgress;

    const skillTopics = [
        { title: 'Basic Information', value: p.basicInformation, color: 'bg-emerald-500', icon: User },
        { title: 'Professional Evaluation', value: p.professionalEvaluation, color: 'bg-sky-500', icon: Stethoscope },
        { title: 'Diagnoses', value: p.diagnoses, color: 'bg-rose-400', icon: FileText },
        { title: 'Communication', value: p.communication, color: 'bg-orange-400', icon: Volume2 },
        { title: 'Speaking Skills', value: p.speakingSkills, color: 'bg-yellow-500', icon: MessageCircle },
        { title: 'Understanding Language', value: p.understandingLanguage, color: 'bg-teal-400', icon: Heart },
        { title: 'Learning Concepts', value: p.learningConcepts, color: 'bg-indigo-400', icon: Puzzle },
        { title: 'Thinking Skills', value: p.thinkingSkills, color: 'bg-amber-500', icon: Brain },
        { title: 'Social Play Skills', value: p.socialPlaySkills, color: 'bg-pink-400', icon: Users },
        { title: 'Interests Engagement', value: p.interestsEngagement, color: 'bg-cyan-400', icon: Lightbulb },
    ];

    return (
        <AppDashboardLayout breadcrumbs={breadcrumbs}>
            <Head title="Progress Report" />
            <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 pb-8 pt-2">
                {/* Page Header */}
                <div className="border-b-2 border-[#E5E5E5] pb-4">
                    <h1 className="text-4xl font-black text-[#3C3C3C] tracking-tight">
                        Child Progress
                    </h1>
                    <p className="mt-1 text-sm font-bold text-[#777777]">
                        Overview based on onboarding assessment
                    </p>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 space-y-6">
                    {/* ─── 1. TOP HIGHLIGHTS ROW (Metric Badges) ─── */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <MetricBadge
                            icon={Target}
                            value={p.focusDuration}
                            suffix=" min"
                            label="Focus Duration"
                            bgColor="#FFF3C7"
                            iconColor="#FF9600"
                        />
                        <MetricBadge
                            icon={ClipboardCheck}
                            value={p.taskAccuracy}
                            suffix="%"
                            label="Task Accuracy"
                            bgColor="#E8F4FD"
                            iconColor="#1CB0F6"
                        />
                        <MetricBadge
                            icon={BookOpen}
                            value={`${p.skillsMastered}/${p.skillsTotal}`}
                            label="Skills Mastered"
                            bgColor="#F3E8FF"
                            iconColor="#A78BFA"
                        />
                    </div>

                    {/* ─── 2. CATEGORY SKILL BREAKDOWN (Level-Up Grid) ─── */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Trophy className="h-5 w-5 text-[#FFD700]" fill="#FFD700" />
                            <h2 className="text-xl font-black text-[#3C3C3C]">Skill Levels</h2>
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {skillTopics.map((topic) => (
                                <LevelSkillCard
                                    key={topic.title}
                                    title={topic.title}
                                    value={topic.value}
                                    color={topic.color}
                                    icon={topic.icon}
                                />
                            ))}
                        </div>
                    </div>

                    {/* ─── 3. WEEKLY ACTIVITY CHART ─── */}
                    <div className="rounded-2xl border-2 border-[#E5E5E5] bg-white p-6 shadow-[0_4px_0_#C4C4C4]">
                        <div className="flex items-center gap-2 mb-1">
                            <CheckCircle2 className="h-5 w-5 text-[#58CC02]" />
                            <h2 className="text-xl font-black text-[#3C3C3C]">This Week</h2>
                        </div>
                        <p className="text-xs font-bold text-[#777777] mb-2">
                            Daily focus time and performance
                        </p>
                        <WeeklyChart data={p.weekData} />
                    </div>
                </div>
            </div>
        </AppDashboardLayout>
    );
}