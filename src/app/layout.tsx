// src/app/layout.tsx
import './globals.css';
import Image from 'next/image';

export const metadata = {
  title: 'GrowLuv Members',
  description: 'Read-only member directory',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900">
        {/* Header (global) */}
        <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
          <div className="mx-auto max-w-5xl px-4 py-3 flex items-center gap-3">
            {/* LOGO — scale here */}
            <a href="/" aria-label="GrowLuv home" className="flex items-center gap-3">
              <Image
                src="/sdsu-growluv-logo.png"
                alt="GrowLuv"
                width={560}          // intrinsic ratio; can be any same-aspect pair
                height={200}
                className="h-10 w-auto md:h-14 lg:h-16"  // ← adjust sizes here
                priority
              />
              {/* Optional text lockup */}
              <span className="hidden sm:inline text-base md:text-lg font-semibold tracking-tight">
                Members Directory
              </span>
            </a>

            {/* Right-side space for nav/actions */}
            <nav className="ml-auto flex items-center gap-4">
              <a href="/" className="text-sm text-slate-600 hover:text-slate-900">Home</a>
              {/* add more links later */}
            </nav>
          </div>
        </header>

        {/* Page content */}
        <main className="mx-auto max-w-5xl px-4 py-6">
          {children}
        </main>

        {/* Footer (global) */}
        <footer className="mt-16 border-t">
          <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-slate-600">
            © {new Date().getFullYear()} GrowLuv · built by Khoi Tran
          </div>
        </footer>
      </body>
    </html>
  );
}
