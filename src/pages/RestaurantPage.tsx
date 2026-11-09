import React, { useState } from 'react';
import { PageId, MenuItem } from '../types';
import { MENU_ITEMS, MENU_CATEGORIES } from '../data/hotelData';
import { DecorativeDivider, DecorativeCrown } from '../components/common/DecorativeLaurel';
import { Utensils, Clock, Sparkles, ChefHat, CheckCircle2, QrCode, X, Maximize2 } from 'lucide-react';

interface RestaurantPageProps {
  onNavigate: (page: PageId) => void;
  onOpenTableBooking: () => void;
}

export const RestaurantPage: React.FC<RestaurantPageProps> = ({ onOpenTableBooking }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [vegOnly, setVegOnly] = useState<boolean>(false);
  const [showQrMenuModal, setShowQrMenuModal] = useState<boolean>(false);

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesVeg = !vegOnly || item.isVeg;
    return matchesCategory && matchesVeg;
  });

  return (
    <div className="bg-[#090909] text-[#F5F0E7] pt-24 pb-20">
      {/* Restaurant Hero */}
      <section className="relative py-16 lg:py-20 border-b border-[#30271D]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <DecorativeCrown className="w-5 h-5 text-[#C6A052]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#C6A052] font-semibold">
              AUTHENTIC NORTH INDIAN & PUNJABI DINING
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-normal tracking-[0.03em] text-[#F5F0E7] max-w-2xl sm:max-w-3xl mx-auto leading-relaxed text-balance mb-4">
            The Royal Table of Shaan-E-Punjab
          </h1>

          <p className="font-sans text-sm sm:text-base text-[#F5F0E7]/80 max-w-2xl mx-auto font-light leading-relaxed">
            Freshly baked breads from open clay tandoors, slow-simmered rich gravies, tender charcoal-smoked kebabs, and our legendary kulhad lassi on NH-19.
          </p>

          <DecorativeDivider className="my-8" />

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setShowQrMenuModal(true)}
              className="px-6 py-3 rounded-lg bg-[#141414] hover:bg-[#1f1f1f] border border-[#C6A052] text-[#E1C783] font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
            >
              <QrCode className="w-4 h-4 text-[#C6A052]" />
              <span>Scan & View Official QR Menu</span>
            </button>
            <button
              onClick={onOpenTableBooking}
              className="px-7 py-3 rounded-lg bg-gradient-to-r from-[#C6A052] to-[#E1C783] text-[#090909] font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Utensils className="w-4 h-4" />
              <span>Reserve a Dining Table</span>
            </button>
          </div>
        </div>
      </section>

      {/* Operating Hours & Dining Ambiance Banner */}
      <section className="py-10 bg-[#171717] border-b border-[#30271D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center text-xs">
            <div className="p-4 rounded-lg bg-[#090909] border border-[#30271D]">
              <Clock className="w-4 h-4 text-[#C6A052] mx-auto mb-1.5" />
              <span className="font-semibold text-[#F5F0E7] block mb-0.5">Morning Breakfast</span>
              <span className="text-[#F5F0E7]/60">7:00 AM – 10:30 AM</span>
            </div>
            <div className="p-4 rounded-lg bg-[#090909] border border-[#30271D]">
              <Clock className="w-4 h-4 text-[#C6A052] mx-auto mb-1.5" />
              <span className="font-semibold text-[#F5F0E7] block mb-0.5">Royal Lunch Feast</span>
              <span className="text-[#F5F0E7]/60">12:30 PM – 3:30 PM</span>
            </div>
            <div className="p-4 rounded-lg bg-[#090909] border border-[#30271D]">
              <Clock className="w-4 h-4 text-[#C6A052] mx-auto mb-1.5" />
              <span className="font-semibold text-[#F5F0E7] block mb-0.5">Dinner & Tandoor</span>
              <span className="text-[#F5F0E7]/60">7:30 PM – 11:00 PM</span>
            </div>
            <div className="p-4 rounded-lg bg-[#090909] border border-[#30271D]">
              <Sparkles className="w-4 h-4 text-[#C6A052] mx-auto mb-1.5" />
              <span className="font-semibold text-[#F5F0E7] block mb-0.5">Highway Snacks & Chai</span>
              <span className="text-[#E1C783]">24 Hours Open</span>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Showcase */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-[#30271D]">
          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded text-xs font-semibold tracking-wider uppercase transition-all ${
                activeCategory === 'all'
                  ? 'bg-[#C6A052] text-[#090909]'
                  : 'bg-[#171717] text-[#F5F0E7]/70 hover:text-[#E1C783] border border-[#30271D]'
              }`}
            >
              All Offerings
            </button>
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded text-xs font-semibold tracking-wider uppercase transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#C6A052] text-[#090909]'
                    : 'bg-[#171717] text-[#F5F0E7]/70 hover:text-[#E1C783] border border-[#30271D]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Pure Veg Toggle */}
          <button
            onClick={() => setVegOnly(!vegOnly)}
            className={`px-3.5 py-2 rounded border text-xs font-medium flex items-center gap-2 transition-all ${
              vegOnly
                ? 'bg-[#C6A052] text-[#090909] border-[#C6A052] font-semibold shadow-md shadow-black/40'
                : 'bg-[#171717] border-[#30271D] text-[#F5F0E7]/75 hover:border-[#C6A052]/50 hover:text-[#E1C783]'
            }`}
          >
            <span className="text-xs text-[#C6A052]">✦</span>
            <span>Pure Vegetarian Only</span>
          </button>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-xl bg-[#171717] border border-[#30271D] hover:border-[#C6A052]/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="text-[9px] tracking-wider uppercase font-semibold px-1.5 py-0.5 rounded border border-[#C6A052]/40 bg-[#090909] text-[#E1C783]"
                      title={item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                    >
                      {item.isVeg ? 'VEG' : 'NON-VEG'}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-[#F5F0E7]">
                      {item.name}
                    </h3>
                  </div>
                  <span className="font-serif text-lg font-bold text-[#E1C783] shrink-0">
                    ₹{item.price}
                  </span>
                </div>

                <p className="text-xs text-[#F5F0E7]/70 leading-relaxed font-light mb-3">
                  {item.description}
                </p>
              </div>

              {item.isChefSpecial && (
                <div className="flex items-center gap-1.5 text-[10px] text-[#C6A052] font-semibold tracking-wider uppercase pt-2 border-t border-[#30271D]/50">
                  <ChefHat className="w-3.5 h-3.5" />
                  <span>Shaan-E-Punjab House Specialty</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pure Jain & Dietary Notice */}
        <div className="mt-12 p-6 rounded-xl bg-[#171717] border border-[#C6A052]/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs font-semibold text-[#E1C783] block">
              Visiting Shikharji / Parasnath? Special Jain Meal Coordination
            </span>
            <p className="text-xs text-[#F5F0E7]/70">
              We offer dedicated pure vegetarian and Jain preparation (no onion, no garlic, cooked in separate utensils) on advance request for spiritual pilgrims.
            </p>
          </div>
          <button
            onClick={onOpenTableBooking}
            className="px-6 py-2.5 rounded bg-[#C6A052] text-[#090909] font-bold text-xs uppercase tracking-wider shrink-0 hover:bg-[#E1C783] transition-colors"
          >
            Book Dining Table
          </button>
        </div>
      </section>

      {/* BIG SIZE OFFICIAL MENU & QR MODAL */}
      {showQrMenuModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setShowQrMenuModal(false)}
        >
          <div
            className="relative max-w-2xl w-full max-h-[92vh] bg-[#141414] border border-[#C6A052]/60 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#30271D] bg-[#090909]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#C6A052]/15 border border-[#C6A052]/40 flex items-center justify-center text-[#E1C783]">
                  <QrCode className="w-4 h-4 text-[#C6A052]" />
                </div>
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#F5F0E7] leading-none">
                    Shaan-E-Punjab Official Menu
                  </h3>
                  <p className="text-[11px] text-[#C6A052] mt-0.5 font-medium">
                    Scan QR Code or browse 150+ authentic dishes
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowQrMenuModal(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
                aria-label="Close Menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Big Size Menu Image Container */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-5 flex items-center justify-center bg-black/60">
              <div className="relative group max-w-lg w-full rounded-xl overflow-hidden border border-[#C6A052]/30 shadow-2xl bg-[#090909]">
                <img
                  src="/assets/aistudio/hd_menu_aaa4021c.jpeg"
                  alt="Shaan-E-Punjab Hotel & Resort Official Menu QR Card"
                  className="w-full h-auto max-h-[66vh] object-contain mx-auto transition-transform duration-300"
                />
              </div>
            </div>

            {/* Modal Footer with Actions */}
            <div className="px-5 py-3 border-t border-[#30271D] bg-[#090909] flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-[11px] text-[#F5F0E7]/70 flex items-center gap-1.5 text-center sm:text-left">
                <Sparkles className="w-3.5 h-3.5 text-[#C6A052] shrink-0" />
                Point your phone camera at the QR code to open the live menu on TableAdda
              </span>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href="/assets/aistudio/hd_menu_aaa4021c.jpeg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-[#F5F0E7] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-[#C6A052]" />
                  <span>View Full HD</span>
                </a>

                <button
                  type="button"
                  onClick={() => setShowQrMenuModal(false)}
                  className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-gradient-to-r from-[#C6A052] to-[#E1C783] text-[#090909] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:brightness-110 transition-all shadow-md cursor-pointer"
                >
                  <span>Close & Browse Menu</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
