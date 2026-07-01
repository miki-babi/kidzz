import type { ReactNode } from 'react';
import Footer from '@/components/footer';
import LandingHeader from '@/components/landing-header';

type Props = {
    children: ReactNode;
};

export default function LandingLayout({ children }: Props) {
    return (
        <div className="mx-auto min-h-screen bg-white font-sans text-[#3C3C3C] antialiased selection:bg-duo-green selection:text-white dark:bg-[#09090b] dark:text-[#f4f4f5]">
            <LandingHeader />
            {children}
            <Footer />
        </div>
    );
}
