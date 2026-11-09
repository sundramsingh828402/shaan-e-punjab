import React, { useState, useEffect } from 'react';
import { ShaanLogo } from '../../components/common/ShaanLogo';
import { adminApi, adminAuth } from '../../services/adminApi';
import { AdminUser, AdminTab, DashboardStats, Enquiry } from '../../types/admin';
import {
  LayoutDashboard,
  CalendarCheck,
  BedDouble,
  UtensilsCrossed,
  PartyPopper,
  Image as ImageIcon,
  FileEdit,
  MessageSquareText,
  MapPin,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
  Bell,
  RefreshCw,
  Search,
  Filter,
  Download,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Phone,
  Mail,
  User,
  ArrowRight,
  Info
} from 'lucide-react';

interface AdminDashboardPageProps {
  onLogout: () => void;
  onNavigateHome: () => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  onLogout,
  onNavigateHome
}) => {
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(adminAuth.getUser());
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Data states for modules
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [enquiryFilter, setEnquiryFilter] = useState<{ type: string; status: string; search: string }>({
    type: 'all',
    status: 'all',
    search: ''
  });
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [newNoteText, setNewNoteText] = useState('');

  const [rooms, setRooms] = useState<any[]>([]);
  const [editingRoom, setEditingRoom] = useState<any | null>(null);
  const [isAddingRoom, setIsAddingRoom] = useState(false);

  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [editingMenuItem, setEditingMenuItem] = useState<any | null>(null);
  const [isAddingMenuItem, setIsAddingMenuItem] = useState(false);
  const [menuCategoryFilter, setMenuCategoryFilter] = useState('all');

  const [events, setEvents] = useState<any[]>([]);
  const [editingEvent, setEditingEvent] = useState<any | null>(null);
  const [isAddingEvent, setIsAddingEvent] = useState(false);

  const [gallery, setGallery] = useState<any[]>([]);
  const [isAddingGallery, setIsAddingGallery] = useState(false);
  const [newGalleryItem, setNewGalleryItem] = useState({
    title: '',
    imageUrl: '',
    category: 'property',
    categoryLabel: 'Resort Grounds',
    description: ''
  });

  const [websiteContent, setWebsiteContent] = useState<any>(null);
  const [contactSettings, setContactSettings] = useState<any>(null);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    role: 'manager'
  });

  // Confirmation modal state
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {}
  });

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4500);
  };

  // Initial load
  const loadStatsAndData = async () => {
    setLoadingStats(true);
    try {
      const statsData = await adminApi.getStats();
      setStats(statsData);
      setEnquiries(statsData.recentEnquiries || []);
    } catch (err: any) {
      showToast(err.message || 'Error loading dashboard statistics', 'error');
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    loadStatsAndData();
  }, []);

  // Load module specific data when tab changes
  useEffect(() => {
    if (activeTab === 'bookings' || activeTab === 'enquiries') {
      adminApi.getEnquiries(enquiryFilter).then(res => setEnquiries(res.enquiries)).catch(() => {});
    } else if (activeTab === 'rooms') {
      adminApi.getRooms().then(res => setRooms(res.rooms)).catch(() => {});
    } else if (activeTab === 'restaurant') {
      adminApi.getMenu().then(res => setMenuItems(res.menu)).catch(() => {});
    } else if (activeTab === 'events') {
      adminApi.getEvents().then(res => setEvents(res.events)).catch(() => {});
    } else if (activeTab === 'gallery') {
      adminApi.getGallery().then(res => setGallery(res.gallery)).catch(() => {});
    } else if (activeTab === 'content') {
      adminApi.getContent().then(res => setWebsiteContent(res.content)).catch(() => {});
    } else if (activeTab === 'contact') {
      adminApi.getContact().then(res => setContactSettings(res.contact)).catch(() => {});
    } else if (activeTab === 'users') {
      adminApi.getUsers().then(res => setAdminUsers(res.users)).catch(() => {});
      adminApi.getAuditLogs().then(res => setAuditLogs(res.logs)).catch(() => {});
    }
  }, [activeTab]);

  const handleLogout = async () => {
    await adminApi.logout();
    onLogout();
  };

  // --- Enquiries handlers ---
  const handleUpdateEnquiryStatus = async (id: string, status: string) => {
    try {
      const res = await adminApi.updateEnquiry(id, { status });
      setEnquiries(prev => prev.map(e => (e.id === id ? res.enquiry : e)));
      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry(res.enquiry);
      }
      showToast(`Enquiry ${id} status changed to ${status}`);
      loadStatsAndData();
    } catch (err: any) {
      showToast(err.message || 'Failed to update status', 'error');
    }
  };

  const handleAddEnquiryNote = async (id: string) => {
    if (!newNoteText.trim()) return;
    try {
      const res = await adminApi.updateEnquiry(id, { note: newNoteText.trim() });
      setEnquiries(prev => prev.map(e => (e.id === id ? res.enquiry : e)));
      setSelectedEnquiry(res.enquiry);
      setNewNoteText('');
      showToast('Internal note recorded.');
    } catch (err: any) {
      showToast(err.message || 'Failed to add note', 'error');
    }
  };

  const handleDeleteEnquiry = (id: string) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Enquiry Record?',
      message: 'This will permanently remove this customer booking enquiry from the database.',
      onConfirm: async () => {
        try {
          await adminApi.deleteEnquiry(id);
          setEnquiries(prev => prev.filter(e => e.id !== id));
          if (selectedEnquiry?.id === id) setSelectedEnquiry(null);
          showToast('Enquiry record deleted.');
          loadStatsAndData();
        } catch (err: any) {
          showToast(err.message, 'error');
        } finally {
          setConfirmDialog(prev => ({ ...prev, isOpen: false }));
        }
      }
    });
  };

  // --- Rooms handlers ---
  const handleSaveRoom = async (roomData: any) => {
    try {
      if (roomData.id && rooms.some(r => r.id === roomData.id)) {
        const res = await adminApi.updateRoom(roomData.id, roomData);
        setRooms(prev => prev.map(r => (r.id === roomData.id ? res.room : r)));
        showToast(`Room category "${res.room.name}" updated successfully.`);
      } else {
        const res = await adminApi.createRoom(roomData);
        setRooms(prev => [...prev, res.room]);
        showToast(`New room category "${res.room.name}" added.`);
      }
      setEditingRoom(null);
      setIsAddingRoom(false);
      loadStatsAndData();
    } catch (err: any) {
      showToast(err.message || 'Failed to save room', 'error');
    }
  };

  const handleDeleteRoom = (id: string, name: string) => {
    setConfirmDialog({
      isOpen: true,
      title: `Delete Room Category "${name}"?`,
      message: 'This will remove this room type from the database and public room bookings.',
      onConfirm: async () => {
        try {
          await adminApi.deleteRoom(id);
          setRooms(prev => prev.filter(r => r.id !== id));
          showToast(`Room "${name}" removed.`);
          loadStatsAndData();
        } catch (err: any) {
          showToast(err.message, 'error');
        } finally {
          setConfirmDialog(prev => ({ ...prev, isOpen: false }));
        }
      }
    });
  };

  // --- Menu handlers ---
  const handleSaveMenuItem = async (itemData: any) => {
    try {
      if (itemData.id && menuItems.some(m => m.id === itemData.id)) {
        const res = await adminApi.updateMenuItem(itemData.id, itemData);
        setMenuItems(prev => prev.map(m => (m.id === itemData.id ? res.item : m)));
        showToast(`Menu dish "${res.item.name}" updated.`);
      } else {
        const res = await adminApi.createMenuItem(itemData);
        setMenuItems(prev => [...prev, res.item]);
        showToast(`Added "${res.item.name}" to menu.`);
      }
      setEditingMenuItem(null);
      setIsAddingMenuItem(false);
    } catch (err: any) {
      showToast(err.message || 'Failed to save menu dish', 'error');
    }
  };

  const handleDeleteMenuItem = (id: string, name: string) => {
    setConfirmDialog({
      isOpen: true,
      title: `Delete Menu Item "${name}"?`,
      message: 'Are you sure you want to remove this dish from the digital restaurant menu?',
      onConfirm: async () => {
        try {
          await adminApi.deleteMenuItem(id);
          setMenuItems(prev => prev.filter(m => m.id !== id));
          showToast(`Dish "${name}" deleted.`);
        } catch (err: any) {
          showToast(err.message, 'error');
        } finally {
          setConfirmDialog(prev => ({ ...prev, isOpen: false }));
        }
      }
    });
  };

  // --- Events handlers ---
  const handleSaveEvent = async (eventData: any) => {
    try {
      if (eventData.id && events.some(e => e.id === eventData.id)) {
        const res = await adminApi.updateEventVenue(eventData.id, eventData);
        setEvents(prev => prev.map(e => (e.id === eventData.id ? res.venue : e)));
        showToast(`Venue package "${res.venue.name}" updated.`);
      } else {
        const res = await adminApi.createEventVenue(eventData);
        setEvents(prev => [...prev, res.venue]);
        showToast(`Created venue package "${res.venue.name}".`);
      }
      setEditingEvent(null);
      setIsAddingEvent(false);
    } catch (err: any) {
      showToast(err.message || 'Failed to save event venue', 'error');
    }
  };

  const handleDeleteEvent = (id: string, name: string) => {
    setConfirmDialog({
      isOpen: true,
      title: `Delete Venue "${name}"?`,
      message: 'This will remove this venue package from weddings and celebrations.',
      onConfirm: async () => {
        try {
          await adminApi.deleteEventVenue(id);
          setEvents(prev => prev.filter(e => e.id !== id));
          showToast(`Venue "${name}" removed.`);
        } catch (err: any) {
          showToast(err.message, 'error');
        } finally {
          setConfirmDialog(prev => ({ ...prev, isOpen: false }));
        }
      }
    });
  };

  // --- Gallery handlers ---
  const handleAddGalleryImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalleryItem.title || !newGalleryItem.imageUrl) {
      showToast('Title and Image URL/Asset are required', 'error');
      return;
    }
    try {
      const res = await adminApi.addGalleryImage(newGalleryItem);
      setGallery(prev => [res.item, ...prev]);
      setIsAddingGallery(false);
      setNewGalleryItem({
        title: '',
        imageUrl: '',
        category: 'property',
        categoryLabel: 'Resort Grounds',
        description: ''
      });
      showToast('Image successfully added to gallery.');
    } catch (err: any) {
      showToast(err.message || 'Failed to add image', 'error');
    }
  };

  const handleDeleteGalleryImage = (id: string, title: string) => {
    setConfirmDialog({
      isOpen: true,
      title: `Delete Photo "${title}"?`,
      message: 'This photo will be permanently deleted from the authorized gallery.',
      onConfirm: async () => {
        try {
          await adminApi.deleteGalleryImage(id);
          setGallery(prev => prev.filter(g => g.id !== id));
          showToast(`Photo "${title}" removed.`);
        } catch (err: any) {
          showToast(err.message, 'error');
        } finally {
          setConfirmDialog(prev => ({ ...prev, isOpen: false }));
        }
      }
    });
  };

  // --- Website Content Save ---
  const handleSaveWebsiteContent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await adminApi.updateContent(websiteContent);
      setWebsiteContent(res.content);
      showToast('Website content changes saved and live on homepage.');
    } catch (err: any) {
      showToast(err.message || 'Failed to update website content', 'error');
    }
  };

  // --- Contact Info Save ---
  const handleSaveContact = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await adminApi.updateContact(contactSettings);
      setContactSettings(res.contact);
      showToast('Resort contact details and GPS coordinates updated.');
    } catch (err: any) {
      showToast(err.message || 'Failed to update contact info', 'error');
    }
  };

  // --- Users Create ---
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await adminApi.createUser(newUserData);
      setAdminUsers(prev => [...prev, res.user]);
      setIsAddingUser(false);
      setNewUserData({ name: '', email: '', username: '', password: '', role: 'manager' });
      showToast(`Admin account for "${res.user.name}" created.`);
    } catch (err: any) {
      showToast(err.message || 'Failed to create user', 'error');
    }
  };

  const menuItemsList = [
    { id: 'dashboard' as AdminTab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'bookings' as AdminTab, label: 'Bookings', icon: CalendarCheck, badge: stats?.newBookingEnquiries },
    { id: 'rooms' as AdminTab, label: 'Room & Stay', icon: BedDouble },
    { id: 'restaurant' as AdminTab, label: 'Restaurant & Menu', icon: UtensilsCrossed },
    { id: 'events' as AdminTab, label: 'Wedding & Events', icon: PartyPopper },
    { id: 'gallery' as AdminTab, label: 'Gallery & Media', icon: ImageIcon },
    { id: 'content' as AdminTab, label: 'Website Content', icon: FileEdit },
    { id: 'enquiries' as AdminTab, label: 'Customer Enquiries', icon: MessageSquareText },
    { id: 'contact' as AdminTab, label: 'Contact Information', icon: MapPin },
    { id: 'users' as AdminTab, label: 'Users & Permissions', icon: Users },
    { id: 'settings' as AdminTab, label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F0E7] flex flex-col font-sans antialiased selection:bg-[#C6A052] selection:text-[#090909]">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-medium border animate-fadeIn ${
            notification.type === 'error'
              ? 'bg-red-950/90 border-red-500/50 text-red-200'
              : 'bg-[#171717] border-[#C6A052] text-[#E1C783]'
          }`}
        >
          {notification.type === 'error' ? (
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-[#C6A052] shrink-0" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Confirmation Dialog */}
      {confirmDialog.isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn"
          onClick={() => setConfirmDialog(prev => ({ ...prev, isOpen: false }))}
        >
          <div
            className="relative max-w-sm w-full bg-[#141414] border border-[#C6A052]/40 rounded-2xl p-6 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="font-serif text-lg font-bold text-white mb-2">
              {confirmDialog.title}
            </h3>
            <p className="text-xs text-[#F5F0E7]/70 leading-relaxed mb-6">
              {confirmDialog.message}
            </p>
            <div className="flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setConfirmDialog(prev => ({ ...prev, isOpen: false }))}
                className="px-4 py-2 rounded-xl text-xs text-white/70 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDialog.onConfirm}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Admin Header Bar */}
      <header className="h-16 bg-[#0E0E0E] border-b border-[#30271D] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 rounded-lg bg-[#171717] border border-[#30271D] text-white hover:text-[#C6A052]"
            aria-label="Toggle menu"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <ShaanLogo size="sm" />
            <div className="hidden sm:block">
              <span className="font-serif text-sm font-bold tracking-wide text-white block leading-none">
                Shaan-E-Punjab
              </span>
              <span className="text-[10px] text-[#C6A052] uppercase tracking-widest font-semibold">
                Central Admin Control
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          {/* Database Live Connected Status Pill */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-[11px] text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Database Connected</span>
          </div>

          {/* Quick link to live public site */}
          <button
            type="button"
            onClick={onNavigateHome}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#171717] hover:bg-[#222] border border-[#30271D] hover:border-[#C6A052] text-xs text-[#E1C783] transition-all cursor-pointer"
            title="Open customer-facing website in view mode"
          >
            <span>Live Website</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#C6A052]" />
          </button>

          {/* User Profile dropdown/badge */}
          <div className="flex items-center gap-2 pl-2 border-l border-[#30271D]">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#C6A052] to-[#E1C783] text-[#090909] font-bold text-xs flex items-center justify-center shadow-md">
              {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="hidden xl:block text-left text-xs leading-tight">
              <span className="font-semibold text-white block">{currentUser?.name || 'Administrator'}</span>
              <span className="text-[10px] text-[#C6A052] uppercase tracking-wider">
                {currentUser?.role || 'Chief Admin'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#0E0E0E] border-r border-[#30271D] flex flex-col justify-between transition-transform duration-300 lg:static lg:translate-x-0 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-0 hidden lg:flex'
          }`}
        >
          {/* Top section with Navigation Links */}
          <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
            <div className="px-3 pb-3 pt-1 text-[10px] uppercase tracking-[0.2em] text-[#C6A052] font-semibold border-b border-[#30271D]/40 mb-2">
              Operations & Modules
            </div>

            {menuItemsList.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#C6A052] to-[#E1C783] text-[#090909] font-bold shadow-md'
                      : 'text-[#F5F0E7]/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#090909]' : 'text-[#C6A052]'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge ? (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isActive
                          ? 'bg-[#090909] text-[#E1C783]'
                          : 'bg-red-500 text-white animate-pulse'
                      }`}
                    >
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>

          {/* Bottom Sidebar: Logout Button */}
          <div className="p-3 border-t border-[#30271D] bg-[#0A0A0A]">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:text-white hover:bg-red-950/40 border border-transparent hover:border-red-500/40 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-red-400" />
              <span>Secure Logout</span>
            </button>
          </div>
        </aside>

        {/* Content Body Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#070707]">
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              {/* Header Title with Refresh */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    Dashboard Overview
                  </h2>
                  <p className="text-xs text-[#F5F0E7]/60 mt-0.5">
                    Real-time bookings, occupancy, and inquiries for Shaan-E-Punjab Hotel & Resort.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={loadStatsAndData}
                    disabled={loadingStats}
                    className="px-3.5 py-2 rounded-xl bg-[#141414] hover:bg-[#1f1f1f] border border-[#30271D] text-xs text-[#E1C783] flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loadingStats ? 'animate-spin' : ''}`} />
                    <span>Refresh Stats</span>
                  </button>
                  <a
                    href={adminApi.getExportCsvUrl()}
                    download
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#C6A052] to-[#E1C783] text-[#090909] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 hover:brightness-110 shadow-md transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export CSV</span>
                  </a>
                </div>
              </div>

              {/* 6 Key Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* 1. Total Room Bookings */}
                <div
                  onClick={() => { setActiveTab('bookings'); setEnquiryFilter({ type: 'room_booking', status: 'all', search: '' }); }}
                  className="p-5 rounded-2xl bg-[#121212] border border-[#30271D] hover:border-[#C6A052]/60 transition-all cursor-pointer group shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-wider text-[#F5F0E7]/60 font-semibold">
                      Total Room Bookings
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-[#C6A052]/10 border border-[#C6A052]/30 flex items-center justify-center text-[#E1C783] group-hover:scale-110 transition-transform">
                      <BedDouble className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="font-serif text-3xl font-bold text-white mt-2">
                    {stats?.totalRoomBookings ?? 0}
                  </div>
                  <div className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1">
                    <span className="font-semibold">Direct customer reservations</span>
                  </div>
                </div>

                {/* 2. New Booking Enquiries */}
                <div
                  onClick={() => { setActiveTab('bookings'); setEnquiryFilter({ type: 'all', status: 'New', search: '' }); }}
                  className="p-5 rounded-2xl bg-[#121212] border border-[#30271D] hover:border-amber-500/60 transition-all cursor-pointer group shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-wider text-[#F5F0E7]/60 font-semibold">
                      New Booking Enquiries
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                      <Clock className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="font-serif text-3xl font-bold text-amber-300 mt-2">
                    {stats?.newBookingEnquiries ?? 0}
                  </div>
                  <div className="text-[11px] text-amber-400/80 mt-2 flex items-center gap-1">
                    <span>Awaiting front desk response</span>
                  </div>
                </div>

                {/* 3. Room Availability */}
                <div
                  onClick={() => setActiveTab('rooms')}
                  className="p-5 rounded-2xl bg-[#121212] border border-[#30271D] hover:border-[#C6A052]/60 transition-all cursor-pointer group shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-wider text-[#F5F0E7]/60 font-semibold">
                      Room Categories
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                      <CalendarCheck className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="font-serif text-3xl font-bold text-white mt-2">
                    {stats?.totalRooms ?? 3} Active
                  </div>
                  <div className="text-[11px] text-blue-400 mt-2">
                    AC Deluxe, Executive Suite, Royal Suite
                  </div>
                </div>

                {/* 4. Restaurant Enquiries */}
                <div
                  onClick={() => { setActiveTab('bookings'); setEnquiryFilter({ type: 'table_reservation', status: 'all', search: '' }); }}
                  className="p-5 rounded-2xl bg-[#121212] border border-[#30271D] hover:border-[#C6A052]/60 transition-all cursor-pointer group shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-wider text-[#F5F0E7]/60 font-semibold">
                      Restaurant Enquiries
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform">
                      <UtensilsCrossed className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="font-serif text-3xl font-bold text-white mt-2">
                    {stats?.restaurantEnquiries ?? 0}
                  </div>
                  <div className="text-[11px] text-red-400 mt-2">
                    Dining tables & party pre-orders
                  </div>
                </div>

                {/* 5. Event & Wedding Enquiries */}
                <div
                  onClick={() => { setActiveTab('bookings'); setEnquiryFilter({ type: 'wedding_event', status: 'all', search: '' }); }}
                  className="p-5 rounded-2xl bg-[#121212] border border-[#30271D] hover:border-purple-500/60 transition-all cursor-pointer group shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-wider text-[#F5F0E7]/60 font-semibold">
                      Wedding & Events Enquiries
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                      <PartyPopper className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="font-serif text-3xl font-bold text-white mt-2">
                    {stats?.eventWeddingEnquiries ?? 0}
                  </div>
                  <div className="text-[11px] text-purple-400 mt-2">
                    Marriage lawn & AC banquet requests
                  </div>
                </div>

                {/* 6. Contact Form Submissions */}
                <div
                  onClick={() => { setActiveTab('enquiries'); setEnquiryFilter({ type: 'contact_query', status: 'all', search: '' }); }}
                  className="p-5 rounded-2xl bg-[#121212] border border-[#30271D] hover:border-emerald-500/60 transition-all cursor-pointer group shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-wider text-[#F5F0E7]/60 font-semibold">
                      Contact Inquiries
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                      <MessageSquareText className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="font-serif text-3xl font-bold text-white mt-2">
                    {stats?.contactFormSubmissions ?? 0}
                  </div>
                  <div className="text-[11px] text-emerald-400 mt-2">
                    Highway travelers & spiritual pilgrims
                  </div>
                </div>
              </div>

              {/* Database Connection Transparency Notice */}
              <div className="p-4 rounded-2xl bg-[#121212] border border-[#30271D] flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block">
                      Live Persistent Backend Active
                    </span>
                    <span className="text-[#F5F0E7]/60 text-[11px]">
                      Storage: {stats?.dbType} • Last verified: {new Date(stats?.lastUpdated || Date.now()).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
                <div className="text-[11px] text-[#C6A052]">
                  All form submissions from hotel guests are recorded directly into this database.
                </div>
              </div>

              {/* Recent Enquiries Live Feed */}
              <div className="bg-[#121212] border border-[#30271D] rounded-2xl overflow-hidden shadow-xl">
                <div className="p-5 border-b border-[#30271D] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#C6A052]" />
                    <h3 className="font-serif text-base sm:text-lg font-bold text-white">
                      Recent Inquiries & Direct Bookings
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('bookings')}
                    className="text-xs text-[#E1C783] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View All</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="divide-y divide-[#30271D]/40">
                  {enquiries.length === 0 ? (
                    <div className="p-8 text-center text-xs text-[#F5F0E7]/50">
                      No customer inquiries found.
                    </div>
                  ) : (
                    enquiries.slice(0, 5).map(item => (
                      <div
                        key={item.id}
                        className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/[0.02] transition-colors"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm text-white">{item.customerName}</span>
                            <span
                              className={`text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border ${
                                item.status === 'New'
                                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                                  : item.status === 'Confirmed'
                                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                  : item.status === 'Contacted'
                                  ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                                  : 'bg-white/5 text-white/50 border-white/10'
                              }`}
                            >
                              {item.status}
                            </span>
                            <span className="text-[10px] text-[#C6A052] uppercase tracking-wider font-medium">
                              • {item.type.replace('_', ' ')}
                            </span>
                          </div>
                          <div className="text-xs text-[#F5F0E7]/70 flex flex-wrap items-center gap-3">
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3 text-[#C6A052]" /> {item.phone}
                            </span>
                            {item.email && item.email !== 'N/A' && (
                              <span className="flex items-center gap-1">
                                <Mail className="w-3 h-3 text-[#C6A052]" /> {item.email}
                              </span>
                            )}
                            {item.checkInDate && (
                              <span className="text-amber-300">
                                📅 {item.checkInDate} ({item.guests || 2} Guests)
                              </span>
                            )}
                          </div>
                          {item.specialRequests && (
                            <p className="text-[11px] text-[#F5F0E7]/60 italic mt-1 line-clamp-1">
                              "{item.specialRequests}"
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                          <select
                            value={item.status}
                            onChange={(e) => handleUpdateEnquiryStatus(item.id, e.target.value)}
                            className="text-xs bg-[#090909] border border-[#30271D] rounded-lg px-2 py-1 text-white outline-none focus:border-[#C6A052]"
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Closed">Closed</option>
                          </select>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedEnquiry(item);
                              setActiveTab('bookings');
                            }}
                            className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-[#E1C783] border border-white/10"
                          >
                            Details
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2 & 8: BOOKINGS & ENQUIRIES MODULE */}
          {(activeTab === 'bookings' || activeTab === 'enquiries') && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    {activeTab === 'bookings' ? 'Bookings & Reservations' : 'Customer Inquiries & Desk Submissions'}
                  </h2>
                  <p className="text-xs text-[#F5F0E7]/60 mt-0.5">
                    Search, filter, update guest status, add notes, and export records to CSV.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={adminApi.getExportCsvUrl()}
                    download
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#C6A052] to-[#E1C783] text-[#090909] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 hover:brightness-110 shadow-md transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download CSV</span>
                  </a>
                </div>
              </div>

              {/* Filter & Search Bar */}
              <div className="p-4 rounded-2xl bg-[#121212] border border-[#30271D] flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="relative">
                    <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Search guest name, phone, email..."
                      value={enquiryFilter.search}
                      onChange={(e) => {
                        const val = e.target.value;
                        setEnquiryFilter(prev => ({ ...prev, search: val }));
                        adminApi.getEnquiries({ ...enquiryFilter, search: val }).then(r => setEnquiries(r.enquiries));
                      }}
                      className="pl-9 pr-3 py-1.5 rounded-xl bg-[#090909] border border-[#30271D] text-xs text-white placeholder-white/30 focus:border-[#C6A052] outline-none w-64"
                    />
                  </div>

                  <select
                    value={enquiryFilter.type}
                    onChange={(e) => {
                      const val = e.target.value;
                      setEnquiryFilter(prev => ({ ...prev, type: val }));
                      adminApi.getEnquiries({ ...enquiryFilter, type: val }).then(r => setEnquiries(r.enquiries));
                    }}
                    className="px-3 py-1.5 rounded-xl bg-[#090909] border border-[#30271D] text-xs text-white outline-none focus:border-[#C6A052]"
                  >
                    <option value="all">All Inquiry Types</option>
                    <option value="room_booking">Room Bookings</option>
                    <option value="table_reservation">Table Reservations</option>
                    <option value="wedding_event">Weddings & Banquets</option>
                    <option value="contact_query">Contact Helpdesk</option>
                  </select>

                  <select
                    value={enquiryFilter.status}
                    onChange={(e) => {
                      const val = e.target.value;
                      setEnquiryFilter(prev => ({ ...prev, status: val }));
                      adminApi.getEnquiries({ ...enquiryFilter, status: val }).then(r => setEnquiries(r.enquiries));
                    }}
                    className="px-3 py-1.5 rounded-xl bg-[#090909] border border-[#30271D] text-xs text-white outline-none focus:border-[#C6A052]"
                  >
                    <option value="all">All Statuses</option>
                    <option value="New">Status: New</option>
                    <option value="Contacted">Status: Contacted</option>
                    <option value="Confirmed">Status: Confirmed</option>
                    <option value="Closed">Status: Closed</option>
                  </select>
                </div>

                <div className="text-xs text-[#F5F0E7]/60">
                  Showing <strong>{enquiries.length}</strong> record(s)
                </div>
              </div>

              {/* Table / List */}
              <div className="bg-[#121212] border border-[#30271D] rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#090909] border-b border-[#30271D] text-[#C6A052] uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="p-3.5">Guest & Contact</th>
                        <th className="p-3.5">Category</th>
                        <th className="p-3.5">Dates / Info</th>
                        <th className="p-3.5">Status</th>
                        <th className="p-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#30271D]/40">
                      {enquiries.map(enq => (
                        <tr key={enq.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="p-3.5">
                            <span className="font-bold text-white block">{enq.customerName}</span>
                            <span className="text-[11px] text-[#F5F0E7]/70 block">{enq.phone}</span>
                            {enq.email && enq.email !== 'N/A' && (
                              <span className="text-[10px] text-[#C6A052] block">{enq.email}</span>
                            )}
                          </td>
                          <td className="p-3.5">
                            <span className="font-semibold text-[#E1C783] block">
                              {enq.type === 'room_booking'
                                ? '🏨 Room Booking'
                                : enq.type === 'wedding_event'
                                ? '🎉 Wedding/Event'
                                : enq.type === 'table_reservation'
                                ? '🍽️ Table Booking'
                                : '💬 Contact Helpdesk'}
                            </span>
                            <span className="text-[10px] text-white/40">
                              {new Date(enq.dateCreated).toLocaleDateString()}
                            </span>
                          </td>
                          <td className="p-3.5 text-[11px] text-[#F5F0E7]/80">
                            {enq.checkInDate && (
                              <div>Stay: {enq.checkInDate} to {enq.checkOutDate || 'Next Day'}</div>
                            )}
                            {enq.eventDate && (
                              <div>Event: {enq.eventDate} ({enq.eventGuests || 'Guests'})</div>
                            )}
                            {enq.tableTime && (
                              <div>Timing: {enq.tableTime}</div>
                            )}
                            {enq.roomType && (
                              <div className="text-[#C6A052]">{enq.roomType}</div>
                            )}
                          </td>
                          <td className="p-3.5">
                            <select
                              value={enq.status}
                              onChange={(e) => handleUpdateEnquiryStatus(enq.id, e.target.value)}
                              className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border outline-none cursor-pointer ${
                                enq.status === 'New'
                                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                                  : enq.status === 'Confirmed'
                                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                                  : enq.status === 'Contacted'
                                  ? 'bg-blue-500/10 border-blue-500/40 text-blue-300'
                                  : 'bg-white/5 border-white/20 text-white/50'
                              }`}
                            >
                              <option value="New">● New</option>
                              <option value="Contacted">● Contacted</option>
                              <option value="Confirmed">● Confirmed</option>
                              <option value="Closed">● Closed</option>
                            </select>
                          </td>
                          <td className="p-3.5 text-right space-x-1.5">
                            <button
                              type="button"
                              onClick={() => setSelectedEnquiry(enq)}
                              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[#E1C783] border border-white/10"
                            >
                              Inspect & Notes
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteEnquiry(enq.id)}
                              className="p-1 rounded-lg text-red-400 hover:bg-red-950/40"
                              title="Delete enquiry"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Detailed Enquiry Drawer / Modal */}
              {selectedEnquiry && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn"
                  onClick={() => setSelectedEnquiry(null)}
                >
                  <div
                    className="relative max-w-xl w-full max-h-[90vh] bg-[#141414] border border-[#C6A052]/50 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
                    onClick={e => e.stopPropagation()}
                  >
                    <div className="p-5 border-b border-[#30271D] bg-[#0E0E0E] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#C6A052] font-bold">
                          Enquiry Record Details • #{selectedEnquiry.id}
                        </span>
                        <h3 className="font-serif text-lg font-bold text-white mt-0.5">
                          {selectedEnquiry.customerName}
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedEnquiry(null)}
                        className="text-white/60 hover:text-white"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
                      <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-black/40 border border-white/5">
                        <div>
                          <span className="text-white/40 block">Phone Number</span>
                          <a href={`tel:${selectedEnquiry.phone}`} className="font-bold text-[#E1C783] text-sm">
                            {selectedEnquiry.phone}
                          </a>
                        </div>
                        <div>
                          <span className="text-white/40 block">Email Address</span>
                          <span className="font-medium text-white">{selectedEnquiry.email}</span>
                        </div>
                        <div>
                          <span className="text-white/40 block">Inquiry Type</span>
                          <span className="font-semibold text-white uppercase">{selectedEnquiry.type}</span>
                        </div>
                        <div>
                          <span className="text-white/40 block">Current Status</span>
                          <span className="font-bold text-amber-400">{selectedEnquiry.status}</span>
                        </div>
                      </div>

                      {selectedEnquiry.specialRequests && (
                        <div className="p-3 rounded-xl bg-[#C6A052]/10 border border-[#C6A052]/30">
                          <span className="text-[10px] font-bold uppercase text-[#C6A052] block mb-1">
                            Guest Message & Special Requests
                          </span>
                          <p className="text-xs text-[#F5F0E7] leading-relaxed">
                            {selectedEnquiry.specialRequests || selectedEnquiry.message}
                          </p>
                        </div>
                      )}

                      {/* Internal Staff Notes */}
                      <div>
                        <span className="text-[11px] uppercase tracking-wider text-[#C6A052] font-bold block mb-2">
                          Internal Front Desk & Manager Notes
                        </span>
                        <div className="space-y-1.5 mb-3 max-h-36 overflow-y-auto">
                          {(!selectedEnquiry.internalNotes || selectedEnquiry.internalNotes.length === 0) ? (
                            <div className="text-white/40 italic">No internal notes added yet.</div>
                          ) : (
                            selectedEnquiry.internalNotes.map((note, idx) => (
                              <div key={idx} className="p-2 rounded-lg bg-black/50 border border-white/5 text-[11px] text-[#F5F0E7]/90">
                                {note}
                              </div>
                            ))
                          )}
                        </div>

                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Add follow-up note (e.g. called guest, advance received)..."
                            value={newNoteText}
                            onChange={(e) => setNewNoteText(e.target.value)}
                            className="flex-1 px-3 py-1.5 bg-[#090909] border border-[#30271D] rounded-xl text-xs text-white outline-none focus:border-[#C6A052]"
                          />
                          <button
                            type="button"
                            onClick={() => handleAddEnquiryNote(selectedEnquiry.id)}
                            className="px-3.5 py-1.5 rounded-xl bg-[#C6A052] text-[#090909] font-bold text-xs uppercase"
                          >
                            Add Note
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ROOM & STAY MODULE */}
          {activeTab === 'rooms' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    Room Categories & Pricing
                  </h2>
                  <p className="text-xs text-[#F5F0E7]/60 mt-0.5">
                    Add, edit, view and remove hotel rooms, pricing, bed types, and guest capacities.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEditingRoom({
                      id: `room-${Date.now()}`,
                      name: '',
                      tagline: '',
                      pricePerNight: 2850,
                      occupancy: '2 Adults',
                      bedType: 'King Size Bed',
                      sizeSqFt: 350,
                      description: '',
                      amenities: ['Split AC', 'Soundproof Windows', 'LED TV', 'Free Wi-Fi'],
                      imageUrl: '/assets/aistudio/room_67209ceb.jpeg',
                      featured: true
                    });
                    setIsAddingRoom(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#C6A052] to-[#E1C783] text-[#090909] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 hover:brightness-110 shadow-md transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Room Category</span>
                </button>
              </div>

              {/* Rooms Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rooms.map(room => (
                  <div
                    key={room.id}
                    className="bg-[#121212] border border-[#30271D] rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between"
                  >
                    <div className="relative h-48 w-full overflow-hidden bg-black">
                      <img
                        src={room.imageUrl}
                        alt={room.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/85 backdrop-blur-md border border-[#C6A052]/50 text-xs font-bold text-[#E1C783]">
                        ₹{room.pricePerNight} <span className="text-[10px] text-white/60 font-normal">/ night</span>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-serif text-lg font-bold text-white">{room.name}</h4>
                        <p className="text-xs text-[#C6A052] font-medium mt-0.5">{room.tagline}</p>
                        <p className="text-xs text-[#F5F0E7]/70 mt-2 line-clamp-2 leading-relaxed">
                          {room.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {(room.amenities || []).slice(0, 4).map((am: string, i: number) => (
                            <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[#F5F0E7]/80">
                              {am}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 mt-4 border-t border-[#30271D] flex items-center justify-between">
                        <span className="text-[11px] text-white/50">{room.occupancy} • {room.sizeSqFt} sq.ft</span>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingRoom({ ...room });
                              setIsAddingRoom(true);
                            }}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-[#E1C783] border border-white/10 cursor-pointer"
                            title="Edit room"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteRoom(room.id, room.name)}
                            className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-500/20 cursor-pointer"
                            title="Delete room"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add/Edit Room Modal */}
              {isAddingRoom && editingRoom && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn"
                  onClick={() => setIsAddingRoom(false)}
                >
                  <div
                    className="relative max-w-xl w-full max-h-[90vh] bg-[#141414] border border-[#C6A052]/50 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
                    onClick={e => e.stopPropagation()}
                  >
                    <div className="p-5 border-b border-[#30271D] flex items-center justify-between">
                      <h3 className="font-serif text-lg font-bold text-white">
                        {rooms.some(r => r.id === editingRoom.id) ? 'Edit Room Category' : 'Create Room Category'}
                      </h3>
                      <button onClick={() => setIsAddingRoom(false)} className="text-white/60 hover:text-white">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSaveRoom(editingRoom);
                      }}
                      className="flex-1 overflow-y-auto p-5 space-y-3.5 text-xs"
                    >
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#E1C783] font-semibold mb-1">
                          Room Name
                        </label>
                        <input
                          type="text"
                          value={editingRoom.name}
                          onChange={(e) => setEditingRoom({ ...editingRoom, name: e.target.value })}
                          placeholder="e.g. Deluxe AC Room"
                          className="w-full px-3 py-2 bg-[#090909] border border-[#30271D] rounded-xl text-white outline-none focus:border-[#C6A052]"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-[#E1C783] font-semibold mb-1">
                            Price Per Night (₹)
                          </label>
                          <input
                            type="number"
                            value={editingRoom.pricePerNight}
                            onChange={(e) => setEditingRoom({ ...editingRoom, pricePerNight: Number(e.target.value) })}
                            className="w-full px-3 py-2 bg-[#090909] border border-[#30271D] rounded-xl text-white outline-none focus:border-[#C6A052]"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-[#E1C783] font-semibold mb-1">
                            Occupancy
                          </label>
                          <input
                            type="text"
                            value={editingRoom.occupancy}
                            onChange={(e) => setEditingRoom({ ...editingRoom, occupancy: e.target.value })}
                            placeholder="2 Adults, 1 Child"
                            className="w-full px-3 py-2 bg-[#090909] border border-[#30271D] rounded-xl text-white outline-none focus:border-[#C6A052]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-[#E1C783] font-semibold mb-1">
                            Bed Type
                          </label>
                          <input
                            type="text"
                            value={editingRoom.bedType}
                            onChange={(e) => setEditingRoom({ ...editingRoom, bedType: e.target.value })}
                            placeholder="Royal King Bed"
                            className="w-full px-3 py-2 bg-[#090909] border border-[#30271D] rounded-xl text-white outline-none focus:border-[#C6A052]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-[#E1C783] font-semibold mb-1">
                            Size (sq. ft)
                          </label>
                          <input
                            type="number"
                            value={editingRoom.sizeSqFt}
                            onChange={(e) => setEditingRoom({ ...editingRoom, sizeSqFt: Number(e.target.value) })}
                            className="w-full px-3 py-2 bg-[#090909] border border-[#30271D] rounded-xl text-white outline-none focus:border-[#C6A052]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#E1C783] font-semibold mb-1">
                          Room Image URL or Asset Path
                        </label>
                        <input
                          type="text"
                          value={editingRoom.imageUrl}
                          onChange={(e) => setEditingRoom({ ...editingRoom, imageUrl: e.target.value })}
                          placeholder="/assets/aistudio/room_67209ceb.jpeg"
                          className="w-full px-3 py-2 bg-[#090909] border border-[#30271D] rounded-xl text-white outline-none focus:border-[#C6A052]"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#E1C783] font-semibold mb-1">
                          Room Description
                        </label>
                        <textarea
                          rows={3}
                          value={editingRoom.description}
                          onChange={(e) => setEditingRoom({ ...editingRoom, description: e.target.value })}
                          className="w-full px-3 py-2 bg-[#090909] border border-[#30271D] rounded-xl text-white outline-none focus:border-[#C6A052]"
                        />
                      </div>

                      <div className="pt-3 border-t border-[#30271D] flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setIsAddingRoom(false)}
                          className="px-4 py-2 rounded-xl text-white/60 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#C6A052] to-[#E1C783] text-[#090909] font-bold uppercase tracking-wider shadow-md"
                        >
                          Save Room Details
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: RESTAURANT & MENU MODULE */}
          {activeTab === 'restaurant' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    Restaurant Dishes & Menu
                  </h2>
                  <p className="text-xs text-[#F5F0E7]/60 mt-0.5">
                    Manage digital menu dishes, prices, pure veg tags, and Punjabi highway specialties.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEditingMenuItem({
                      id: `dish-${Date.now()}`,
                      name: '',
                      category: 'main-course',
                      price: 280,
                      isVeg: true,
                      isChefSpecial: false,
                      description: ''
                    });
                    setIsAddingMenuItem(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#C6A052] to-[#E1C783] text-[#090909] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 hover:brightness-110 shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Menu Dish</span>
                </button>
              </div>

              {/* Menu Categories Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2">
                {['all', 'starters', 'tandoor', 'main-course', 'breads', 'desserts-beverages'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setMenuCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      menuCategoryFilter === cat
                        ? 'bg-[#C6A052] text-[#090909]'
                        : 'bg-[#141414] text-white/70 hover:text-white border border-[#30271D]'
                    }`}
                  >
                    {cat.replace('-', ' ')}
                  </button>
                ))}
              </div>

              {/* Menu Dishes Table */}
              <div className="bg-[#121212] border border-[#30271D] rounded-2xl overflow-hidden shadow-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#090909] border-b border-[#30271D] text-[#C6A052] uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3.5">Dish Name & Description</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Price</th>
                      <th className="p-3.5">Diet Type</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#30271D]/40">
                    {menuItems
                      .filter(m => menuCategoryFilter === 'all' || m.category === menuCategoryFilter)
                      .map(item => (
                        <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="p-3.5">
                            <span className="font-bold text-white block">{item.name}</span>
                            <span className="text-[11px] text-[#F5F0E7]/60 block line-clamp-1">{item.description}</span>
                          </td>
                          <td className="p-3.5 uppercase font-medium text-[#C6A052] text-[11px]">
                            {item.category}
                          </td>
                          <td className="p-3.5 font-bold text-white">
                            ₹{item.price}
                          </td>
                          <td className="p-3.5">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                              item.isVeg
                                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                                : 'bg-red-500/10 border-red-500/30 text-red-400'
                            }`}>
                              {item.isVeg ? '● VEG' : '● NON-VEG'}
                            </span>
                            {item.isChefSpecial && (
                              <span className="ml-1 text-[10px] font-semibold text-amber-300">★ Special</span>
                            )}
                          </td>
                          <td className="p-3.5 text-right space-x-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingMenuItem({ ...item });
                                setIsAddingMenuItem(true);
                              }}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-[#E1C783]"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteMenuItem(item.id, item.name)}
                              className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {/* Add/Edit Menu Dish Modal */}
              {isAddingMenuItem && editingMenuItem && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn"
                  onClick={() => setIsAddingMenuItem(false)}
                >
                  <div
                    className="relative max-w-md w-full bg-[#141414] border border-[#C6A052]/50 rounded-2xl p-5 shadow-2xl"
                    onClick={e => e.stopPropagation()}
                  >
                    <h3 className="font-serif text-lg font-bold text-white mb-4">
                      {menuItems.some(m => m.id === editingMenuItem.id) ? 'Edit Menu Dish' : 'Add New Menu Dish'}
                    </h3>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSaveMenuItem(editingMenuItem);
                      }}
                      className="space-y-3.5 text-xs"
                    >
                      <div>
                        <label className="block text-[11px] uppercase text-[#E1C783] font-semibold mb-1">
                          Dish Name
                        </label>
                        <input
                          type="text"
                          value={editingMenuItem.name}
                          onChange={(e) => setEditingMenuItem({ ...editingMenuItem, name: e.target.value })}
                          className="w-full px-3 py-2 bg-[#090909] border border-[#30271D] rounded-xl text-white outline-none focus:border-[#C6A052]"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] uppercase text-[#E1C783] font-semibold mb-1">
                            Price (₹)
                          </label>
                          <input
                            type="number"
                            value={editingMenuItem.price}
                            onChange={(e) => setEditingMenuItem({ ...editingMenuItem, price: Number(e.target.value) })}
                            className="w-full px-3 py-2 bg-[#090909] border border-[#30271D] rounded-xl text-white outline-none focus:border-[#C6A052]"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] uppercase text-[#E1C783] font-semibold mb-1">
                            Category
                          </label>
                          <select
                            value={editingMenuItem.category}
                            onChange={(e) => setEditingMenuItem({ ...editingMenuItem, category: e.target.value })}
                            className="w-full px-3 py-2 bg-[#090909] border border-[#30271D] rounded-xl text-white outline-none focus:border-[#C6A052]"
                          >
                            <option value="starters">Starters</option>
                            <option value="tandoor">Tandoor</option>
                            <option value="main-course">Main Course</option>
                            <option value="breads">Breads</option>
                            <option value="desserts-beverages">Desserts & Beverages</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 py-1">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editingMenuItem.isVeg}
                            onChange={(e) => setEditingMenuItem({ ...editingMenuItem, isVeg: e.target.checked })}
                            className="rounded accent-[#C6A052]"
                          />
                          <span>Pure Vegetarian Dish</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editingMenuItem.isChefSpecial}
                            onChange={(e) => setEditingMenuItem({ ...editingMenuItem, isChefSpecial: e.target.checked })}
                            className="rounded accent-[#C6A052]"
                          />
                          <span>Chef Special Highlight</span>
                        </label>
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase text-[#E1C783] font-semibold mb-1">
                          Description
                        </label>
                        <textarea
                          rows={2}
                          value={editingMenuItem.description}
                          onChange={(e) => setEditingMenuItem({ ...editingMenuItem, description: e.target.value })}
                          className="w-full px-3 py-2 bg-[#090909] border border-[#30271D] rounded-xl text-white outline-none focus:border-[#C6A052]"
                        />
                      </div>

                      <div className="pt-3 border-t border-[#30271D] flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setIsAddingMenuItem(false)}
                          className="px-4 py-2 rounded-xl text-white/60 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#C6A052] to-[#E1C783] text-[#090909] font-bold uppercase tracking-wider"
                        >
                          Save Dish
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: WEDDING & EVENTS MODULE */}
          {activeTab === 'events' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    Wedding & Celebration Venues
                  </h2>
                  <p className="text-xs text-[#F5F0E7]/60 mt-0.5">
                    Manage marriage lawns, royal banquet halls, capacities, and celebration facilities.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEditingEvent({
                      id: `venue-${Date.now()}`,
                      name: '',
                      type: 'Marriage Lawn',
                      capacity: '1,000+ Guests',
                      description: '',
                      features: ['CCTV Security', 'Dedicated Parking', 'Power Backup'],
                      imageUrl: '/assets/aistudio/IMG_a4a8ff32-02b3-4e8e-a10b-99a98a7b2ab8_c3e5d16a.jpg'
                    });
                    setIsAddingEvent(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#C6A052] to-[#E1C783] text-[#090909] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 hover:brightness-110 shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Venue Package</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map(venue => (
                  <div key={venue.id} className="bg-[#121212] border border-[#30271D] rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between">
                    <div className="relative h-44 w-full overflow-hidden bg-black">
                      <img src={venue.imageUrl} alt={venue.name} className="w-full h-full object-cover" />
                      <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-[#C6A052]/50 text-[11px] font-bold text-[#E1C783]">
                        {venue.capacity}
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-serif text-base font-bold text-white">{venue.name}</h4>
                        <span className="text-[11px] uppercase tracking-wider text-[#C6A052] font-semibold block mt-0.5">
                          {venue.type}
                        </span>
                        <p className="text-xs text-[#F5F0E7]/70 mt-2 line-clamp-2 leading-relaxed">
                          {venue.description}
                        </p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-[#30271D] flex items-center justify-between">
                        <div className="text-[10px] text-white/50">{(venue.features || []).length} Features</div>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingEvent({ ...venue });
                              setIsAddingEvent(true);
                            }}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-[#E1C783]"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteEvent(venue.id, venue.name)}
                            className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add/Edit Venue Modal */}
              {isAddingEvent && editingEvent && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn"
                  onClick={() => setIsAddingEvent(false)}
                >
                  <div
                    className="relative max-w-md w-full bg-[#141414] border border-[#C6A052]/50 rounded-2xl p-5 shadow-2xl"
                    onClick={e => e.stopPropagation()}
                  >
                    <h3 className="font-serif text-lg font-bold text-white mb-4">
                      {events.some(v => v.id === editingEvent.id) ? 'Edit Event Venue' : 'Create Event Venue'}
                    </h3>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSaveEvent(editingEvent);
                      }}
                      className="space-y-3.5 text-xs"
                    >
                      <div>
                        <label className="block text-[11px] uppercase text-[#E1C783] font-semibold mb-1">
                          Venue Name
                        </label>
                        <input
                          type="text"
                          value={editingEvent.name}
                          onChange={(e) => setEditingEvent({ ...editingEvent, name: e.target.value })}
                          placeholder="e.g. Grand Marriage Lawn"
                          className="w-full px-3 py-2 bg-[#090909] border border-[#30271D] rounded-xl text-white outline-none focus:border-[#C6A052]"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] uppercase text-[#E1C783] font-semibold mb-1">
                            Type
                          </label>
                          <input
                            type="text"
                            value={editingEvent.type}
                            onChange={(e) => setEditingEvent({ ...editingEvent, type: e.target.value })}
                            placeholder="Marriage Garden"
                            className="w-full px-3 py-2 bg-[#090909] border border-[#30271D] rounded-xl text-white outline-none focus:border-[#C6A052]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] uppercase text-[#E1C783] font-semibold mb-1">
                            Guest Capacity
                          </label>
                          <input
                            type="text"
                            value={editingEvent.capacity}
                            onChange={(e) => setEditingEvent({ ...editingEvent, capacity: e.target.value })}
                            placeholder="1,500+ Guests"
                            className="w-full px-3 py-2 bg-[#090909] border border-[#30271D] rounded-xl text-white outline-none focus:border-[#C6A052]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase text-[#E1C783] font-semibold mb-1">
                          Image URL or Asset
                        </label>
                        <input
                          type="text"
                          value={editingEvent.imageUrl}
                          onChange={(e) => setEditingEvent({ ...editingEvent, imageUrl: e.target.value })}
                          className="w-full px-3 py-2 bg-[#090909] border border-[#30271D] rounded-xl text-white outline-none focus:border-[#C6A052]"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase text-[#E1C783] font-semibold mb-1">
                          Description
                        </label>
                        <textarea
                          rows={2}
                          value={editingEvent.description}
                          onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                          className="w-full px-3 py-2 bg-[#090909] border border-[#30271D] rounded-xl text-white outline-none focus:border-[#C6A052]"
                        />
                      </div>

                      <div className="pt-3 border-t border-[#30271D] flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setIsAddingEvent(false)}
                          className="px-4 py-2 rounded-xl text-white/60 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#C6A052] to-[#E1C783] text-[#090909] font-bold uppercase tracking-wider"
                        >
                          Save Venue
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 6: GALLERY & MEDIA MODULE */}
          {activeTab === 'gallery' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    Photo Gallery & Media
                  </h2>
                  <p className="text-xs text-[#F5F0E7]/60 mt-0.5">
                    Upload, organize, preview, and delete verified resort photos.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddingGallery(true)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#C6A052] to-[#E1C783] text-[#090909] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 hover:brightness-110 shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Gallery Image</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {gallery.map(img => (
                  <div key={img.id} className="group relative rounded-xl overflow-hidden border border-[#30271D] bg-[#121212] aspect-video flex flex-col justify-end shadow-md">
                    <img src={img.imageUrl} alt={img.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    <div className="relative p-3 flex items-end justify-between z-10">
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-[#C6A052] font-bold block">
                          {img.category}
                        </span>
                        <h4 className="font-semibold text-xs text-white line-clamp-1">{img.title}</h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteGalleryImage(img.id, img.title)}
                        className="p-1 rounded bg-black/60 hover:bg-red-600 text-white/80 hover:text-white transition-colors cursor-pointer"
                        title="Delete image"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Gallery Modal */}
              {isAddingGallery && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn"
                  onClick={() => setIsAddingGallery(false)}
                >
                  <div
                    className="relative max-w-md w-full bg-[#141414] border border-[#C6A052]/50 rounded-2xl p-5 shadow-2xl"
                    onClick={e => e.stopPropagation()}
                  >
                    <h3 className="font-serif text-lg font-bold text-white mb-4">
                      Add New Gallery Photograph
                    </h3>

                    <form onSubmit={handleAddGalleryImage} className="space-y-3.5 text-xs">
                      <div>
                        <label className="block text-[11px] uppercase text-[#E1C783] font-semibold mb-1">
                          Photo Title / Caption
                        </label>
                        <input
                          type="text"
                          value={newGalleryItem.title}
                          onChange={(e) => setNewGalleryItem({ ...newGalleryItem, title: e.target.value })}
                          placeholder="e.g. Courtyard Fountain at Night"
                          className="w-full px-3 py-2 bg-[#090909] border border-[#30271D] rounded-xl text-white outline-none focus:border-[#C6A052]"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase text-[#E1C783] font-semibold mb-1">
                          Category
                        </label>
                        <select
                          value={newGalleryItem.category}
                          onChange={(e) => setNewGalleryItem({ ...newGalleryItem, category: e.target.value })}
                          className="w-full px-3 py-2 bg-[#090909] border border-[#30271D] rounded-xl text-white outline-none focus:border-[#C6A052]"
                        >
                          <option value="rooms">Rooms & Stays</option>
                          <option value="restaurant">Restaurant & Food</option>
                          <option value="events">Events & Banquets</option>
                          <option value="property">Property & Architecture</option>
                          <option value="scenic">Topchanchi Scenic</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase text-[#E1C783] font-semibold mb-1">
                          Image URL or Workspace Asset Path
                        </label>
                        <input
                          type="text"
                          value={newGalleryItem.imageUrl}
                          onChange={(e) => setNewGalleryItem({ ...newGalleryItem, imageUrl: e.target.value })}
                          placeholder="/assets/aistudio/... or https://..."
                          className="w-full px-3 py-2 bg-[#090909] border border-[#30271D] rounded-xl text-white outline-none focus:border-[#C6A052]"
                          required
                        />
                      </div>

                      <div className="pt-3 border-t border-[#30271D] flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setIsAddingGallery(false)}
                          className="px-4 py-2 rounded-xl text-white/60 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#C6A052] to-[#E1C783] text-[#090909] font-bold uppercase tracking-wider"
                        >
                          Upload to Gallery
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 7: WEBSITE CONTENT MODULE */}
          {activeTab === 'content' && websiteContent && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  Website Content Management
                </h2>
                <p className="text-xs text-[#F5F0E7]/60 mt-0.5">
                  Update approved homepage copy, promotional announcements, and heritage story without altering layout.
                </p>
              </div>

              <form onSubmit={handleSaveWebsiteContent} className="space-y-5 bg-[#121212] border border-[#30271D] rounded-2xl p-6 shadow-xl text-xs">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#E1C783] font-semibold mb-1">
                    Hero Main Headline
                  </label>
                  <input
                    type="text"
                    value={websiteContent.heroTagline}
                    onChange={(e) => setWebsiteContent({ ...websiteContent, heroTagline: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#090909] border border-[#30271D] rounded-xl text-white outline-none focus:border-[#C6A052]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#E1C783] font-semibold mb-1">
                    Hero Subtitle
                  </label>
                  <input
                    type="text"
                    value={websiteContent.heroSubheadline}
                    onChange={(e) => setWebsiteContent({ ...websiteContent, heroSubheadline: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#090909] border border-[#30271D] rounded-xl text-white outline-none focus:border-[#C6A052]"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] uppercase tracking-wider text-[#E1C783] font-semibold">
                      Promotional Highway Banner Announcement
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={websiteContent.announcementActive}
                        onChange={(e) => setWebsiteContent({ ...websiteContent, announcementActive: e.target.checked })}
                        className="rounded accent-[#C6A052]"
                      />
                      <span className="text-[11px] text-[#C6A052]">Show Banner</span>
                    </label>
                  </div>
                  <textarea
                    rows={2}
                    value={websiteContent.promotionalAnnouncement}
                    onChange={(e) => setWebsiteContent({ ...websiteContent, promotionalAnnouncement: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#090909] border border-[#30271D] rounded-xl text-white outline-none focus:border-[#C6A052]"
                  />
                </div>

                <div className="pt-3 border-t border-[#30271D]">
                  <label className="block text-[11px] uppercase tracking-wider text-[#E1C783] font-semibold mb-1">
                    About Us Heritage Heading
                  </label>
                  <input
                    type="text"
                    value={websiteContent.aboutStoryHeading}
                    onChange={(e) => setWebsiteContent({ ...websiteContent, aboutStoryHeading: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#090909] border border-[#30271D] rounded-xl text-white outline-none focus:border-[#C6A052]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#E1C783] font-semibold mb-1">
                    Heritage Paragraph 1
                  </label>
                  <textarea
                    rows={3}
                    value={websiteContent.aboutStoryParagraph1}
                    onChange={(e) => setWebsiteContent({ ...websiteContent, aboutStoryParagraph1: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#090909] border border-[#30271D] rounded-xl text-white outline-none focus:border-[#C6A052]"
                  />
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#C6A052] to-[#E1C783] text-[#090909] font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 cursor-pointer"
                  >
                    Save & Publish Website Content
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 9: CONTACT INFORMATION MODULE */}
          {activeTab === 'contact' && contactSettings && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  Resort Location & Contact Settings
                </h2>
                <p className="text-xs text-[#F5F0E7]/60 mt-0.5">
                  Update verified front desk phone numbers, official email, highway address, and GPS coordinates.
                </p>
              </div>

              <form onSubmit={handleSaveContact} className="space-y-5 bg-[#121212] border border-[#30271D] rounded-2xl p-6 shadow-xl text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#E1C783] font-semibold mb-1">
                      Primary Phone (24/7 Front Desk)
                    </label>
                    <input
                      type="text"
                      value={contactSettings.phonePrimary}
                      onChange={(e) => setContactSettings({ ...contactSettings, phonePrimary: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#090909] border border-[#30271D] rounded-xl text-white outline-none focus:border-[#C6A052]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#E1C783] font-semibold mb-1">
                      Secondary Highway Helpline
                    </label>
                    <input
                      type="text"
                      value={contactSettings.phoneSecondary}
                      onChange={(e) => setContactSettings({ ...contactSettings, phoneSecondary: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#090909] border border-[#30271D] rounded-xl text-white outline-none focus:border-[#C6A052]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#E1C783] font-semibold mb-1">
                    Official Email
                  </label>
                  <input
                    type="email"
                    value={contactSettings.email}
                    onChange={(e) => setContactSettings({ ...contactSettings, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#090909] border border-[#30271D] rounded-xl text-white outline-none focus:border-[#C6A052]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#E1C783] font-semibold mb-1">
                    Physical Address (NH-19 Corridor)
                  </label>
                  <input
                    type="text"
                    value={contactSettings.address}
                    onChange={(e) => setContactSettings({ ...contactSettings, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#090909] border border-[#30271D] rounded-xl text-white outline-none focus:border-[#C6A052]"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#E1C783] font-semibold mb-1">
                      GPS Coordinates
                    </label>
                    <input
                      type="text"
                      value={contactSettings.gpsCoordinates}
                      onChange={(e) => setContactSettings({ ...contactSettings, gpsCoordinates: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#090909] border border-[#30271D] rounded-xl text-white outline-none focus:border-[#C6A052]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#E1C783] font-semibold mb-1">
                      Front Desk Hours
                    </label>
                    <input
                      type="text"
                      value={contactSettings.frontDeskHours}
                      onChange={(e) => setContactSettings({ ...contactSettings, frontDeskHours: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#090909] border border-[#30271D] rounded-xl text-white outline-none focus:border-[#C6A052]"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#C6A052] to-[#E1C783] text-[#090909] font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 cursor-pointer"
                  >
                    Save Contact Information
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 10: USERS & PERMISSIONS MODULE */}
          {activeTab === 'users' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    Administrator Users & Audit Logs
                  </h2>
                  <p className="text-xs text-[#F5F0E7]/60 mt-0.5">
                    Authorized staff accounts and real-time security audit log of all database updates.
                  </p>
                </div>
                {currentUser?.role === 'superadmin' && (
                  <button
                    type="button"
                    onClick={() => setIsAddingUser(true)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#C6A052] to-[#E1C783] text-[#090909] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 hover:brightness-110 shadow-md cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Admin Account</span>
                  </button>
                )}
              </div>

              {/* Users List */}
              <div className="bg-[#121212] border border-[#30271D] rounded-2xl overflow-hidden shadow-xl">
                <div className="p-4 border-b border-[#30271D] font-bold text-xs text-[#C6A052] uppercase tracking-wider">
                  Active Administrators
                </div>
                <div className="divide-y divide-[#30271D]/40">
                  {adminUsers.map(u => (
                    <div key={u.id} className="p-4 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#C6A052]/15 border border-[#C6A052]/40 text-[#E1C783] font-bold flex items-center justify-center">
                          {u.name.charAt(0)}
                        </div>
                        <div>
                          <span className="font-bold text-white block">{u.name}</span>
                          <span className="text-[11px] text-[#F5F0E7]/60">{u.email} ({u.username})</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#C6A052]/10 border border-[#C6A052]/30 text-[10px] font-bold text-[#E1C783] uppercase tracking-wider">
                          {u.role}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Audit Logs */}
              <div className="bg-[#121212] border border-[#30271D] rounded-2xl overflow-hidden shadow-xl">
                <div className="p-4 border-b border-[#30271D] font-bold text-xs text-[#C6A052] uppercase tracking-wider flex items-center justify-between">
                  <span>Security Audit Log</span>
                  <span className="text-[10px] text-white/40 lowercase">tamper-evident trail</span>
                </div>
                <div className="divide-y divide-[#30271D]/40 max-h-80 overflow-y-auto">
                  {auditLogs.map(log => (
                    <div key={log.id} className="p-3 text-[11px] hover:bg-white/[0.02]">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-white">{log.action}</span>
                        <span className="text-[10px] text-white/40">{new Date(log.timestamp).toLocaleString()}</span>
                      </div>
                      <div className="text-[#C6A052] mt-0.5">{log.adminName} • {log.module}</div>
                      <p className="text-white/70 mt-0.5">{log.details}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add User Modal */}
              {isAddingUser && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn"
                  onClick={() => setIsAddingUser(false)}
                >
                  <div
                    className="relative max-w-md w-full bg-[#141414] border border-[#C6A052]/50 rounded-2xl p-5 shadow-2xl"
                    onClick={e => e.stopPropagation()}
                  >
                    <h3 className="font-serif text-lg font-bold text-white mb-4">
                      Create Authorized Administrator
                    </h3>

                    <form onSubmit={handleCreateUser} className="space-y-3.5 text-xs">
                      <div>
                        <label className="block text-[11px] uppercase text-[#E1C783] font-semibold mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={newUserData.name}
                          onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                          placeholder="e.g. Gurpreet Kaur"
                          className="w-full px-3 py-2 bg-[#090909] border border-[#30271D] rounded-xl text-white outline-none focus:border-[#C6A052]"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase text-[#E1C783] font-semibold mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={newUserData.email}
                          onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                          placeholder="manager@shaanepunjab.com"
                          className="w-full px-3 py-2 bg-[#090909] border border-[#30271D] rounded-xl text-white outline-none focus:border-[#C6A052]"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] uppercase text-[#E1C783] font-semibold mb-1">
                            Username
                          </label>
                          <input
                            type="text"
                            value={newUserData.username}
                            onChange={(e) => setNewUserData({ ...newUserData, username: e.target.value })}
                            placeholder="gkaur"
                            className="w-full px-3 py-2 bg-[#090909] border border-[#30271D] rounded-xl text-white outline-none focus:border-[#C6A052]"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] uppercase text-[#E1C783] font-semibold mb-1">
                            Role
                          </label>
                          <select
                            value={newUserData.role}
                            onChange={(e) => setNewUserData({ ...newUserData, role: e.target.value as any })}
                            className="w-full px-3 py-2 bg-[#090909] border border-[#30271D] rounded-xl text-white outline-none focus:border-[#C6A052]"
                          >
                            <option value="manager">Manager</option>
                            <option value="receptionist">Reception Desk</option>
                            <option value="superadmin">Chief Administrator</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase text-[#E1C783] font-semibold mb-1">
                          Initial Password
                        </label>
                        <input
                          type="password"
                          value={newUserData.password}
                          onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })}
                          placeholder="At least 8 characters"
                          className="w-full px-3 py-2 bg-[#090909] border border-[#30271D] rounded-xl text-white outline-none focus:border-[#C6A052]"
                          required
                          minLength={8}
                        />
                      </div>

                      <div className="pt-3 border-t border-[#30271D] flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setIsAddingUser(false)}
                          className="px-4 py-2 rounded-xl text-white/60 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#C6A052] to-[#E1C783] text-[#090909] font-bold uppercase tracking-wider"
                        >
                          Create Account
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 11: SETTINGS MODULE */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  Portal Settings & Backup
                </h2>
                <p className="text-xs text-[#F5F0E7]/60 mt-0.5">
                  Manage security credentials, audit exports, and system settings.
                </p>
              </div>

              <div className="bg-[#121212] border border-[#30271D] rounded-2xl p-6 shadow-xl space-y-6 text-xs">
                {/* Change Password Form */}
                <div className="pb-6 border-b border-[#30271D]">
                  <h3 className="font-serif text-base font-bold text-white mb-3">
                    Change Administrator Password
                  </h3>
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const form = e.target as HTMLFormElement;
                      const cur = (form.elements.namedItem('currentPassword') as HTMLInputElement).value;
                      const next = (form.elements.namedItem('newPassword') as HTMLInputElement).value;
                      try {
                        await adminApi.changePassword(cur, next);
                        showToast('Password updated successfully.');
                        form.reset();
                      } catch (err: any) {
                        showToast(err.message, 'error');
                      }
                    }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                  >
                    <div>
                      <label className="block text-[11px] text-[#E1C783] font-semibold mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        name="currentPassword"
                        className="w-full px-3 py-2 bg-[#090909] border border-[#30271D] rounded-xl text-white outline-none focus:border-[#C6A052]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#E1C783] font-semibold mb-1">
                        New Password (8+ characters)
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        className="w-full px-3 py-2 bg-[#090909] border border-[#30271D] rounded-xl text-white outline-none focus:border-[#C6A052]"
                        required
                        minLength={8}
                      />
                    </div>
                    <div className="sm:col-span-2 flex justify-end pt-2">
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-[#C6A052] text-[#090909] font-bold text-xs uppercase"
                      >
                        Update Password
                      </button>
                    </div>
                  </form>
                </div>

                {/* CSV Download Shortcut */}
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <span className="font-bold text-white block">Export All Guest Inquiries (CSV)</span>
                    <span className="text-white/50 text-[11px]">
                      Download complete spreadsheet of all room, table, and wedding inquiries.
                    </span>
                  </div>
                  <a
                    href={adminApi.getExportCsvUrl()}
                    download
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-[#E1C783] font-semibold"
                  >
                    Download CSV
                  </a>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
