import React from 'react';
import { PageId } from '../types';
import { ROOMS_DATA, HOTEL_INFO } from '../data/hotelData';
import { DecorativeDivider, DecorativeCrown } from '../components/common/DecorativeLaurel';
import { BedDouble, Users, Maximize2, ShieldCheck, Check, Clock, FileText } from 'lucide-react';

interface RoomsPageProps {
  onNavigate: (page: PageId) => void;
  onOpenBooking: (roomId?: string) => void;
}

export const RoomsPage: React.FC<RoomsPageProps> = ({ onOpenBooking }) => {
  return (
    <div className="bg-[#090909] text-[#F5F0E7] pt-24 pb-20">
      {/* Rooms Hero */}
      <section className="relative py-16 lg:py-20 border-b border-[#30271D]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <DecorativeCrown className="w-5 h-5 text-[#C6A052]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#C6A052] font-semibold">
              ACCOMMODATIONS & SANCTUARY
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-normal tracking-[0.03em] text-[#F5F0E7] max-w-2xl sm:max-w-3xl mx-auto leading-relaxed text-balance mb-4">
            Rooms & Suites Designed for Deep Rest
          </h1>

          <p className="font-sans text-sm sm:text-base text-[#F5F0E7]/80 max-w-2xl mx-auto font-light leading-relaxed">
            Quiet, climate-controlled sanctuaries equipped with plush bedding, acoustic insulation, and 24-hour service along NH-19 Topchanchi.
          </p>

          <DecorativeDivider className="my-8" />
        </div>
      </section>

      {/* Room Cards List */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {ROOMS_DATA.map((room, idx) => (
          <div
            key={room.id}
            className={`p-6 sm:p-8 rounded-2xl bg-[#171717] border border-[#30271D] hover:border-[#C6A052]/50 transition-all grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
              idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Image Container */}
            <div className="lg:col-span-6 relative rounded-xl overflow-hidden shadow-xl h-72 sm:h-96">
              <img
                src={room.imageUrl}
                alt={room.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded bg-[#090909]/85 backdrop-blur-sm border border-[#C6A052]/40 text-xs font-serif font-bold text-[#E1C783]">
                ₹{room.pricePerNight} <span className="text-[10px] font-sans font-normal text-[#F5F0E7]/60">/ night + GST</span>
              </div>
            </div>

            {/* Room Details */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#C6A052] font-semibold block mb-1">
                  Verified Room Tier
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F0E7]">
                  {room.name}
                </h2>
                <p className="font-serif italic text-xs text-[#E1C783]/80 mt-1">
                  {room.tagline}
                </p>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-3 gap-3 py-3 border-y border-[#30271D] text-xs">
                <div className="flex items-center gap-2">
                  <BedDouble className="w-4 h-4 text-[#C6A052]" />
                  <span>{room.bedType}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#C6A052]" />
                  <span>{room.occupancy}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Maximize2 className="w-4 h-4 text-[#C6A052]" />
                  <span>{room.sizeSqFt} sq. ft.</span>
                </div>
              </div>

              <p className="text-xs text-[#F5F0E7]/80 leading-relaxed font-light">
                {room.description}
              </p>

              {/* Amenities Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {room.amenities.map((am, i) => (
                  <div key={i} className="flex items-center gap-2 text-[#F5F0E7]/70">
                    <Check className="w-3.5 h-3.5 text-[#C6A052] shrink-0" />
                    <span>{am}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={() => onOpenBooking(room.id)}
                  className="w-full sm:w-auto px-7 py-3 rounded bg-gradient-to-r from-[#C6A052] to-[#E1C783] text-[#090909] font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity"
                >
                  Book This Room
                </button>
                <span className="text-[11px] text-[#F5F0E7]/50 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#C6A052]" />
                  No advance payment needed · Pay at check-in
                </span>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Verified Stay Policies */}
      <section className="py-16 bg-[#171717] border-y border-[#30271D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-[0.2em] text-[#C6A052] font-semibold block mb-1">
              Guest Guidelines
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F0E7]">
              Stay Policies & Terms
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="p-6 rounded-xl bg-[#090909] border border-[#30271D] space-y-2">
              <div className="flex items-center gap-2 text-[#C6A052] font-semibold text-sm">
                <Clock className="w-4 h-4" />
                <span>Check-in & Check-out</span>
              </div>
              <p className="text-[#F5F0E7]/70 leading-relaxed">
                Check-in from <strong>{HOTEL_INFO.policies.checkInTime}</strong>; Check-out by <strong>{HOTEL_INFO.policies.checkOutTime}</strong>. 24-hour reception is open to assist late night highway arrivals.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#090909] border border-[#30271D] space-y-2">
              <div className="flex items-center gap-2 text-[#C6A052] font-semibold text-sm">
                <FileText className="w-4 h-4" />
                <span>Government ID Verification</span>
              </div>
              <p className="text-[#F5F0E7]/70 leading-relaxed">
                {HOTEL_INFO.policies.idRequirement} Local & outstation travelers must provide matching IDs per statutory norms.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#090909] border border-[#30271D] space-y-2">
              <div className="flex items-center gap-2 text-[#C6A052] font-semibold text-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>Transparent Cancellation</span>
              </div>
              <p className="text-[#F5F0E7]/70 leading-relaxed">
                {HOTEL_INFO.policies.cancellation} Modify your booking with no extra penalty upon notice.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
