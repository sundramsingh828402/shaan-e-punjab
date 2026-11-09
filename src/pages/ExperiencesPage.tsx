import React from 'react';
import { PageId } from '../types';
import { EXPERIENCES_DATA, HOTEL_INFO } from '../data/hotelData';
import { DecorativeDivider, DecorativeCrown } from '../components/common/DecorativeLaurel';
import { Compass, MapPin, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

interface ExperiencesPageProps {
  onNavigate: (page: PageId) => void;
  onOpenBooking: () => void;
}

export const ExperiencesPage: React.FC<ExperiencesPageProps> = ({ onNavigate, onOpenBooking }) => {
  return (
    <div className="bg-[#090909] text-[#F5F0E7] pt-24 pb-20">
      {/* Hero */}
      <section className="relative py-16 lg:py-20 border-b border-[#30271D]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <DecorativeCrown className="w-5 h-5 text-[#C6A052]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#C6A052] font-semibold">
              LOCAL DISCOVERIES & RESORT LEISURE
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-normal tracking-[0.03em] text-[#F5F0E7] max-w-2xl sm:max-w-3xl mx-auto leading-relaxed text-balance mb-4">
            Experiences Around Topchanchi & Beyond
          </h1>

          <p className="font-sans text-sm sm:text-base text-[#F5F0E7]/80 max-w-2xl mx-auto font-light leading-relaxed">
            From the tranquil shores of Topchanchi Lake to the sacred foothills of Parasnath, immerse yourself in nature, spiritual reflection, and royal Punjabi warmth.
          </p>

          <DecorativeDivider className="my-8" />
        </div>
      </section>

      {/* Topchanchi Lake & Waterfall Dam Dual Visual Feature */}
      <section className="py-12 bg-[#121212] border-b border-[#30271D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C6A052]/15 border border-[#C6A052]/30 text-[#E1C783] text-[11px] font-semibold tracking-widest uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#C6A052]" />
                <span>4.2 KM FROM OUR RESORT GATE</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#F5F0E7]">
                Topchanchi Lake & Roaring Waterfall Dam
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#E1C783] bg-black/60 px-3.5 py-1.5 rounded-full border border-[#C6A052]/40 font-medium">
                🚗 8 Minutes Highway Drive
              </span>
            </div>
          </div>

          {/* Dual Visual Showcase Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Image 1: Topchanchi Lake */}
            <div className="group relative rounded-2xl overflow-hidden border border-[#30271D] hover:border-[#C6A052] transition-all duration-500 shadow-2xl bg-[#090909]">
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src="/assets/aistudio/IMG_5a192be5-46ac-4124-b93f-1b255d1c8259_c902a37a.jpg"
                  alt="Topchanchi Lake azure waters and emerald Parasnath mountains"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#C6A052]/50 text-xs font-bold text-[#E1C783] tracking-wider uppercase">
                  🌊 Serene Lake & Wildlife Sanctuary
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-1.5">
                  Topchanchi Lake Shore & Promenades
                </h3>
                <p className="text-xs sm:text-sm text-[#F5F0E7]/80 leading-relaxed font-light">
                  A scenic colonial reservoir embraced by the emerald green Parasnath hills. Perfect for tranquil sunrise walks, winter migratory birdwatching, and panoramic lakeside photography.
                </p>
              </div>
            </div>

            {/* Image 2: Topchanchi Dam & Waterfall */}
            <div className="group relative rounded-2xl overflow-hidden border border-[#30271D] hover:border-[#C6A052] transition-all duration-500 shadow-2xl bg-[#090909]">
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src="/assets/aistudio/IMG_3066c5b2-f874-4ced-b0c3-5b51374d8e9e_ac385b41.jpg"
                  alt="Topchanchi stone dam cascading waterfalls and spillway"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#C6A052]/50 text-xs font-bold text-[#E1C783] tracking-wider uppercase">
                  💦 Roaring Dam Spillway
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-1.5">
                  Historic Stone Spillway & Waterfalls
                </h3>
                <p className="text-xs sm:text-sm text-[#F5F0E7]/80 leading-relaxed font-light">
                  Watch millions of gallons of crystal mountain water cascade across heritage masonry arches into lush jungle pools, framed by verdant forest canopies.
                </p>
              </div>
            </div>
          </div>

          {/* Traveler Concierge Tips Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-[#181818] border border-[#30271D]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C6A052]/15 border border-[#C6A052]/30 flex items-center justify-center text-[#E1C783] shrink-0 font-bold text-sm">
                🌅
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Golden Sunset Hours</span>
                <span className="text-[11px] text-[#F5F0E7]/70">Best lighting 4:30 PM – 6:00 PM</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C6A052]/15 border border-[#C6A052]/30 flex items-center justify-center text-[#E1C783] shrink-0 font-bold text-sm">
                ☕
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Resort Chai Thermos</span>
                <span className="text-[11px] text-[#F5F0E7]/70">Complimentary tea kit for guests on trip</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C6A052]/15 border border-[#C6A052]/30 flex items-center justify-center text-[#E1C783] shrink-0 font-bold text-sm">
                🧭
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Concierge Assistance</span>
                <span className="text-[11px] text-[#F5F0E7]/70">Direct highway directions from reception</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experiences Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {EXPERIENCES_DATA.map((exp) => (
            <div
              key={exp.id}
              className="p-8 rounded-2xl bg-[#171717] border border-[#30271D] hover:border-[#C6A052]/50 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#C6A052] font-semibold block mb-1">
                    {exp.subtitle}
                  </span>
                  <h2 className="font-serif text-2xl font-bold text-[#F5F0E7]">
                    {exp.title}
                  </h2>
                </div>

                <p className="text-xs sm:text-sm text-[#F5F0E7]/80 leading-relaxed font-light">
                  {exp.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-[#30271D]/60 text-xs">
                  {exp.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-[#F5F0E7]/70">
                      <CheckCircle className="w-3.5 h-3.5 text-[#C6A052] shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-[#30271D]/40 flex items-center justify-between text-xs">
                <span className="text-[#C6A052] font-medium">NH-19 Dhanbad Region</span>
                <button
                  onClick={() => onNavigate('location')}
                  className="text-xs uppercase tracking-wider font-semibold text-[#E1C783] hover:text-[#C6A052] flex items-center gap-1"
                >
                  <span>View Highway Route</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Proximity Highlights */}
      <section className="py-16 bg-[#171717] border-y border-[#30271D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-[0.2em] text-[#C6A052] font-semibold block mb-1">
              Gateway Location
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F0E7]">
              Key Landmarks From Our Gate
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {HOTEL_INFO.landmarks.map((landmark, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#090909] border border-[#30271D] text-center space-y-1"
              >
                <MapPin className="w-4 h-4 text-[#C6A052] mx-auto mb-1" />
                <span className="font-serif text-sm font-bold text-[#F5F0E7] block">
                  {landmark.name}
                </span>
                <span className="text-[11px] text-[#C6A052] block font-medium">
                  {landmark.distance}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={onOpenBooking}
              className="px-8 py-3.5 rounded bg-gradient-to-r from-[#C6A052] to-[#E1C783] text-[#090909] font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              Plan Your Stay & Excursions
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
