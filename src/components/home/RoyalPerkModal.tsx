import React, { useState } from 'react';
import { Sparkles, Gift, Check, Copy, X, PartyPopper, Award, ShieldCheck, Flame } from 'lucide-react';
import { DecorativeCrown } from '../common/DecorativeLaurel';

interface RoyalPerkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyToBooking?: () => void;
}

const PERKS = [
  {
    title: 'Complimentary Malai Rabdi & Hot Jalebi',
    subtitle: 'With any dinner at King’s Family Restaurant',
    code: 'ROYALDESSERT',
    discount: 'FREE TREAT',
    worth: '₹280 Value'
  },
  {
    title: '₹500 Instant Room Credit',
    subtitle: 'Applicable on Executive or Royal Suite stays',
    code: 'SHAANSUITE500',
    discount: '₹500 OFF',
    worth: 'Instant Voucher'
  },
  {
    title: 'Free Highway Refreshment & Masala Kulhad Chai',
    subtitle: 'Complimentary tray for all car passengers on halt',
    code: 'NH19CHAI',
    discount: 'ROYAL HIGHWAY HALT',
    worth: 'Welcome Tray'
  }
];

export const RoyalPerkModal: React.FC<RoyalPerkModalProps> = ({
  isOpen,
  onClose,
  onApplyToBooking
}) => {
  const [selectedPerkIndex, setSelectedPerkIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [scratchProgress, setScratchProgress] = useState(0);

  if (!isOpen) return null;

  const currentPerk = PERKS[selectedPerkIndex];

  const handleReveal = () => {
    setIsRevealed(true);
    setScratchProgress(100);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentPerk.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShufflePerk = () => {
    setIsRevealed(false);
    setScratchProgress(0);
    setSelectedPerkIndex((prev) => (prev + 1) % PERKS.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-[#141414] border-2 border-[#C6A052] rounded-3xl p-6 sm:p-8 text-[#F5F0E7] shadow-[0_0_50px_rgba(198,160,82,0.25)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative background glow */}
        <div className="absolute -top-24 -left-24 w-60 h-60 bg-[#C6A052]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-[#E1C783]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white flex items-center justify-center border border-white/10 transition-colors cursor-pointer z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C6A052]/15 border border-[#C6A052]/40 text-[#E1C783] text-xs font-semibold tracking-widest uppercase mb-3">
            <DecorativeCrown className="w-3.5 h-3.5 text-[#C6A052]" />
            <span>NH-19 Highway Guest Privilege</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFF5D6] via-[#E1C783] to-[#C6A052]">
            Secret Royal VIP Pass
          </h3>
          <p className="text-xs sm:text-sm text-[#F5F0E7]/70 mt-1 max-w-md mx-auto">
            A special treat for highway travelers and resort guests. Tap below to reveal today's exclusive royal hospitality perk!
          </p>
        </div>

        {/* Interactive Scratch / Reveal Card */}
        <div className="relative mb-6 rounded-2xl overflow-hidden border border-[#C6A052]/50 bg-gradient-to-br from-[#1a1714] to-[#0a0a0a] p-6 shadow-inner">
          {!isRevealed ? (
            <div 
              onClick={handleReveal}
              className="group cursor-pointer py-10 px-4 text-center rounded-xl border-2 border-dashed border-[#C6A052]/60 hover:border-[#C6A052] bg-gradient-to-b from-[#221c15] to-[#120f0c] transition-all hover:scale-[1.01] flex flex-col items-center justify-center gap-3 relative overflow-hidden"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#C6A052] to-[#FFF5D6] flex items-center justify-center text-[#090909] shadow-xl group-hover:scale-110 transition-transform">
                <Gift className="w-8 h-8 animate-bounce" />
              </div>
              <div>
                <p className="font-serif text-lg font-bold text-[#E1C783] group-hover:text-white transition-colors">
                  Tap to Reveal Your Surprise Perk
                </p>
                <p className="text-xs text-[#F5F0E7]/60 mt-0.5">
                  Click here to scratch and claim your highway privilege
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase text-[#C6A052] mt-1 bg-[#C6A052]/10 px-3 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                <span>100% Guaranteed Reward</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-4 animate-in zoom-in-95 duration-300">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C6A052] uppercase tracking-wider mb-2">
                <PartyPopper className="w-4 h-4 text-[#E1C783]" />
                <span>Congratulations! You Unlocked:</span>
              </div>

              <div className="text-xl sm:text-2xl font-serif font-bold text-white mb-1">
                {currentPerk.title}
              </div>
              <p className="text-xs text-[#F5F0E7]/80 mb-4">
                {currentPerk.subtitle}
              </p>

              {/* Promo Code Box */}
              <div className="flex items-center justify-center gap-3 max-w-xs mx-auto p-2.5 rounded-xl bg-black/70 border border-[#C6A052] mb-4">
                <div className="text-left flex-1 pl-2">
                  <span className="text-[10px] uppercase tracking-wider text-[#C6A052] block">Voucher Code</span>
                  <span className="font-mono font-bold text-base text-[#FFF5D6] tracking-wider">{currentPerk.code}</span>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="px-3.5 py-2 rounded-lg bg-[#C6A052] hover:bg-[#E1C783] text-[#090909] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-[#090909]" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 text-[11px] text-[#F5F0E7]/60">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C6A052]" /> Valid on NH-19 Visit
                </span>
                <span className="flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-orange-400" /> Active Today
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          {isRevealed && (
            <button
              onClick={() => {
                onClose();
                if (onApplyToBooking) onApplyToBooking();
              }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C6A052] via-[#E1C783] to-[#C6A052] text-[#090909] font-bold text-xs sm:text-sm tracking-wider uppercase hover:shadow-lg hover:shadow-[#C6A052]/30 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Award className="w-4 h-4" />
              <span>Claim & Redeem Now</span>
            </button>
          )}

          <div className="flex items-center justify-between text-xs text-[#F5F0E7]/60 pt-2">
            <button
              onClick={handleShufflePerk}
              className="text-[#E1C783] hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>🎲 Try Another Highway Perk</span>
            </button>
            <span>Show code at reception or billing</span>
          </div>
        </div>
      </div>
    </div>
  );
};
