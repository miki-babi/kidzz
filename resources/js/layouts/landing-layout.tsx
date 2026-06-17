import { ReactNode } from 'react';
import LandingHeader from '@/components/landing-header';
import Footer from '@/components/footer';

type Props = {
    children: ReactNode;
};

export default function LandingLayout({ children }: Props) {
    return (
        <div className="min-h-screen bg-[#FAFAFA] text-[#1b1b18] font-sans antialiased selection:bg-red-500 selection:text-white dark:bg-[#09090b] dark:text-[#f4f4f5]">
            <LandingHeader />
            {children}
            <Footer />
        </div>
    );
}
