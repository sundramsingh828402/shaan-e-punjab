import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { db, hashPassword, verifyPassword } from './src/server/db';
import { AdminUser, Enquiry } from './src/types/admin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Body parsers with generous limit for image uploads
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Request logger for API calls
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    console.log(`[API] ${req.method} ${req.path}`);
  }
  next();
});

// Extend Express Request for authenticated user
export interface AuthenticatedRequest extends Request {
  adminUser?: AdminUser;
}

// Authentication Middleware
function requireAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'Authentication required. Please log in to access the admin portal.'
    });
  }

  const token = authHeader.split(' ')[1];
  const user = db.validateSession(token);
  if (!user) {
    return res.status(401).json({
      error: 'Session expired or invalid token. Please log in again.'
    });
  }

  req.adminUser = user;
  next();
}

// ==========================================
// AUTHENTICATION ROUTES
// ==========================================

// POST /api/auth/login
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { identifier, password } = req.body;
  const ip = req.ip || req.socket.remoteAddress || 'unknown';

  if (!identifier || !password) {
    return res.status(400).json({ error: 'Username/Email and password are required.' });
  }

  const rateCheckKey = `${ip}_${identifier.toLowerCase().trim()}`;
  const rateLimit = db.getLoginAttempts(rateCheckKey);

  if (rateLimit.locked) {
    return res.status(429).json({
      error: `Too many failed login attempts. Account temporarily locked for security. Please try again in ${rateLimit.remainingMinutes} minute(s).`,
      locked: true,
      remainingMinutes: rateLimit.remainingMinutes
    });
  }

  const data = db.getData();
  const normalizedId = identifier.toLowerCase().trim();
  const user = data.users.find(
    u => u.email.toLowerCase() === normalizedId || u.username.toLowerCase() === normalizedId
  );

  if (!user) {
    const attempt = db.recordFailedLogin(rateCheckKey);
    const remaining = Math.max(0, 5 - attempt.count);
    return res.status(401).json({
      error: remaining > 0
        ? `Invalid credentials. ${remaining} attempt(s) remaining before security lockout.`
        : 'Invalid credentials. Account locked for 15 minutes.',
      remainingAttempts: remaining
    });
  }

  const isValid = verifyPassword(password, user.passwordHash, user.salt);
  if (!isValid) {
    const attempt = db.recordFailedLogin(rateCheckKey);
    const remaining = Math.max(0, 5 - attempt.count);
    return res.status(401).json({
      error: remaining > 0
        ? `Invalid credentials. ${remaining} attempt(s) remaining before security lockout.`
        : 'Invalid credentials. Account locked for 15 minutes.',
      remainingAttempts: remaining
    });
  }

  // Success: reset attempts & create session
  db.resetLoginAttempts(rateCheckKey);
  user.lastLoginAt = new Date().toISOString();
  db.persist();

  const token = db.createSession(user.id);
  const { passwordHash, salt, ...safeUser } = user;

  db.logAudit(
    safeUser,
    'ADMIN_LOGIN_SUCCESS',
    'Authentication',
    `Administrator ${safeUser.name} logged in from IP ${ip}`
  );

  return res.json({
    success: true,
    token,
    user: safeUser,
    message: 'Welcome back to Shaan-E-Punjab Admin Portal.'
  });
});

// GET /api/auth/me
app.get('/api/auth/me', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  return res.json({ user: req.adminUser });
});

// POST /api/auth/logout
app.post('/api/auth/logout', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    db.destroySession(token);
  }
  return res.json({ success: true, message: 'Logged out successfully.' });
});

// POST /api/auth/forgot-password
app.post('/api/auth/forgot-password', (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Please enter your registered admin email.' });
  }

  const data = db.getData();
  const user = data.users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
  if (!user) {
    // Avoid user enumeration
    return res.json({
      success: true,
      message: 'If the provided email is registered, instructions have been logged for the chief administrator.'
    });
  }

  // Provide recovery security token & audit
  const resetToken = crypto.randomBytes(16).toString('hex');
  console.log(`[AUTH] Password reset requested for ${user.email}. Recovery code: ${resetToken}`);

  return res.json({
    success: true,
    message: 'Recovery verified. For security on this managed instance, use the administrative recovery code or reset your password directly.',
    recoveryCode: resetToken
  });
});

// POST /api/auth/change-password
app.post('/api/auth/change-password', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Current password and new password are required.' });
  }

  if (newPassword.length < 8) {
    return res.status(400).json({ error: 'New password must be at least 8 characters long.' });
  }

  const data = db.getData();
  const user = data.users.find(u => u.id === req.adminUser!.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }

  const isValid = verifyPassword(currentPassword, user.passwordHash, user.salt);
  if (!isValid) {
    return res.status(401).json({ error: 'Current password is incorrect.' });
  }

  const hashed = hashPassword(newPassword);
  user.passwordHash = hashed.hash;
  user.salt = hashed.salt;
  db.persist();

  db.logAudit(
    req.adminUser!,
    'PASSWORD_CHANGED',
    'User Management',
    `Administrator ${req.adminUser!.name} updated their password.`
  );

  return res.json({ success: true, message: 'Password updated successfully.' });
});

// ==========================================
// ADMIN DASHBOARD & MODULE ROUTES
// ==========================================

// GET /api/admin/stats
app.get('/api/admin/stats', requireAdmin, (_req: AuthenticatedRequest, res: Response) => {
  const data = db.getData();
  const roomBookings = data.enquiries.filter(e => e.type === 'room_booking');
  const restaurantEnqs = data.enquiries.filter(e => e.type === 'table_reservation');
  const eventEnqs = data.enquiries.filter(e => e.type === 'wedding_event');
  const contactQueries = data.enquiries.filter(e => e.type === 'contact_query');
  const newEnquiries = data.enquiries.filter(e => e.status === 'New');

  return res.json({
    totalRoomBookings: roomBookings.length,
    newBookingEnquiries: newEnquiries.length,
    roomAvailabilityCount: data.rooms.length,
    totalRooms: data.rooms.length,
    restaurantEnquiries: restaurantEnqs.length,
    eventWeddingEnquiries: eventEnqs.length,
    contactFormSubmissions: contactQueries.length,
    recentEnquiries: data.enquiries.slice(0, 10),
    dbConnected: true,
    dbType: 'Secure Persistent Storage (data/db.json)',
    lastUpdated: new Date().toISOString()
  });
});

// GET /api/admin/enquiries
app.get('/api/admin/enquiries', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const { type, status, search } = req.query;
  const data = db.getData();

  let results = [...data.enquiries];

  if (type && type !== 'all') {
    results = results.filter(e => e.type === type);
  }
  if (status && status !== 'all') {
    results = results.filter(e => e.status === status);
  }
  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    results = results.filter(
      e =>
        e.customerName.toLowerCase().includes(q) ||
        e.email.toLowerCase().includes(q) ||
        e.phone.toLowerCase().includes(q) ||
        (e.specialRequests && e.specialRequests.toLowerCase().includes(q)) ||
        (e.roomType && e.roomType.toLowerCase().includes(q))
    );
  }

  // Sort latest first
  results.sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());

  return res.json({ enquiries: results });
});

// PUT /api/admin/enquiries/:id
app.put('/api/admin/enquiries/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const { status, note } = req.body;
  const data = db.getData();
  const enquiry = data.enquiries.find(e => e.id === id);

  if (!enquiry) {
    return res.status(404).json({ error: 'Enquiry not found.' });
  }

  const oldStatus = enquiry.status;
  if (status && ['New', 'Contacted', 'Confirmed', 'Closed'].includes(status)) {
    enquiry.status = status;
  }
  if (note && typeof note === 'string') {
    enquiry.internalNotes = enquiry.internalNotes || [];
    enquiry.internalNotes.push(
      `[${new Date().toLocaleDateString('en-IN')}, ${req.adminUser!.name}]: ${note.trim()}`
    );
  }
  enquiry.updatedAt = new Date().toISOString();
  db.persist();

  db.logAudit(
    req.adminUser!,
    'ENQUIRY_UPDATED',
    'Customer Enquiries',
    `Updated enquiry ${enquiry.id} (${enquiry.customerName}): Status ${oldStatus} -> ${enquiry.status}`
  );

  return res.json({ success: true, enquiry });
});

// DELETE /api/admin/enquiries/:id
app.delete('/api/admin/enquiries/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const data = db.getData();
  const index = data.enquiries.findIndex(e => e.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Enquiry not found.' });
  }

  const deleted = data.enquiries.splice(index, 1)[0];
  db.persist();

  db.logAudit(
    req.adminUser!,
    'ENQUIRY_DELETED',
    'Customer Enquiries',
    `Deleted enquiry record ${id} for guest ${deleted.customerName}`
  );

  return res.json({ success: true, message: 'Enquiry removed successfully.' });
});

// GET /api/admin/enquiries/export-csv
app.get('/api/admin/enquiries/export-csv', requireAdmin, (_req: AuthenticatedRequest, res: Response) => {
  const data = db.getData();
  const headers = [
    'ID',
    'Type',
    'Status',
    'Customer Name',
    'Phone',
    'Email',
    'Date Created',
    'Check-in / Event Date',
    'Guests',
    'Room / Venue / Details',
    'Special Requests',
    'Internal Notes'
  ];

  const rows = data.enquiries.map(e => [
    `"${e.id}"`,
    `"${e.type}"`,
    `"${e.status}"`,
    `"${e.customerName.replace(/"/g, '""')}"`,
    `"${e.phone.replace(/"/g, '""')}"`,
    `"${e.email.replace(/"/g, '""')}"`,
    `"${e.dateCreated}"`,
    `"${e.checkInDate || e.eventDate || e.tableTime || ''}"`,
    `"${e.guests || e.eventGuests || ''}"`,
    `"${(e.roomType || e.venueName || e.subject || '').replace(/"/g, '""')}"`,
    `"${(e.specialRequests || e.message || '').replace(/"/g, '""')}"`,
    `"${(e.internalNotes || []).join(' | ').replace(/"/g, '""')}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader(
    'Content-Disposition',
    `attachment; filename="shaan-e-punjab-enquiries-${Date.now()}.csv"`
  );
  return res.send(csvContent);
});

// ==========================================
// ROOMS MANAGEMENT
// ==========================================

// GET /api/admin/rooms
app.get('/api/admin/rooms', requireAdmin, (_req: AuthenticatedRequest, res: Response) => {
  const data = db.getData();
  return res.json({ rooms: data.rooms });
});

// POST /api/admin/rooms
app.post('/api/admin/rooms', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const newRoom = req.body;
  if (!newRoom.name || !newRoom.pricePerNight) {
    return res.status(400).json({ error: 'Room name and price per night are required.' });
  }

  const data = db.getData();
  const id = newRoom.id || `room-${Date.now()}`;
  const room = {
    ...newRoom,
    id,
    amenities: Array.isArray(newRoom.amenities)
      ? newRoom.amenities
      : (newRoom.amenities || '').split(',').map((s: string) => s.trim()).filter(Boolean)
  };

  data.rooms.push(room);
  db.persist();

  db.logAudit(
    req.adminUser!,
    'ROOM_CREATED',
    'Room & Stay',
    `Added room category "${room.name}" (₹${room.pricePerNight}/night)`
  );

  return res.status(201).json({ success: true, room });
});

// PUT /api/admin/rooms/:id
app.put('/api/admin/rooms/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const updates = req.body;
  const data = db.getData();
  const index = data.rooms.findIndex(r => r.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Room category not found.' });
  }

  data.rooms[index] = {
    ...data.rooms[index],
    ...updates,
    id,
    amenities: Array.isArray(updates.amenities)
      ? updates.amenities
      : typeof updates.amenities === 'string'
      ? updates.amenities.split(',').map((s: string) => s.trim()).filter(Boolean)
      : data.rooms[index].amenities
  };
  db.persist();

  db.logAudit(
    req.adminUser!,
    'ROOM_UPDATED',
    'Room & Stay',
    `Updated room "${data.rooms[index].name}" details & pricing.`
  );

  return res.json({ success: true, room: data.rooms[index] });
});

// DELETE /api/admin/rooms/:id
app.delete('/api/admin/rooms/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const data = db.getData();
  const index = data.rooms.findIndex(r => r.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Room not found.' });
  }

  const deleted = data.rooms.splice(index, 1)[0];
  db.persist();

  db.logAudit(
    req.adminUser!,
    'ROOM_DELETED',
    'Room & Stay',
    `Deleted room category "${deleted.name}"`
  );

  return res.json({ success: true, message: 'Room removed successfully.' });
});

// ==========================================
// RESTAURANT MENU MANAGEMENT
// ==========================================

// GET /api/admin/menu
app.get('/api/admin/menu', requireAdmin, (_req: AuthenticatedRequest, res: Response) => {
  const data = db.getData();
  return res.json({ menu: data.menu });
});

// POST /api/admin/menu
app.post('/api/admin/menu', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const newItem = req.body;
  if (!newItem.name || !newItem.price || !newItem.category) {
    return res.status(400).json({ error: 'Dish name, price, and category are required.' });
  }

  const data = db.getData();
  const item = {
    ...newItem,
    id: newItem.id || `menu-${Date.now()}`,
    isVeg: Boolean(newItem.isVeg),
    isChefSpecial: Boolean(newItem.isChefSpecial)
  };

  data.menu.push(item);
  db.persist();

  db.logAudit(
    req.adminUser!,
    'MENU_ITEM_CREATED',
    'Restaurant & Menu',
    `Added menu item "${item.name}" (₹${item.price}) to ${item.category}`
  );

  return res.status(201).json({ success: true, item });
});

// PUT /api/admin/menu/:id
app.put('/api/admin/menu/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const updates = req.body;
  const data = db.getData();
  const index = data.menu.findIndex(m => m.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Menu item not found.' });
  }

  data.menu[index] = {
    ...data.menu[index],
    ...updates,
    id
  };
  db.persist();

  db.logAudit(
    req.adminUser!,
    'MENU_ITEM_UPDATED',
    'Restaurant & Menu',
    `Updated dish "${data.menu[index].name}" (₹${data.menu[index].price})`
  );

  return res.json({ success: true, item: data.menu[index] });
});

// DELETE /api/admin/menu/:id
app.delete('/api/admin/menu/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const data = db.getData();
  const index = data.menu.findIndex(m => m.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Menu item not found.' });
  }

  const deleted = data.menu.splice(index, 1)[0];
  db.persist();

  db.logAudit(
    req.adminUser!,
    'MENU_ITEM_DELETED',
    'Restaurant & Menu',
    `Deleted menu item "${deleted.name}"`
  );

  return res.json({ success: true, message: 'Item deleted.' });
});

// ==========================================
// WEDDING & EVENTS MANAGEMENT
// ==========================================

// GET /api/admin/events
app.get('/api/admin/events', requireAdmin, (_req: AuthenticatedRequest, res: Response) => {
  const data = db.getData();
  return res.json({ events: data.events });
});

// POST /api/admin/events
app.post('/api/admin/events', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const newVenue = req.body;
  if (!newVenue.name || !newVenue.capacity) {
    return res.status(400).json({ error: 'Venue name and guest capacity are required.' });
  }

  const data = db.getData();
  const venue = {
    ...newVenue,
    id: newVenue.id || `event-${Date.now()}`,
    features: Array.isArray(newVenue.features)
      ? newVenue.features
      : (newVenue.features || '').split(',').map((s: string) => s.trim()).filter(Boolean)
  };

  data.events.push(venue);
  db.persist();

  db.logAudit(
    req.adminUser!,
    'EVENT_VENUE_CREATED',
    'Wedding & Events',
    `Created venue package "${venue.name}"`
  );

  return res.status(201).json({ success: true, venue });
});

// PUT /api/admin/events/:id
app.put('/api/admin/events/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const updates = req.body;
  const data = db.getData();
  const index = data.events.findIndex(e => e.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Event venue not found.' });
  }

  data.events[index] = {
    ...data.events[index],
    ...updates,
    id
  };
  db.persist();

  db.logAudit(
    req.adminUser!,
    'EVENT_VENUE_UPDATED',
    'Wedding & Events',
    `Updated venue "${data.events[index].name}" details.`
  );

  return res.json({ success: true, venue: data.events[index] });
});

// DELETE /api/admin/events/:id
app.delete('/api/admin/events/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const data = db.getData();
  const index = data.events.findIndex(e => e.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Venue not found.' });
  }

  const deleted = data.events.splice(index, 1)[0];
  db.persist();

  db.logAudit(
    req.adminUser!,
    'EVENT_VENUE_DELETED',
    'Wedding & Events',
    `Deleted venue "${deleted.name}"`
  );

  return res.json({ success: true, message: 'Venue deleted.' });
});

// ==========================================
// GALLERY & MEDIA MANAGEMENT
// ==========================================

// GET /api/admin/gallery
app.get('/api/admin/gallery', requireAdmin, (_req: AuthenticatedRequest, res: Response) => {
  const data = db.getData();
  return res.json({ gallery: data.gallery });
});

// POST /api/admin/gallery
app.post('/api/admin/gallery', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const newItem = req.body;
  if (!newItem.title || !newItem.imageUrl) {
    return res.status(400).json({ error: 'Image title and image URL/data are required.' });
  }

  const data = db.getData();
  const item = {
    ...newItem,
    id: newItem.id || `gallery-${Date.now()}`,
    category: newItem.category || 'property',
    categoryLabel: newItem.categoryLabel || 'Resort Grounds',
    description: newItem.description || '',
    aspectRatio: newItem.aspectRatio || 'landscape'
  };

  data.gallery.unshift(item);
  db.persist();

  db.logAudit(
    req.adminUser!,
    'GALLERY_IMAGE_ADDED',
    'Gallery & Media',
    `Uploaded gallery photo: "${item.title}" (${item.category})`
  );

  return res.status(201).json({ success: true, item });
});

// DELETE /api/admin/gallery/:id
app.delete('/api/admin/gallery/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const data = db.getData();
  const index = data.gallery.findIndex(g => g.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Image not found.' });
  }

  const deleted = data.gallery.splice(index, 1)[0];
  db.persist();

  db.logAudit(
    req.adminUser!,
    'GALLERY_IMAGE_DELETED',
    'Gallery & Media',
    `Removed gallery image "${deleted.title}"`
  );

  return res.json({ success: true, message: 'Image deleted.' });
});

// POST /api/admin/gallery/reorder
app.post('/api/admin/gallery/reorder', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const { ids } = req.body;
  if (!Array.isArray(ids)) {
    return res.status(400).json({ error: 'Array of image IDs is required.' });
  }

  const data = db.getData();
  const map = new Map(data.gallery.map(g => [g.id, g]));
  const reordered: any[] = [];

  ids.forEach(id => {
    if (map.has(id)) {
      reordered.push(map.get(id));
      map.delete(id);
    }
  });
  // Append any remainder
  map.forEach(item => reordered.push(item));

  data.gallery = reordered;
  db.persist();

  return res.json({ success: true, gallery: data.gallery });
});

// ==========================================
// WEBSITE CONTENT & CONTACT SETTINGS
// ==========================================

// GET & PUT /api/admin/content
app.get('/api/admin/content', requireAdmin, (_req: AuthenticatedRequest, res: Response) => {
  const data = db.getData();
  return res.json({ content: data.content });
});

app.put('/api/admin/content', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const updates = req.body;
  const data = db.getData();
  data.content = {
    ...data.content,
    ...updates
  };
  db.persist();

  db.logAudit(
    req.adminUser!,
    'WEBSITE_CONTENT_UPDATED',
    'Website Content',
    'Updated hero headlines, announcement banner, and legacy story.'
  );

  return res.json({ success: true, content: data.content });
});

// GET & PUT /api/admin/contact
app.get('/api/admin/contact', requireAdmin, (_req: AuthenticatedRequest, res: Response) => {
  const data = db.getData();
  return res.json({ contact: data.contact });
});

app.put('/api/admin/contact', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const updates = req.body;
  const data = db.getData();
  data.contact = {
    ...data.contact,
    ...updates
  };
  db.persist();

  db.logAudit(
    req.adminUser!,
    'CONTACT_INFO_UPDATED',
    'Contact Information',
    'Updated resort contact desk phone, email, and highway GPS location.'
  );

  return res.json({ success: true, contact: data.contact });
});

// ==========================================
// USERS & AUDIT LOGS
// ==========================================

// GET /api/admin/users
app.get('/api/admin/users', requireAdmin, (_req: AuthenticatedRequest, res: Response) => {
  const data = db.getData();
  const safeUsers = data.users.map(({ passwordHash, salt, ...u }) => u);
  return res.json({ users: safeUsers });
});

// POST /api/admin/users
app.post('/api/admin/users', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  if (req.adminUser!.role !== 'superadmin') {
    return res.status(403).json({ error: 'Only Chief Administrators can add admin users.' });
  }

  const { email, username, name, password, role } = req.body;
  if (!email || !username || !password || !name) {
    return res.status(400).json({ error: 'Name, email, username, and password are required.' });
  }

  const data = db.getData();
  const exists = data.users.some(
    u => u.email.toLowerCase() === email.toLowerCase() || u.username.toLowerCase() === username.toLowerCase()
  );
  if (exists) {
    return res.status(409).json({ error: 'User with this email or username already exists.' });
  }

  const hashed = hashPassword(password);
  const newUser = {
    id: `usr-${Date.now()}`,
    email: email.trim(),
    username: username.trim().toLowerCase(),
    name: name.trim(),
    role: role || 'manager',
    createdAt: new Date().toISOString(),
    passwordHash: hashed.hash,
    salt: hashed.salt
  };

  data.users.push(newUser);
  db.persist();

  db.logAudit(
    req.adminUser!,
    'USER_CREATED',
    'Users & Permissions',
    `Created new ${newUser.role} account for "${newUser.name}" (${newUser.email})`
  );

  const { passwordHash, salt, ...safeUser } = newUser;
  return res.status(201).json({ success: true, user: safeUser });
});

// GET /api/admin/audit-logs
app.get('/api/admin/audit-logs', requireAdmin, (_req: AuthenticatedRequest, res: Response) => {
  const data = db.getData();
  return res.json({ logs: data.auditLogs });
});

// ==========================================
// PUBLIC ENQUIRY SUBMISSIONS
// (Directly connected to database from website forms)
// ==========================================

app.post('/api/public/enquiry', (req: Request, res: Response) => {
  const {
    type,
    customerName,
    phone,
    email,
    checkInDate,
    checkOutDate,
    guests,
    roomType,
    eventDate,
    eventGuests,
    venueName,
    tableTime,
    diningType,
    specialRequests,
    subject,
    message
  } = req.body;

  if (!customerName || !phone) {
    return res.status(400).json({ error: 'Full name and phone number are required.' });
  }

  const data = db.getData();
  const newEnquiry: Enquiry = {
    id: `enq-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    type: type || 'contact_query',
    customerName: customerName.trim(),
    phone: phone.trim(),
    email: email ? email.trim() : 'N/A',
    dateCreated: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'New',
    checkInDate,
    checkOutDate,
    guests: guests ? Number(guests) : undefined,
    roomType,
    eventDate,
    eventGuests,
    venueName,
    tableTime,
    diningType,
    specialRequests,
    subject,
    message,
    internalNotes: [`Submitted from online portal on ${new Date().toLocaleString('en-IN')}`]
  };

  data.enquiries.unshift(newEnquiry);
  db.persist();

  console.log(`[ENQUIRY] New submission received: ${newEnquiry.type} from ${newEnquiry.customerName}`);

  return res.status(201).json({
    success: true,
    message: 'Your booking enquiry has been transmitted directly to Shaan-E-Punjab front desk. Our manager will call you shortly.',
    enquiryId: newEnquiry.id
  });
});

// GET /api/public/data - returns current dynamic data for public frontend
app.get('/api/public/data', (_req: Request, res: Response) => {
  const data = db.getData();
  return res.json({
    rooms: data.rooms,
    menu: data.menu,
    events: data.events,
    gallery: data.gallery,
    content: data.content,
    contact: data.contact
  });
});

// ==========================================
// VITE DEV SERVER OR STATIC PRODUCTION
// ==========================================

async function startServer() {
  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n======================================================`);
    console.log(`★ SHAAN-E-PUNJAB HOTEL & RESORT SERVER RUNNING`);
    console.log(`★ Local Port: http://0.0.0.0:${PORT}`);
    console.log(`★ Mode: ${isProduction ? 'Production' : 'Development with Vite'}`);
    console.log(`★ Admin Portal Route: /admin/login | /admin/dashboard`);
    console.log(`★ Default Admin: admin@shaanepunjab.com`);
    console.log(`======================================================\n`);
  });
}

startServer().catch(err => {
  console.error('Fatal error starting server:', err);
});
