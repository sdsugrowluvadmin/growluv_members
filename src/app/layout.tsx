// src/app/layout.tsx  (header snippet)
import './globals.css';
import Image from 'next/image';

export const metadata = {
  title: 'SDSU GrowLuv',
  description: 'Official site & members directory',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900">
        <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
          <div className="mx-auto max-w-5xl px-4 py-3 flex items-center gap-3">
            <a href="/" aria-label="SDSU GrowLuv" className="flex items-center gap-3">
              <Image
                src="/sdsu-growluv-logo.png"
                alt="SDSU GrowLuv"
                width={560}
                height={200}
                className="h-10 w-auto md:h-14 lg:h-16"
                priority
              />
            </a>
            <nav className="ml-auto flex items-center gap-4">
              <a href="/" className="text-sm text-slate-600 hover:text-slate-900">Home</a>
              <a href="/members" className="text-sm text-slate-600 hover:text-slate-900">Members</a>
              {/* add more links later (About, Events, Contact, etc.) */}
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>

        <footer className="mt-16 border-t">
          <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-slate-600">
            © {new Date().getFullYear()} SDSU GrowLuv - Built by Khoi Tran
          </div>
        </footer>
      </body>
    </html>
  );
}
