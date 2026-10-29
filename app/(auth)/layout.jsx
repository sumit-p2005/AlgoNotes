import { AlgoLogo } from '@/components/ui/AlgoLogo';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-page text-foreground p-4 sm:p-8">
      {/* Auth Header */}
      <header className="flex items-center justify-between max-w-5xl mx-auto w-full">
        <AlgoLogo size={36} href="/" />
        <ThemeToggle />
      </header>

      {/* Main Form Center */}
      <main className="flex items-center justify-center py-10">
        <div className="w-full max-w-md">{children}</div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-muted py-4">
        © {new Date().getFullYear()} AlgoNotes. The developer notebook built for interview recall.
      </footer>
    </div>
  );
}

