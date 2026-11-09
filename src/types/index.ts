export type PageId =
  | 'home'
  | 'about'
  | 'restaurant'
  | 'rooms'
  | 'services'
  | 'experiences'
  | 'events'
  | 'gallery'
  | 'location'
  | 'contact'
  | 'admin-login'
  | 'admin-dashboard';

export interface RoomType {
  id: string;
  name: string;
  tagline: string;
  pricePerNight: number;
  occupancy: string;
  bedType: string;
  sizeSqFt: number;
  description: string;
  amenities: string[];
  imageUrl: string;
  featured?: boolean;
}

export interface MenuItem {
  id: string;
  category: 'starters' | 'tandoor' | 'main-course' | 'breads' | 'desserts-beverages';
  name: string;
  description: string;
  price: number;
  isVeg: boolean;
  isChefSpecial?: boolean;
}

export interface EventVenue {
  id: string;
  name: string;
  type: string;
  capacity: string;
  description: string;
  features: string[];
  imageUrl: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'rooms' | 'restaurant' | 'events' | 'property' | 'scenic';
  categoryLabel: string;
  description: string;
  imageUrl: string;
  originalFileName?: string;
  highlight?: string;
  location?: string;
  aspectRatio?: 'landscape' | 'portrait' | 'square';
}

export interface ReservationDetails {
  roomTypeId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  roomsCount: number;
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  specialRequests?: string;
}

export interface TableBookingDetails {
  date: string;
  timeSlot: string;
  guests: number;
  guestName: string;
  guestPhone: string;
  occasion?: string;
  seatingArea?: 'indoor-ac' | 'family-section' | 'highway-breeze-veranda';
}
