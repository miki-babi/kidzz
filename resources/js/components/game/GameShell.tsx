import { Link } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

interface GameShellProps {
  title: string;
  instruction?: string;
  onBack?: string;
  children: ReactNode;
}

/** Consistent layout used by every screen: minimal top bar + one focus area. */
export function GameShell({ title, instruction, onBack = "/dashboard", children }: GameShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[#E8EDF2] no-select">
      <header className="flex items-center gap-3 px-4 py-4">
        <Link
          href={onBack}
          aria-label="Go back"
          className="flex size-14 items-center justify-center rounded-2xl bg-[#E8EDF2] text-foreground shadow-[-6px_-6px_12px_rgba(255,255,255,0.9),6px_6px_12px_rgba(0,0,0,0.06)] transition-all duration-200 hover:shadow-[-8px_-8px_16px_rgba(255,255,255,0.9),8px_8px_16px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 active:shadow-[inset_-4px_-4px_8px_rgba(255,255,255,0.9),inset_4px_4px_8px_rgba(0,0,0,0.1)] active:translate-y-0.5 active:scale-[0.97]"
        >
          <ArrowLeft className="size-7" />
        </Link>
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
      </header>

      {instruction && (
        <p className="px-6 pb-2 text-center text-xl font-bold text-muted-foreground">
          {instruction}
        </p>
      )}

      <main className="flex flex-1 flex-col items-center justify-center px-4 pb-6">
        {children}
      </main>
    </div>
  );
}
