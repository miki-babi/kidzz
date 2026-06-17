import { Link, usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { dashboard, login } from '@/routes';
import { register } from '@/routes';
import LanguageSwitcher from './languageSwitcher';
import { useTranslation } from "react-i18next";


export default function LandingHeader() {
  const { auth } = usePage().props;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-100 bg-white/80 backdrop-blur-md dark:border-neutral-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/asset/Lifeline_Addis_Logo_English.png"
              alt="Lifeline Addis Logo"
              className="h-12 w-auto md:h-14 object-contain"
              onError={(e) => {
                e.currentTarget.src = "https://via.placeholder.com/180x50?text=Lifeline+Addis";
              }}
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-[15px] font-semibold text-neutral-600 dark:text-zinc-400">
          <Link href="/" className="text-red-600 dark:text-red-500 transition-colors">Home</Link>
          <a href="#services" className="hover:text-red-600 dark:hover:text-red-500 transition-colors">Services</a>
          <a href="#community" className="hover:text-red-600 dark:hover:text-red-500 transition-colors">Community</a>
          <a href="#about" className="hover:text-red-600 dark:hover:text-red-500 transition-colors">About</a>
          <a href="#help" className="hover:text-red-600 dark:hover:text-red-500 transition-colors">Help</a>
        </nav>
        <LanguageSwitcher />

        {/* Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3">
            {auth.user ? (
              <Link
                href={dashboard()}
                className="inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-red-500/10 hover:bg-red-700 transition-all hover:scale-102 active:scale-98"
              >

              {t('dashboard')}
              </Link>
            ) : (
              <>
                <Link
                  href={login()}
                  className="inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-red-500/10 hover:bg-red-700 transition-all hover:scale-102 active:scale-98"
                >
                  Login
                </Link>
                <Link
                  href={register()}
                  className="inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white px-6 py-2.5 text-sm font-semibold text-neutral-700 shadow-sm hover:bg-neutral-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-350 dark:hover:bg-zinc-800 transition-all"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-full p-2.5 text-neutral-600 hover:bg-neutral-100 md:hidden dark:text-zinc-400 dark:hover:bg-zinc-900 transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-100 bg-white px-6 py-6 dark:border-zinc-800 dark:bg-zinc-950">
          <nav className="flex flex-col gap-4 text-base font-semibold text-neutral-600 dark:text-zinc-400">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-red-600 dark:text-red-500">Home</Link>
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="hover:text-red-600 dark:hover:text-red-500">Services</a>
            <a href="#community" onClick={() => setMobileMenuOpen(false)} className="hover:text-red-600 dark:hover:text-red-500">Community</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-red-600 dark:hover:text-red-500">About</a>
            <a href="#help" onClick={() => setMobileMenuOpen(false)} className="hover:text-red-600 dark:hover:text-red-500">Help</a>
            <div className="mt-4 flex flex-col gap-3 border-t border-neutral-100 pt-4 dark:border-zinc-800">
              {auth.user ? (
                <Link
                  href={dashboard()}
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex w-full items-center justify-center rounded-full bg-red-600 py-3 text-center text-sm font-semibold text-white shadow-md hover:bg-red-700"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href={login()}
                    onClick={() => setMobileMenuOpen(false)}
                    className="inline-flex w-full items-center justify-center rounded-full bg-red-600 py-3 text-center text-sm font-semibold text-white shadow-md hover:bg-red-700"
                  >
                    Login
                  </Link>
                  <Link
                    href={register()}
                    onClick={() => setMobileMenuOpen(false)}
                    className="inline-flex w-full items-center justify-center rounded-full border border-neutral-200 bg-white py-3 text-center text-sm font-semibold text-neutral-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-350"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
