import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Volume2, 
  VolumeX, 
  Compass, 
  Sun, 
  Moon, 
  Sparkles, 
  Maximize2, 
  Minimize2,
  Calendar, 
  ArrowRight,
  Eye,
  RotateCcw,
  CheckCircle2,
  MapPin,
  Move,
  Info
} from 'lucide-react';
import { DecorativeCrown } from '../common/DecorativeLaurel';

interface RoyalInteractiveTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
  onNavigateToAbout: () => void;
}

interface TourLocation {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  features: string[];
}

interface AerialHotspot {
  id: string;
  top: string;
  left: string;
  title: string;
  tag: string;
  desc: string;
}

const AERIAL_HOTSPOTS: AerialHotspot[] = [
  {
    id: 'hotspot-highway',
    top: '78%',
    left: '52%',
    title: 'NH-19 Grand Highway Frontage',
    tag: 'Highway Access',
    desc: 'Direct four-lane NH-19 ingress with immediate drive-in parking, barrier road access, and round-the-clock highway welcoming staff.'
  },
  {
    id: 'hotspot-facade',
    top: '56%',
    left: '52%',
    title: 'Main Architectural Elevation & Entrance',
    tag: 'Hotel & Lounge',
    desc: 'Distinctive red and charcoal ACP architectural facade, signature crown HOTEL rooftop marquee, and spacious ground floor reception.'
  },
  {
    id: 'hotspot-roof',
    top: '46%',
    left: '42%',
    title: 'Blue Roof Pavilions & Terraces',
    tag: 'Resort Terraces',
    desc: 'Multi-tiered outdoor breeze terraces designed for scenic evening tea, private banqueting, and mountain sunset vantage points.'
  },
  {
    id: 'hotspot-forest',
    top: '26%',
    left: '68%',
    title: 'Topchanchi Tropical Hills & Forest',
    tag: 'Mountain Panorama',
    desc: 'Encircled by ancient Sal forest canopy and cool Parasnath mountain breezes, providing total respite from highway fatigue.'
  }
];

const TOUR_LOCATIONS: TourLocation[] = [
  {
    id: 'aerial-360-vista',
    name: '360° Aerial Drone Panorama & Forest Complex',
    category: '360° Aerial Panorama',
    image: '/assets/aistudio/360_2adab2df.jpeg',
    description: 'Breathtaking 360° bird’s-eye aerial view of Shaan-E-Punjab Hotel & Resort on NH-19 Topchanchi. Marvel at the multi-tier blue roof pavilions, red & grey facade, and lush virgin mountain forest.',
    features: ['360° Drone Aerial Panorama', 'NH-19 Grand Highway Frontage', 'Lush Forest Canopy', 'Full Complex Architecture']
  },
  {
    id: 'courtyard-day',
    name: 'Royal Courtyard & Architectural Breezeway',
    category: 'Architecture',
    image: '/assets/aistudio/file_0000000081ec8211947694f158c1506a_7d3f2227.png',
    description: 'Immaculate manicured brick walkways, natural timber archways, and welcoming courtyards framed by lush palms and scenic mountain air.',
    features: ['Timber Garden Arches', 'Al-Fresco Seating', 'Topchanchi Mountain Vistas']
  },
  {
    id: 'facade-night',
    name: 'Grand NH-19 Facade & King’s Family Lounge',
    category: 'Night Arrival',
    image: '/assets/aistudio/shaan_front_35f0a5bc.jpeg',
    description: 'The illuminated jewel of Grand Trunk Road NH-19. Glowing golden crests, 24/7 guarded secure parking, and round-the-clock highway welcoming staff.',
    features: ['24/7 Highway Frontage', 'Grand Illumination', 'Dedicated Guarded Parking']
  },
  {
    id: 'garden-pergola',
    name: 'Rustic Timber Pergola & Resort Gardens',
    category: 'Resort Grounds',
    image: '/assets/aistudio/IMG-20261101-WA0008_5ff961cf.jpg',
    description: 'Rustic sculpted timber canopy, lush potted palms, artificial grass lawns, and delightful garden installations framed by modern glass suites.',
    features: ['Sculpted Timber Arches', 'Lush Potted Flora', 'Garden Photo Landmark']
  },
  {
    id: 'luxury-suite',
    name: 'Executive Deluxe King Bed Sanctuary',
    category: 'Rooms & Stay',
    image: '/assets/aistudio/IMG-20261101-WA0004_a56bd883.jpg',
    description: 'Engineered for restorative silence after long highway drives. Soundproof double walls, plush tan leather headboard, 4K LED TV, and climate AC.',
    features: ['Triple Soundproofing', 'Ultra-Plush King Bed', '24/7 Hot Water Geyser']
  }
];

export const RoyalInteractiveTourModal: React.FC<RoyalInteractiveTourModalProps> = ({
  isOpen,
  onClose,
  onOpenBooking,
  onNavigateToAbout
}) => {
  const [activeLocationIndex, setActiveLocationIndex] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [panOffset, setPanOffset] = useState(0);
  const [isAutoPanning, setIsAutoPanning] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<AerialHotspot | null>(null);
  const [fitMode, setFitMode] = useState<'cover' | 'contain'>('cover');

  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRefs = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);

  const activeLocation = TOUR_LOCATIONS[activeLocationIndex];
  const isAerial360 = activeLocation.id === 'aerial-360-vista';

  // Base scale calculation to fit the photo edge-to-edge in background without letterboxes
  const baseScale = fitMode === 'cover' ? (isAerial360 ? 1.85 : 1.05) : 1;
  const effectiveScale = baseScale * zoomLevel;

  // Auto-pan effect when not user dragging
  useEffect(() => {
    if (!isOpen || !isAutoPanning || isDragging) return;
    const interval = setInterval(() => {
      setPanOffset((prev) => (prev >= 80 ? -80 : prev + 0.35));
    }, 40);
    return () => clearInterval(interval);
  }, [isOpen, isAutoPanning, isDragging]);

  // Drag-to-pan Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX - panOffset);
    setIsAutoPanning(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const nextOffset = e.clientX - dragStartX;
    setPanOffset(Math.max(-120, Math.min(120, nextOffset)));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStartX(e.touches[0].clientX - panOffset);
      setIsAutoPanning(false);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const nextOffset = e.touches[0].clientX - dragStartX;
    setPanOffset(Math.max(-120, Math.min(120, nextOffset)));
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Ambient Royal Sitar / Tanpura synthesized chord generator (Web Audio API)
  const toggleAmbientSound = () => {
    if (isAudioPlaying) {
      if (gainNodeRef.current && audioContextRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0, audioContextRef.current.currentTime, 0.3);
        setTimeout(() => {
          oscillatorRefs.current.forEach((osc) => {
            try { osc.stop(); } catch (e) {}
          });
          oscillatorRefs.current = [];
          setIsAudioPlaying(false);
        }, 300);
      }
    } else {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioContextRef.current = ctx;

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.01, ctx.currentTime);
        masterGain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 1.5);
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        // Indian classical Sa-Pa meditative drone chord (D, A, D)
        const baseFreq = 146.83; // D3
        const freqs = [baseFreq, baseFreq * 1.5, baseFreq * 2, baseFreq * 2.01];

        oscillatorRefs.current = freqs.map((freq, idx) => {
          const osc = ctx.createOscillator();
          const oscGain = ctx.createGain();
          osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          // Subtle harmonic shimmering
          const lfo = ctx.createOscillator();
          const lfoGain = ctx.createGain();
          lfo.frequency.setValueAtTime(0.2 + idx * 0.1, ctx.currentTime);
          lfoGain.gain.setValueAtTime(1.5, ctx.currentTime);
          lfo.connect(osc.frequency);
          lfo.start();

          oscGain.gain.setValueAtTime(0.25 / freqs.length, ctx.currentTime);
          osc.connect(oscGain);
          oscGain.connect(masterGain);
          osc.start();
          return osc;
        });

        setIsAudioPlaying(true);
      } catch (err) {
        console.error('Audio init failed', err);
      }
    }
  };

  // Clean up audio on unmount or modal close
  useEffect(() => {
    if (!isOpen && isAudioPlaying) {
      if (gainNodeRef.current && audioContextRef.current) {
        gainNodeRef.current.gain.setValueAtTime(0, audioContextRef.current.currentTime);
      }
      oscillatorRefs.current.forEach((osc) => {
        try { osc.stop(); } catch (e) {}
      });
      oscillatorRefs.current = [];
      setIsAudioPlaying(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-lg animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl max-h-[94vh] bg-[#111111] border-2 border-[#C6A052] rounded-3xl shadow-[0_0_60px_rgba(198,160,82,0.3)] flex flex-col overflow-hidden text-[#F5F0E7]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar with Title and Ambient Controls */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-4 border-b border-[#30271D] bg-[#181818]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#C6A052]/20 border border-[#C6A052] flex items-center justify-center text-[#E1C783]">
              <Compass className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs font-bold tracking-widest text-[#C6A052] uppercase">
                  Interactive 360° Resort Portal
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  LIVE NH-19
                </span>
              </div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-white">
                {activeLocation.name}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Ambient Sound Toggle */}
            <button
              onClick={toggleAmbientSound}
              className={`px-3 py-1.5 rounded-full border text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                isAudioPlaying 
                  ? 'bg-[#C6A052] text-[#090909] font-bold border-[#C6A052] shadow-lg shadow-[#C6A052]/30' 
                  : 'bg-black/50 text-[#E1C783] border-[#C6A052]/40 hover:border-[#C6A052]'
              }`}
              title="Play Royal Ambient Tanpura Melody"
            >
              {isAudioPlaying ? (
                <>
                  <Volume2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Royal Melody ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span className="hidden sm:inline">Sound Atmosphere</span>
                </>
              )}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white flex items-center justify-center border border-white/10 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Panoramic Interactive Viewport with Mouse & Touch Drag */}
        <div 
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            backgroundImage: `url(${activeLocation.image})`,
            backgroundPosition: 'center',
            backgroundSize: fitMode === 'cover' ? 'cover' : 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#0a0a0a'
          }}
          className={`relative flex-1 min-h-[320px] sm:min-h-[460px] bg-black bg-cover bg-center overflow-hidden group select-none transition-all duration-300 ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        >
          {/* Ambient Blurred Background Fill to guarantee seamless backdrop fitting */}
          <div 
            className="absolute inset-0 bg-cover bg-center filter blur-xl scale-125 opacity-40 pointer-events-none transition-all duration-500"
            style={{ backgroundImage: `url(${activeLocation.image})` }}
          />

          {/* Scalable & Pannable Panorama Canvas (fitting letterbox-free) */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
            <div 
              className="relative w-full h-full flex items-center justify-center"
              style={{
                transform: `scale(${effectiveScale}) translateX(${panOffset / effectiveScale}px)`,
                transformOrigin: 'center center',
                transition: isDragging ? 'none' : isAutoPanning ? 'transform 0.1s linear' : 'transform 0.4s ease-out'
              }}
            >
              <img
                src={activeLocation.image}
                alt={activeLocation.name}
                className={`w-full h-full pointer-events-none select-none ${
                  fitMode === 'cover' ? 'object-cover' : 'object-contain'
                }`}
              />

              {/* Interactive Floating Hotspot Pins (anchored to resort features) */}
              {isAerial360 && (
                <div className="absolute inset-0 pointer-events-none">
                  {AERIAL_HOTSPOTS.map((spot) => (
                    <div
                      key={spot.id}
                      style={{ top: spot.top, left: spot.left }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                    >
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveHotspot(activeHotspot?.id === spot.id ? null : spot);
                        }}
                        className="group/pin relative flex items-center justify-center cursor-pointer"
                        title={spot.title}
                      >
                        <span className="absolute w-8 h-8 rounded-full bg-[#C6A052]/40 animate-ping pointer-events-none" />
                        <span className="w-7 h-7 rounded-full bg-[#090909] border-2 border-[#E1C783] text-[#E1C783] flex items-center justify-center shadow-xl group-hover/pin:scale-125 transition-transform">
                          <MapPin className="w-3.5 h-3.5 fill-[#C6A052] text-[#090909]" />
                        </span>
                        <span className="absolute -bottom-6 px-2 py-0.5 rounded bg-black/90 border border-[#C6A052]/60 text-[9px] font-bold text-[#E1C783] whitespace-nowrap shadow-md opacity-0 group-hover/pin:opacity-100 transition-opacity pointer-events-none">
                          {spot.title}
                        </span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Vignette and luxury cinematic overlays */}
          <div className="absolute inset-0 bg-radial from-transparent via-black/15 to-black/60 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />

          {/* Top Drag Indicator Banner */}
          <div className="absolute top-4 left-4 z-20 pointer-events-none flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-[#C6A052]/50 text-[10px] font-bold text-[#E1C783] uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
              <Move className="w-3 h-3 text-[#C6A052] animate-pulse" />
              <span>↔ Drag to Pan 360°</span>
            </span>

            {/* Live Rotating Compass Needle */}
            <div 
              className="w-7 h-7 rounded-full bg-black/80 backdrop-blur-md border border-[#C6A052]/60 flex items-center justify-center shadow-md"
              title="Orientation Compass"
            >
              <Compass 
                className="w-4 h-4 text-[#E1C783] transition-transform duration-100"
                style={{ transform: `rotate(${panOffset * 2.2}deg)` }}
              />
            </div>
          </div>

          {/* Floating Hotspot Detail Popover Card */}
          {activeHotspot && (
            <div 
              className="absolute z-30 top-16 left-4 right-4 sm:left-auto sm:right-6 sm:w-80 p-4 rounded-2xl bg-[#111111]/95 backdrop-blur-xl border border-[#C6A052] shadow-2xl text-left animate-in fade-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C6A052] bg-[#C6A052]/10 px-2 py-0.5 rounded border border-[#C6A052]/30">
                  {activeHotspot.tag}
                </span>
                <button
                  onClick={() => setActiveHotspot(null)}
                  className="p-1 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <h4 className="font-serif text-sm font-bold text-white mb-1">
                {activeHotspot.title}
              </h4>
              <p className="text-xs text-[#F5F0E7]/80 leading-relaxed font-light">
                {activeHotspot.desc}
              </p>
            </div>
          )}

          {/* Interactive Floating Pan, Zoom & Fit Controls */}
          <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
            {/* Fit in Background Mode Toggle */}
            <button
              onClick={() => setFitMode(fitMode === 'cover' ? 'contain' : 'cover')}
              className={`p-2 rounded-xl backdrop-blur-md border text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md ${
                fitMode === 'cover' 
                  ? 'bg-[#C6A052]/90 text-[#090909] font-bold border-[#C6A052]' 
                  : 'bg-black/60 text-white/80 border-white/20 hover:text-white'
              }`}
              title="Toggle Background Fit: Fill Edge-to-Edge vs Complete Frame"
            >
              {fitMode === 'cover' ? (
                <>
                  <Minimize2 className="w-4 h-4" />
                  <span className="text-[11px] font-bold">Fit: Fill BG</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-4 h-4" />
                  <span className="text-[11px] font-semibold">Fit: Frame</span>
                </>
              )}
            </button>

            <button
              onClick={() => setIsAutoPanning(!isAutoPanning)}
              className={`p-2 rounded-xl backdrop-blur-md border text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                isAutoPanning
                  ? 'bg-[#C6A052]/80 text-[#090909] font-bold border-[#C6A052]'
                  : 'bg-black/60 text-white/80 border-white/20 hover:text-white'
              }`}
              title="Auto-pan panorama"
            >
              <Compass className={`w-4 h-4 ${isAutoPanning ? 'animate-spin' : ''}`} />
              <span className="text-[11px] font-semibold">{isAutoPanning ? 'Auto Pan' : 'Paused'}</span>
            </button>

            <button
              onClick={() => setZoomLevel((prev) => (prev === 1 ? 1.25 : prev === 1.25 ? 1.5 : 1))}
              className="p-2 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Cycle Zoom Levels"
            >
              <Maximize2 className="w-4 h-4" />
              <span className="text-[11px] font-semibold">{zoomLevel}x Zoom</span>
            </button>

            <button
              onClick={() => {
                setPanOffset(0);
                setZoomLevel(1);
              }}
              className="p-2 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Reset View to Center"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="text-[11px] font-semibold">Reset</span>
            </button>
          </div>

          {/* Active Location Info Overlay */}
          <div className="absolute bottom-4 left-4 right-4 z-20 max-w-xl p-4 sm:p-5 rounded-2xl bg-black/80 backdrop-blur-md border border-[#C6A052]/40 shadow-xl">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-bold tracking-widest text-[#C6A052] uppercase bg-[#C6A052]/15 px-2.5 py-0.5 rounded-full border border-[#C6A052]/30">
                {activeLocation.category}
              </span>
              <span className="text-xs text-[#E1C783]/80">NH-19 Topchanchi, Dhanbad</span>
            </div>
            <p className="text-xs sm:text-sm text-[#F5F0E7]/90 leading-relaxed font-light">
              {activeLocation.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              {activeLocation.features.map((feat, i) => (
                <span key={i} className="inline-flex items-center gap-1 text-[11px] text-[#E1C783] bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                  <CheckCircle2 className="w-3 h-3 text-[#C6A052]" />
                  {feat}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Location Hotspot Navigation Strip (5 Locations) */}
        <div className="p-4 sm:p-5 bg-[#141414] border-t border-[#30271D]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] uppercase tracking-wider text-[#C6A052] font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Select Camera / 360° Resort Area
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  onClose();
                  onNavigateToAbout();
                }}
                className="text-xs text-[#E1C783] hover:text-white underline cursor-pointer flex items-center gap-1"
              >
                <span>Read Full Resort Story</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {TOUR_LOCATIONS.map((loc, idx) => (
              <button
                key={loc.id}
                onClick={() => {
                  setActiveLocationIndex(idx);
                  setPanOffset(0);
                  setActiveHotspot(null);
                }}
                className={`flex items-center gap-2.5 p-2 rounded-xl border text-left transition-all cursor-pointer ${
                  activeLocationIndex === idx
                    ? 'bg-[#C6A052]/20 border-[#C6A052] shadow-md ring-1 ring-[#C6A052]'
                    : 'bg-black/40 border-white/10 hover:border-[#C6A052]/40 hover:bg-black/70'
                }`}
              >
                <img
                  src={loc.image}
                  alt={loc.name}
                  className="w-10 h-10 rounded-lg object-cover shrink-0"
                />
                <div className="min-w-0">
                  <span className="text-[10px] text-[#C6A052] block font-semibold truncate">{loc.category}</span>
                  <span className="text-xs text-white font-medium block truncate">{loc.name.split(' ')[0]} {loc.name.split(' ')[1]}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Bottom Action Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 mt-3 border-t border-[#262119]">
            <p className="text-xs text-[#F5F0E7]/60 text-center sm:text-left">
              ✨ Experience luxury hospitality on Grand Trunk Road NH-19 near Topchanchi Lake.
            </p>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => {
                  onClose();
                  onOpenBooking();
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#C6A052] via-[#E1C783] to-[#C6A052] text-[#090909] font-bold text-xs uppercase tracking-wider hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Reserve Room / Suite</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
