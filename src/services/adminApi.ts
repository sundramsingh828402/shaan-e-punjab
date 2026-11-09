import {
  AdminUser,
  DashboardStats,
  Enquiry,
  AuditLog,
  WebsiteContentSettings,
  ContactSettings
} from '../types/admin';

const TOKEN_KEY = 'shaan_admin_auth_token';
const USER_KEY = 'shaan_admin_user_profile';

export const adminAuth = {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },
  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },
  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
  getUser(): AdminUser | null {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },
  setUser(user: AdminUser) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
};

async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = adminAuth.getToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(endpoint, {
    ...options,
    headers
  });

  if (response.status === 401) {
    adminAuth.removeToken();
    if (window.location.hash.includes('admin') || window.location.pathname.includes('admin')) {
      // Trigger navigation if on admin page
      window.dispatchEvent(new CustomEvent('shaan_admin_session_expired'));
    }
  }

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Server request failed');
  }

  return data as T;
}

export const adminApi = {
  // Auth
  async login(identifier: string, password: string): Promise<{ token: string; user: AdminUser }> {
    const res = await apiFetch<{ success: boolean; token: string; user: AdminUser }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ identifier, password })
    });
    adminAuth.setToken(res.token);
    adminAuth.setUser(res.user);
    return res;
  },

  async logout(): Promise<void> {
    try {
      await apiFetch('/api/auth/logout', { method: 'POST' });
    } catch {
      // Ignore network error on logout
    } finally {
      adminAuth.removeToken();
    }
  },

  async checkAuth(): Promise<AdminUser | null> {
    try {
      const res = await apiFetch<{ user: AdminUser }>('/api/auth/me');
      adminAuth.setUser(res.user);
      return res.user;
    } catch {
      adminAuth.removeToken();
      return null;
    }
  },

  async forgotPassword(email: string): Promise<{ success: boolean; message: string; recoveryCode?: string }> {
    return apiFetch('/api/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email })
    });
  },

  async changePassword(currentPassword: string, newPassword: string): Promise<{ success: boolean; message: string }> {
    return apiFetch('/api/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword })
    });
  },

  // Dashboard Stats
  async getStats(): Promise<DashboardStats> {
    return apiFetch<DashboardStats>('/api/admin/stats');
  },

  // Enquiries
  async getEnquiries(params: { type?: string; status?: string; search?: string } = {}): Promise<{ enquiries: Enquiry[] }> {
    const query = new URLSearchParams();
    if (params.type) query.set('type', params.type);
    if (params.status) query.set('status', params.status);
    if (params.search) query.set('search', params.search);
    return apiFetch(`/api/admin/enquiries?${query.toString()}`);
  },

  async updateEnquiry(id: string, updates: { status?: string; note?: string }): Promise<{ success: boolean; enquiry: Enquiry }> {
    return apiFetch(`/api/admin/enquiries/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
  },

  async deleteEnquiry(id: string): Promise<{ success: boolean }> {
    return apiFetch(`/api/admin/enquiries/${id}`, { method: 'DELETE' });
  },

  getExportCsvUrl(): string {
    const token = adminAuth.getToken();
    return `/api/admin/enquiries/export-csv?auth=${token || ''}`;
  },

  // Rooms
  async getRooms(): Promise<{ rooms: any[] }> {
    return apiFetch('/api/admin/rooms');
  },

  async createRoom(room: any): Promise<{ success: boolean; room: any }> {
    return apiFetch('/api/admin/rooms', {
      method: 'POST',
      body: JSON.stringify(room)
    });
  },

  async updateRoom(id: string, room: any): Promise<{ success: boolean; room: any }> {
    return apiFetch(`/api/admin/rooms/${id}`, {
      method: 'PUT',
      body: JSON.stringify(room)
    });
  },

  async deleteRoom(id: string): Promise<{ success: boolean }> {
    return apiFetch(`/api/admin/rooms/${id}`, { method: 'DELETE' });
  },

  // Restaurant Menu
  async getMenu(): Promise<{ menu: any[] }> {
    return apiFetch('/api/admin/menu');
  },

  async createMenuItem(item: any): Promise<{ success: boolean; item: any }> {
    return apiFetch('/api/admin/menu', {
      method: 'POST',
      body: JSON.stringify(item)
    });
  },

  async updateMenuItem(id: string, item: any): Promise<{ success: boolean; item: any }> {
    return apiFetch(`/api/admin/menu/${id}`, {
      method: 'PUT',
      body: JSON.stringify(item)
    });
  },

  async deleteMenuItem(id: string): Promise<{ success: boolean }> {
    return apiFetch(`/api/admin/menu/${id}`, { method: 'DELETE' });
  },

  // Events & Venues
  async getEvents(): Promise<{ events: any[] }> {
    return apiFetch('/api/admin/events');
  },

  async createEventVenue(venue: any): Promise<{ success: boolean; venue: any }> {
    return apiFetch('/api/admin/events', {
      method: 'POST',
      body: JSON.stringify(venue)
    });
  },

  async updateEventVenue(id: string, venue: any): Promise<{ success: boolean; venue: any }> {
    return apiFetch(`/api/admin/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(venue)
    });
  },

  async deleteEventVenue(id: string): Promise<{ success: boolean }> {
    return apiFetch(`/api/admin/events/${id}`, { method: 'DELETE' });
  },

  // Gallery
  async getGallery(): Promise<{ gallery: any[] }> {
    return apiFetch('/api/admin/gallery');
  },

  async addGalleryImage(image: any): Promise<{ success: boolean; item: any }> {
    return apiFetch('/api/admin/gallery', {
      method: 'POST',
      body: JSON.stringify(image)
    });
  },

  async deleteGalleryImage(id: string): Promise<{ success: boolean }> {
    return apiFetch(`/api/admin/gallery/${id}`, { method: 'DELETE' });
  },

  async reorderGallery(ids: string[]): Promise<{ success: boolean; gallery: any[] }> {
    return apiFetch('/api/admin/gallery/reorder', {
      method: 'POST',
      body: JSON.stringify({ ids })
    });
  },

  // Website Content
  async getContent(): Promise<{ content: WebsiteContentSettings }> {
    return apiFetch('/api/admin/content');
  },

  async updateContent(content: Partial<WebsiteContentSettings>): Promise<{ success: boolean; content: WebsiteContentSettings }> {
    return apiFetch('/api/admin/content', {
      method: 'PUT',
      body: JSON.stringify(content)
    });
  },

  // Contact
  async getContact(): Promise<{ contact: ContactSettings }> {
    return apiFetch('/api/admin/contact');
  },

  async updateContact(contact: Partial<ContactSettings>): Promise<{ success: boolean; contact: ContactSettings }> {
    return apiFetch('/api/admin/contact', {
      method: 'PUT',
      body: JSON.stringify(contact)
    });
  },

  // Users & Permissions
  async getUsers(): Promise<{ users: AdminUser[] }> {
    return apiFetch('/api/admin/users');
  },

  async createUser(user: any): Promise<{ success: boolean; user: AdminUser }> {
    return apiFetch('/api/admin/users', {
      method: 'POST',
      body: JSON.stringify(user)
    });
  },

  // Audit Logs
  async getAuditLogs(): Promise<{ logs: AuditLog[] }> {
    return apiFetch('/api/admin/audit-logs');
  },

  // Public Booking & Enquiry submission
  async submitPublicEnquiry(data: any): Promise<{ success: boolean; message: string; enquiryId?: string }> {
    const response = await fetch('/api/public/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const resData = await response.json();
    if (!response.ok) {
      throw new Error(resData.error || 'Failed to submit enquiry');
    }
    return resData;
  }
};
