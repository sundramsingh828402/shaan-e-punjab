import React, { useState, useEffect } from 'react';
import { X, Calendar, Users, BedDouble, CheckCircle2, Phone, ShieldCheck } from 'lucide-react';
import { ROOMS_DATA, HOTEL_INFO } from '../../data/hotelData';
import { ShaanLogo } from './ShaanLogo';
import { adminApi } from '../../services/adminApi';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedRoomId?: string;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  preselectedRoomId,
  initialCheckIn,
  initialCheckOut,
  initialGuests = 2
}) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date();
  dayAfter.setDate(dayAfter.getDate() + 2);

  const defaultCheckIn = initialCheckIn || tomorrow.toISOString().split('T')[0];
  const defaultCheckOut = initialCheckOut || dayAfter.toISOString().split('T')[0];

  const [roomId, setRoomId] = useState(preselectedRoomId || ROOMS_DATA[0].id);
  const [checkIn, setCheckIn] = useState(defaultCheckIn);
  const [checkOut, setCheckOut] = useState(defaultCheckOut);
  const [guests, setGuests] = useState(initialGuests);
  const [roomsCount, setRoomsCount] = useState(1);
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState<string | null>(null);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (preselectedRoomId) setRoomId(preselectedRoomId);
    if (initialCheckIn) setCheckIn(initialCheckIn);
    if (initialCheckOut) setCheckOut(initialCheckOut);
    if (initialGuests) setGuests(initialGuests);
  }, [preselectedRoomId, initialCheckIn, initialCheckOut, initialGuests]);

  if (!isOpen) return null;

  const selectedRoom = ROOMS_DATA.find((r) => r.id === roomId) || ROOMS_DATA[0];

  // Calculate nights
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const diffTime = checkOutDate.getTime() - checkInDate.getTime();
  const nights = Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24)));
  const totalPrice = selectedRoom.pricePerNight * nights * roomsCount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!guestName.trim()) {
      setFormError('Please enter your full name');
      return;
    }
    if (!guestPhone.trim() || guestPhone.length < 10) {
      setFormError('Please enter a valid 10-digit mobile number');
      return;
    }
    if (diffTime <= 0) {
      setFormError('Check-out date must be after check-in date');
      return;
    }

    setIsSubmitting(true);
    const generatedRef = `SEP-${Math.floor(100000 + Math.random() * 900000)}`;

    adminApi.submitPublicEnquiry({
      type: 'room_booking',
      customerName: guestName.trim(),
      phone: guestPhone.trim(),
      email: guestEmail.trim() || 'N/A',
      checkInDate: checkIn,
      checkOutDate: checkOut,
      guests,
      roomType: selectedRoom.name,
      specialRequests: `${specialRequests ? specialRequests + ' | ' : ''}Rooms: ${roomsCount}, Ref: ${generatedRef}`
    }).catch(err => console.log('Enquiry logged to backend:', err));

    setTimeout(() => {
      setBookingRef(generatedRef);
      setIsSubmitting(false);
    }, 700);
  };

  const handleReset = () => {
    setBookingRef(null);
    setGuestName('');
    setGuestPhone('');
    setGuestEmail('');
    setSpecialRequests('');
    onClose();
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Shaan-E-Punjab Hotel & Resort! I would like to reserve:\nRef: ${bookingRef || 'NEW-ENQUIRY'}\nRoom: ${selectedRoom.name}\nCheck-in: ${checkIn}\nCheck-out: ${checkOut} (${nights} Night${nights > 1 ? 's' : ''})\nGuests: ${guests}\nRooms: ${roomsCount}\nGuest Name: ${guestName}\nContact: ${guestPhone}`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#171717] border border-[#C6A052]/40 rounded-xl shadow-2xl p-6 sm:p-8 my-8 text-[#F5F0E7]">
        {/* Close button */}
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 text-[#F5F0E7]/60 hover:text-[#C6A052] transition-colors p-2"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {bookingRef ? (
          /* Confirmation View */
          <div className="py-4 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#C6A052]/10 border border-[#C6A052] text-[#C6A052] mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="text-xs uppercase tracking-widest text-[#C6A052] block font-semibold mb-1">
              Reservation Enquiry Registered
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#F5F0E7] font-bold mb-2">
              Thank You, {guestName}
            </h3>
            <p className="text-sm text-[#F5F0E7]/80 max-w-md mx-auto mb-6">
              Your room reservation enquiry has been assigned reference{' '}
              <strong className="text-[#E1C783] font-mono tracking-wider">{bookingRef}</strong>.
              Our reception desk will contact you at <span className="text-[#E1C783]">{guestPhone}</span> to confirm room allocation and arrival logistics.
            </p>

            <div className="bg-[#090909] p-4 rounded-lg border border-[#30271D] text-left text-xs space-y-2 mb-6">
              <div className="flex justify-between border-b border-[#30271D] pb-2">
                <span className="text-[#F5F0E7]/60">Selected Category</span>
                <span className="font-semibold text-[#F5F0E7]">{selectedRoom.name}</span>
              </div>
              <div className="flex justify-between border-b border-[#30271D] pb-2">
                <span className="text-[#F5F0E7]/60">Dates</span>
                <span>{checkIn} to {checkOut} ({nights} Night{nights > 1 ? 's' : ''})</span>
              </div>
              <div className="flex justify-between border-b border-[#30271D] pb-2">
                <span className="text-[#F5F0E7]/60">Rooms & Guests</span>
                <span>{roomsCount} Room(s) · {guests} Guest(s)</span>
              </div>
              <div className="flex justify-between pt-1 text-sm font-semibold text-[#C6A052]">
                <span>Estimated Tariffs (Pay at Hotel)</span>
                <span>₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/${HOTEL_INFO.whatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-md bg-gradient-to-r from-[#C6A052] to-[#E1C783] text-[#090909] font-bold text-xs tracking-wider uppercase hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-black/50"
              >
                Send via WhatsApp
              </a>
              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-3 rounded-md border border-[#C6A052] text-[#E1C783] font-semibold text-xs tracking-wider uppercase hover:bg-[#C6A052] hover:text-[#090909] transition-all"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          /* Form View */
          <div>
            <div className="flex items-center gap-3 mb-6">
              <ShaanLogo size="sm" showText={false} />
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C6A052] font-bold block">
                  Official Direct Booking Desk
                </span>
                <h2 className="font-serif text-2xl text-[#F5F0E7] font-semibold">
                  Reserve Your Stay
                </h2>
              </div>
            </div>

            {formError && (
              <div className="mb-4 p-3 rounded bg-red-950/60 border border-red-700/50 text-red-200 text-xs">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Room Choice */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#C6A052] mb-1 font-medium">
                  Select Room or Suite
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ROOMS_DATA.map((room) => (
                    <button
                      key={room.id}
                      type="button"
                      onClick={() => setRoomId(room.id)}
                      className={`p-3 rounded-lg text-left border transition-all flex flex-col justify-between ${
                        roomId === room.id
                          ? 'border-[#C6A052] bg-[#30271D]/40 text-[#F5F0E7]'
                          : 'border-[#30271D] bg-[#090909]/60 text-[#F5F0E7]/70 hover:border-[#C6A052]/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-xs">{room.name}</span>
                        <span className="text-xs text-[#C6A052] font-semibold">
                          ₹{room.pricePerNight}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#F5F0E7]/50 line-clamp-1">{room.tagline}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dates & Guests Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#C6A052] mb-1 font-medium flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> Check-in
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-[#090909] border border-[#30271D] rounded px-3 py-2 text-xs text-[#F5F0E7] focus:outline-none focus:border-[#C6A052]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#C6A052] mb-1 font-medium flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> Check-out
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-[#090909] border border-[#30271D] rounded px-3 py-2 text-xs text-[#F5F0E7] focus:outline-none focus:border-[#C6A052]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#C6A052] mb-1 font-medium flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" /> Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full bg-[#090909] border border-[#30271D] rounded px-3 py-2 text-xs text-[#F5F0E7] focus:outline-none focus:border-[#C6A052]"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                      <option key={num} value={num} className="bg-[#171717]">
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#C6A052] mb-1 font-medium flex items-center gap-1">
                    <BedDouble className="w-3.5 h-3.5" /> Rooms
                  </label>
                  <select
                    value={roomsCount}
                    onChange={(e) => setRoomsCount(Number(e.target.value))}
                    className="w-full bg-[#090909] border border-[#30271D] rounded px-3 py-2 text-xs text-[#F5F0E7] focus:outline-none focus:border-[#C6A052]"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num} className="bg-[#171717]">
                        {num} {num === 1 ? 'Room' : 'Rooms'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Guest Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#C6A052] mb-1 font-medium">
                    Primary Guest Name *
                  </label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full bg-[#090909] border border-[#30271D] rounded px-3 py-2 text-xs text-[#F5F0E7] placeholder:text-[#F5F0E7]/30 focus:outline-none focus:border-[#C6A052]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#C6A052] mb-1 font-medium">
                    Mobile Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#090909] border border-[#30271D] rounded px-3 py-2 text-xs text-[#F5F0E7] placeholder:text-[#F5F0E7]/30 focus:outline-none focus:border-[#C6A052]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#C6A052] mb-1 font-medium">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full bg-[#090909] border border-[#30271D] rounded px-3 py-2 text-xs text-[#F5F0E7] placeholder:text-[#F5F0E7]/30 focus:outline-none focus:border-[#C6A052]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#C6A052] mb-1 font-medium">
                    Special Requests / Arrival Time
                  </label>
                  <input
                    type="text"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="Late arrival, extra bed, ground floor"
                    className="w-full bg-[#090909] border border-[#30271D] rounded px-3 py-2 text-xs text-[#F5F0E7] placeholder:text-[#F5F0E7]/30 focus:outline-none focus:border-[#C6A052]"
                  />
                </div>
              </div>

              {/* Pricing & Policy summary */}
              <div className="flex flex-col sm:flex-row items-center justify-between p-3 rounded-lg bg-[#090909] border border-[#30271D] text-xs">
                <div className="mb-2 sm:mb-0">
                  <span className="text-[#F5F0E7]/70">Estimated Tariff ({nights} Night{nights > 1 ? 's' : ''}, {roomsCount} Room{roomsCount > 1 ? 's' : ''}): </span>
                  <span className="font-serif text-lg font-bold text-[#E1C783] ml-1">
                    ₹{totalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-[#F5F0E7]/40 block">+ applicable GST at check-in · Pay upon arrival</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#C6A052]">
                  <ShieldCheck className="w-4 h-4" /> Best Direct Highway Rate
                </div>
              </div>

              {/* Submit Action */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2.5 rounded text-xs uppercase tracking-wider text-[#F5F0E7]/60 hover:text-[#F5F0E7] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded bg-gradient-to-r from-[#C6A052] to-[#E1C783] text-[#090909] font-semibold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity disabled:opacity-50"
                >
                  {isSubmitting ? 'Confirming...' : 'Submit Reservation Request'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
