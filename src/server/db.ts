import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { ROOMS_DATA, MENU_ITEMS, VENUES_DATA, GALLERY_ITEMS, HOTEL_INFO } from '../data/hotelData';
import {
  AdminUser,
  Enquiry,
  AuditLog,
  WebsiteContentSettings,
  ContactSettings
} from '../types/admin';

export interface DbSchema {
  users: Array<AdminUser & { passwordHash: string; salt: string }>;
  sessions: Array<{
    token: string;
    userId: string;
    createdAt: string;
    expiresAt: string;
  }>;
  loginAttempts: Record<
    string,
    {
      count: number;
      lastAttempt: number;
      lockedUntil?: number;
    }
  >;
  rooms: any[];
  menu: any[];
  events: any[];
  gallery: any[];
  content: WebsiteContentSettings;
  contact: ContactSettings;
  enquiries: Enquiry[];
  auditLogs: AuditLog[];
}

const DB_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'db.json');

// Helper to hash password with scrypt
export function hashPassword(password: string, salt?: string): { hash: string; salt: string } {
  const useSalt = salt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, useSalt, 64).toString('hex');
  return { hash, salt: useSalt };
}

export function verifyPassword(password: string, hash: string, salt: string): boolean {
  try {
    const hashedBuf = Buffer.from(hash, 'hex');
    const verifyBuf = crypto.scryptSync(password, salt, 64);
    return crypto.timingSafeEqual(hashedBuf, verifyBuf);
  } catch {
    return false;
  }
}

function getInitialData(): DbSchema {
  const defaultAdminPassword = hashPassword('Shaan@Admin2026!');

  const initialEnquiries: Enquiry[] = [
    {
      id: 'enq-101',
      type: 'room_booking',
      customerName: 'Rajesh Sharma',
      email: 'rajesh.sharma@gmail.com',
      phone: '+91 98351 44210',
      dateCreated: new Date(Date.now() - 3600 * 1000 * 4).toISOString(),
      updatedAt: new Date(Date.now() - 3600 * 1000 * 4).toISOString(),
      status: 'New',
      checkInDate: '2026-11-15',
      checkOutDate: '2026-11-18',
      guests: 2,
      roomType: 'Deluxe AC Room (NH-19 Mountain View)',
      specialRequests: 'Late night highway arrival around 11:30 PM. Request quiet high-floor room.',
      internalNotes: ['Front desk alerted for late highway arrival.']
    },
    {
      id: 'enq-102',
      type: 'wedding_event',
      customerName: 'Suman & Amit Singhania',
      email: 'amit.singhania@techcorp.in',
      phone: '+91 94317 88992',
      dateCreated: new Date(Date.now() - 3600 * 1000 * 24).toISOString(),
      updatedAt: new Date(Date.now() - 3600 * 1000 * 12).toISOString(),
      status: 'Contacted',
      eventDate: '2026-12-10',
      eventGuests: '800-1000 Guests',
      venueName: 'Royal Grand Marriage Lawn',
      specialRequests: 'Stage decor with traditional Punjabi phulkari touch and live clay tandoor counters.',
      internalNotes: ['Phone consultation conducted on 01 Nov. Sent marriage lawn brochure.']
    },
    {
      id: 'enq-103',
      type: 'table_reservation',
      customerName: 'Vikramaditya Roy',
      email: 'v.roy@kolkata-drive.org',
      phone: '+91 98300 77123',
      dateCreated: new Date(Date.now() - 3600 * 1000 * 36).toISOString(),
      updatedAt: new Date(Date.now() - 3600 * 1000 * 2).toISOString(),
      status: 'Confirmed',
      tableTime: 'Dinner (8:30 PM)',
      guests: 6,
      diningType: 'Family Celebration',
      specialRequests: 'Pure desi ghee Handi Mutton & Tandoori Butter Roti pre-ordered for road trip stopover.',
      internalNotes: ['Table #4 reserved in royal family AC zone. Handi mutton prepped.']
    },
    {
      id: 'enq-104',
      type: 'contact_query',
      customerName: 'Dr. Neha Agarwal',
      email: 'neha.agarwal@aiims.edu',
      phone: '+91 97714 62109',
      dateCreated: new Date(Date.now() - 3600 * 1000 * 50).toISOString(),
      updatedAt: new Date(Date.now() - 3600 * 1000 * 48).toISOString(),
      status: 'Closed',
      subject: 'Jain Meal arrangement during Parasnath Pilgrimage',
      message: 'Traveling with elderly parents for Sammed Shikharji darshan. Need pure satvik no-onion no-garlic meals on 08 Nov.',
      internalNotes: ['Confirmed kitchen will prepare customized pure Jain tiffin. Guest notified.']
    }
  ];

  const initialAuditLogs: AuditLog[] = [
    {
      id: 'log-1',
      adminId: 'usr-admin-1',
      adminName: 'Harpreet Singh (Chief Admin)',
      action: 'SYSTEM_INITIALIZE',
      module: 'Core System',
      details: 'Shaan-E-Punjab secure admin system and persistent database initialized.',
      timestamp: new Date().toISOString()
    }
  ];

  return {
    users: [
      {
        id: 'usr-admin-1',
        email: 'admin@shaanepunjab.com',
        username: 'admin',
        name: 'Harpreet Singh (Chief Admin)',
        role: 'superadmin',
        createdAt: new Date().toISOString(),
        passwordHash: defaultAdminPassword.hash,
        salt: defaultAdminPassword.salt
      }
    ],
    sessions: [],
    loginAttempts: {},
    rooms: JSON.parse(JSON.stringify(ROOMS_DATA)),
    menu: JSON.parse(JSON.stringify(MENU_ITEMS)),
    events: JSON.parse(JSON.stringify(VENUES_DATA)),
    gallery: JSON.parse(JSON.stringify(GALLERY_ITEMS)),
    content: {
      heroTagline: 'SHAAN-E-PUNJAB',
      heroSubheadline: 'Stay Royal. Dine Exquisitely. Celebrate Beautifully.',
      promotionalAnnouncement: 'Special Pilgrimage & NH-19 Traveler Package: 15% off weekday deluxe stays with complimentary highway breakfast.',
      announcementActive: true,
      aboutStoryHeading: 'Three Decades of Unrivalled Grand Trunk Road Hospitality',
      aboutStoryParagraph1: 'Founded on the legendary Grand Trunk Road (now NH-19), Shaan-E-Punjab Hotel & Resort has welcomed weary travelers, spiritual pilgrims journeying to Shikharji Parasnath, and celebration seekers across generations.',
      aboutStoryParagraph2: 'What started as a revered highway dhaba renowned for slow-cooked Dal Makhani and tandoori roti has evolved into a premier 4-star destination featuring air-conditioned suites, a 1,500-capacity marriage garden, and tranquil views of Parasnath foothills.',
      highwaySanctuaryTag: '24/7 Highway Sanctuary',
      highwaySanctuaryDesc: 'Safe, CCTV-monitored parking and 24-hour kitchen for travelers driving the Delhi-Kolkata corridor.'
    },
    contact: {
      resortName: 'Shaan-E-Punjab Hotel & Resort',
      address: HOTEL_INFO.address,
      landmark: 'Near Topchanchi Lake, Milestone NH-19',
      phonePrimary: HOTEL_INFO.phonePrimary,
      phoneSecondary: HOTEL_INFO.phoneSecondary,
      email: HOTEL_INFO.email,
      frontDeskHours: '24 Hours Open / 7 Days a Week',
      checkInTime: '12:00 PM',
      checkOutTime: '11:00 AM',
      gpsCoordinates: '23.9056° N, 86.2081° E',
      googleMapsUrl: 'https://maps.google.com/?q=Shaan-E-Punjab+Hotel+Topchanchi'
    },
    enquiries: initialEnquiries,
    auditLogs: initialAuditLogs
  };
}

class Database {
  private data: DbSchema;

  constructor() {
    this.data = this.load();
  }

  private load(): DbSchema {
    try {
      if (!fs.existsSync(DB_DIR)) {
        fs.mkdirSync(DB_DIR, { recursive: true });
      }
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        return JSON.parse(raw);
      }
    } catch (err) {
      console.error('[DB] Error loading database file, initializing defaults:', err);
    }
    const initial = getInitialData();
    this.saveData(initial);
    return initial;
  }

  private saveData(data: DbSchema) {
    try {
      if (!fs.existsSync(DB_DIR)) {
        fs.mkdirSync(DB_DIR, { recursive: true });
      }
      // Atomic write using temp file
      const tempFile = `${DB_FILE}.${Date.now()}.tmp`;
      fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf-8');
      fs.renameSync(tempFile, DB_FILE);
    } catch (err) {
      console.error('[DB] Error saving database file:', err);
    }
  }

  public getData(): DbSchema {
    return this.data;
  }

  public persist() {
    this.saveData(this.data);
  }

  // --- Auth & Rate Limiting ---

  public getLoginAttempts(identifier: string) {
    const record = this.data.loginAttempts[identifier];
    if (!record) return { count: 0, locked: false, remainingMinutes: 0 };

    const now = Date.now();
    if (record.lockedUntil && record.lockedUntil > now) {
      const remainingMinutes = Math.ceil((record.lockedUntil - now) / 60000);
      return { count: record.count, locked: true, remainingMinutes };
    }

    // Reset if last attempt was more than 15 mins ago
    if (now - record.lastAttempt > 15 * 60 * 1000) {
      delete this.data.loginAttempts[identifier];
      this.persist();
      return { count: 0, locked: false, remainingMinutes: 0 };
    }

    return { count: record.count, locked: false, remainingMinutes: 0 };
  }

  public recordFailedLogin(identifier: string) {
    const now = Date.now();
    const current = this.data.loginAttempts[identifier] || { count: 0, lastAttempt: now };
    current.count += 1;
    current.lastAttempt = now;

    if (current.count >= 5) {
      // Lock for 15 minutes
      current.lockedUntil = now + 15 * 60 * 1000;
    }

    this.data.loginAttempts[identifier] = current;
    this.persist();
    return current;
  }

  public resetLoginAttempts(identifier: string) {
    if (this.data.loginAttempts[identifier]) {
      delete this.data.loginAttempts[identifier];
      this.persist();
    }
  }

  public createSession(userId: string): string {
    const token = crypto.randomBytes(32).toString('hex');
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24h

    // Cleanup expired sessions
    this.data.sessions = this.data.sessions.filter(
      s => new Date(s.expiresAt).getTime() > now.getTime()
    );

    this.data.sessions.push({
      token,
      userId,
      createdAt: now.toISOString(),
      expiresAt: expiresAt.toISOString()
    });

    this.persist();
    return token;
  }

  public validateSession(token: string): AdminUser | null {
    if (!token) return null;
    const now = Date.now();
    const session = this.data.sessions.find(
      s => s.token === token && new Date(s.expiresAt).getTime() > now
    );
    if (!session) return null;

    const user = this.data.users.find(u => u.id === session.userId);
    if (!user) return null;

    const { passwordHash, salt, ...safeUser } = user;
    return safeUser;
  }

  public destroySession(token: string) {
    this.data.sessions = this.data.sessions.filter(s => s.token !== token);
    this.persist();
  }

  public logAudit(admin: AdminUser, action: string, module: string, details: string) {
    const log: AuditLog = {
      id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      adminId: admin.id,
      adminName: admin.name,
      action,
      module,
      details,
      timestamp: new Date().toISOString()
    };
    this.data.auditLogs.unshift(log);
    // Keep max 200 logs
    if (this.data.auditLogs.length > 200) {
      this.data.auditLogs = this.data.auditLogs.slice(0, 200);
    }
    this.persist();
    return log;
  }
}

export const db = new Database();
