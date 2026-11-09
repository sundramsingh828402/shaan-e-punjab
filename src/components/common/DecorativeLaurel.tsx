import React from 'react';

interface DecorativeLaurelProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const DecorativeCrown: React.FC<{ className?: string }> = ({ className = 'w-6 h-6 text-[#C6A052]' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.768a2 2 0 0 1-1.936 1.491H6.789a2 2 0 0 1-1.936-1.491L2.019 6.019a.5.5 0 0 1 .798-.519l4.277 3.664a1 1 0 0 0 1.516-.294z" />
    <path d="M5 21h14" />
  </svg>
);

export const DecorativeDivider: React.FC<{ className?: string }> = ({ className = 'my-8' }) => (
  <div className={`flex items-center justify-center gap-3 ${className}`}>
    <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-[#C6A052]/50 to-[#C6A052]" />
    <div className="flex items-center gap-1.5 text-[#C6A052]">
      <span className="text-[10px]">✦</span>
      <DecorativeCrown className="w-4 h-4 text-[#C6A052]" />
      <span className="text-[10px]">✦</span>
    </div>
    <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent via-[#C6A052]/50 to-[#C6A052]" />
  </div>
);

export const DecorativeLaurelBranch: React.FC<DecorativeLaurelProps> = ({ className = '', size = 'md' }) => {
  const height = size === 'sm' ? 'h-4' : size === 'lg' ? 'h-8' : 'h-6';
  return (
    <svg className={`${height} text-[#C6A052]/70 ${className}`} viewBox="0 0 100 24" fill="currentColor">
      <path d="M0,12 Q25,3 50,12 Q75,21 100,12" stroke="#C6A052" strokeWidth="1" fill="none" opacity="0.6" />
      <circle cx="20" cy="8" r="2.5" />
      <circle cx="35" cy="14" r="2.5" />
      <circle cx="50" cy="12" r="3" fill="#E1C783" />
      <circle cx="65" cy="14" r="2.5" />
      <circle cx="80" cy="8" r="2.5" />
    </svg>
  );
};
