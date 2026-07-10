'use client';

const ACTIONS = [
  { label: '자산 추가하기', desc: '새로운 자산을 등록하세요', icon: '➕', color: 'var(--wt-primary)' },
  { label: '월간 리포트 보기', desc: '이번 달 투자 요약', icon: '📊', color: 'var(--wt-success)' },
  { label: '새 목표 설정', desc: '재무 목표를 관리하세요', icon: '🎯', color: 'var(--wt-warning)' }
];

export default function QuickActions() {
  return (
    <div className="flex flex-col gap-2">
      {ACTIONS.map((action, i) => (
        <button
          key={action.label}
          className="flex items-center gap-3 p-3 rounded-lg border text-left transition-all group"
          style={{
            borderColor: 'var(--wt-border)',
            background: 'var(--wt-surface)',
            animation: `slide-in 0.3s ease ${i * 0.08}s both`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = action.color;
            e.currentTarget.style.backgroundColor = `${action.color}08`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--wt-border)';
            e.currentTarget.style.backgroundColor = 'var(--wt-surface)';
          }}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg text-sm flex-shrink-0" style={{ backgroundColor: `${action.color}15` }}>
            {action.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium" style={{ color: 'var(--wt-text)' }}>{action.label}</div>
            <div className="text-xs mt-0.5" style={{ color: 'var(--wt-text-tertiary)' }}>{action.desc}</div>
          </div>
          <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: action.color }}>→</span>
        </button>
      ))}
    </div>
  );
}
