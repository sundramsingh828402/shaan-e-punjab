import React from 'react';
import { PageId } from '../../types';
import { ShaanLogo } from './ShaanLogo';
import { HOTEL_INFO } from '../../data/hotelData';
import { MapPin, Phone, Mail, Navigation, Clock, ShieldCheck } from 'lucide-react';
import { DecorativeDivider } from './DecorativeLaurel';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  return (
    <footer className="bg-[#090909] border-t border-[#C6A052]/30 text-[#F5F0E7] relative">
      {/* Top subtle gold glow line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#C6A052]/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand & Logo */}
          <div className="space-y-4">
            <ShaanLogo size="md" onClick={() => onNavigate('home')} />
            <p className="text-xs text-[#F5F0E7]/70 leading-relaxed font-light">
              Shaan-E-Punjab Hotel & Resort is the premier royal hospitality landmark on NH-19 near Topchanchi Lake. Offering luxurious comfort, traditional Punjabi flavours, and grand celebration venues.
            </p>
            <div className="pt-2">
              <span className="text-[11px] text-[#C6A052] font-semibold tracking-wider uppercase block mb-1">
                24/7 Highway Sanctuary
              </span>
              <p className="text-[11px] text-[#F5F0E7]/50">
                Safe, CCTV-monitored parking for travelers driving Delhi-Kolkata corridor.
              </p>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#C6A052] font-semibold block">
              Explore Resort
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="text-[#F5F0E7]/70 hover:text-[#E1C783] transition-colors"
                >
                  About Our Legacy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('rooms')}
                  className="text-[#F5F0E7]/70 hover:text-[#E1C783] transition-colors"
                >
                  Luxury Rooms & Suites
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('restaurant')}
                  className="text-[#F5F0E7]/70 hover:text-[#E1C783] transition-colors"
                >
                  Authentic Punjabi Dining
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('events')}
                  className="text-[#F5F0E7]/70 hover:text-[#E1C783] transition-colors"
                >
                  Weddings & Marriage Gardens
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('experiences')}
                  className="text-[#F5F0E7]/70 hover:text-[#E1C783] transition-colors"
                >
                  Topchanchi Lake & Leisure
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="text-[#F5F0E7]/70 hover:text-[#E1C783] transition-colors"
                >
                  Photo Gallery & Lightbox
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Highway Location */}
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#C6A052] font-semibold block">
              Verified Contact
            </span>
            <div className="space-y-2.5 text-xs text-[#F5F0E7]/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C6A052] shrink-0 mt-0.5" />
                <span className="leading-snug">{HOTEL_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C6A052] shrink-0" />
                <a href={`tel:${HOTEL_INFO.phonePrimary}`} className="hover:text-[#E1C783] transition-colors">
                  {HOTEL_INFO.phonePrimary} / {HOTEL_INFO.phoneSecondary}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C6A052] shrink-0" />
                <a href={`mailto:${HOTEL_INFO.email}`} className="hover:text-[#E1C783] transition-colors">
                  {HOTEL_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#C6A052] shrink-0" />
                <span>Front Desk: 24/7 Operations</span>
              </div>
            </div>
          </div>

          {/* Column 4: Highway Access & Direct Booking */}
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#C6A052] font-semibold block">
              Highway Accessibility
            </span>
            <p className="text-xs text-[#F5F0E7]/70 leading-relaxed">
              Strategically placed on NH-19 (Old GT Road) between Dhanbad and Parasnath / Isri Bazar. Seamless access directly off the four-lane highway with spacious drive-in.
            </p>
            <div className="pt-2 space-y-2">
              <button
                onClick={() => onNavigate('location')}
                className="w-full py-2 px-3 rounded border border-[#30271D] bg-[#171717] hover:border-[#C6A052] text-xs text-[#E1C783] transition-colors flex items-center justify-center gap-1.5"
              >
                <Navigation className="w-3.5 h-3.5 text-[#C6A052]" />
                <span>View Route & GPS Coordinates</span>
              </button>
              <button
                onClick={onOpenBooking}
                className="w-full py-2 px-3 rounded bg-gradient-to-r from-[#C6A052] to-[#E1C783] text-[#090909] font-semibold text-xs tracking-wider uppercase hover:opacity-90 transition-opacity"
              >
                Direct Room Enquiry
              </button>
            </div>
          </div>
        </div>

        <DecorativeDivider className="my-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between text-[11px] text-[#F5F0E7]/50 gap-3">
          <div>
            © {new Date().getFullYear()} Shaan-E-Punjab Hotel & Resort. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 sm:gap-4">
            <button onClick={() => onNavigate('location')} className="hover:text-[#C6A052] transition-colors cursor-pointer">
              NH-19 Topchanchi, Dhanbad
            </button>
            <span>·</span>
            <button onClick={() => onNavigate('contact')} className="hover:text-[#C6A052] transition-colors cursor-pointer">
              Contact Desk
            </button>
            <span>·</span>
            <button onClick={() => onNavigate('rooms')} className="hover:text-[#C6A052] transition-colors cursor-pointer">
              Stay Policies
            </button>
            <span>·</span>
            {/* Elegant, Discreet Admin Portal Link at extreme right */}
            <button
              onClick={() => onNavigate('admin-login')}
              className="inline-flex items-center gap-1.5 text-[#F5F0E7]/40 hover:text-[#C6A052] transition-all px-2 py-0.5 rounded border border-transparent hover:border-[#C6A052]/30 hover:bg-[#C6A052]/5 group cursor-pointer"
              title="Staff & Management Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#C6A052]/70 group-hover:text-[#C6A052] transition-colors" />
              <span className="tracking-wide">Admin Login</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
