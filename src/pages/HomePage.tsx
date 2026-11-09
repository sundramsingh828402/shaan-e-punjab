import React, { useState } from 'react';
import { PageId } from '../types';
import { ROOMS_DATA, MENU_ITEMS, GALLERY_ITEMS } from '../data/hotelData';
import { DecorativeCrown } from '../components/common/DecorativeLaurel';
import {
  ArrowRight,
  Sparkles,
  ChevronRight,
  Camera,
  Maximize2,
  Calendar,
  Utensils,
  MapPin,
  Clock,
  Gift,
  Compass,
  Sun,
  Moon,
  Flame,
  Dices,
  Plus,
  Minus,
  Check,
  Heart,
  Info,
  X,
  ChefHat,
  ShoppingBag,
  QrCode
} from 'lucide-react';
import { RoyalPerkModal } from '../components/home/RoyalPerkModal';
import { RoyalInteractiveTourModal } from '../components/home/RoyalInteractiveTourModal';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenBooking: (roomId?: string, checkIn?: string, checkOut?: string, guests?: number) => void;
  onOpenTableBooking: () => void;
}

interface HighwaySpecialDish {
  id: string;
  name: string;
  price: number;
  dietType: 'VEG' | 'NON-VEG';
  tag: string;
  category: 'curries' | 'chinese' | 'tandoor';
  spiciness: string;
  pairing: string;
  badgeColor: string;
  description: string;
  bgImage: string;
  chefSecret: string;
  prepTime: string;
  initialLikes: number;
}

const HIGHWAY_SPECIALS: HighwaySpecialDish[] = [
  {
    id: 'hs-mushroom-masala',
    name: 'Mushroom Masala',
    price: 260,
    dietType: 'VEG',
    tag: 'Highway Cult Favorite',
    category: 'curries',
    spiciness: '🌶️🌶️ Medium Spiced',
    pairing: 'Butter Naan / Tandoori Roti',
    badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10',
    description: 'Plump farm-fresh button mushrooms slow-simmered in rich spiced onion-tomato reduction with roasted cumin, bell peppers & fresh coriander.',
    bgImage: '/assets/aistudio/mushroom_masala_95f59c70.jpeg',
    chefSecret: 'Sauteed quickly on fierce heat to retain juicy crunch, then folded into slow-cooked bhuna gravy.',
    prepTime: '12 Mins',
    initialLikes: 198
  },
  {
    id: 'hs-chicken-butter-masala',
    name: 'Chicken Butter Masala',
    price: 299,
    dietType: 'NON-VEG',
    tag: 'All-Time Best Seller',
    category: 'curries',
    spiciness: '🌶️ Mild Makhani',
    pairing: 'Butter Garlic Naan',
    badgeColor: 'border-red-500/40 text-red-300 bg-red-500/10',
    description: 'Tender roasted chicken simmered in slow-reduced silky tomato-cashew makhani gravy, churned butter & crushed kasuri methi.',
    bgImage: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80',
    chefSecret: 'Simmered with 100% Amul white butter, Kashmiri deggi mirch, and hand-ground green cardamom seeds.',
    prepTime: '12 Mins',
    initialLikes: 342
  },
  {
    id: 'hs-chilli-paneer',
    name: 'Chilli Paneer',
    price: 260,
    dietType: 'VEG',
    tag: 'Crispy Wok Tossed',
    category: 'chinese',
    spiciness: '🌶️🌶️ Tangy & Spicy',
    pairing: 'Fried Rice / Hakka Noodles',
    badgeColor: 'border-red-500/40 text-red-300 bg-red-500/10',
    description: 'Crispy golden paneer cubes tossed in high-heat wok with crunchy bell peppers, slit green chillies, garlic & dark soy glaze.',
    bgImage: '/assets/aistudio/chilli_paneer_215fd928.jpeg',
    chefSecret: 'Double-fried dairy-fresh paneer tossed in roasted chili oil and crushed Sichuan pepper.',
    prepTime: '10 Mins',
    initialLikes: 254
  },
  {
    id: 'hs-chilli-baby-corn',
    name: 'Chilli Baby Corn',
    price: 230,
    dietType: 'VEG',
    tag: 'Golden Crunchy Bites',
    category: 'chinese',
    spiciness: '🌶️🌶️ Sweet & Fiery',
    pairing: 'Chilled Mocktail / Chowmein',
    badgeColor: 'border-yellow-500/40 text-yellow-300 bg-yellow-500/10',
    description: 'Crispy batter-crusted tender baby corn spears tossed with spring onions, minced garlic, capsicum & spicy oriental schezwan sauce.',
    bgImage: '/assets/aistudio/chilli_baby_corn_fdffd8ad.jpeg',
    chefSecret: 'Triple-cornstarch seasoned coating with garlic crunch and fiery red chilli paste.',
    prepTime: '10 Mins',
    initialLikes: 221
  }
];

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenBooking,
  onOpenTableBooking
}) => {
  const [quickCheckIn, setQuickCheckIn] = useState('');
  const [quickCheckOut, setQuickCheckOut] = useState('');
  const [quickGuests, setQuickGuests] = useState(2);
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [isPerkModalOpen, setIsPerkModalOpen] = useState(false);
  const [resortViewPhoto, setResortViewPhoto] = useState<string>('/assets/aistudio/file_0000000081ec8211947694f158c1506a_7d3f2227.png');
  const [resortViewName, setResortViewName] = useState<string>('Day Courtyard & Gardens');
  const [experiencePhotoIndex, setExperiencePhotoIndex] = useState(0);

  const EXPERIENCE_PHOTOS = [
    {
      url: '/assets/aistudio/IMG_5a192be5-46ac-4124-b93f-1b255d1c8259_c902a37a.jpg',
      label: 'Topchanchi Lake & Parasnath Foothills',
      tag: '🌊 Lake Vista'
    },
    {
      url: '/assets/aistudio/IMG_3066c5b2-f874-4ced-b0c3-5b51374d8e9e_ac385b41.jpg',
      label: 'Topchanchi Dam & Roaring Waterfalls',
      tag: '💦 Waterfalls Dam'
    }
  ];

  const [highlightedDishIndex, setHighlightedDishIndex] = useState<number | null>(null);
  const [isSpinningDish, setIsSpinningDish] = useState(false);
  const [craveCategory, setCraveCategory] = useState<'all' | 'curries' | 'veg' | 'nonveg' | 'chinese'>('all');
  const [craveTray, setCraveTray] = useState<Record<string, number>>({});
  const [likedDishes, setLikedDishes] = useState<Record<string, boolean>>({});
  const [dishLikes, setDishLikes] = useState<Record<string, number>>(() => {
    const map: Record<string, number> = {};
    HIGHWAY_SPECIALS.forEach(d => { map[d.id] = d.initialLikes; });
    return map;
  });
  const [selectedSecretDish, setSelectedSecretDish] = useState<HighwaySpecialDish | null>(null);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

  const toggleLikeDish = (dishId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const isLiked = !likedDishes[dishId];
    setLikedDishes(prev => ({ ...prev, [dishId]: isLiked }));
    setDishLikes(prev => ({
      ...prev,
      [dishId]: (prev[dishId] || 0) + (isLiked ? 1 : -1)
    }));
  };

  const handleAddToTray = (dishId: string, delta: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCraveTray(prev => {
      const next = { ...prev };
      const current = next[dishId] || 0;
      const updated = current + delta;
      if (updated <= 0) {
        delete next[dishId];
      } else {
        next[dishId] = updated;
      }
      return next;
    });
  };

  const handleClearTray = () => setCraveTray({});

  const filteredDishes = HIGHWAY_SPECIALS.filter(dish => {
    if (craveCategory === 'all') return true;
    if (craveCategory === 'curries') return dish.category === 'curries';
    if (craveCategory === 'chinese') return dish.category === 'chinese';
    if (craveCategory === 'veg') return dish.dietType === 'VEG';
    if (craveCategory === 'nonveg') return dish.dietType === 'NON-VEG';
    return true;
  });

  const trayCount = Object.values(craveTray).reduce((a, b) => a + b, 0);
  const trayTotal = Object.entries(craveTray).reduce((sum, [id, qty]) => {
    const dish = HIGHWAY_SPECIALS.find(d => d.id === id);
    return sum + (dish ? dish.price * qty : 0);
  }, 0);

  const handleSpinDish = () => {
    if (isSpinningDish) return;
    setIsSpinningDish(true);
    let count = 0;
    const maxSteps = 18;
    const list = filteredDishes.length > 0 ? filteredDishes : HIGHWAY_SPECIALS;
    const interval = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * list.length);
      const chosen = list[randomIdx];
      const globalIdx = HIGHWAY_SPECIALS.findIndex(d => d.id === chosen.id);
      setHighlightedDishIndex(globalIdx >= 0 ? globalIdx : 0);
      count++;
      if (count >= maxSteps) {
        clearInterval(interval);
        setIsSpinningDish(false);
      }
    }, 80);
  };

  return (
    <div className="bg-[#090909] text-[#F5F0E7]">
      {/* SECTION A: CINEMATIC ROYAL HERO (STATIC HERO BANNER) */}
      <section className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/assets/aistudio/shaan_front_35f0a5bc.jpeg"
            alt="Shaan-E-Punjab Hotel & Resort - Grand Night Facade and King’s Family Lounge"
            className="w-full h-full object-cover object-center scale-100"
          />
          {/* Subtle cinematic gradient overlays to guarantee perfect contrast and luxury look */}
          <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black/85 via-black/50 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-0 bg-black/45 pointer-events-none z-10" />
          <div className="absolute inset-0 bg-radial from-transparent via-black/25 to-black/70 pointer-events-none z-10" />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#090909] via-[#090909]/60 to-transparent pointer-events-none z-10" />
        </div>

        {/* Central Royal Hero Content Overlay */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center pt-24 pb-20 sm:pt-28 sm:pb-24">

          {/* Grand Metallic Gold Royal Title */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[0.06em] text-transparent bg-clip-text bg-gradient-to-b from-[#FFF5D6] via-[#E1C783] to-[#C6A052] drop-shadow-[0_6px_28px_rgba(0,0,0,0.95)] leading-tight select-none">
            SHAAN-E-PUNJAB
          </h1>

          {/* Hotel & Resort Sub-header with gold lines */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 my-3 sm:my-4">
            <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent to-[#C6A052]" />
            <span className="font-serif text-xs sm:text-sm md:text-base uppercase tracking-[0.35em] sm:tracking-[0.45em] text-[#E1C783] font-semibold drop-shadow-md">
              HOTEL & RESORT
            </span>
            <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent to-[#C6A052]" />
          </div>

          {/* Tagline */}
          <p className="font-serif italic text-base sm:text-xl md:text-2xl text-[#FFF5D6] max-w-2xl mx-auto tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] mb-6 sm:mb-8 font-normal">
            Stay Royal. Dine Exquisitely. Celebrate Beautifully.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-5 mb-8 sm:mb-10">
            <button
              onClick={() => onOpenBooking()}
              className="px-7 py-3.5 sm:px-8 sm:py-4 rounded-full bg-gradient-to-r from-[#C6A052] via-[#E1C783] to-[#C6A052] text-[#090909] font-bold text-xs sm:text-sm tracking-[0.14em] uppercase shadow-2xl shadow-black/80 hover:shadow-[#C6A052]/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#090909]" />
              <span>Book Your Stay</span>
            </button>

            <button
              onClick={onOpenTableBooking}
              className="px-6 py-3.5 sm:px-7 sm:py-4 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-[#C6A052] text-[#E1C783] hover:text-white font-semibold text-xs sm:text-sm tracking-[0.12em] uppercase shadow-xl hover:border-[#E1C783] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <Utensils className="w-4 h-4 text-[#C6A052]" />
              <span>Reserve a Table</span>
            </button>

            <button
              onClick={() => onNavigate('experiences')}
              className="px-5 py-3.5 sm:px-6 sm:py-4 rounded-full border border-white/20 bg-black/30 hover:bg-black/50 text-[#F5F0E7] text-xs sm:text-sm tracking-wider uppercase hover:border-[#C6A052]/60 transition-all duration-300 flex items-center gap-1.5 cursor-pointer backdrop-blur-sm"
            >
              <span>Explore Resort</span>
              <ChevronRight className="w-4 h-4 text-[#C6A052]" />
            </button>
          </div>

          {/* Highway Feature Highlights Strip */}
          <div className="hidden sm:grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-4xl pt-2">
            <div className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-black/50 backdrop-blur-md border border-white/10 text-[11px] text-[#F5F0E7]/90">
              <MapPin className="w-3.5 h-3.5 text-[#C6A052] shrink-0" />
              <span>NH-19 Topchanchi Frontage</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-black/50 backdrop-blur-md border border-white/10 text-[11px] text-[#F5F0E7]/90">
              <Clock className="w-3.5 h-3.5 text-[#C6A052] shrink-0" />
              <span>24/7 Frontdesk & Parking</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-black/50 backdrop-blur-md border border-white/10 text-[11px] text-[#F5F0E7]/90">
              <Utensils className="w-3.5 h-3.5 text-[#C6A052] shrink-0" />
              <span>Authentic Punjabi Dining</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-black/50 backdrop-blur-md border border-white/10 text-[11px] text-[#F5F0E7]/90">
              <Sparkles className="w-3.5 h-3.5 text-[#C6A052] shrink-0" />
              <span>1,500+ Guest Marriage Lawn</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION B: QUICK RESERVATION RIBBON */}
      <section className="relative z-30 -mt-7 sm:-mt-9 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-[#141414] border border-[#C6A052]/40 rounded-2xl shadow-2xl shadow-black p-4 sm:p-5 backdrop-blur-xl">
          {/* Shifted Top Royal Location Badge into the top of check in date navigation box */}
          <div className="flex items-center justify-center mb-3 sm:mb-4 pb-2.5 sm:pb-3 border-b border-[#30271D]">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#C6A052]/40 shadow-lg shadow-black/80">
              <DecorativeCrown className="w-3.5 h-3.5 text-[#C6A052]" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#E1C783] font-semibold">
                GRAND TRUNK ROAD NH-19 · TOPCHANCHI, DHANBAD
              </span>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onOpenBooking(undefined, quickCheckIn || undefined, quickCheckOut || undefined, quickGuests);
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end"
          >
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#C6A052] font-semibold mb-1.5">
                Check-In Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={quickCheckIn}
                  onChange={(e) => setQuickCheckIn(e.target.value)}
                  className="w-full bg-[#090909] border border-[#30271D] focus:border-[#C6A052] rounded-lg px-3 py-2 text-xs text-[#F5F0E7] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#C6A052] font-semibold mb-1.5">
                Check-Out Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={quickCheckOut}
                  onChange={(e) => setQuickCheckOut(e.target.value)}
                  className="w-full bg-[#090909] border border-[#30271D] focus:border-[#C6A052] rounded-lg px-3 py-2 text-xs text-[#F5F0E7] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#C6A052] font-semibold mb-1.5">
                Guests
              </label>
              <select
                value={quickGuests}
                onChange={(e) => setQuickGuests(Number(e.target.value))}
                className="w-full bg-[#090909] border border-[#30271D] focus:border-[#C6A052] rounded-lg px-3 py-2 text-xs text-[#F5F0E7] focus:outline-none cursor-pointer"
              >
                <option value={1}>1 Guest (Solo Traveler)</option>
                <option value={2}>2 Guests (Couple / Pair)</option>
                <option value={3}>3 Guests</option>
                <option value={4}>4+ Guests (Family)</option>
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#C6A052] to-[#E1C783] text-[#090909] font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Check Availability</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* SECTION C: WELCOME TO SHAAN-E-PUNJAB */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Text */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2">
              <DecorativeCrown className="w-4 h-4 text-[#C6A052]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#C6A052] font-semibold">
                WELCOME TO SHAAN-E-PUNJAB
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F0E7] leading-tight">
              “Where Hospitality Becomes an Experience.”
            </h2>

            <p className="text-sm sm:text-base text-[#F5F0E7]/80 leading-relaxed font-light">
              Discover comfortable stays, memorable dining, and welcoming spaces for life's special moments near Topchanchi Lake.
            </p>

            <p className="text-xs sm:text-sm text-[#F5F0E7]/70 leading-relaxed">
              Situated right alongside NH-19 in Dhanbad district, Shaan-E-Punjab represents the heritage of rich North Indian hospitality. Whether you are driving the Grand Trunk Road corridor, visiting holy Shikharji Parasnath, or seeking an unforgettable wedding venue, our royal retreat welcomes you with warmth and timeless comfort.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('about')}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#C6A052] to-[#E1C783] text-[#090909] font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>Read Full Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#C6A052]/40 shadow-2xl">
              <img
                src={resortViewPhoto}
                alt="Shaan-E-Punjab Hotel & Resort Courtyard and Architecture"
                className="w-full h-[440px] sm:h-[500px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none" />

              {/* SELECTOR 1: Interactive Live Resort Badge & VIP Scratch Treat */}
              <div
                onClick={() => setIsPerkModalOpen(true)}
                className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#090909]/90 backdrop-blur-md border border-[#C6A052]/60 hover:border-[#E1C783] shadow-[0_8px_32px_rgba(0,0,0,0.85)] hover:shadow-[0_0_35px_rgba(198,160,82,0.4)] transition-all duration-300 hover:scale-[1.01] cursor-pointer group flex flex-col gap-3"
              >
                {/* Top Row inside Badge: View Angle Switcher Pills */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-white/10" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                      Live Resort Cam
                    </span>
                  </div>

                  {/* Interactive photo switcher buttons */}
                  <div className="flex items-center gap-1.5 bg-black/60 p-1 rounded-lg border border-white/10">
                    <button
                      type="button"
                      onClick={() => {
                        setResortViewPhoto('/assets/aistudio/file_0000000081ec8211947694f158c1506a_7d3f2227.png');
                        setResortViewName('Day Courtyard & Gardens');
                      }}
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-all cursor-pointer ${
                        resortViewPhoto.includes('file_0000000081ec')
                          ? 'bg-[#C6A052] text-[#090909]'
                          : 'text-white/70 hover:text-white'
                      }`}
                    >
                      ☀️ Day
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setResortViewPhoto('/assets/aistudio/shaan_front_35f0a5bc.jpeg');
                        setResortViewName('Night Highway Facade');
                      }}
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-all cursor-pointer ${
                        resortViewPhoto.includes('shaan_front')
                          ? 'bg-[#C6A052] text-[#090909]'
                          : 'text-white/70 hover:text-white'
                      }`}
                    >
                      🌙 Night
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setResortViewPhoto('/assets/aistudio/IMG-20261101-WA0008_5ff961cf.jpg');
                        setResortViewName('Timber Pergola & Garden Lawns');
                      }}
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-all cursor-pointer ${
                        resortViewPhoto.includes('IMG-20261101-WA0008')
                          ? 'bg-[#C6A052] text-[#090909]'
                          : 'text-white/70 hover:text-white'
                      }`}
                    >
                      🌿 Garden
                    </button>
                  </div>
                </div>

                {/* Bottom Row inside Badge: Title & Click to Reveal VIP Highway Treat */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#C6A052] block font-semibold">
                      NH-19 Topchanchi, Dhanbad
                    </span>
                    <span className="font-serif text-sm sm:text-base text-white font-bold block group-hover:text-[#FFF5D6] transition-colors">
                      {resortViewName}
                    </span>
                  </div>

                  {/* Shimmering VIP Treat Trigger */}
                  <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-gradient-to-r from-[#C6A052] via-[#E1C783] to-[#C6A052] text-[#090909] font-bold shadow-md shadow-black/60 group-hover:scale-105 group-hover:shadow-[#C6A052]/40 transition-all shrink-0">
                    <div className="w-6 h-6 rounded-full bg-[#090909] text-[#E1C783] flex items-center justify-center shrink-0">
                      <Gift className="w-3.5 h-3.5 animate-bounce" />
                    </div>
                    <div className="text-left">
                      <span className="block text-[9px] uppercase tracking-wider text-[#785412] font-black leading-none">
                        Tap To Reveal
                      </span>
                      <span className="block text-xs font-black tracking-wide leading-tight text-[#090909]">
                        🎁 Secret VIP Perk
                      </span>
                    </div>
                    <Sparkles className="w-3.5 h-3.5 text-[#090909] shrink-0 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
            {/* Fine gold floating corner detail */}
            <div className="absolute -bottom-3 -right-3 w-20 h-20 border-r-2 border-b-2 border-[#C6A052]/40 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* SECTION D: SIGNATURE EXPERIENCES (4 IMAGE-LED FEATURES) */}
      <section className="py-16 bg-[#171717] border-y border-[#30271D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-[#FFF8E7] via-[#E1C783] to-[#C6A052] drop-shadow-[0_4px_18px_rgba(198,160,82,0.35)]">
              FACILITIES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1: ROOMS & STAY */}
            <div
              onClick={() => onNavigate('rooms')}
              className="group relative h-96 rounded-xl overflow-hidden border border-[#30271D] hover:border-[#C6A052] transition-all duration-500 cursor-pointer"
            >
              <img
                src="/assets/aistudio/room_67209ceb.jpeg"
                alt="Rooms and Stays at Shaan-E-Punjab"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end">
                <span className="text-[10px] uppercase tracking-widest text-[#C6A052] font-semibold">
                  Sanctuary
                </span>
                <h3 className="font-serif text-xl font-bold text-[#F5F0E7] mt-1 group-hover:text-[#E1C783] transition-colors">
                  ROOMS & STAY
                </h3>
                <p className="text-xs text-[#F5F0E7]/75 mt-2 line-clamp-2">
                  Soundproof AC rooms, plush king beds, and executive suites designed for restorative halts.
                </p>
                <div className="flex items-center gap-1.5 text-xs text-[#C6A052] font-semibold mt-3">
                  <span>Explore Rooms</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Feature 2: RESTAURANT & DINING */}
            <div
              onClick={() => onNavigate('restaurant')}
              className="group relative h-96 rounded-xl overflow-hidden border border-[#30271D] hover:border-[#C6A052] transition-all duration-500 cursor-pointer"
            >
              <img
                src="/assets/aistudio/file_00000000de5082118493e01f88e08e61_ccda5409.png"
                alt="Restaurant and Dining at Shaan-E-Punjab"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end">
                <span className="text-[10px] uppercase tracking-widest text-[#C6A052] font-semibold">
                  Gastronomy
                </span>
                <h3 className="font-serif text-xl font-bold text-[#F5F0E7] mt-1 group-hover:text-[#E1C783] transition-colors">
                  RESTAURANT & DINING
                </h3>
                <p className="text-xs text-[#F5F0E7]/75 mt-2 line-clamp-2">
                  Slow-simmered Dal Makhani, clay tandoor kebabs, and authentic Punjabi feasts.
                </p>
                <div className="flex items-center gap-1.5 text-xs text-[#C6A052] font-semibold mt-3">
                  <span>View Menu</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Feature 3: LEISURE & EXPERIENCES */}
            <div
              onClick={() => onNavigate('experiences')}
              className="group relative h-96 rounded-xl overflow-hidden border border-[#30271D] hover:border-[#C6A052] transition-all duration-500 cursor-pointer"
            >
              <img
                src={EXPERIENCE_PHOTOS[experiencePhotoIndex].url}
                alt={EXPERIENCE_PHOTOS[experiencePhotoIndex].label}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

              {/* Interactive Dual View Switcher for Lake & Waterfalls Dam */}
              <div
                className="absolute top-3.5 inset-x-3.5 z-20 flex items-center justify-between pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#C6A052]/50 text-[10px] font-bold text-[#E1C783] uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  4.2 km · 8 Mins Away
                </span>

                <div className="flex items-center gap-1 bg-black/80 backdrop-blur-md p-1 rounded-lg border border-[#C6A052]/50 shadow-lg">
                  {EXPERIENCE_PHOTOS.map((photo, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setExperiencePhotoIndex(idx)}
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-all cursor-pointer ${
                        experiencePhotoIndex === idx
                          ? 'bg-[#C6A052] text-[#090909] font-bold shadow-sm'
                          : 'text-[#F5F0E7]/70 hover:text-white'
                      }`}
                    >
                      {photo.tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end">
                <span className="text-[10px] uppercase tracking-widest text-[#C6A052] font-semibold">
                  Discovery & Nature
                </span>
                <h3 className="font-serif text-xl font-bold text-[#F5F0E7] mt-1 group-hover:text-[#E1C783] transition-colors">
                  TOPCHANCHI LAKE & DAM
                </h3>
                <p className="text-xs text-[#F5F0E7]/75 mt-2 line-clamp-2">
                  Tranquil waters, Parasnath hill vistas, and roaring waterfall dam spillway — 8 mins from Shaan-E-Punjab.
                </p>
                <div className="flex items-center gap-1.5 text-xs text-[#C6A052] font-semibold mt-3">
                  <span>Explore Excursions & Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Feature 4: WEDDINGS & EVENTS */}
            <div
              onClick={() => onNavigate('events')}
              className="group relative h-96 rounded-xl overflow-hidden border border-[#30271D] hover:border-[#C6A052] transition-all duration-500 cursor-pointer"
            >
              <img
                src="/assets/aistudio/IMG_a4a8ff32-02b3-4e8e-a10b-99a98a7b2ab8_c3e5d16a.jpg"
                alt="Royal Wedding Celebrations at Shaan-E-Punjab"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end">
                <span className="text-[10px] uppercase tracking-widest text-[#C6A052] font-semibold">
                  Celebrations
                </span>
                <h3 className="font-serif text-xl font-bold text-[#F5F0E7] mt-1 group-hover:text-[#E1C783] transition-colors">
                  WEDDINGS & EVENTS
                </h3>
                <p className="text-xs text-[#F5F0E7]/75 mt-2 line-clamp-2">
                  Grand marriage lawn for 1,500+ guests and royal AC banquet halls for memorable moments.
                </p>
                <div className="flex items-center gap-1.5 text-xs text-[#C6A052] font-semibold mt-3">
                  <span>Plan Celebration</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION E: RESTAURANT SHOWCASE - CRAZE HIGHWAY SPECIALS */}
      <section className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Top Craze Live Live Ticker */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4 pb-3 border-b border-[#30271D]/60 text-[11px]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 font-bold uppercase tracking-wider text-[10px]">
              <Flame className="w-3.5 h-3.5 text-red-400 animate-pulse" />
              <span>Clay Tandoor & Earthen Handi Live 24/7</span>
            </span>
            <span className="hidden sm:inline-block text-[#C6A052]">✦</span>
            <span className="text-[#F5F0E7]/80 font-medium">⚡ 12-15 Min Highway Fresh Table Serve</span>
            <span className="hidden sm:inline-block text-[#C6A052]">✦</span>
            <span className="text-[#F5F0E7]/80 font-medium">🧈 100% Amul Butter & Pure Desi Ghee</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-bold flex items-center gap-1">
              ★ 4.9/5 <span className="text-[#F5F0E7]/60 font-normal hidden sm:inline">(8,400+ NH-19 Foodies)</span>
            </span>
          </div>
        </div>

        {/* Section Header with Craze Spin Button */}
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-3.5">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F5F0E7] tracking-tight">
              OUR KITCHEN
            </h2>
            <p className="text-xs sm:text-sm text-[#F5F0E7]/75 mt-1 max-w-2xl font-light">
              Legendary clay pot Handi curries, tandoori char, and wok delights perfected over 30 years on NH-19 Topchanchi.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleSpinDish}
              disabled={isSpinningDish}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#C6A052] via-[#E1C783] to-[#C6A052] hover:brightness-110 text-[#090909] font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-black/60 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Dices className={`w-4 h-4 ${isSpinningDish ? 'animate-spin' : ''}`} />
              <span>{isSpinningDish ? 'Spinning The Craze Wheel...' : '🎲 Spin For Chef’s Craze Pick!'}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsMenuModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-[#141414] hover:bg-[#1a1a1a] border border-[#30271D] hover:border-[#C6A052] text-[#E1C783] text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-md group"
            >
              <QrCode className="w-3.5 h-3.5 text-[#C6A052] group-hover:scale-110 transition-transform" />
              <span>Full Menu (150+ Items)</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        {/* Craze Mood Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-3 mb-4">
          {[
            { id: 'all', label: '🔥 All 4 Highway Specials' },
            { id: 'curries', label: '🥘 Tandoor & Curries' },
            { id: 'veg', label: '🌱 Pure Veg' },
            { id: 'nonveg', label: '🍗 Dhaba Non-Veg' },
            { id: 'chinese', label: '🥢 Indo-Chinese Wok' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setCraveCategory(tab.id as any)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                craveCategory === tab.id
                  ? 'bg-[#C6A052] text-[#090909] shadow-md shadow-[#C6A052]/30 font-bold'
                  : 'bg-[#141414] text-[#F5F0E7]/70 hover:text-white border border-[#30271D] hover:border-[#C6A052]/50'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Compact, High-Energy 4-Column Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {filteredDishes.map((item) => {
            const globalIndex = HIGHWAY_SPECIALS.findIndex(d => d.id === item.id);
            const isHighlighted = highlightedDishIndex === globalIndex;
            const trayQty = craveTray[item.id] || 0;

            return (
              <div
                key={item.id}
                style={{
                  backgroundImage: item.bgImage
                    ? `linear-gradient(to top, rgba(8,8,8,0.96) 0%, rgba(10,10,10,0.78) 45%, rgba(10,10,10,0.3) 80%, rgba(10,10,10,0.15) 100%), url(${item.bgImage})`
                    : undefined,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center',
                  backgroundRepeat: 'no-repeat'
                }}
                className={`min-h-[235px] sm:min-h-[245px] p-4 rounded-2xl bg-[#141414] border transition-all duration-300 flex flex-col justify-between group relative overflow-hidden shadow-xl hover:scale-[1.015] hover:shadow-2xl ${
                  isHighlighted
                    ? 'border-[#C6A052] ring-2 ring-[#C6A052] shadow-[0_0_35px_rgba(198,160,82,0.7)] scale-[1.02]'
                    : 'border-[#30271D] hover:border-[#C6A052]/70'
                }`}
              >
                {/* Chef Recommends Golden Ribbon if highlighted */}
                {isHighlighted && (
                  <div className="absolute top-0 right-0 px-3 py-1 bg-[#C6A052] text-[#090909] text-[10px] font-black uppercase tracking-wider rounded-bl-xl flex items-center gap-1 shadow-lg z-20 animate-pulse">
                    <Sparkles className="w-3 h-3" /> Chef’s Tonight Craze Pick!
                  </div>
                )}

                <div>
                  {/* Top Row inside card */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className={`text-[9px] tracking-wider uppercase font-bold px-2 py-0.5 rounded-full bg-black/85 backdrop-blur-md border ${
                        item.dietType === 'VEG'
                          ? 'border-emerald-500/50 text-emerald-400'
                          : 'border-red-500/50 text-red-400'
                      }`}>
                        ● {item.dietType}
                      </span>
                      <span className={`text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md border ${item.badgeColor}`}>
                        {item.tag}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {/* Price Badge */}
                      <span className="font-serif text-sm sm:text-base font-bold text-[#E1C783] bg-black/90 backdrop-blur-md px-2.5 py-0.5 rounded-lg border border-[#C6A052]/60 shadow-md">
                        ₹{item.price}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-[#FFF5D6] transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                    {item.name}
                  </h4>
                </div>

                {/* Bottom Row: Micro details and Interactive Tray Buttons */}
                <div className="mt-3 pt-2.5 bg-black/80 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-sm">
                  <div className="flex items-center gap-2 text-[11px] text-[#F5F0E7]/80">
                    <span className="font-medium text-amber-300">{item.spiciness}</span>
                    <span className="text-white/30">•</span>
                    <span className="text-[#C6A052] font-semibold text-[10px] hidden sm:inline">
                      With {item.pairing}
                    </span>
                  </div>

                  {/* Action buttons: Secret modal + Add to Crave Tray */}
                  <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSecretDish(item);
                      }}
                      className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/15 border border-white/15 text-[10px] font-semibold text-[#E1C783] flex items-center gap-1 transition-all cursor-pointer"
                      title="View Chef's secret preparation & spices"
                    >
                      <ChefHat className="w-3 h-3 text-[#C6A052]" />
                      <span>Secret</span>
                    </button>

                    {trayQty === 0 ? (
                      <button
                        type="button"
                        onClick={(e) => handleAddToTray(item.id, 1, e)}
                        className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-[#C6A052] to-[#E1C783] text-[#090909] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 hover:brightness-110 active:scale-95 transition-all shadow-sm cursor-pointer"
                      >
                        <Plus className="w-3 h-3 stroke-[3]" />
                        <span>Crave It</span>
                      </button>
                    ) : (
                      <div className="flex items-center bg-[#C6A052] text-[#090909] rounded-lg p-0.5 shadow-sm">
                        <button
                          type="button"
                          onClick={(e) => handleAddToTray(item.id, -1, e)}
                          className="w-5 h-5 flex items-center justify-center hover:bg-black/10 rounded font-bold cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-1.5 text-[11px] font-black">{trayQty}</span>
                        <button
                          type="button"
                          onClick={(e) => handleAddToTray(item.id, 1, e)}
                          className="w-5 h-5 flex items-center justify-center hover:bg-black/10 rounded font-bold cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating/Docked Highway Table Crave Tray Bar */}
        {trayCount > 0 && (
          <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-[#17140f] via-[#211a12] to-[#17140f] border-2 border-[#C6A052] shadow-[0_10px_40px_rgba(0,0,0,0.9)] flex flex-col md:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C6A052] text-[#090909] flex items-center justify-center shadow-md shrink-0">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-wider font-bold text-[#E1C783]">
                    Your Highway Table Crave Tray
                  </span>
                  <span className="px-2 py-0.2 rounded-full bg-[#C6A052] text-[#090909] text-[10px] font-black">
                    {trayCount} {trayCount === 1 ? 'Dish' : 'Dishes'}
                  </span>
                </div>
                <p className="text-sm font-serif font-bold text-[#F5F0E7]">
                  Estimated Crave Total: <span className="text-[#E1C783]">₹{trayTotal}</span>
                  <span className="text-xs text-[#F5F0E7]/60 font-sans font-normal ml-2">
                    (Freshly prepared for your table upon arrival)
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
              <button
                type="button"
                onClick={handleClearTray}
                className="px-3 py-2 rounded-xl bg-black/40 hover:bg-black/70 border border-white/10 text-white/70 hover:text-white text-xs font-semibold transition-all cursor-pointer"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={onOpenTableBooking}
                className="flex-1 md:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C6A052] via-[#E1C783] to-[#C6A052] hover:brightness-110 text-[#090909] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-black/70 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Utensils className="w-4 h-4" />
                <span>Reserve Table With These Dishes</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Chef's Secret Recipe & Tasting Modal */}
        {selectedSecretDish && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setSelectedSecretDish(null)}
          >
            <div
              className="relative max-w-lg w-full bg-[#141414] border border-[#C6A052] rounded-2xl overflow-hidden shadow-2xl p-6 flex flex-col gap-4 text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedSecretDish(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-black/70 hover:bg-black text-white/70 hover:text-white transition-all cursor-pointer z-10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative h-44 -mx-6 -mt-6 overflow-hidden">
                <img
                  src={selectedSecretDish.bgImage}
                  alt={selectedSecretDish.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-black/40 to-transparent" />
                <div className="absolute bottom-3 left-6 right-6 flex items-end justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C6A052]">
                      ● {selectedSecretDish.dietType} · {selectedSecretDish.tag}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-white drop-shadow-md">
                      {selectedSecretDish.name}
                    </h3>
                  </div>
                  <span className="font-serif text-xl font-bold text-[#E1C783] bg-black/80 px-3 py-1 rounded-lg border border-[#C6A052]/50">
                    ₹{selectedSecretDish.price}
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-xs text-[#F5F0E7]/85">
                <div className="p-3 rounded-xl bg-black/50 border border-white/10">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C6A052] block mb-1 flex items-center gap-1.5">
                    <ChefHat className="w-3.5 h-3.5" /> Chef Gurdeep’s Kitchen Secret
                  </span>
                  <p className="leading-relaxed text-[#F5F0E7]">
                    {selectedSecretDish.chefSecret}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2.5 rounded-lg bg-black/30 border border-white/5">
                    <span className="text-[9px] uppercase tracking-wider text-[#C6A052] block font-semibold">
                      Spice Level & Heat
                    </span>
                    <span className="font-bold text-white mt-0.5 block">{selectedSecretDish.spiciness}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-black/30 border border-white/5">
                    <span className="text-[9px] uppercase tracking-wider text-[#C6A052] block font-semibold">
                      Kitchen Prep Time
                    </span>
                    <span className="font-bold text-white mt-0.5 block">⚡ {selectedSecretDish.prepTime} Fresh</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-[#C6A052]/10 border border-[#C6A052]/30 text-[11px] text-[#E1C783]">
                  <strong>Chef’s Perfect Highway Pairing:</strong> Best accompanied with {selectedSecretDish.pairing}.
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    handleAddToTray(selectedSecretDish.id, 1, { stopPropagation: () => {} } as any);
                    setSelectedSecretDish(null);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-[#C6A052] hover:bg-[#E1C783] text-[#090909] font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add To Crave Tray</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSecretDish(null);
                    onOpenTableBooking();
                  }}
                  className="px-4 py-2.5 rounded-xl bg-black/60 hover:bg-black/90 border border-[#C6A052] text-[#E1C783] font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  Book Table
                </button>
              </div>
            </div>
          </div>
        )}

        {/* BIG SIZE FULL MENU & QR MODAL */}
        {isMenuModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/90 backdrop-blur-md animate-fadeIn"
            onClick={() => setIsMenuModalOpen(false)}
          >
            <div
              className="relative max-w-2xl w-full max-h-[92vh] bg-[#141414] border border-[#C6A052]/60 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#30271D] bg-[#090909]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#C6A052]/15 border border-[#C6A052]/40 flex items-center justify-center text-[#E1C783]">
                    <QrCode className="w-4 h-4 text-[#C6A052]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#F5F0E7] leading-none">
                      Shaan-E-Punjab Official Menu
                    </h3>
                    <p className="text-[11px] text-[#C6A052] mt-0.5 font-medium">
                      Scan QR Code or browse 150+ authentic delicacies
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsMenuModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close Menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Big Size Menu Image Container */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-5 flex items-center justify-center bg-black/60">
                <div className="relative group max-w-lg w-full rounded-xl overflow-hidden border border-[#C6A052]/30 shadow-2xl bg-[#090909]">
                  <img
                    src="/assets/aistudio/hd_menu_aaa4021c.jpeg"
                    alt="Shaan-E-Punjab Hotel & Resort Official Menu QR Card"
                    className="w-full h-auto max-h-[66vh] object-contain mx-auto transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Modal Footer with Actions */}
              <div className="px-5 py-3 border-t border-[#30271D] bg-[#090909] flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-[11px] text-[#F5F0E7]/70 flex items-center gap-1.5 text-center sm:text-left">
                  <Sparkles className="w-3.5 h-3.5 text-[#C6A052] shrink-0" />
                  Point your smartphone camera at the QR code to open the live menu on TableAdda
                </span>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <a
                    href="/assets/aistudio/hd_menu_aaa4021c.jpeg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-[#F5F0E7] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-[#C6A052]" />
                    <span>View HD</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuModalOpen(false);
                      onNavigate('restaurant');
                    }}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-gradient-to-r from-[#C6A052] to-[#E1C783] text-[#090909] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:brightness-110 transition-all shadow-md cursor-pointer"
                  >
                    <Utensils className="w-3.5 h-3.5" />
                    <span>Browse Digital Menu</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* SECTION F: ROOMS SHOWCASE */}
      <section className="py-20 bg-[#171717] border-y border-[#30271D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#C6A052] font-semibold block mb-1">
                YOUR COMFORT ZONE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F5F0E7]">
                Where Comfort Meets Luxury
              </h2>
              <p className="text-xs text-[#F5F0E7]/70 mt-1 max-w-xl">
                Verified room categories equipped with split AC, soundproofing, and premium beds for peaceful sleep.
              </p>
            </div>
            <button
              onClick={() => onNavigate('rooms')}
              className="self-start md:self-auto px-5 py-2.5 rounded border border-[#C6A052] text-[#E1C783] hover:bg-[#C6A052] hover:text-[#090909] text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5"
            >
              <span>Discover All Rooms</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ROOMS_DATA.slice(0, 3).map((room) => (
              <div
                key={room.id}
                className="bg-[#090909] border border-[#30271D] rounded-xl overflow-hidden hover:border-[#C6A052]/60 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-60 overflow-hidden bg-[#121212]">
                    <img
                      src={room.imageUrl}
                      alt={room.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity pointer-events-none" />
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-[#090909]/85 backdrop-blur-sm border border-[#C6A052]/40 text-xs font-serif font-bold text-[#E1C783] shadow-md">
                      ₹{room.pricePerNight} <span className="text-[10px] font-sans font-normal text-[#F5F0E7]/70">/ night</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="text-[10px] uppercase tracking-wider text-[#C6A052] font-semibold block mb-1">
                      {room.bedType} · {room.sizeSqFt} sq. ft.
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#F5F0E7] mb-2 group-hover:text-[#E1C783] transition-colors">
                      {room.name}
                    </h3>
                    <p className="text-xs text-[#F5F0E7]/70 leading-relaxed mb-4 line-clamp-2">
                      {room.description}
                    </p>
                    <div className="flex flex-wrap gap-2 text-[11px] text-[#F5F0E7]/60">
                      {room.amenities.slice(0, 3).map((am, idx) => (
                        <span key={idx} className="border-b border-[#30271D] pb-0.5">
                          {am}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-[#30271D]/40 mt-4 flex items-center justify-between">
                  <button
                    onClick={() => onNavigate('rooms')}
                    className="text-xs text-[#C6A052] hover:text-[#E1C783] font-medium"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => onOpenBooking(room.id)}
                    className="px-4 py-2 rounded bg-gradient-to-r from-[#C6A052] to-[#E1C783] text-[#090909] font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity"
                  >
                    Book Stay
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION G: WEDDINGS & EVENTS */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=80"
            alt="Shaan-E-Punjab Marriage Lawn and Banquet"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#090909] via-[#090909]/90 to-black/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C6A052] font-semibold block">
              Royal Celebrations & Banquets
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F0E7] leading-tight">
              “Make Every Celebration Extraordinary.”
            </h2>
            <p className="text-sm sm:text-base text-[#F5F0E7]/80 leading-relaxed font-light">
              A welcoming setting for weddings, gatherings, and memorable occasions.
            </p>
            <p className="text-xs text-[#F5F0E7]/70 leading-relaxed">
              With our expansive 25,000 sq. ft. manicured wedding garden accommodating up to 1,500 guests and the air-conditioned Kohinoor Banquet Hall, Shaan-E-Punjab is the premier wedding destination of Dhanbad along NH-19.
            </p>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('events')}
                className="px-7 py-3.5 rounded bg-gradient-to-r from-[#C6A052] to-[#E1C783] text-[#090909] font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity flex items-center gap-2"
              >
                <span>Plan Your Celebration</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION H: REAL PROPERTY MOMENTS GALLERY PREVIEW */}
      <section className="py-20 lg:py-24 bg-[#0d0d0d] border-t border-[#30271D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <Camera className="w-4 h-4 text-[#C6A052]" />
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C6A052] font-semibold">
                  REAL PROPERTY PHOTOGRAPHY
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F5F0E7]">
                Glimpses of Shaan-E-Punjab
              </h2>
              <p className="text-xs text-[#F5F0E7]/70 mt-1 max-w-xl font-light">
                Authentic captures of our grand highway facade, illuminated night elevations, fine dining A/C restaurant, and tranquil grounds in Topchanchi.
              </p>
            </div>

            <button
              onClick={() => onNavigate('gallery')}
              className="self-start md:self-auto px-5 py-2.5 rounded-lg border border-[#C6A052] text-[#E1C783] hover:bg-[#C6A052] hover:text-[#090909] text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 group"
            >
              <span>Explore All 21 Photos in Gallery</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* 6 Featured Gallery Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY_ITEMS.slice(0, 6).map((item, idx) => (
              <div
                key={item.id}
                onClick={() => onNavigate('gallery')}
                className="group relative rounded-xl overflow-hidden border border-[#30271D] hover:border-[#C6A052] transition-all duration-300 cursor-pointer bg-[#141414] shadow-md flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#090909]">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                      item.imageUrl.includes('360_2adab2df')
                        ? 'scale-[1.8] group-hover:scale-[1.95]'
                        : 'group-hover:scale-108'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  {item.highlight && (
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#090909]/80 backdrop-blur-sm border border-[#C6A052]/50 text-[10px] font-semibold tracking-wider uppercase text-[#E1C783]">
                      {item.highlight}
                    </div>
                  )}

                  <div className="absolute top-3 right-3 p-1.5 rounded-full bg-[#090909]/80 text-[#C6A052] opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>

                  {item.originalFileName && (
                    <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-[#090909]/90 border border-[#30271D] text-[9px] font-mono text-[#C6A052]">
                      {item.originalFileName}
                    </div>
                  )}
                </div>

                <div className="p-4 bg-[#141414] flex flex-col justify-between flex-1">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#C6A052] font-semibold block mb-0.5">
                      {item.categoryLabel}
                    </span>
                    <h3 className="font-serif text-sm font-bold text-[#F5F0E7] group-hover:text-[#E1C783] transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#30271D]/40 flex items-center justify-between text-[11px] text-[#C6A052]">
                    <span>View in Gallery</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Royal 360° Virtual Tour & Drone Experience Modal */}
      <RoyalInteractiveTourModal
        isOpen={isTourModalOpen}
        onClose={() => setIsTourModalOpen(false)}
        onOpenBooking={() => onOpenBooking()}
        onNavigateToAbout={() => onNavigate('about')}
      />

      {/* Secret Royal VIP Highway Perk Scratch Modal */}
      <RoyalPerkModal
        isOpen={isPerkModalOpen}
        onClose={() => setIsPerkModalOpen(false)}
        onApplyToBooking={() => onOpenBooking()}
      />
    </div>
  );
};
