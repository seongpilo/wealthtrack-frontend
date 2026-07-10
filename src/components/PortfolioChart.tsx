'use client';
import { useState } from 'react';

const PERIODS = ['1주', '1개월', '6개월', '1년'] as const;
type Period = (typeof PERIODS)[number];

const CHART_DATA: Record<Period, number[]> = {
  '1주':   [127.1, 127.3, 127.0, 127.8, 127.5, 127.2, 127.45],
  '1개월': [124.0, 125.3, 124.8, 126.1, 125.5, 126.8, 127.0, 126.2, 127.1, 127.45],
  '6개월': [110, 112, 108, 115, 119, 116, 122, 120, 125, 123, 127.45],
  '1년':   [95, 98, 102, 99, 105, 108, 112, 110, 115, 119, 122, 127.45],
};

export default function PortfolioChart() {
  const [period, setPeriod] = useState<Period>('6개월');
  const data = CHART_DATA[period];

  const width = 100;
  const height = 100;
  const maxVal = Math.max(...data);
  const minVal = Math.min(...data);
  const range = maxVal - minVal || 1;

  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((val - minVal) / range) * (height * 0.8) - 10;
    return { x, y };
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(' ');

  const areaPath = `${linePath} L ${width} ${height} L 0 ${height} Z`;
  const lastPoint = points[points.length - 1];

  return (
    <div>
      <div className="flex items-center gap-1 mb-4">
        {PERIODS.map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className="px-3 py-1.5 text-xs font-medium rounded-md transition-all"
            style={
              period === p
                ? { background: 'var(--wt-bg)', color: 'var(--wt-text)', boxShadow: 'var(--wt-shadow-sm)' }
                : { color: 'var(--wt-text-secondary)' }
            }
          >
            {p}
          </button>
        ))}
      </div>

      <div className="relative" style={{ height: 180 }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--wt-primary)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--wt-primary)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[20, 40, 60, 80].map((y) => (
            <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="var(--wt-border)" strokeWidth="0.3" strokeDasharray="1 2" />
          ))}
          <path d={areaPath} fill="url(#chartGradient)" />
          <path d={linePath} fill="none" stroke="var(--wt-primary)" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" style={{ strokeWidth: 2.5 }} />
          <circle cx={lastPoint.x} cy={lastPoint.y} r="1.5" fill="var(--wt-primary)" />
          <circle cx={lastPoint.x} cy={lastPoint.y} r="3" fill="var(--wt-primary)" opacity="0.2" />
        </svg>
        <div className="absolute right-0 top-0 text-[10px]" style={{ color: 'var(--wt-text-tertiary)' }}>₩{maxVal.toFixed(0)}M</div>
        <div className="absolute right-0 bottom-6 text-[10px]" style={{ color: 'var(--wt-text-tertiary)' }}>₩{minVal.toFixed(0)}M</div>
      </div>
    </div>
  );
}
