import { Link } from "@inertiajs/react";
import { ChevronRight } from "lucide-react";

export default function HeroSection() {
    return (
        <section className="px-6 py-2 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="relative overflow-hidden bg-[#D2232A] dark:bg-[#B01E24] rounded-[2.5rem] p-8 md:p-8 lg:p-8 flex flex-col lg:flex-row items-center gap-12 text-white shadow-2xl shadow-red-500/10">

                    {/* Background Shapes */}
                    <div className="absolute -left-12 -top-12 h-64 w-64 rounded-full bg-white/5 blur-3xl"></div>
                    <div className="absolute -right-12 -bottom-12 h-80 w-80 rounded-full bg-black/10 blur-2xl"></div>

                    {/* Left Content */}
                    <div className="flex-1 space-y-6 md:space-y-8 z-10 text-left">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] dark:text-white">
                            Enroll in special 
                            education at home.
                        </h1>
                        <p className="text-white/90 text-lg sm:text-xl max-w-xl leading-relaxed font-medium">
                            A comprehensive digital learning platform tailored to unique cognitive and developmental needs.
                        </p>
                        <div className="pt-2">
                            <Link
                                href="/games"
                                className="inline-flex items-center gap-2 bg-[#FACC15] hover:bg-[#E2B007] text-neutral-900 font-extrabold px-8 py-4 rounded-full text-base transition-all shadow-lg shadow-yellow-500/10 hover:scale-105 active:scale-95 dark:bg-yellow-400 dark:hover:bg-yellow-500 dark:text-neutral-900"
                            >
                                Explore Games <ChevronRight className="h-5 w-5 stroke-[3]" />
                            </Link>
                        </div>
                    </div>

                    {/* Right Content - Mockup Card with Image Fallback */}
                    <div className="w-full lg:w-1/2 max-w-lg z-10">
                        <div className="transition-transform duration-500 hover:scale-101">
                            <div className="relative flex items-center justify-center dark:bg-zinc-800/50 dark:rounded-2xl">
                                <img
                                    src="/asset/hero4.png"
                                    alt="Smiling child learning at home"
                                    className="w-full h-full object-cover select-none dark:opacity-90"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                        const el = document.getElementById('hero-img-fallback');

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
    )
}