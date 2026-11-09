import React from 'react';
import { PageId } from '../types';
import { HOTEL_INFO } from '../data/hotelData';
import { DecorativeDivider, DecorativeCrown } from '../components/common/DecorativeLaurel';
import { MapPin, Navigation, Compass, ExternalLink, Phone, Car, Clock, ShieldCheck } from 'lucide-react';

interface LocationPageProps {
  onNavigate: (page: PageId) => void;
  onOpenBooking: () => void;
}

export const LocationPage: React.FC<LocationPageProps> = ({ onOpenBooking }) => {
  return (
    <div className="bg-[#090909] text-[#F5F0E7] pt-24 pb-20">
      {/* Hero */}
      <section className="relative py-16 lg:py-20 border-b border-[#30271D]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <DecorativeCrown className="w-5 h-5 text-[#C6A052]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#C6A052] font-semibold">
              HIGHWAY ACCESS & GPS COORDINATES
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-normal tracking-[0.03em] text-[#F5F0E7] max-w-2xl sm:max-w-3xl mx-auto leading-relaxed text-balance mb-4">
            A Landmark Destination Along NH-19
          </h1>

          <p className="font-sans text-sm sm:text-base text-[#F5F0E7]/80 max-w-2xl mx-auto font-light leading-relaxed">
            Conveniently positioned on the four-lane Delhi-Kolkata Grand Trunk corridor, adjacent to Topchanchi Lake and Parasnath foothills.
          </p>

          <DecorativeDivider className="my-8" />
        </div>
      </section>

      {/* Main Map & Address Card Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Address, Coordinates & Directions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-[#171717] border border-[#C6A052]/40 shadow-xl space-y-4">
              <span className="text-[10px] uppercase tracking-widest text-[#C6A052] font-semibold block">
                Official Property Address
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#F5F0E7]">
                Shaan-E-Punjab Hotel & Resort
              </h2>
              <p className="text-xs text-[#F5F0E7]/80 leading-relaxed font-light">
                {HOTEL_INFO.address}
              </p>

              <div className="grid grid-cols-2 gap-3 py-3 border-y border-[#30271D] text-xs">
                <div>
                  <span className="text-[#F5F0E7]/50 block text-[10px]">GPS Latitude</span>
                  <span className="font-mono text-[#E1C783] font-semibold">{HOTEL_INFO.coordinates.lat}</span>
                </div>
                <div>
                  <span className="text-[#F5F0E7]/50 block text-[10px]">GPS Longitude</span>
                  <span className="font-mono text-[#E1C783] font-semibold">{HOTEL_INFO.coordinates.lng}</span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#C6A052]" />
                  <a href={`tel:${HOTEL_INFO.phonePrimary}`} className="text-[#F5F0E7] hover:text-[#E1C783]">
                    {HOTEL_INFO.phonePrimary}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#C6A052]" />
                  <span>24 Hours Open Reception Desk</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={HOTEL_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded bg-gradient-to-r from-[#C6A052] to-[#E1C783] text-[#090909] font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Open in Google Maps App</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Travel Times from Major Cities */}
            <div className="p-6 rounded-2xl bg-[#171717] border border-[#30271D] space-y-3">
              <span className="text-xs uppercase tracking-wider text-[#C6A052] font-semibold block">
                Driving Distances & Times
              </span>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-[#30271D]">
                  <span className="text-[#F5F0E7]/80">From Dhanbad City Center</span>
                  <span className="text-[#E1C783] font-semibold">34 km · ~45 mins</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#30271D]">
                  <span className="text-[#F5F0E7]/80">From Parasnath Railway Stn</span>
                  <span className="text-[#E1C783] font-semibold">16.5 km · ~20 mins</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#30271D]">
                  <span className="text-[#F5F0E7]/80">From Bokaro Steel City</span>
                  <span className="text-[#E1C783] font-semibold">48 km · ~1 hr 10 mins</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#30271D]">
                  <span className="text-[#F5F0E7]/80">From Asansol, West Bengal</span>
                  <span className="text-[#E1C783] font-semibold">95 km · ~1 hr 45 mins</span>
                </div>
                <div className="flex justify-between pt-1.5">
                  <span className="text-[#F5F0E7]/80">From Ranchi Capital</span>
                  <span className="text-[#E1C783] font-semibold">160 km · ~3 hrs 30 mins</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Embedded Map View */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl overflow-hidden border border-[#C6A052]/40 shadow-2xl bg-[#171717]">
              {/* Responsive Google Maps Iframe */}
              <iframe
                title="Shaan-E-Punjab Hotel & Resort Location on NH-19 Topchanchi"
                src="https://maps.google.com/maps?q=Topchanchi,+Dhanbad,+Jharkhand&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="450"
                style={{ border: 0, filter: 'contrast(1.1) brightness(0.9)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
              <div className="p-4 bg-[#090909] border-t border-[#30271D] flex flex-col sm:flex-row items-center justify-between text-xs gap-3">
                <div className="flex items-center gap-2 text-[#C6A052]">
                  <Car className="w-4 h-4" />
                  <span>Direct NH-19 Entry with Dedicated Deceleration Lane</span>
                </div>
                <span className="text-[#F5F0E7]/60">Gated parking for 150+ cars</span>
              </div>
            </div>

            {/* Highway Navigational Guide */}
            <div className="p-6 rounded-2xl bg-[#171717] border border-[#30271D] space-y-3">
              <h3 className="font-serif text-lg font-bold text-[#F5F0E7]">
                How to Spot Our Resort on NH-19
              </h3>
              <p className="text-xs text-[#F5F0E7]/70 leading-relaxed font-light">
                When driving west from Dhanbad/Govindpur towards Barhi/Delhi, or driving east from Parasnath/Bagodar towards Kolkata, look for our prominent illuminated circular gold emblem near Topchanchi bypass. Direct driveway entry without negotiating tight village lanes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
