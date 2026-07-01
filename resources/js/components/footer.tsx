import { Link } from '@inertiajs/react';

export default function Footer() {
    return (
        <footer
            id="help"
            className="border-t border-neutral-100 bg-neutral-50 pt-16 pb-12 dark:border-zinc-900 dark:bg-zinc-950"
        >
            <div className="mx-auto max-w-7xl px-6 text-left lg:px-8">
                <div className="grid grid-cols-2 gap-8 border-b border-neutral-200/60 pb-12 md:grid-cols-12 md:gap-12 dark:border-zinc-900/60">
                    {/* Col 1: Logo and details */}
                    <div className="col-span-2 space-y-4 md:col-span-4">
                        <Link href="/">
                            <img
                                src="/asset/Lifeline_Addis_Logo_English.png"
                                alt="Lifeline Addis"
                                className="h-10 w-auto object-contain"
                                onError={(e) => {
                                    e.currentTarget.src =
                                        'https://via.placeholder.com/150x40?text=Lifeline+Addis';
                                }}
                            />
                        </Link>
                        <p className="text-xs leading-relaxed font-semibold text-neutral-400">
                            Enabling special education at home. Tailoring
                            resources for children's cognitive and behavioral
                            growth.
                        </p>
                    </div>

                    {/* Col 2: Home */}
                    <div className="col-span-1 space-y-3 md:col-span-2">
                        <h4 className="text-xs font-black tracking-widest text-neutral-800 uppercase dark:text-zinc-200">
                            Home
                        </h4>
                        <ul className="space-y-2 text-xs font-semibold text-neutral-400">
                            <li>
                                <Link
                                    href="/"
                                    className="hover:text-red-600 dark:hover:text-red-500"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="#community"
                                    className="hover:text-red-600 dark:hover:text-red-500"
                                >
                                    Latest News
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#about"
                                    className="hover:text-red-600 dark:hover:text-red-500"
                                >
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#services"
                                    className="hover:text-red-600 dark:hover:text-red-500"
                                >
                                    Search Website
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Col 3: Services */}
                    <div className="col-span-1 space-y-3 md:col-span-2">
                        <h4 className="text-xs font-black tracking-widest text-neutral-800 uppercase dark:text-zinc-200">
                            Services
                        </h4>
                        <ul className="space-y-2 text-xs font-semibold text-neutral-400">
                            <li>
                                <a
                                    href="#services"
                                    className="hover:text-red-600 dark:hover:text-red-500"
                                >
                                    Services
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#services"
                                    className="hover:text-red-600 dark:hover:text-red-500"
                                >
                                    Events
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#services"
                                    className="hover:text-red-600 dark:hover:text-red-500"
                                >
                                    Customer Area
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#help"
                                    className="hover:text-red-600 dark:hover:text-red-500"
                                >
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Col 4: About */}
                    <div className="col-span-1 space-y-3 md:col-span-2">
                        <h4 className="text-xs font-black tracking-widest text-neutral-800 uppercase dark:text-zinc-200">
                            About
                        </h4>
                        <ul className="space-y-2 text-xs font-semibold text-neutral-400">
                            <li>
                                <a
                                    href="#about"
                                    className="hover:text-red-600 dark:hover:text-red-500"
                                >
                                    About
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#community"
                                    className="hover:text-red-600 dark:hover:text-red-500"
                                >
                                    Community
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#help"
                                    className="hover:text-red-600 dark:hover:text-red-500"
                                >
                                    Help
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Col 5: App Badges */}
                    <div className="col-span-1 space-y-4 md:col-span-2">
                        <div>
                            <h4 className="text-xs font-black tracking-wide text-neutral-800 dark:text-zinc-200">
                                Lifeline Addis
                            </h4>
                            <p className="mt-1 text-[10px] font-medium text-neutral-400">
                                Available on mobile
                            </p>
                        </div>

                        {/* App Download Badges (CSS vector mockups) */}
                        <div className="max-w-[130px] space-y-2">
                            {/* App Store Badge */}
                            <a
                                href="#download-ios"
                                className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-[#09090b] px-3 py-1.5 text-left text-white transition-colors select-none hover:bg-zinc-800"
                            >
                                <span className="text-lg"></span>
                                <div className="leading-none">
                                    <div className="text-[7px] tracking-tight text-zinc-400 uppercase">
                                        Download on the
                                    </div>
                                    <div className="text-[9px] font-black tracking-tighter">
                                        App Store
                                    </div>
                                </div>
                            </a>

                            {/* Play Store Badge */}
                            <a
                                href="#download-android"
                                className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-[#09090b] px-3 py-1.5 text-left text-white transition-colors select-none hover:bg-zinc-800"
                            >
                                <span className="text-base text-green-500">
                                    ▶
                                </span>
                                <div className="leading-none">
                                    <div className="text-[7px] tracking-tight text-zinc-400 uppercase">
                                        GET IT ON
                                    </div>
                                    <div className="text-[9px] font-black tracking-tighter">
                                        Google Play
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Row */}
                <div className="flex flex-col items-center justify-between gap-4 pt-8 text-[11px] font-semibold text-neutral-400 sm:flex-row">
                    <span>© Lifeline Addis Licence. All rights reserved.</span>
                    <div className="flex gap-4">
                        <a href="#privacy" className="hover:text-red-600">
                            Privacy Policy
                        </a>
                        <a href="#terms" className="hover:text-red-600">
                            Terms of Service
                        </a>
                        <span>lifeline.com</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
