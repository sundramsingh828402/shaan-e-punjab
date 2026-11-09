import React, { useState } from 'react';
import { PageId } from '../types';
import { HOTEL_INFO, FAQS } from '../data/hotelData';
import { DecorativeDivider, DecorativeCrown } from '../components/common/DecorativeLaurel';
import { Phone, Mail, MapPin, MessageSquare, Send, CheckCircle2, ChevronDown } from 'lucide-react';
import { adminApi } from '../services/adminApi';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
  onOpenBooking: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Room Enquiry');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please provide your name');
      return;
    }
    if (!phone.trim() || phone.length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    setIsSubmitting(true);
    const ref = `SEP-MSG-${Math.floor(1000 + Math.random() * 9000)}`;

    adminApi.submitPublicEnquiry({
      type: 'contact_query',
      customerName: name.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : 'N/A',
      subject,
      message,
      specialRequests: `Subject: ${subject} | Ref: ${ref} | ${message}`
    }).catch(err => console.log('Contact message logged:', err));

    setTimeout(() => {
      setSubmittedRef(ref);
      setIsSubmitting(false);
    }, 600);
  };

  const handleReset = () => {
    setSubmittedRef(null);
    setName('');
    phone;
    setMessage('');
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Shaan-E-Punjab Hotel! I have an enquiry from your official website:\nName: ${name || 'Guest'}\nSubject: ${subject}\nPhone: ${phone}`
  );

  return (
    <div className="bg-[#090909] text-[#F5F0E7] pt-24 pb-20">
      {/* Hero */}
      <section className="relative py-16 lg:py-20 border-b border-[#30271D]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <DecorativeCrown className="w-5 h-5 text-[#C6A052]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#C6A052] font-semibold">
              GUEST CONCIERGE & DIRECT DESK
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-normal tracking-[0.03em] text-[#F5F0E7] max-w-2xl sm:max-w-3xl mx-auto leading-relaxed text-balance mb-4">
            Connect with Shaan-E-Punjab
          </h1>

          <p className="font-sans text-sm sm:text-base text-[#F5F0E7]/80 max-w-2xl mx-auto font-light leading-relaxed">
            Our front desk is staffed 24 hours a day to assist highway travelers, room bookings, dining table reservations, and grand banquet enquiries.
          </p>

          <DecorativeDivider className="my-8" />
        </div>
      </section>

      {/* Contact Cards & Form Split */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Direct Contact Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-[#171717] border border-[#30271D] space-y-4">
              <span className="text-[10px] uppercase tracking-widest text-[#C6A052] font-semibold block">
                Direct Phone Lines
              </span>
              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#C6A052] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#F5F0E7]/60 block text-[11px]">Primary Highway Desk</span>
                    <a href={`tel:${HOTEL_INFO.phonePrimary}`} className="font-serif text-base text-[#E1C783] hover:underline font-bold">
                      {HOTEL_INFO.phonePrimary}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#C6A052] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#F5F0E7]/60 block text-[11px]">Reservations & Banquets</span>
                    <a href={`tel:${HOTEL_INFO.phoneSecondary}`} className="font-serif text-base text-[#E1C783] hover:underline font-bold">
                      {HOTEL_INFO.phoneSecondary}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#171717] border border-[#30271D] space-y-4">
              <span className="text-[10px] uppercase tracking-widest text-[#C6A052] font-semibold block">
                Instant Messaging & Email
              </span>
              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3">
                  <MessageSquare className="w-4 h-4 text-[#C6A052] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#F5F0E7]/60 block text-[11px]">Direct Messaging Concierge</span>
                    <a
                      href={`https://wa.me/${HOTEL_INFO.whatsapp}?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#E1C783] hover:underline font-semibold"
                    >
                      Connect with Reception Desk on WhatsApp
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#C6A052] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#F5F0E7]/60 block text-[11px]">Official Email</span>
                    <a href={`mailto:${HOTEL_INFO.email}`} className="text-[#F5F0E7] hover:text-[#E1C783]">
                      {HOTEL_INFO.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#171717] border border-[#30271D] space-y-4">
              <span className="text-[10px] uppercase tracking-widest text-[#C6A052] font-semibold block">
                Postal & Physical Address
              </span>
              <div className="flex items-start gap-3 text-xs">
                <MapPin className="w-4 h-4 text-[#C6A052] shrink-0 mt-0.5" />
                <p className="text-[#F5F0E7]/80 leading-relaxed">
                  {HOTEL_INFO.address}
                </p>
              </div>
            </div>
          </div>

          {/* Contact & Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#171717] border border-[#C6A052]/40 shadow-2xl">
              <span className="text-[10px] uppercase tracking-widest text-[#C6A052] font-semibold block mb-1">
                Direct Inquiry Form
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F0E7] mb-6">
                Send Us a Message
              </h2>

              {submittedRef ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#C6A052]/10 border border-[#C6A052] text-[#C6A052] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#F5F0E7]">
                    Message Sent Successfully
                  </h3>
                  <p className="text-xs text-[#F5F0E7]/80 max-w-sm mx-auto leading-relaxed">
                    Thank you, <strong>{name}</strong>. Your message reference is{' '}
                    <strong className="text-[#E1C783] font-mono">{submittedRef}</strong>. Our front office manager will reach out shortly.
                  </p>
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded border border-[#C6A052] text-[#C6A052] font-semibold text-xs tracking-wider uppercase hover:bg-[#C6A052] hover:text-[#090909] transition-all"
                  >
                    Send Another Message
                  </button>
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
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Amit Sharma"
                        className="w-full bg-[#090909] border border-[#30271D] rounded px-3 py-2 text-xs text-[#F5F0E7] focus:outline-none focus:border-[#C6A052]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#C6A052] mb-1 font-medium">
                        Mobile Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 94311 22880"
                        className="w-full bg-[#090909] border border-[#30271D] rounded px-3 py-2 text-xs text-[#F5F0E7] focus:outline-none focus:border-[#C6A052]"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#C6A052] mb-1 font-medium">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@domain.com"
                        className="w-full bg-[#090909] border border-[#30271D] rounded px-3 py-2 text-xs text-[#F5F0E7] focus:outline-none focus:border-[#C6A052]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#C6A052] mb-1 font-medium">
                        Inquiry Purpose
                      </label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full bg-[#090909] border border-[#30271D] rounded px-3 py-2 text-xs text-[#F5F0E7] focus:outline-none focus:border-[#C6A052]"
                      >
                        <option value="Room Reservation">Room Reservation</option>
                        <option value="Banquet & Marriage Lawn">Banquet & Marriage Lawn</option>
                        <option value="Restaurant / Bulk Dining">Restaurant / Bulk Dining</option>
                        <option value="Corporate Off-site">Corporate Off-site</option>
                        <option value="General Highway Assistance">General Highway Assistance</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#C6A052] mb-1 font-medium">
                      Your Message or Request
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please describe your dates, party size, or specific requirements..."
                      className="w-full bg-[#090909] border border-[#30271D] rounded px-3 py-2 text-xs text-[#F5F0E7] focus:outline-none focus:border-[#C6A052]"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-7 py-3 rounded bg-gradient-to-r from-[#C6A052] to-[#E1C783] text-[#090909] font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity flex items-center gap-2 disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSubmitting ? 'Transmitting...' : 'Send Message'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Accordion */}
      <section className="py-16 bg-[#171717] border-y border-[#30271D]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-[0.2em] text-[#C6A052] font-semibold block mb-1">
              Common Questions
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F0E7]">
              Guest Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-[#090909] border border-[#30271D] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-[#F5F0E7] hover:text-[#E1C783] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#C6A052] transition-transform duration-200 ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4 text-xs text-[#F5F0E7]/70 leading-relaxed border-t border-[#30271D]/40 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
