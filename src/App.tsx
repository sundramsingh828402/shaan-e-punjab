/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { ReservationModal } from './components/common/ReservationModal';
import { TableBookingModal } from './components/common/TableBookingModal';
import { ScrollToTop } from './components/common/ScrollToTop';
import { LoadingScreen } from './components/common/LoadingScreen';

// 9 Dedicated Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { RestaurantPage } from './pages/RestaurantPage';
import { RoomsPage } from './pages/RoomsPage';
import { ExperiencesPage } from './pages/ExperiencesPage';
import { ServicesPage } from './pages/ServicesPage';
import { EventsPage } from './pages/EventsPage';
import { GalleryPage } from './pages/GalleryPage';
import { LocationPage } from './pages/LocationPage';
import { ContactPage } from './pages/ContactPage';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';

const PAGE_TITLES: Record<PageId, string> = {
  home: 'Shaan-E-Punjab Hotel & Resort — NH-19 Topchanchi, Dhanbad',
  about: 'About Our Legacy | Shaan-E-Punjab Hotel & Resort',
  restaurant: 'Authentic Punjabi Restaurant & Dining | Shaan-E-Punjab',
  rooms: 'Luxury Rooms & Suites | Shaan-E-Punjab Hotel & Resort',
  services: 'Resort Services & Amenities | Shaan-E-Punjab Hotel & Resort',
  experiences: 'Experiences & Topchanchi Lake | Shaan-E-Punjab Hotel & Resort',
  events: 'Weddings & Grand Banquets | Shaan-E-Punjab Hotel & Resort',
  gallery: 'Photo Gallery & Lightbox | Shaan-E-Punjab Hotel & Resort',
  location: 'Location & Highway Directions | Shaan-E-Punjab Hotel & Resort',
  contact: 'Contact & Highway Helpdesk | Shaan-E-Punjab Hotel & Resort',
  'admin-login': 'Admin Portal Login | Shaan-E-Punjab Hotel & Resort',
  'admin-dashboard': 'Administrator Dashboard | Shaan-E-Punjab Hotel & Resort'
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<PageId>('home');

  // Booking Modal State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<string | undefined>();
  const [checkInDate, setCheckInDate] = useState<string | undefined>();
  const [checkOutDate, setCheckOutDate] = useState<string | undefined>();
  const [guestCount, setGuestCount] = useState<number | undefined>();

  // Table Booking Modal State
  const [isTableBookingOpen, setIsTableBookingOpen] = useState(false);

  // Sync with URL Hash & Path on Mount & Window Change
  useEffect(() => {
    const parseRoute = (): PageId => {
      const pathname = window.location.pathname;
      const hash = window.location.hash.replace('#', '').replace(/^\//, '');

      if (pathname.includes('/admin/login') || hash === 'admin/login' || hash === 'admin-login') {
        return 'admin-login';
      }
      if (
        pathname.includes('/admin/dashboard') ||
        pathname === '/admin' ||
        pathname === '/admin/' ||
        hash === 'admin/dashboard' ||
        hash === 'admin' ||
        hash === 'admin-dashboard'
      ) {
        return 'admin-dashboard';
      }

      const validPages: PageId[] = [
        'home',
        'about',
        'restaurant',
        'rooms',
        'services',
        'experiences',
        'events',
        'gallery',
        'location',
        'contact',
        'admin-login',
        'admin-dashboard'
      ];
      return validPages.includes(hash as PageId) ? (hash as PageId) : 'home';
    };

    setCurrentPage(parseRoute());

    const handleHashChange = () => {
      setCurrentPage(parseRoute());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleExpired = () => {
      navigateTo('admin-login');
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    window.addEventListener('shaan_admin_session_expired', handleExpired);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
      window.removeEventListener('shaan_admin_session_expired', handleExpired);
    };
  }, []);

  // Update Document Title when page changes
  useEffect(() => {
    document.title = PAGE_TITLES[currentPage] || PAGE_TITLES.home;
  }, [currentPage]);

  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    if (page === 'admin-login') {
      window.location.hash = 'admin/login';
    } else if (page === 'admin-dashboard') {
      window.location.hash = 'admin/dashboard';
    } else {
      window.location.hash = page === 'home' ? '' : page;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (
    roomId?: string,
    checkIn?: string,
    checkOut?: string,
    guests?: number
  ) => {
    setSelectedRoomId(roomId);
    setCheckInDate(checkIn);
    setCheckOutDate(checkOut);
    setGuestCount(guests);
    setIsBookingOpen(true);
  };

  // Dedicated Standalone Admin Portal Views
  if (currentPage === 'admin-login') {
    return (
      <AdminLoginPage
        onLoginSuccess={() => navigateTo('admin-dashboard')}
        onNavigateHome={() => navigateTo('home')}
      />
    );
  }

  if (currentPage === 'admin-dashboard') {
    return (
      <AdminDashboardPage
        onLogout={() => navigateTo('admin-login')}
        onNavigateHome={() => navigateTo('home')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#090909] text-[#F5F0E7] flex flex-col font-sans selection:bg-[#C6A052] selection:text-[#090909]">
      {/* Initial Logo Reveal Loading Animation */}
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {/* Top Navigation */}
      <Header
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenBooking={handleOpenBooking}
        onOpenTableBooking={() => setIsTableBookingOpen(true)}
      />

      {/* Main Page Content - Independent Working Routes */}
      <main className="flex-grow">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            onOpenBooking={handleOpenBooking}
            onOpenTableBooking={() => setIsTableBookingOpen(true)}
          />
        )}
        {currentPage === 'about' && (
          <AboutPage
            onNavigate={navigateTo}
            onOpenBooking={() => handleOpenBooking()}
          />
        )}
        {currentPage === 'restaurant' && (
          <RestaurantPage
            onNavigate={navigateTo}
            onOpenTableBooking={() => setIsTableBookingOpen(true)}
          />
        )}
        {currentPage === 'rooms' && (
          <RoomsPage
            onNavigate={navigateTo}
            onOpenBooking={handleOpenBooking}
          />
        )}
        {currentPage === 'services' && (
          <ServicesPage
            onNavigate={navigateTo}
            onOpenBooking={() => handleOpenBooking()}
            onOpenTableBooking={() => setIsTableBookingOpen(true)}
          />
        )}
        {currentPage === 'experiences' && (
          <ExperiencesPage
            onNavigate={navigateTo}
            onOpenBooking={() => handleOpenBooking()}
          />
        )}
        {currentPage === 'events' && (
          <EventsPage onNavigate={navigateTo} />
        )}
        {currentPage === 'gallery' && (
          <GalleryPage onNavigate={navigateTo} />
        )}
        {currentPage === 'location' && (
          <LocationPage
            onNavigate={navigateTo}
            onOpenBooking={() => handleOpenBooking()}
          />
        )}
        {currentPage === 'contact' && (
          <ContactPage
            onNavigate={navigateTo}
            onOpenBooking={() => handleOpenBooking()}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={navigateTo}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Modals and Overlays */}
      <ReservationModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedRoomId={selectedRoomId}
        initialCheckIn={checkInDate}
        initialCheckOut={checkOutDate}
        initialGuests={guestCount}
      />

      <TableBookingModal
        isOpen={isTableBookingOpen}
        onClose={() => setIsTableBookingOpen(false)}
      />

      {/* Back to Top */}
      <ScrollToTop />
    </div>
  );
}
