import React, { useState } from 'react';
import { PageId } from '../types';
import { VENUES_DATA, HOTEL_INFO } from '../data/hotelData';
import { DecorativeDivider, DecorativeCrown } from '../components/common/DecorativeLaurel';
import { Sparkles, Users, Calendar, CheckCircle2, Phone, ShieldCheck } from 'lucide-react';
import { adminApi } from '../services/adminApi';

interface EventsPageProps {
  onNavigate: (page: PageId) => void;
}

export const EventsPage: React.FC<EventsPageProps> = () => {
  const [eventType, setEventType] = useState('Wedding & Reception');
  const [eventDate, setEventDate] = useState('');
  const [guestCount, setGuestCount] = useState('300 - 600 Guests');
  const [preferredVenue, setPreferredVenue] = useState('The Royal Grand Lawn & Marriage Garden');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [requirements, setRequirements] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionRef, setSubmissionRef] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim()) {
      setError('Please provide your full name');
      return;
    }
    if (!phone.trim() || phone.length < 10) {
      setError('Please provide a valid 10-digit mobile number');
      return;
    }
    if (!eventDate) {
      setError('Please select an event date');
      return;
    }

    setIsSubmitting(true);
    const ref = `SEP-EVT-${Math.floor(1000 + Math.random() * 9000)}`;

    adminApi.submitPublicEnquiry({
      type: 'wedding_event',
      customerName: fullName.trim(),
      phone: phone.trim(),
      eventDate,
      eventGuests: guestCount,
      venueName: preferredVenue,
      specialRequests: `${requirements ? requirements + ' | ' : ''}Event: ${eventType}, Ref: ${ref}`
    }).catch(err => console.log('Event enquiry logged:', err));

    setTimeout(() => {
      setSubmissionRef(ref);
      setIsSubmitting(false);
    }, 700);
  };

  const handleReset = () => {
    setSubmissionRef(null);
    setFullName('');
    setPhone('');
    setEventDate('');
    setRequirements('');
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Shaan-E-Punjab Event Team! I am planning a celebration:\nRef: ${submissionRef || 'NEW-EVENT'}\nType: ${eventType}\nDate: ${eventDate}\nGuests: ${guestCount}\nVenue: ${preferredVenue}\nName: ${fullName}\nPhone: ${phone}`
  );

  return (
    <div className="bg-[#090909] text-[#F5F0E7] pt-24 pb-20">
      {/* Hero */}
      <section className="relative py-16 lg:py-20 border-b border-[#30271D]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <DecorativeCrown className="w-5 h-5 text-[#C6A052]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#C6A052] font-semibold">
              GRAND CELEBRATIONS & BANQUETS
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-normal tracking-[0.03em] text-[#F5F0E7] max-w-2xl sm:max-w-3xl mx-auto leading-relaxed text-balance mb-4">
            Weddings & Celebrations of Royal Grandeur
          </h1>

          <p className="font-sans text-sm sm:text-base text-[#F5F0E7]/80 max-w-2xl mx-auto font-light leading-relaxed">
            A 25,000 sq. ft. landscaped marriage lawn, air-conditioned banquet ballrooms, and bespoke North Indian culinary catering on NH-19 Dhanbad.
          </p>

          <DecorativeDivider className="my-8" />
        </div>
      </section>

      {/* Venues Showcase */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs uppercase tracking-[0.2em] text-[#C6A052] font-semibold block mb-1">
            Celebration Spaces
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F5F0E7]">
            Our Event Venues
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {VENUES_DATA.map((venue) => (
            <div
              key={venue.id}
              className="rounded-2xl bg-[#171717] border border-[#30271D] overflow-hidden flex flex-col justify-between hover:border-[#C6A052]/60 transition-all"
            >
              <div>
                <div className="relative h-60">
                  <img
                    src={venue.imageUrl}
                    alt={venue.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded bg-[#090909]/85 backdrop-blur-sm border border-[#C6A052]/40 text-xs text-[#E1C783] font-semibold flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    <span>{venue.capacity}</span>
                  </div>
                </div>

                <div className="p-6">
                  <span className="text-[10px] uppercase tracking-wider text-[#C6A052] font-semibold block mb-1">
                    {venue.type}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#F5F0E7] mb-2">
                    {venue.name}
                  </h3>
                  <p className="text-xs text-[#F5F0E7]/70 leading-relaxed font-light mb-4">
                    {venue.description}
                  </p>

                  <div className="space-y-1.5 border-t border-[#30271D]/60 pt-3 text-xs">
                    {venue.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-[#F5F0E7]/70">
                        <span className="text-[#C6A052] text-xs">✦</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => {
                    setPreferredVenue(venue.name);
                    const el = document.getElementById('wedding-enquiry-form');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-2.5 rounded border border-[#C6A052] text-[#E1C783] hover:bg-[#C6A052] hover:text-[#090909] text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Enquire For This Venue
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Wedding Enquiry Form */}
      <section id="wedding-enquiry-form" className="py-16 bg-[#171717] border-y border-[#30271D]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C6A052] font-semibold block mb-2">
              Plan Your Date
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F5F0E7]">
              Wedding & Event Enquiry Desk
            </h2>
            <p className="text-xs text-[#F5F0E7]/70 mt-2">
              Our banquet managers will review your requested dates, catering preferences, and guest estimates.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-[#090909] border border-[#C6A052]/40 shadow-2xl">
            {submissionRef ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#C6A052]/10 border border-[#C6A052] text-[#C6A052] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#F5F0E7]">
                  Enquiry Received with Honor
                </h3>
                <p className="text-xs sm:text-sm text-[#F5F0E7]/80 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{fullName}</strong>. Your celebration enquiry has been recorded under reference{' '}
                  <strong className="text-[#E1C783] font-mono">{submissionRef}</strong>. Our senior banquet director will connect with you at{' '}
                  <span className="text-[#E1C783]">{phone}</span> to discuss muhurat availability and bespoke arrangements.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={`https://wa.me/${HOTEL_INFO.whatsapp}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 rounded bg-gradient-to-r from-[#C6A052] to-[#E1C783] text-[#090909] font-bold text-xs tracking-wider uppercase hover:opacity-90 transition-opacity shadow-lg shadow-black/50"
                  >
                    Direct Message via WhatsApp
                  </a>
                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto px-6 py-3 rounded border border-[#C6A052] text-[#E1C783] font-semibold text-xs tracking-wider uppercase hover:bg-[#C6A052] hover:text-[#090909] transition-all"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 rounded bg-red-950/60 border border-red-700/50 text-red-200 text-xs">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#C6A052] mb-1 font-medium">
                      Event Type *
                    </label>
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="w-full bg-[#171717] border border-[#30271D] rounded px-3 py-2 text-xs text-[#F5F0E7] focus:outline-none focus:border-[#C6A052]"
                    >
                      <option value="Wedding & Reception">Wedding & Reception</option>
                      <option value="Ring Ceremony / Sangeet">Ring Ceremony / Sangeet</option>
                      <option value="Anniversary Celebration">Anniversary Celebration</option>
                      <option value="Corporate Off-site / Dealer Meet">Corporate Off-site / Dealer Meet</option>
                      <option value="Family Milestone / Birthday">Family Milestone / Birthday</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#C6A052] mb-1 font-medium flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> Proposed Date *
                    </label>
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full bg-[#171717] border border-[#30271D] rounded px-3 py-2 text-xs text-[#F5F0E7] focus:outline-none focus:border-[#C6A052]"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#C6A052] mb-1 font-medium flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" /> Estimated Guest Count
                    </label>
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      className="w-full bg-[#171717] border border-[#30271D] rounded px-3 py-2 text-xs text-[#F5F0E7] focus:outline-none focus:border-[#C6A052]"
                    >
                      <option value="50 - 150 Guests">50 - 150 Guests (Intimate / Corporate)</option>
                      <option value="150 - 350 Guests">150 - 350 Guests (AC Banquet)</option>
                      <option value="350 - 700 Guests">350 - 700 Guests (Lawn & Hall Combo)</option>
                      <option value="700 - 1500+ Guests">700 - 1500+ Guests (Grand Marriage Lawn)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#C6A052] mb-1 font-medium">
                      Preferred Venue Space
                    </label>
                    <select
                      value={preferredVenue}
                      onChange={(e) => setPreferredVenue(e.target.value)}
                      className="w-full bg-[#171717] border border-[#30271D] rounded px-3 py-2 text-xs text-[#F5F0E7] focus:outline-none focus:border-[#C6A052]"
                    >
                      {VENUES_DATA.map((v) => (
                        <option key={v.id} value={v.name}>
                          {v.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#C6A052] mb-1 font-medium">
                      Host Full Name *
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Sardar Gurpreet Singh"
                      className="w-full bg-[#171717] border border-[#30271D] rounded px-3 py-2 text-xs text-[#F5F0E7] focus:outline-none focus:border-[#C6A052]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#C6A052] mb-1 font-medium">
                      Mobile Contact Number *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 94311 22880"
                      className="w-full bg-[#171717] border border-[#30271D] rounded px-3 py-2 text-xs text-[#F5F0E7] focus:outline-none focus:border-[#C6A052]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#C6A052] mb-1 font-medium">
                    Catering Preferences & Custom Decor Notes
                  </label>
                  <textarea
                    rows={3}
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    placeholder="e.g. Live tandoor counter, Pure Jain food section, stage decoration ideas, guest accommodation rooms needed"
                    className="w-full bg-[#171717] border border-[#30271D] rounded px-3 py-2 text-xs text-[#F5F0E7] focus:outline-none focus:border-[#C6A052]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div className="text-[11px] text-[#F5F0E7]/50 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C6A052]" />
                    Direct management pricing without third-party commission
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-7 py-3 rounded bg-gradient-to-r from-[#C6A052] to-[#E1C783] text-[#090909] font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Request Banquet Proposal'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
