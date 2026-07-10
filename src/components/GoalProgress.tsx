'use client';

interface Goal {
  name: string;
  current: number;
  target: number;
  unit: string;
}

const GOALS: Goal[] = [
  { name: '🏠 내집 마련', current: 340, target: 500, unit: '백만원' },
  { name: '✈️ 여행 자금', current: 8.5, target: 10, unit: '백만원' },
  { name: '🎯 은퇴 준비', current: 127, target: 500, unit: '백만원' }
];

export default function GoalProgress() {
  return (
    <div className="flex flex-col gap-4">
      {GOALS.map((goal, i) => {
        const pct = Math.round((goal.current / goal.target) * 100);
        return (
          <div key={goal.name} style={{ animation: `fade-in 0.4s ease ${i * 0.1}s both` }}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium" style={{ color: 'var(--wt-text)' }}>{goal.name}</span>
              <span className="text-sm font-bold" style={{ color: 'var(--wt-primary)' }}>{pct}%</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--wt-surface-hover)' }}>
              <div className="h-full rounded-full transition-all duration-700 ease-out" style={{ width: `${pct}%`, background: 'linear-gradient(90deg, var(--wt-secondary), var(--wt-primary))' }} />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-[11px]" style={{ color: 'var(--wt-text-tertiary)' }}>{goal.current}{goal.unit}</span>
              <span className="text-[11px]" style={{ color: 'var(--wt-text-tertiary)' }}>목표 {goal.target}{goal.unit}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
