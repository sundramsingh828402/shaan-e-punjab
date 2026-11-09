import React from 'react';

interface ShaanLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  onClick?: () => void;
}

export const ShaanLogo: React.FC<ShaanLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
  onClick
}) => {
  const sizeMap = {
    sm: {
      container: 'w-10 h-10',
      text: 'text-[14px] sm:text-[15px]',
      subtext: 'text-[8.5px]'
    },
    md: {
      container: 'w-12 h-12',
      text: 'text-base',
      subtext: 'text-[9.5px]'
    },
    lg: {
      container: 'w-16 h-16',
      text: 'text-lg',
      subtext: 'text-[11px]'
    },
    xl: {
      container: 'w-24 h-24',
      text: 'text-xl',
      subtext: 'text-xs'
    }
  };

  const currentSize = sizeMap[size];

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 sm:gap-3 select-none ${onClick ? 'cursor-pointer group' : ''} ${className}`}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Exact uploaded logo preserved with gold circular bezel */}
      <div className={`relative ${currentSize.container} shrink-0 rounded-full p-[1.5px] bg-gradient-to-tr from-[#30271D] via-[#C6A052] to-[#E1C783] shadow-lg shadow-black/80 transition-all duration-300 group-hover:shadow-[#C6A052]/25`}>
        <div className="w-full h-full rounded-full overflow-hidden bg-[#090909] relative flex items-center justify-center border border-[#090909]">
          <img
            src="/assets/aistudio/logo_shaan_c2b0f723.jpeg"
            alt="Shaan-E-Punjab Hotel & Resort Official Logo"
            className="w-full h-full object-cover object-[50%_48%] scale-[1.08] rounded-full transition-transform duration-500 group-hover:scale-[1.14]"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {showText && (
        <div className="flex flex-col justify-center">
          <span className={`font-serif tracking-[0.14em] text-[#F5F0E7] font-semibold leading-tight group-hover:text-[#E1C783] transition-colors ${currentSize.text}`}>
            SHAAN-E-PUNJAB
          </span>
          <span className={`tracking-[0.26em] text-[#C6A052] uppercase font-medium leading-none mt-1 ${currentSize.subtext}`}>
            Hotel & Resort · NH-19
          </span>
        </div>
      )}
    </div>
  );
};
