import React, { useEffect, useState } from 'react';
import { ShaanLogo } from './ShaanLogo';
import { DecorativeDivider } from './DecorativeLaurel';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setFading(true);
            setTimeout(onComplete, 400);
          }, 200);
          return 100;
        }
        return prev + 25;
      });
    }, 120);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#090909] transition-opacity duration-500 ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center max-w-sm px-6 text-center animate-fade-in">
        {/* Exact logo presented with luxury gold glow */}
        <div className="relative mb-6">
          <div className="absolute inset-0 rounded-full blur-xl bg-[#C6A052]/20 scale-125 animate-pulse" />
          <ShaanLogo size="xl" showText={false} />
        </div>

        <span className="text-[11px] uppercase tracking-[0.3em] text-[#C6A052] font-semibold mb-2">
          Royal Hospitality · NH-19 Topchanchi
        </span>

        <h1 className="font-serif text-2xl sm:text-3xl text-[#F5F0E7] font-bold tracking-wide">
          Shaan-E-Punjab
        </h1>
        <p className="font-serif italic text-sm text-[#E1C783]/80 mt-1">
          Hotel & Resort
        </p>

        <DecorativeDivider className="my-5 w-48" />

        {/* Gold progress line */}
        <div className="w-48 h-[2px] bg-[#30271D] overflow-hidden rounded-full relative">
          <div
            className="h-full bg-gradient-to-r from-[#C6A052] via-[#E1C783] to-[#C6A052] transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="text-[10px] text-[#F5F0E7]/40 tracking-widest uppercase mt-3">
          Loading Luxury Experience
        </span>
      </div>
    </div>
  );
};
