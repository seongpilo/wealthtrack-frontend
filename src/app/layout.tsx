import './globals.css';
import type { Metadata } from 'next';
import NavBar from '../components/NavBar';

export const metadata: Metadata = {
  title: {
    default: 'WealthTrack Pro',
    template: '%s | WealthTrack Pro',
  },
  description: '스마트한 개인 자산 관리 플랫폼',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-[var(--wt-bg)] pb-16 md:pb-0">
        <NavBar />
        <main className="flex-1 w-full animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <div id="portal-root" />
      </body>
    </html>
  );
}
