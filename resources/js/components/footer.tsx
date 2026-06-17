import { Link } from "@inertiajs/react";

export default function Footer() {
    return (
        <footer id="help" className="bg-neutral-50 border-t border-neutral-100 pt-16 pb-12 dark:bg-zinc-950 dark:border-zinc-900">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 text-left">
                <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-neutral-200/60 dark:border-zinc-900/60">

                    {/* Col 1: Logo and details */}
                    <div className="col-span-2 md:col-span-4 space-y-4">
                        <Link href="/">
                            <img
                                src="/asset/Lifeline_Addis_Logo_English.png"
                                alt="Lifeline Addis"
                                className="h-10 w-auto object-contain"
                                onError={(e) => {
                                    e.currentTarget.src = "https://via.placeholder.com/150x40?text=Lifeline+Addis";
                                }}
                            />
                        </Link>
                        <p className="text-xs text-neutral-400 leading-relaxed font-semibold">
                            Enabling special education at home. Tailoring resources for children's cognitive and behavioral growth.
                        </p>
                    </div>

                    {/* Col 2: Home */}
                    <div className="col-span-1 md:col-span-2 space-y-3">
                        <h4 className="text-xs font-black tracking-widest text-neutral-800 uppercase dark:text-zinc-200">Home</h4>
                        <ul className="space-y-2 text-xs font-semibold text-neutral-400">
                            <li><Link href="/" className="hover:text-red-600 dark:hover:text-red-500">Home</Link></li>
                            <li><a href="#community" className="hover:text-red-600 dark:hover:text-red-500">Latest News</a></li>
                            <li><a href="#about" className="hover:text-red-600 dark:hover:text-red-500">About Us</a></li>
                            <li><a href="#services" className="hover:text-red-600 dark:hover:text-red-500">Search Website</a></li>
                        </ul>
                    </div>

                    {/* Col 3: Services */}
                    <div className="col-span-1 md:col-span-2 space-y-3">
                        <h4 className="text-xs font-black tracking-widest text-neutral-800 uppercase dark:text-zinc-200">Services</h4>
                        <ul className="space-y-2 text-xs font-semibold text-neutral-400">
                            <li><a href="#services" className="hover:text-red-600 dark:hover:text-red-500">Services</a></li>
                            <li><a href="#services" className="hover:text-red-600 dark:hover:text-red-500">Events</a></li>
                            <li><a href="#services" className="hover:text-red-600 dark:hover:text-red-500">Customer Area</a></li>
                            <li><a href="#help" className="hover:text-red-600 dark:hover:text-red-500">Contact</a></li>
                        </ul>
                    </div>

                    {/* Col 4: About */}
                    <div className="col-span-1 md:col-span-2 space-y-3">
                        <h4 className="text-xs font-black tracking-widest text-neutral-800 uppercase dark:text-zinc-200">About</h4>
                        <ul className="space-y-2 text-xs font-semibold text-neutral-400">
                            <li><a href="#about" className="hover:text-red-600 dark:hover:text-red-500">About</a></li>
                            <li><a href="#community" className="hover:text-red-600 dark:hover:text-red-500">Community</a></li>
                            <li><a href="#help" className="hover:text-red-600 dark:hover:text-red-500">Help</a></li>
                        </ul>
                    </div>

                    {/* Col 5: App Badges */}
                    <div className="col-span-1 md:col-span-2 space-y-4">
                        <div>
                            <h4 className="text-xs font-black tracking-wide text-neutral-800 dark:text-zinc-200">Lifeline Addis</h4>
                            <p className="text-[10px] text-neutral-400 font-medium mt-1">Available on mobile</p>
                        </div>

                        {/* App Download Badges (CSS vector mockups) */}
                        <div className="space-y-2 max-w-[130px]">
                            {/* App Store Badge */}
                            <a
                                href="#download-ios"
                                className="flex items-center gap-2 bg-[#09090b] text-white px-3 py-1.5 rounded-lg hover:bg-zinc-800 transition-colors border border-zinc-800 select-none text-left"
                            >
                                <span className="text-lg"></span>
                                <div className="leading-none">
                                    <div className="text-[7px] text-zinc-400 uppercase tracking-tight">Download on the</div>
                                    <div className="text-[9px] font-black tracking-tighter">App Store</div>
                                </div>
                            </a>

                            {/* Play Store Badge */}
                            <a
                                href="#download-android"
                                className="flex items-center gap-2 bg-[#09090b] text-white px-3 py-1.5 rounded-lg hover:bg-zinc-800 transition-colors border border-zinc-800 select-none text-left"
                            >
                                <span className="text-base text-green-500">▶</span>
                                <div className="leading-none">
                                    <div className="text-[7px] text-zinc-400 uppercase tracking-tight">GET IT ON</div>
                                    <div className="text-[9px] font-black tracking-tighter">Google Play</div>
                                </div>
                            </a>
                        </div>
                    </div>

                </div>

                {/* Bottom Row */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-[11px] font-semibold text-neutral-400">
                    <span>© Lifeline Addis Licence. All rights reserved.</span>
                    <div className="flex gap-4">
                        <a href="#privacy" className="hover:text-red-600">Privacy Policy</a>
                        <a href="#terms" className="hover:text-red-600">Terms of Service</a>
                        <span>lifeline.com</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}