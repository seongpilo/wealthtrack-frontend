'use client';
import { ReactNode } from 'react';

interface CardProps {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}

export default function Card({
  title,
  subtitle,
  action,
  children,
  className = '',
  noPadding = false,
}: CardProps) {
  return (
    <div
      className={`rounded-xl border ${className}`}
      style={{
        background: 'var(--wt-surface)',
        borderColor: 'var(--wt-border)',
        boxShadow: 'var(--wt-shadow-sm)',
      }}
    >
      {(title || action) && (
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <div>
            {title && (
              <h3 className="text-base font-semibold" style={{ color: 'var(--wt-text)' }}>
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="mt-1 text-xs" style={{ color: 'var(--wt-text-tertiary)' }}>
                {subtitle}
              </p>
            )}
          </div>
          {action}
        </div>
      )}
      <div className={noPadding ? '' : 'px-5 pb-5'}>
        {children}
      </div>
    </div>
  );
}
