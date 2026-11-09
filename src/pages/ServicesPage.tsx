import React from 'react';
import { PageId } from '../types';
import { HOTEL_INFO } from '../data/hotelData';
import { DecorativeDivider, DecorativeCrown } from '../components/common/DecorativeLaurel';
import {
  ShieldCheck,
  Utensils,
  Car,
  Compass,
  Sparkles,
  Wifi,
  Clock,
  Coffee,
  CheckCircle,
  ArrowRight,
  Phone
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: PageId) => void;
  onOpenBooking: () => void;
  onOpenTableBooking: () => void;
}

const SERVICES_LIST = [
  {
    icon: Utensils,
    title: '24/7 Highway Dining & In-Room Service',
    description: 'Round-the-clock culinary service featuring slow-simmered Punjabi gravies, clay-tandoor flatbreads, and hot refreshments delivered straight to your room or table.'
  },
  {
    icon: Car,
    title: 'Guarded 24/7 Highway Parking',
    description: 'Spacious, gated compound accommodating over 150 private cars, luxury coaches, and wedding convoys under continuous security surveillance and CCTV monitoring.'
  },
  {
    icon: Compass,
    title: 'Shikharji (Parasnath) Travel Concierge',
    description: 'Specialized assistance for Jain pilgrims and trekkers to Parasnath Hills: early morning vehicle transfers, trekking tips, and pure-veg packed meals prepared without onion or garlic.'
  },
  {
    icon: Sparkles,
    title: 'Royal Banquets & Event Planning',
    description: 'End-to-end wedding and corporate event management across our 25,000 sq. ft. landscaped marriage lawn and air-conditioned Kohinoor Banquet Hall.'
  },
  {
    icon: ShieldCheck,
    title: 'Pure Vegetarian & Jain Kitchen Facilities',
    description: 'Dedicated cookware, separate gravies, and meticulous cleanliness ensuring strict dietary compliance for discerning pilgrimage travelers.'
  },
  {
    icon: Clock,
    title: '24-Hour Hot Water & Dual Power Backup',
    description: 'Uninterrupted power generator backup and high-capacity automatic geysers ensuring hot showers and climate-controlled comfort any time of day or night.'
  },
  {
    icon: Wifi,
    title: 'High-Speed Wi-Fi & Executive Workspace',
    description: 'Complimentary high-bandwidth fiber connectivity across all suites and restaurant dining areas, allowing seamless remote work and digital meetings.'
  },
  {
    icon: Coffee,
    title: 'Highway Express Counter & Tea Lounge',
    description: 'Freshly brewed kulhad chai, mineral water, travel snacks, and quick packaging for travelers on tight schedules between Kolkata and Delhi.'
  }
];

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigate,
  onOpenBooking,
  onOpenTableBooking
}) => {
  return (
    <div className="bg-[#090909] text-[#F5F0E7] pt-24 pb-20">
      {/* Hero Header */}
      <section className="relative py-16 lg:py-24 border-b border-[#30271D]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <DecorativeCrown className="w-5 h-5 text-[#C6A052]" />
            <span className="text-xs uppercase tracking-[0.28em] text-[#C6A052] font-semibold">
              FIVE-STAR HOSPITALITY STANDARDS
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-[0.02em] text-[#F5F0E7] leading-tight mb-5">
            Resort Services & Amenities
          </h1>

          <p className="font-sans text-sm sm:text-base text-[#F5F0E7]/80 max-w-2xl mx-auto font-light leading-relaxed">
            Crafted for discerning Grand Trunk Road travelers, leisure guests, and celebration hosts seeking uncompromised comfort along NH-19 Topchanchi.
          </p>

          <DecorativeDivider className="my-8" />
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_LIST.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#171717] border border-[#30271D] hover:border-[#C6A052]/60 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#30271D] to-[#090909] border border-[#C6A052]/40 flex items-center justify-center text-[#E1C783] mb-5 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-[#F5F0E7] group-hover:text-[#E1C783] transition-colors mb-2">
                    {svc.title}
                  </h3>
                  <p className="font-sans text-xs text-[#F5F0E7]/70 leading-relaxed font-light">
                    {svc.description}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#30271D]/40 flex items-center gap-1.5 text-xs text-[#C6A052]">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Complimentary for in-house guests</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Fast Action Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 my-10">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#171717] via-[#211B14] to-[#171717] border border-[#C6A052]/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C6A052] font-semibold">
              24/7 HELPDESK & CONCIERGE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#F5F0E7]">
              Need Personalized Arrangements?
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#F5F0E7]/70 font-light">
              Connect directly with our 24-hour reception desk for early check-in, highway directions, or event bookings.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-[#C6A052] to-[#E1C783] text-[#090909] font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity"
            >
              Book A Room
            </button>
            <a
              href={`tel:${HOTEL_INFO.phonePrimary}`}
              className="w-full sm:w-auto px-6 py-3 rounded-full border border-[#C6A052] text-[#E1C783] hover:bg-[#C6A052]/10 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Reception</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
