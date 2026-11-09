import React, { useState } from 'react';
import { X, Calendar, Clock, Users, Utensils, CheckCircle2 } from 'lucide-react';
import { HOTEL_INFO } from '../../data/hotelData';
import { ShaanLogo } from './ShaanLogo';
import { adminApi } from '../../services/adminApi';

interface TableBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TableBookingModal: React.FC<TableBookingModalProps> = ({ isOpen, onClose }) => {
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);
  const [timeSlot, setTimeSlot] = useState('08:00 PM');
  const [guests, setGuests] = useState(4);
  const [seatingArea, setSeatingArea] = useState('indoor-ac');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialNote, setSpecialNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState<string | null>(null);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!guestName.trim()) {
      setError('Please provide your name');
      return;
    }
    if (!guestPhone.trim() || guestPhone.length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    setIsSubmitting(true);
    const ref = `SEP-TBL-${Math.floor(1000 + Math.random() * 9000)}`;

    adminApi.submitPublicEnquiry({
      type: 'table_reservation',
      customerName: guestName.trim(),
      phone: guestPhone.trim(),
      guests,
      tableTime: `${date} at ${timeSlot}`,
      diningType: seatingArea === 'indoor-ac' ? 'Indoor AC Dining' : 'Lawn / Open Courtyard',
      specialRequests: `${specialNote ? specialNote + ' | ' : ''}Ref: ${ref}`
    }).catch(err => console.log('Table enquiry logged:', err));

    setTimeout(() => {
      setBookingRef(ref);
      setIsSubmitting(false);
    }, 600);
  };

  const handleReset = () => {
    setBookingRef(null);
    setGuestName('');
    setGuestPhone('');
    setSpecialNote('');
    onClose();
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Shaan-E-Punjab Restaurant! I would like to reserve a table:\nRef: ${bookingRef || 'NEW-TABLE'}\nDate: ${date}\nTime: ${timeSlot}\nGuests: ${guests}\nArea: ${seatingArea}\nName: ${guestName}\nPhone: ${guestPhone}`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#171717] border border-[#C6A052]/40 rounded-xl shadow-2xl p-6 sm:p-8 my-8 text-[#F5F0E7]">
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 text-[#F5F0E7]/60 hover:text-[#C6A052] transition-colors p-2"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {bookingRef ? (
          <div className="py-4 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#C6A052]/10 border border-[#C6A052] text-[#C6A052] mb-3">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <span className="text-xs uppercase tracking-widest text-[#C6A052] block font-semibold mb-1">
              Table Reservation Requested
            </span>
            <h3 className="font-serif text-2xl text-[#F5F0E7] font-bold mb-2">
              We Look Forward to Welcoming You
            </h3>
            <p className="text-xs text-[#F5F0E7]/80 max-w-sm mx-auto mb-5">
              Your table reference is <strong className="text-[#E1C783] font-mono">{bookingRef}</strong> for {guests} guests on {date} at {timeSlot}.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/${HOTEL_INFO.whatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded bg-gradient-to-r from-[#C6A052] to-[#E1C783] text-[#090909] font-bold text-xs tracking-wider uppercase hover:opacity-90 transition-opacity shadow-lg shadow-black/50"
              >
                Send via WhatsApp
              </a>
              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-5 py-2.5 rounded border border-[#C6A052] text-[#E1C783] font-semibold text-xs tracking-wider uppercase hover:bg-[#C6A052] hover:text-[#090909] transition-all"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <ShaanLogo size="sm" showText={false} />
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C6A052] font-bold block">
                  Fine Dining & Family Rest Stop
                </span>
                <h2 className="font-serif text-2xl text-[#F5F0E7] font-semibold">
                  Reserve a Dining Table
                </h2>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded bg-red-950/60 border border-red-700/50 text-red-200 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#C6A052] mb-1 font-medium flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#090909] border border-[#30271D] rounded px-3 py-2 text-xs text-[#F5F0E7] focus:outline-none focus:border-[#C6A052]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#C6A052] mb-1 font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Time Slot
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full bg-[#090909] border border-[#30271D] rounded px-3 py-2 text-xs text-[#F5F0E7] focus:outline-none focus:border-[#C6A052]"
                  >
                    <option value="12:30 PM">12:30 PM (Lunch)</option>
                    <option value="01:30 PM">01:30 PM (Lunch)</option>
                    <option value="02:30 PM">02:30 PM (Lunch)</option>
                    <option value="07:30 PM">07:30 PM (Dinner)</option>
                    <option value="08:30 PM">08:30 PM (Dinner)</option>
                    <option value="09:30 PM">09:30 PM (Dinner)</option>
                    <option value="10:30 PM">10:30 PM (Late Dinner)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#C6A052] mb-1 font-medium flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" /> Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full bg-[#090909] border border-[#30271D] rounded px-3 py-2 text-xs text-[#F5F0E7] focus:outline-none focus:border-[#C6A052]"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20].map((num) => (
                      <option key={num} value={num}>
                        {num} Guests
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#C6A052] mb-1 font-medium flex items-center gap-1">
                    <Utensils className="w-3.5 h-3.5" /> Seating Area
                  </label>
                  <select
                    value={seatingArea}
                    onChange={(e) => setSeatingArea(e.target.value)}
                    className="w-full bg-[#090909] border border-[#30271D] rounded px-3 py-2 text-xs text-[#F5F0E7] focus:outline-none focus:border-[#C6A052]"
                  >
                    <option value="indoor-ac">Royal AC Dining Hall</option>
                    <option value="family-section">Private Family Section</option>
                    <option value="highway-breeze-veranda">Open Veranda & Garden</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#C6A052] mb-1 font-medium">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g. Sardar Harpreet Singh"
                  className="w-full bg-[#090909] border border-[#30271D] rounded px-3 py-2 text-xs text-[#F5F0E7] focus:outline-none focus:border-[#C6A052]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#C6A052] mb-1 font-medium">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  placeholder="+91 94311 22880"
                  className="w-full bg-[#090909] border border-[#30271D] rounded px-3 py-2 text-xs text-[#F5F0E7] focus:outline-none focus:border-[#C6A052]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#C6A052] mb-1 font-medium">
                  Dietary Preferences / Occasion
                </label>
                <input
                  type="text"
                  value={specialNote}
                  onChange={(e) => setSpecialNote(e.target.value)}
                  placeholder="e.g. Birthday celebration, Pure Jain food request"
                  className="w-full bg-[#090909] border border-[#30271D] rounded px-3 py-2 text-xs text-[#F5F0E7] focus:outline-none focus:border-[#C6A052]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 text-xs uppercase tracking-wider text-[#F5F0E7]/60 hover:text-[#F5F0E7] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded bg-gradient-to-r from-[#C6A052] to-[#E1C783] text-[#090909] font-semibold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity disabled:opacity-50"
                >
                  {isSubmitting ? 'Reserving...' : 'Confirm Table Request'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
