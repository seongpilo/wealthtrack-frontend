'use client';
import StatCard from '../components/ui/StatCard';
import Card from '../components/ui/Card';
import PortfolioChart from '../components/PortfolioChart';
import AssetList from '../components/AssetList';
import GoalProgress from '../components/GoalProgress';
import QuickActions from '../components/QuickActions';
import NotificationCenter from '../components/NotificationCenter';

export default function DashboardPage() {
  const today = new Date();
  const dateStr = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pb-24 md:pb-8">
      {/* ────────── Header ────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: 'var(--wt-text)' }}>
            안녕하세요, 김민준님 👋
          </h1>
          <p className="mt-1 text-sm" style={{ color: 'var(--wt-text-tertiary)' }}>
            오늘의 포트폴리오 현황을 확인하세요
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border self-start" style={{ borderColor: 'var(--wt-border)', background: 'var(--wt-surface)', color: 'var(--wt-text-secondary)' }}>
          <span>📅</span>
          <span className="text-sm font-medium">{dateStr}</span>
        </div>
      </div>

      {/* ────────── Stat Cards ────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="총 자산" value="₩127,450,000" change="2.3% (₩2.87M)" changeType="up" icon="💎" delay={0} />
        <StatCard label="월 수익률" value="+5.8%" change="전월 대비 1.2%p" changeType="up" icon="📈" delay={0.1} />
        <StatCard label="투자 원금" value="₩100,000,000" change="누적 수익 ₩27.45M" changeType="up" icon="🏦" delay={0.2} />
        <StatCard label="오늘 변동" value="+₩1,240,000" change="0.9% (전일 대비)" changeType="up" icon="⚡" delay={0.3} />
      </div>

      {/* ────────── Chart + Assets ────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
        <div className="lg:col-span-3">
          <Card title="자산 추이" subtitle="최근 6개월 포트폴리오 가치 변화">
            <PortfolioChart />
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Card title="보유 자산" subtitle="자산 구성 현황">
            <AssetList />
          </Card>
        </div>
      </div>

      {/* ────────── Bottom Row ────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="재무 목표 달성률">
          <GoalProgress />
        </Card>
        <Card title="빠른 실행">
          <QuickActions />
        </Card>
        <Card title="이번 주 알림" noPadding>
          <div className="px-5">
            <NotificationCenter />
          </div>
        </Card>
      </div>

      {/* ────────── Footer ────────── */}
      <footer className="mt-12 pt-6 border-t text-center" style={{ borderColor: 'var(--wt-border)' }}>
        <p className="text-xs" style={{ color: 'var(--wt-text-tertiary)' }}>
          WealthTrack Pro © 2026 — 스마트한 자산 관리의 시작
        </p>
      </footer>
    </div>
  );
}
