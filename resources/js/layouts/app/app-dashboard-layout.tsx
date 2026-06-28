import { Link, usePage } from '@inertiajs/react';
import { BarChart3, Menu, Settings, Users } from 'lucide-react';
import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { UserInfo } from '@/components/user-info';
import { UserMenuContent } from '@/components/user-menu-content';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { dashboard } from '@/routes';

import type { AppLayoutProps } from '@/types';

export default function AppDashboardLayout({
    children,
    breadcrumbs = [],
}: AppLayoutProps) {
    const { auth } = usePage().props;
    const cleanup = useMobileNavigation();

    if (!auth.user) {
        return null;
    }

    return (
        <AppShell variant="header">
            {/* Header */}
            <header className="flex h-16 shrink-0 items-center gap-2 border-b border-sidebar-border/50 px-6 md:px-4">
                {/* Hamburger menu — opens sheet with user menu */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="-ml-1 shrink-0"
                        >
                            <Menu className="size-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        side="left"
                        className="flex w-72 flex-col gap-0 p-0"
                    >
                        <div className="flex flex-col gap-1 p-4 pt-6">
                            <UserInfo user={auth.user} showEmail />
                        </div>

                        <Separator />

                        <div className="flex-1 space-y-1.5 px-3 py-4">
                            <Link
                                href={dashboard()}
                                prefetch
                                onClick={cleanup}
                                className="flex items-center gap-3 rounded-xl border-2 border-transparent px-4 py-3 text-sm font-black tracking-wider text-[#777777] uppercase shadow-none transition-all hover:border-[#E5E5E5] hover:bg-white hover:shadow-[0_2px_0_#C4C4C4] active:translate-y-0.5"
                            >
                                <Settings className="size-4 text-[#FF9600]" />
                                Dashboard
                            </Link>
                            <Link
                                href="/parents"
                                prefetch
                                onClick={cleanup}
                                className="flex items-center gap-3 rounded-xl border-2 border-transparent px-4 py-3 text-sm font-black tracking-wider text-[#777777] uppercase shadow-none transition-all hover:border-[#E5E5E5] hover:bg-white hover:shadow-[0_2px_0_#C4C4C4] active:translate-y-0.5"
                            >
                                <Users className="size-4 text-[#1CB0F6]" />
                                Parents
                            </Link>
                            <Link
                                href="/games/results"
                                onClick={cleanup}
                                className="flex items-center gap-3 rounded-xl border-2 border-transparent px-4 py-3 text-sm font-black tracking-wider text-[#777777] uppercase shadow-none transition-all hover:border-[#E5E5E5] hover:bg-white hover:shadow-[0_2px_0_#C4C4C4] active:translate-y-0.5"
                            >
                                <BarChart3 className="size-4 text-[#58CC02]" />
                                Game Results
                            </Link>
                        </div>

                        <Separator />

                        <div className="px-3 py-4" />
                    </SheetContent>
                </Sheet>

                {/* Breadcrumbs */}
                <Breadcrumbs breadcrumbs={breadcrumbs} />

                {/* User dropdown — right side */}
                <div className="ml-auto">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="flex items-center gap-2 rounded-full p-1 pr-2"
                            >
                                <UserInfo user={auth.user} />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                            align="end"
                        >
                            <UserMenuContent user={auth.user} />
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>

            {/* Main content */}
            <AppContent variant="header">{children}</AppContent>
        </AppShell>
    );
}
