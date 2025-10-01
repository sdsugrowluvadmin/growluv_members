import './globals.css';
import Image from 'next/image';

export const metadata = {
  title: 'GrowLuv Members',
  description: 'Read-only member points and redID lookup',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <header className="border-b bg-white/70 backdrop-blur sticky top-0 z-50">
          <div className="mx-auto max-w-5xl px-4 py-3 flex items-center gap-3">
            <Image
              src="/sdsu-growluv-logo.png"
              alt="GrowLuv"
              width={560}        // intrinsic size (any same-aspect numbers are fine)
              height={200}
              className="h-12 w-auto md:h-16"  // ↑ taller than your current h-8; larger on desktop
              priority
            />
            <div className="ml-auto text-sm flex items-center gap-4">
              <a href="/" className="text-gluv-ink/80 hover:text-gluv-ink">Home</a>
            </div>
          </div>
        </header>
        <main>{children}</main>
        <footer className="mt-16 border-t bg-white/60">
          <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-gluv-ink/70">
            © {new Date().getFullYear()} GrowLuv · Built by Khoi Tran
          </div>
        </footer>
      </body>
    </html>
  );
}
