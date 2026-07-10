'use client';

interface Asset {
  name: string;
  category: string;
  amount: string;
  changePct: string;
  changeType: 'up' | 'down' | 'neutral';
  icon: string;
  color: string;
}

const ASSETS: Asset[] = [
  { name: '부동산', category: '2건 보유', amount: '₩65,200,000', changePct: '+3.1%', changeType: 'up', icon: '🏠', color: 'var(--wt-primary)' },
  { name: '주식', category: '12종목', amount: '₩38,700,000', changePct: '+7.4%', changeType: 'up', icon: '📈', color: 'var(--wt-success)' },
  { name: '예금/적금', category: '3계좌', amount: '₩18,500,000', changePct: '+1.2%', changeType: 'neutral', icon: '💰', color: 'var(--wt-secondary)' },
  { name: '코인/기타', category: '5종류', amount: '₩5,050,000', changePct: '-2.1%', changeType: 'down', icon: '🪙', color: 'var(--wt-warning)' }
];

const changeColorMap = {
  up: 'var(--wt-success)',
  down: 'var(--wt-error)',
  neutral: 'var(--wt-text-tertiary)',
};

export default function AssetList() {
  return (
    <div className="flex flex-col gap-1">
      {ASSETS.map((asset, i) => (
        <div
          key={asset.name}
          className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors"
          style={{ animation: `slide-in 0.3s ease ${i * 0.08}s both` }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--wt-surface-hover)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl text-base flex-shrink-0" style={{ backgroundColor: `${asset.color}15` }}>
            {asset.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold truncate" style={{ color: 'var(--wt-text)' }}>{asset.name}</div>
            <div className="text-xs mt-0.5" style={{ color: 'var(--wt-text-tertiary)' }}>{asset.category}</div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-sm font-semibold" style={{ color: 'var(--wt-text)' }}>{asset.amount}</div>
            <div className="text-xs font-semibold mt-0.5" style={{ color: changeColorMap[asset.changeType] }}>{asset.changePct}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
