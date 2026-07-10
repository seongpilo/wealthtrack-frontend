'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const NAV_ITEMS = [
  { href: '/', label: '대시보드', icon: '📊' },
  { href: '/journal', label: '매매일지', icon: '📝' },
  { href: '/sync', label: '자산 연동', icon: '⚙️' },
];

export default function NavBar() {
  const pathname = usePathname();
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--wt-border)] bg-[var(--wt-surface)]/80 backdrop-blur-lg">
      <nav className="flex h-16 max-w-7xl mx-auto items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg text-white font-extrabold text-lg" style={{ background: 'linear-gradient(135deg, var(--wt-primary), var(--wt-secondary))' }}>
              W
            </div>
            <span className="text-xl font-extrabold tracking-tight text-[var(--wt-text)]">
              WealthTrack <span style={{ color: 'var(--wt-primary)' }}>Pro</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive ? 'font-semibold' : 'text-[var(--wt-text-secondary)] hover:text-[var(--wt-text)] hover:bg-[var(--wt-surface-hover)]'
                  }`}
                  style={isActive ? { color: 'var(--wt-primary)', backgroundColor: 'rgba(79,70,229,0.08)' } : {}}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button onClick={() => setNotifOpen(!notifOpen)} className="flex h-9 w-9 items-center justify-center rounded-lg border transition-colors hover:border-[var(--wt-border-strong)]" style={{ borderColor: 'var(--wt-border)', color: 'var(--wt-text-secondary)' }}>
              🔔
            </button>
            <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full border-2" style={{ background: 'var(--wt-error)', borderColor: 'var(--wt-surface)' }} />
          </div>
          <button className="flex h-9 w-9 items-center justify-center rounded-full text-white text-sm font-bold transition-transform hover:scale-110" style={{ background: 'linear-gradient(135deg, var(--wt-secondary), var(--wt-primary))' }}>
            김
          </button>
        </div>
      </nav>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-[var(--wt-surface)]/90 backdrop-blur-lg" style={{ borderColor: 'var(--wt-border)' }}>
        <div className="flex items-center justify-around py-2">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className="flex flex-col items-center gap-1 px-3 py-1.5 transition-colors" style={{ color: isActive ? 'var(--wt-primary)' : 'var(--wt-text-tertiary)' }}>
                <span className="text-lg">{item.icon}</span>
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
