import { createInertiaApp } from '@inertiajs/react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';
import AppDashboardLayout from '@/layouts/app/app-dashboard-layout';
import AuthLayout from '@/layouts/auth-layout';
import LandingLayout from '@/layouts/landing-layout';
import "./i18n";
const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: (name) => {
        switch (true) {
            case name === 'landing':
            case name === 'welcome':
                return LandingLayout;
            case name === 'dashboard':
                return AppDashboardLayout;
            case name === 'games/results':
                return AppDashboardLayout;
            // case name.startsWith('games/'):
            //     return LandingLayout;
            case name.startsWith('auth/'):
                return AuthLayout;
            case name.startsWith('settings/'):
                return AppDashboardLayout;
            default:
                return null;
        }
    },
    strictMode: true,
    withApp(app) {
        return (
            <TooltipProvider delayDuration={0}>
                {app}
                <Toaster />
            </TooltipProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
