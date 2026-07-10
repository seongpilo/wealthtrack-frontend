'use client';

interface Notification {
  type: 'success' | 'warning' | 'info';
  title: string;
  desc: string;
  time: string;
}

const NOTIFICATIONS: Notification[] = [
  { type: 'success', title: '삼성전자 배당금 입금', desc: '₩120,000이 입금되었습니다', time: '2일 전' },
  { type: 'warning', title: '목표 달성 임박', desc: '여행 자금 목표가 85% 달성되었습니다', time: '3일 전' },
  { type: 'info', title: '주식 포트폴리오 상승', desc: '이번 주 +7.4% 상승했습니다', time: '5일 전' }
];

const typeConfig = {
  success: { icon: '✓', color: 'var(--wt-success)' },
  warning: { icon: '!', color: 'var(--wt-warning)' },
  info:    { icon: '📈', color: 'var(--wt-secondary)' },
};

export default function NotificationCenter() {
  return (
    <div className="flex flex-col">
      {NOTIFICATIONS.map((notif, i) => {
        const cfg = typeConfig[notif.type];
        return (
          <div
            key={i}
            className="flex items-start gap-3 py-3 border-b last:border-0"
            style={{
              borderColor: 'var(--wt-border)',
              animation: `fade-in 0.3s ease ${i * 0.08}s both`,
            }}
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold flex-shrink-0 mt-0.5" style={{ backgroundColor: `${cfg.color}15`, color: cfg.color }}>
              {cfg.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium" style={{ color: 'var(--wt-text)' }}>{notif.title}</div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--wt-text-tertiary)' }}>{notif.desc}</div>
            </div>
            <span className="text-[11px] flex-shrink-0" style={{ color: 'var(--wt-text-tertiary)' }}>{notif.time}</span>
          </div>
        );
      })}
    </div>
  );
}
