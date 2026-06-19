import { Link } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';

export default function AuthCardLayout({
    children,
    title,
    description,
}: PropsWithChildren<{
    name?: string;
    title?: string;
    description?: string;
}>) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-[#F7F7F7] p-6 md:p-10 dark:bg-[#09090b]">
            <div className="flex w-full max-w-[460px] flex-col gap-6">
                {/* Mascot + Logo */}
                <Link
                    href={home()}
                    className="flex flex-col items-center gap-3 self-center font-medium"
                >
                    <div className="h-16 w-16 rounded-full bg-[#FFC800] flex items-center justify-center text-4xl shadow-md float-duo">
                        🦁
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center">
                            <AppLogoIcon className="size-8 fill-current text-[#58CC02] dark:text-white" />
                        </div>
                        <span className="text-lg font-extrabold text-[#3C3C3C] dark:text-white tracking-tight">
                            Lifeline Addis
                        </span>
                    </div>
                </Link>

                <div className="flex flex-col gap-6">
                    <div className="bg-white border-2 border-[#E5E5E5] rounded-[20px] dark:bg-zinc-900 dark:border-zinc-800">
                        {/* Header */}
                        <div className="px-8 pt-8 pb-2 text-center">
                            {title && (
                                <h2 className="text-xl font-extrabold text-[#3C3C3C] dark:text-white tracking-tight">
                                    {title}
                                </h2>
                            )}
                            {description && (
                                <p className="text-sm font-semibold text-[#777777] dark:text-zinc-400 mt-1">
                                    {description}
                                </p>
                            )}
                        </div>

                        {/* Content */}
                        <div className="px-8 py-6">
                            {children}
                        </div>

                        {/* Bottom divider + toggle links — rendered inside card by page */}
                    </div>

                    {/* Footer decoration */}
                    <p className="text-center text-xs font-bold text-[#777777] dark:text-zinc-500">
                        Learn through play. Grow with confidence. 🦁
                    </p>
                </div>
            </div>
        </div>
    );
}