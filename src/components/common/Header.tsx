import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, Phone } from 'lucide-react';
import { PageId } from '../../types';
import { HOTEL_INFO } from '../../data/hotelData';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenBooking: (roomId?: string) => void;
  onOpenTableBooking: () => void;
}

interface NavItem {
  id: PageId;
  label: string;
}

const DESKTOP_NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Us' },
  { id: 'restaurant', label: 'Restaurant' },
  { id: 'rooms', label: 'Rooms & Stay' },
  { id: 'events', label: 'Weddings & Banquets' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'location', label: 'Location' },
  { id: 'contact', label: 'Contact' }
];

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenBooking
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? 'bg-[#0E0E0E]/95 backdrop-blur-md border-b border-[#C6A052]/30 shadow-2xl shadow-black/90 py-0'
          : 'bg-gradient-to-b from-black/90 via-black/45 to-transparent border-b border-white/10 py-1 sm:py-0'
      }`}
    >
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-6 xl:px-10 h-20 lg:h-24 flex items-center justify-between gap-3 xl:gap-5">
        
        {/* LEFT SIDE: Hotel Emblem Logo and Brand Name */}
        <div
          onClick={() => handleNavClick('home')}
          className="shrink-0 flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none py-1"
          role="button"
          tabIndex={0}
          aria-label="Shaan-E-Punjab Hotel & Resort Home"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleNavClick('home');
            }
          }}
        >
          {/* Circular Black & Gold Emblem with Crown, Wreath, and SP Monogram */}
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 lg:w-13 lg:h-13 shrink-0 rounded-full p-[1.5px] bg-gradient-to-tr from-[#30271D] via-[#C6A052] to-[#E1C783] shadow-lg shadow-black/80 transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full rounded-full overflow-hidden bg-[#090909] relative flex items-center justify-center border border-[#090909]">
              <img
                src="/assets/aistudio/logo_shaan_c2b0f723.jpeg"
                alt="Shaan-E-Punjab Hotel & Resort Emblem"
                className="w-full h-full object-cover object-[50%_48%] scale-[1.08] rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* CENTER / RIGHT SIDE: Desktop Navigation Links (ALL 9 HORIZONTALLY IN ONE CLEAN ROW - NEVER A HAMBURGER ON DESKTOP) */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 xl:space-x-3.5 2xl:space-x-5 flex-1 justify-center max-w-6xl mx-1 lg:mx-2">
          {DESKTOP_NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`group relative py-2 px-1 lg:px-1.5 text-[9.5px] lg:text-[11.5px] xl:text-[12.5px] 2xl:text-[13px] tracking-[0.04em] lg:tracking-[0.06em] xl:tracking-[0.08em] uppercase font-medium whitespace-nowrap transition-colors duration-200 cursor-pointer flex flex-col items-center justify-center ${
                  isActive
                    ? 'text-[#E1C783] font-semibold'
                    : 'text-white/85 hover:text-[#E1C783]'
                }`}
              >
                <span className="transition-transform duration-200 group-hover:-translate-y-[1px]">
                  {item.label}
                </span>
                {/* Subtle, elegant champagne-gold underline animation */}
                <span
                  className={`absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-[#C6A052] via-[#E1C783] to-[#C6A052] rounded-full transition-transform duration-300 origin-center ${
                    isActive
                      ? 'scale-x-100 opacity-100 shadow-sm shadow-[#C6A052]/50'
                      : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* RIGHT SIDE: Premium Champagne-Gold BOOK NOW Button */}
        <div className="hidden md:flex items-center shrink-0">
          <button
            onClick={() => onOpenBooking()}
            className="group relative px-3 py-1.5 lg:px-5 lg:py-2.5 xl:px-6 xl:py-3 rounded-full bg-gradient-to-r from-[#C6A052] via-[#E1C783] to-[#C6A052] bg-[length:200%_auto] hover:bg-right text-[#090909] font-bold text-[10px] lg:text-xs xl:text-[13px] tracking-[0.1em] lg:tracking-[0.14em] uppercase shadow-lg shadow-black/50 hover:shadow-[#C6A052]/30 active:scale-95 transition-all duration-300 cursor-pointer flex items-center gap-1.5 lg:gap-2 whitespace-nowrap overflow-hidden"
          >
            <Calendar className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-[#090909] transition-transform duration-300 group-hover:scale-110" />
            <span className="font-sans font-bold">BOOK NOW</span>
          </button>
        </div>

        {/* MOBILE CONTROLS (Strictly small mobile screens < 768px only) */}
        <div className="flex items-center gap-2.5 md:hidden">
          <button
            onClick={() => onOpenBooking()}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-[#C6A052] to-[#E1C783] text-[#090909] font-bold text-[11px] tracking-wider uppercase shadow-md active:scale-95 transition-all"
          >
            BOOK NOW
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-lg text-white hover:text-[#C6A052] transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE LUXURY SIDE-DRAWER (< 768px small mobile only) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[80px] z-50 bg-[#090909]/98 backdrop-blur-xl border-t border-[#30271D] overflow-y-auto md:hidden animate-fade-in flex flex-col justify-between p-6">
          <div className="space-y-1">
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#30271D]">
              <span className="text-[10px] uppercase tracking-widest text-[#C6A052] font-semibold">
                Hotel Directory & Navigation
              </span>
              <span className="text-[10px] text-white/50 tracking-wider">
                NH-19 Topchanchi
              </span>
            </div>
            {DESKTOP_NAV_ITEMS.map((item, index) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left py-3.5 px-3 text-base font-medium tracking-wide rounded-lg transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-[#30271D]/60 text-[#E1C783] border-l-2 border-[#C6A052]'
                      : 'text-white/85 hover:bg-[#171717] hover:text-[#E1C783]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-[#C6A052]/60 font-mono">
                      0{index + 1}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {isActive && <span className="text-sm text-[#C6A052]">✦</span>}
                </button>
              );
            })}
          </div>

          <div className="pt-6 border-t border-[#30271D] space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#C6A052] via-[#E1C783] to-[#C6A052] text-[#090909] font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
            >
              <Calendar className="w-4 h-4" /> BOOK DIRECT DESK
            </button>
            <div className="flex items-center justify-center gap-2 text-xs text-[#F5F0E7]/70 pt-2">
              <Phone className="w-3.5 h-3.5 text-[#C6A052]" />
              <a href={`tel:${HOTEL_INFO.phonePrimary}`} className="hover:text-[#E1C783]">
                {HOTEL_INFO.phonePrimary} (24/7 Frontdesk)
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
