import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { PageId, GalleryItem } from '../types';
import { GALLERY_ITEMS } from '../data/hotelData';
import { DecorativeDivider, DecorativeCrown } from '../components/common/DecorativeLaurel';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Sparkles,
  MapPin,
  Camera,
  Search,
  Filter,
  CheckCircle2,
  Image as ImageIcon
} from 'lucide-react';

interface GalleryPageProps {
  onNavigate: (page: PageId) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  // Categories configuration
  const categories = useMemo(() => [
    { id: 'all', label: 'All Photos', count: GALLERY_ITEMS.length },
    {
      id: 'user-uploads',
      label: 'Real Property Photos',
      count: GALLERY_ITEMS.filter((i) => Boolean(i.originalFileName)).length
    },
    {
      id: 'property',
      label: 'Resort & Grounds',
      count: GALLERY_ITEMS.filter((i) => i.category === 'property').length
    },
    {
      id: 'restaurant',
      label: 'Restaurant & Dining',
      count: GALLERY_ITEMS.filter((i) => i.category === 'restaurant').length
    },
    {
      id: 'night',
      label: 'Night Ambiance',
      count: GALLERY_ITEMS.filter(
        (i) =>
          i.categoryLabel.toLowerCase().includes('night') ||
          i.title.toLowerCase().includes('night') ||
          i.title.toLowerCase().includes('twilight') ||
          i.title.toLowerCase().includes('illuminat')
      ).length
    },
    {
      id: 'rooms',
      label: 'Rooms & Suites',
      count: GALLERY_ITEMS.filter((i) => i.category === 'rooms').length
    },
    {
      id: 'events',
      label: 'Weddings & Celebrations',
      count: GALLERY_ITEMS.filter((i) => i.category === 'events').length
    }
  ], []);

  // Filtered items based on category and search query
  const filteredItems = useMemo(() => {
    return GALLERY_ITEMS.filter((item) => {
      // Category match
      let matchesCategory = true;
      if (activeCategory === 'user-uploads') {
        matchesCategory = Boolean(item.originalFileName);
      } else if (activeCategory === 'night') {
        matchesCategory =
          item.categoryLabel.toLowerCase().includes('night') ||
          item.title.toLowerCase().includes('night') ||
          item.title.toLowerCase().includes('twilight') ||
          item.title.toLowerCase().includes('illuminat');
      } else if (activeCategory !== 'all') {
        matchesCategory = item.category === activeCategory;
      }

      // Search query match
      let matchesSearch = true;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        matchesSearch =
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          (item.location && item.location.toLowerCase().includes(query)) ||
          (item.highlight && item.highlight.toLowerCase().includes(query)) ||
          (item.originalFileName && item.originalFileName.toLowerCase().includes(query)) ||
          item.categoryLabel.toLowerCase().includes(query);
      }

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsZoomed(false);
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    setIsZoomed(false);
  }, []);

  const showNext = useCallback(() => {
    if (lightboxIndex !== null && filteredItems.length > 0) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
      setIsZoomed(false);
    }
  }, [lightboxIndex, filteredItems.length]);

  const showPrev = useCallback(() => {
    if (lightboxIndex !== null && filteredItems.length > 0) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
      setIsZoomed(false);
    }
  }, [lightboxIndex, filteredItems.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, closeLightbox, showNext, showPrev]);

  const currentItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <div className="bg-[#090909] text-[#F5F0E7] min-h-screen pt-24 pb-24">
      {/* Editorial Header Section */}
      <section className="relative py-16 lg:py-24 border-b border-[#30271D] overflow-hidden">
        {/* Subtle royal background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#C6A052]/10 via-[#C6A052]/5 to-transparent blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-[#171717] border border-[#C6A052]/30 shadow-lg">
            <DecorativeCrown className="w-4 h-4 text-[#C6A052]" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C6A052] font-semibold">
              SHAAN-E-PUNJAB RESORT & RESTAURANT ARCHIVE
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6A052]" />
            <span className="text-[11px] text-[#F5F0E7]/70 font-mono">
              {GALLERY_ITEMS.length} Curated Images
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-[0.02em] text-[#F5F0E7] max-w-4xl mx-auto leading-tight text-balance mb-5">
            Moments of Splendor & Royal Living
          </h1>

          <p className="font-sans text-sm sm:text-base md:text-lg text-[#F5F0E7]/80 max-w-3xl mx-auto font-light leading-relaxed">
            Explore authentic photographs of our illuminated umbrella canopies, timber pergolas, fine dining A/C hall, lush gardens, executive suites, and highway resort grounds along NH-19 Topchanchi.
          </p>

          <DecorativeDivider className="my-8" />

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-2">
            <div className="p-3 rounded-lg bg-[#141414] border border-[#30271D] text-center">
              <span className="text-xl sm:text-2xl font-serif font-bold text-[#E1C783] block">17+</span>
              <span className="text-[11px] uppercase tracking-wider text-[#F5F0E7]/60">Property Photos</span>
            </div>
            <div className="p-3 rounded-lg bg-[#141414] border border-[#30271D] text-center">
              <span className="text-xl sm:text-2xl font-serif font-bold text-[#E1C783] block">25,000</span>
              <span className="text-[11px] uppercase tracking-wider text-[#F5F0E7]/60">Sq. Ft. Lawn</span>
            </div>
            <div className="p-3 rounded-lg bg-[#141414] border border-[#30271D] text-center">
              <span className="text-xl sm:text-2xl font-serif font-bold text-[#E1C783] block">24 / 7</span>
              <span className="text-[11px] uppercase tracking-wider text-[#F5F0E7]/60">Highway Service</span>
            </div>
            <div className="p-3 rounded-lg bg-[#141414] border border-[#30271D] text-center">
              <span className="text-xl sm:text-2xl font-serif font-bold text-[#E1C783] block">200+</span>
              <span className="text-[11px] uppercase tracking-wider text-[#F5F0E7]/60">Secure Parking</span>
            </div>
          </div>
        </div>
      </section>

      {/* Control Bar: Categories & Search */}
      <section className="sticky top-20 z-20 py-4 bg-[#090909]/95 backdrop-blur-md border-b border-[#30271D] shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 w-full lg:w-auto">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#C6A052] to-[#E1C783] text-[#090909] shadow-md shadow-[#C6A052]/20 font-bold'
                        : 'bg-[#171717] text-[#F5F0E7]/70 hover:text-[#E1C783] hover:bg-[#202020] border border-[#30271D]'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        isActive ? 'bg-[#090909]/30 text-[#090909]' : 'bg-[#090909] text-[#C6A052]'
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-72">
              <Search className="w-4 h-4 text-[#C6A052] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search umbrella, buddha, dining..."
                className="w-full pl-9 pr-8 py-2 rounded-lg bg-[#171717] border border-[#30271D] text-xs text-[#F5F0E7] placeholder-[#F5F0E7]/40 focus:outline-none focus:border-[#C6A052] focus:ring-1 focus:ring-[#C6A052] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#F5F0E7]/50 hover:text-[#F5F0E7]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-[#171717]/50 rounded-2xl border border-[#30271D] p-8 max-w-lg mx-auto">
            <Filter className="w-10 h-10 text-[#C6A052] mx-auto mb-3 opacity-60" />
            <h3 className="font-serif text-xl font-bold text-[#F5F0E7] mb-2">No Photographs Found</h3>
            <p className="text-xs text-[#F5F0E7]/60 mb-6">
              No gallery items match "{searchQuery}" under the selected category.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-lg bg-[#C6A052] text-[#090909] text-xs font-bold uppercase tracking-wider hover:bg-[#E1C783]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => {
              const isFailed = failedImages[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => openLightbox(index)}
                  className="group relative flex flex-col rounded-xl overflow-hidden border border-[#30271D] hover:border-[#C6A052] transition-all duration-300 cursor-pointer bg-[#141414] shadow-lg hover:shadow-2xl hover:shadow-[#C6A052]/10"
                >
                  {/* Image Container with 4:3 Ratio */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#090909]">
                    {!isFailed ? (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        onError={() => handleImageError(item.id)}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                          item.imageUrl.includes('360_2adab2df')
                            ? 'scale-[1.8] group-hover:scale-[1.95]'
                            : 'group-hover:scale-108'
                        }`}
                      />
                    ) : (
                      /* Elegant Fallback Container */
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#1a1814] via-[#0f0e0c] to-[#251e16] border-b border-[#30271D]">
                        <div className="w-12 h-12 rounded-full bg-[#C6A052]/10 border border-[#C6A052]/30 flex items-center justify-center mb-3">
                          <ImageIcon className="w-6 h-6 text-[#C6A052]" />
                        </div>
                        <span className="text-[10px] uppercase tracking-widest text-[#C6A052] font-semibold text-center">
                          Shaan-E-Punjab Photo
                        </span>
                        <span className="font-serif text-sm text-[#F5F0E7] text-center font-medium mt-1">
                          {item.title}
                        </span>
                      </div>
                    )}

                    {/* Gradient Overlay for Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      {item.highlight && (
                        <span className="px-2 py-0.5 rounded bg-[#090909]/80 backdrop-blur-sm border border-[#C6A052]/50 text-[10px] font-semibold tracking-wider uppercase text-[#E1C783]">
                          {item.highlight}
                        </span>
                      )}

                      <div className="p-1.5 rounded-full bg-[#090909]/75 backdrop-blur-sm border border-[#C6A052]/30 text-[#C6A052] opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Original Filename Badge if Uploaded Asset */}
                    {item.originalFileName && (
                      <div className="absolute bottom-2.5 left-3 px-2 py-0.5 rounded bg-[#090909]/90 border border-[#30271D] text-[9px] font-mono text-[#C6A052] flex items-center gap-1 shadow-sm">
                        <CheckCircle2 className="w-3 h-3 text-[#C6A052]" />
                        <span>{item.originalFileName}</span>
                      </div>
                    )}
                  </div>

                  {/* Card Content Footer */}
                  <div className="p-4 flex flex-col justify-between flex-1 bg-[#141414] border-t border-[#30271D]/60">
                    <div>
                      <div className="flex items-center justify-between text-[10px] text-[#C6A052] uppercase tracking-wider font-semibold mb-1">
                        <span>{item.categoryLabel}</span>
                        {item.location && (
                          <span className="text-[#F5F0E7]/50 font-normal flex items-center gap-0.5">
                            <MapPin className="w-2.5 h-2.5 text-[#C6A052]/70" />
                            {item.location}
                          </span>
                        )}
                      </div>

                      <h3 className="font-serif text-sm sm:text-base font-bold text-[#F5F0E7] group-hover:text-[#E1C783] transition-colors line-clamp-1 mb-1.5">
                        {item.title}
                      </h3>

                      <p className="text-xs text-[#F5F0E7]/65 line-clamp-2 leading-relaxed font-light">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-[#30271D]/40 flex items-center justify-between">
                      <span className="text-[10px] text-[#C6A052] group-hover:underline flex items-center gap-1 font-semibold">
                        <span>View High-Res Photo</span>
                        <ChevronRight className="w-3 h-3" />
                      </span>
                      <span className="text-[10px] text-[#F5F0E7]/40 font-mono">
                        #{index + 1}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Full-Screen Luxury Lightbox Modal */}
      {currentItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-lg p-2 sm:p-6 animate-fade-in select-none">
          {/* Top Bar with Brand & Actions */}
          <div className="absolute top-4 left-4 right-4 z-50 flex items-center justify-between pointer-events-auto">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#171717]/90 border border-[#30271D]">
              <DecorativeCrown className="w-3.5 h-3.5 text-[#C6A052]" />
              <span className="text-[11px] uppercase tracking-wider text-[#E1C783] font-bold">
                Shaan-E-Punjab Hotel & Resort
              </span>
              <span className="text-[#F5F0E7]/40">·</span>
              <span className="text-[11px] font-mono text-[#F5F0E7]/70">
                Photo {lightboxIndex! + 1} of {filteredItems.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="p-2.5 rounded-full bg-[#171717]/90 border border-[#30271D] text-[#E1C783] hover:text-[#C6A052] hover:bg-[#202020] transition-colors"
                title={isZoomed ? 'Zoom Out' : 'Zoom In'}
              >
                {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
              </button>

              <button
                onClick={closeLightbox}
                className="p-2.5 rounded-full bg-[#171717]/90 border border-[#30271D] text-[#F5F0E7]/80 hover:text-[#C6A052] hover:bg-[#202020] transition-colors"
                title="Close viewer (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Left Navigation Arrow */}
          <button
            onClick={showPrev}
            className="absolute left-3 sm:left-6 z-50 p-3 sm:p-4 rounded-full bg-[#171717]/80 border border-[#30271D] text-[#C6A052] hover:bg-[#C6A052] hover:text-[#090909] transition-all shadow-xl"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Navigation Arrow */}
          <button
            onClick={showNext}
            className="absolute right-3 sm:right-6 z-50 p-3 sm:p-4 rounded-full bg-[#171717]/80 border border-[#30271D] text-[#C6A052] hover:bg-[#C6A052] hover:text-[#090909] transition-all shadow-xl"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main Lightbox Stage */}
          <div className="max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center p-2">
            <div
              className={`relative overflow-hidden rounded-xl border border-[#C6A052]/40 transition-transform duration-300 bg-[#090909] ${
                isZoomed ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in'
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              {!failedImages[currentItem.id] ? (
                <div className="overflow-hidden flex items-center justify-center max-h-[60vh] sm:max-h-[66vh]">
                  <img
                    src={currentItem.imageUrl}
                    alt={currentItem.title}
                    referrerPolicy="no-referrer"
                    className={`w-auto max-w-full object-contain mx-auto rounded-lg shadow-2xl ${
                      currentItem.imageUrl.includes('360_2adab2df')
                        ? 'scale-[1.75] my-6'
                        : 'max-h-[60vh] sm:max-h-[66vh]'
                    }`}
                  />
                </div>
              ) : (
                <div className="w-[500px] h-[340px] max-w-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#1a1814] via-[#0f0e0c] to-[#251e16]">
                  <ImageIcon className="w-12 h-12 text-[#C6A052] mb-3" />
                  <span className="font-serif text-lg text-[#F5F0E7] text-center font-bold">
                    {currentItem.title}
                  </span>
                  <span className="text-xs text-[#C6A052] mt-1">
                    {currentItem.categoryLabel} · Shaan-E-Punjab Topchanchi
                  </span>
                </div>
              )}
            </div>

            {/* Caption & Metadata Details */}
            <div className="text-center mt-4 max-w-2xl px-4 space-y-1.5">
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="text-[11px] uppercase tracking-widest text-[#C6A052] font-semibold">
                  {currentItem.categoryLabel}
                </span>
                {currentItem.location && (
                  <>
                    <span className="text-[#F5F0E7]/40">·</span>
                    <span className="text-xs text-[#F5F0E7]/70 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#C6A052]" />
                      {currentItem.location}
                    </span>
                  </>
                )}
                {currentItem.originalFileName && (
                  <>
                    <span className="text-[#F5F0E7]/40">·</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#171717] border border-[#30271D] text-[#E1C783] font-mono">
                      File: {currentItem.originalFileName}
                    </span>
                  </>
                )}
              </div>

              <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-[#F5F0E7]">
                {currentItem.title}
              </h2>

              <p className="text-xs sm:text-sm text-[#F5F0E7]/75 font-light leading-relaxed">
                {currentItem.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Booking Invitation CTA */}
      <section className="mt-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-[#171717] via-[#1c1a16] to-[#171717] border border-[#C6A052]/40 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#C6A052]/10 rounded-full blur-2xl pointer-events-none" />

          <DecorativeCrown className="w-6 h-6 text-[#C6A052] mx-auto mb-3" />
          <span className="text-xs uppercase tracking-[0.25em] text-[#C6A052] font-semibold block mb-2">
            EXPERIENCE IT IN PERSON
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#F5F0E7] mb-4">
            Plan Your Stay or Grand Celebration
          </h2>
          <p className="text-xs sm:text-sm text-[#F5F0E7]/75 max-w-xl mx-auto mb-8 font-light leading-relaxed">
            From overnight family road halts on NH-19 to grand destination wedding banquets with 1,500 guests, Shaan-E-Punjab welcomes you with legendary royal hospitality.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('rooms')}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#C6A052] to-[#E1C783] text-[#090909] text-xs font-bold uppercase tracking-wider hover:opacity-95 transition-opacity shadow-lg shadow-[#C6A052]/20"
            >
              Explore Rooms & Suites
            </button>
            <button
              onClick={() => onNavigate('events')}
              className="px-6 py-3 rounded-lg bg-[#090909] border border-[#C6A052] text-[#E1C783] text-xs font-bold uppercase tracking-wider hover:bg-[#C6A052] hover:text-[#090909] transition-all"
            >
              Book Wedding Lawn
            </button>
            <button
              onClick={() => onNavigate('restaurant')}
              className="px-6 py-3 rounded-lg bg-[#171717] border border-[#30271D] text-[#F5F0E7] text-xs font-semibold uppercase tracking-wider hover:border-[#C6A052] hover:text-[#E1C783] transition-colors"
            >
              Reserve Dining Table
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
