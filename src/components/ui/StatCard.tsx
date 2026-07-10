'use client';
import { motion } from 'framer-motion';

interface StatCardProps {
  label: string;
  value: string;
  change?: string;
  changeType?: 'up' | 'down' | 'neutral';
  icon?: string;
  delay?: number;
}

const changeColors = {
  up: 'var(--wt-success)',
  down: 'var(--wt-error)',
  neutral: 'var(--wt-text-tertiary)',
};

const changeArrows = {
  up: '▲',
  down: '▼',
  neutral: '—',
};

export default function StatCard({
  label,
  value,
  change,
  changeType = 'neutral',
  icon,
  delay = 0,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative overflow-hidden rounded-xl border p-5 cursor-pointer"
      style={{
        background: 'var(--wt-surface)',
        borderColor: 'var(--wt-border)',
        boxShadow: 'var(--wt-shadow-sm)',
      }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, rgba(79,70,229,0.03), rgba(14,165,233,0.03))' }} />
      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--wt-text-tertiary)' }}>
            {label}
          </span>
          {icon && <span className="text-lg opacity-60">{icon}</span>}
        </div>
        <div className="text-2xl font-bold tracking-tight" style={{ color: 'var(--wt-text)' }}>
          {value}
        </div>
        {change && (
          <div className="mt-2 flex items-center gap-1.5">
            <span className="text-xs font-semibold" style={{ color: changeColors[changeType] }}disable-output-escaping>
              {changeArrows[changeType]} {change}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
