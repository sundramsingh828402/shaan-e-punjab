import React from 'react';
import { PageId } from '../types';
import { HOTEL_INFO } from '../data/hotelData';
import { ShaanLogo } from '../components/common/ShaanLogo';
import { DecorativeDivider, DecorativeCrown } from '../components/common/DecorativeLaurel';
import { ShieldCheck, HeartHandshake, Award, Sparkles, MapPin, Compass } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
  onOpenBooking: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenBooking }) => {
  return (
    <div className="bg-[#090909] text-[#F5F0E7] pt-24 pb-20">
      {/* Editorial Header */}
      <section className="relative py-16 lg:py-20 border-b border-[#30271D]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <DecorativeCrown className="w-5 h-5 text-[#C6A052]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#C6A052] font-semibold">
              OUR HERITAGE & PHILOSOPHY
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-normal tracking-[0.03em] text-[#F5F0E7] max-w-2xl sm:max-w-3xl mx-auto leading-relaxed text-balance mb-4">
            A Legacy of Royal Indian Hospitality on NH-19
          </h1>

          <p className="font-sans text-sm sm:text-base text-[#F5F0E7]/80 max-w-2xl mx-auto font-light leading-relaxed">
            From our founding roots on the Grand Trunk highway to becoming Dhanbad’s premier resort destination near Topchanchi Lake.
          </p>

          <DecorativeDivider className="my-8" />
        </div>
      </section>

      {/* Main Narrative Split */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.2em] text-[#C6A052] font-semibold block">
              The Shaan-E-Punjab Story
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#F5F0E7] leading-snug">
              Rooted in Highway Generosity, Crafted with Modern Comfort
            </h2>
            <p className="text-sm text-[#F5F0E7]/80 leading-relaxed font-light">
              Shaan-E-Punjab was born from a timeless Indian principle: that every traveler passing through our gates deserves royal treatment, wholesome nourishment, and peaceful shelter.
            </p>
            <p className="text-xs text-[#F5F0E7]/70 leading-relaxed">
              Located on NH-19 in Topchanchi, Dhanbad, Jharkhand, our property stands at the historic crossroads connecting Kolkata to Delhi and Varanasi. Over the years, we have expanded from a cherished highway stop into a full-scale luxury resort with spacious air-conditioned suites, a 25,000 sq. ft. wedding garden, and authentic Punjabi fine dining.
            </p>
            <p className="text-xs text-[#F5F0E7]/70 leading-relaxed">
              Our emblem—the royal crown, victorious laurel wreath, and SP monogram—remains the hallmark of our commitment to excellence, integrity, and warmth.
            </p>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="rounded-2xl overflow-hidden border border-[#C6A052]/40 shadow-2xl">
              <img
                src="/assets/aistudio/shaan_1_688cd22a.jpg"
                alt="Shaan-E-Punjab Hotel & Family Restaurant on NH-19 Dhanbad"
                className="w-full h-[420px] object-cover object-[center_35%]"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 p-5 bg-[#171717] border border-[#C6A052]/50 rounded-xl shadow-xl max-w-xs hidden sm:block">
              <div className="flex items-center gap-3">
                <ShaanLogo size="sm" showText={false} />
                <div>
                  <span className="text-xs font-serif font-bold text-[#E1C783] block">Topchanchi, Dhanbad</span>
                  <span className="text-[10px] text-[#F5F0E7]/60">Welcoming Travelers 24/7 on NH-19</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hospitality Core Values */}
      <section className="py-16 bg-[#171717] border-y border-[#30271D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-[#C6A052] font-semibold block mb-2">
              Our Guiding Pillars
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F5F0E7]">
              The Four Tenets of Our Hospitality
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl bg-[#090909] border border-[#30271D] space-y-3">
              <HeartHandshake className="w-8 h-8 text-[#C6A052]" />
              <h3 className="font-serif text-lg font-bold text-[#F5F0E7]">Atithi Devo Bhava</h3>
              <p className="text-xs text-[#F5F0E7]/70 leading-relaxed">
                Guests are treated with profound respect and heartfelt Punjabi attentiveness from arrival to departure.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#090909] border border-[#30271D] space-y-3">
              <Award className="w-8 h-8 text-[#C6A052]" />
              <h3 className="font-serif text-lg font-bold text-[#F5F0E7]">Authentic Flavours</h3>
              <p className="text-xs text-[#F5F0E7]/70 leading-relaxed">
                True North Indian culinary craftsmanship using real spices, fresh slow-cooked gravies, and live clay tandoors.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#090909] border border-[#30271D] space-y-3">
              <ShieldCheck className="w-8 h-8 text-[#C6A052]" />
              <h3 className="font-serif text-lg font-bold text-[#F5F0E7]">Safety & Security</h3>
              <p className="text-xs text-[#F5F0E7]/70 leading-relaxed">
                24/7 guarded compound with full CCTV coverage, secure parking, and clean hygiene across every room.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#090909] border border-[#30271D] space-y-3">
              <Sparkles className="w-8 h-8 text-[#C6A052]" />
              <h3 className="font-serif text-lg font-bold text-[#F5F0E7]">Celebration Grace</h3>
              <p className="text-xs text-[#F5F0E7]/70 leading-relaxed">
                Grand lawn and banquet setups engineered to turn weddings and milestones into memories that last generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Property Facts Banner */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="p-6 rounded-xl bg-[#171717] border border-[#30271D]">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#E1C783] block mb-1">
              25,000+
            </span>
            <span className="text-xs text-[#F5F0E7]/70 uppercase tracking-wider">
              Sq. Ft. Event Lawn
            </span>
          </div>
          <div className="p-6 rounded-xl bg-[#171717] border border-[#30271D]">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#E1C783] block mb-1">
              1,500+
            </span>
            <span className="text-xs text-[#F5F0E7]/70 uppercase tracking-wider">
              Guest Capacity
            </span>
          </div>
          <div className="p-6 rounded-xl bg-[#171717] border border-[#30271D]">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#E1C783] block mb-1">
              4.2 km
            </span>
            <span className="text-xs text-[#F5F0E7]/70 uppercase tracking-wider">
              To Topchanchi Lake
            </span>
          </div>
          <div className="p-6 rounded-xl bg-[#171717] border border-[#30271D]">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#E1C783] block mb-1">
              24 / 7
            </span>
            <span className="text-xs text-[#F5F0E7]/70 uppercase tracking-wider">
              Highway Operations
            </span>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={onOpenBooking}
            className="px-8 py-3.5 rounded bg-gradient-to-r from-[#C6A052] to-[#E1C783] text-[#090909] font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity"
          >
            Plan Your Visit To Shaan-E-Punjab
          </button>
        </div>
      </section>
    </div>
  );
};
