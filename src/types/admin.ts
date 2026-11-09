export type AdminRole = 'superadmin' | 'manager' | 'receptionist';

export interface AdminUser {
  id: string;
  email: string;
  username: string;
  name: string;
  role: AdminRole;
  createdAt: string;
  lastLoginAt?: string;
}

export type EnquiryType = 'room_booking' | 'table_reservation' | 'wedding_event' | 'contact_query';
export type EnquiryStatus = 'New' | 'Contacted' | 'Confirmed' | 'Closed';

export interface Enquiry {
  id: string;
  type: EnquiryType;
  customerName: string;
  email: string;
  phone: string;
  dateCreated: string;
  updatedAt: string;
  status: EnquiryStatus;
  checkInDate?: string;
  checkOutDate?: string;
  guests?: number;
  roomType?: string;
  eventDate?: string;
  eventGuests?: string;
  venueName?: string;
  tableTime?: string;
  diningType?: string;
  specialRequests?: string;
  subject?: string;
  message?: string;
  internalNotes?: string[];
}

export interface DashboardStats {
  totalRoomBookings: number;
  newBookingEnquiries: number;
  roomAvailabilityCount: number;
  totalRooms: number;
  restaurantEnquiries: number;
  eventWeddingEnquiries: number;
  contactFormSubmissions: number;
  recentEnquiries: Enquiry[];
  dbConnected: boolean;
  dbType: string;
  lastUpdated: string;
}

export interface AuditLog {
  id: string;
  adminId: string;
  adminName: string;
  action: string;
  module: string;
  details: string;
  timestamp: string;
}

export interface WebsiteContentSettings {
  heroTagline: string;
  heroSubheadline: string;
  promotionalAnnouncement: string;
  announcementActive: boolean;
  aboutStoryHeading: string;
  aboutStoryParagraph1: string;
  aboutStoryParagraph2: string;
  highwaySanctuaryTag: string;
  highwaySanctuaryDesc: string;
}

export interface ContactSettings {
  resortName: string;
  address: string;
  landmark: string;
  phonePrimary: string;
  phoneSecondary: string;
  email: string;
  frontDeskHours: string;
  checkInTime: string;
  checkOutTime: string;
  gpsCoordinates: string;
  googleMapsUrl: string;
}

export type AdminTab =
  | 'dashboard'
  | 'bookings'
  | 'rooms'
  | 'restaurant'
  | 'events'
  | 'gallery'
  | 'content'
  | 'enquiries'
  | 'contact'
  | 'users'
  | 'settings';
