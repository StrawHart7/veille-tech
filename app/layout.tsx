import type { Metadata, Viewport } from 'next'
import { Geist } from 'next/font/google'
import Link from 'next/link'
import OfflineBanner from './components/OfflineBanner'
import ServiceWorkerRegister from './components/ServiceWorkerRegister'
import './globals.css'

const geist = Geist({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#030712",
};

export const metadata: Metadata = {
  title: "Veille Tech",
  description: "Dashboard de veille technologique",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Veille Tech",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </head>
      <body className={`${geist.className} bg-gray-950 min-h-screen`}>
        <nav className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-white/5">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-xs font-bold">
                VT
              </span>
              <span className="font-semibold text-white">Veille Tech</span>
            </Link>
            <Link
              href="/search"
              className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                />
              </svg>
              Rechercher
            </Link>
          </div>
        </nav>
        {children}
        <OfflineBanner />
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
