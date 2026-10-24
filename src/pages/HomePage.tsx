import React, { useState, useEffect } from 'react';
import { Page, MenuItem } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantInfo';
import { MENU_ITEMS } from '../data/menuData';
import {
  Utensils,
  Coffee,
  Sparkles,
  ArrowRight,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Flame,
  Star,
  ShieldCheck,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HomePageProps {
  onNavigate: (page: Page) => void;
  onAddToCart: (item: MenuItem) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onAddToCart }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [addedItemIds, setAddedItemIds] = useState<string[]>([]);

  const heroSlides = [
    {
      image: '/src/assets/images/hero_thai_wok_1792815646069.jpg',
      caption: 'Wok-fired with Authentic Thai Passion',
      sub: 'King Prawn Pad Thai & Fragrant Curries',
    },
    {
      image: '/src/assets/images/hero_schnitzel_1792815646420.jpg',
      caption: 'Golden Crisp Western Comforts',
      sub: 'Hand-Crumbed Schnitzels & Rich Sugo Parmigianas',
    },
    {
      image: '/src/assets/images/hero_matcha_drinks_1792815647020.jpg',
      caption: '2026 Uji Matcha & Artisan Boba Bar',
      sub: 'Fresh Strawberry Puree & Slow-Cooked Brown Sugar Pearls',
    },
    {
      image: '/src/assets/images/restaurant_interior_1792815647287.jpg',
      caption: 'Cozy Evening Dining in Young, NSW',
      sub: 'Dinner Service Every Mon–Sat from 5:00 PM – 9:00 PM',
    },
  ];

  // Auto-slideshow carousel shifting every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleQuickAdd = (item: MenuItem) => {
    onAddToCart(item);
    setAddedItemIds((prev) => [...prev, item.id]);
    setTimeout(() => {
      setAddedItemIds((prev) => prev.filter((id) => id !== item.id));
    }, 1800);
  };

  // Featured spotlight items
  const spotlightDishes = MENU_ITEMS.filter((item) => item.popular).slice(0, 4);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      
      {/* SECTION 1: HERO CAROUSEL */}
      <section className="relative h-[82vh] min-h-[580px] max-h-[820px] w-full overflow-hidden flex items-center justify-center">
        {/* Carousel Background Images */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${heroSlides[currentSlide].image})`,
            }}
          >
            {/* Measured Scrim for WCAG contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/65 to-stone-950/40" />
            <div className="absolute inset-0 bg-radial from-transparent via-stone-950/30 to-stone-950/70" />
          </motion.div>
        </AnimatePresence>

        {/* Carousel Arrow Controls */}
        <button
          onClick={handlePrevSlide}
          aria-label="Previous slide"
          className="absolute left-4 sm:left-8 z-20 p-2.5 rounded-full bg-stone-900/60 hover:bg-stone-800 text-stone-300 hover:text-white backdrop-blur-md border border-white/10 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNextSlide}
          aria-label="Next slide"
          className="absolute right-4 sm:right-8 z-20 p-2.5 rounded-full bg-stone-900/60 hover:bg-stone-800 text-stone-300 hover:text-white backdrop-blur-md border border-white/10 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Hero Glassmorphic Content Card */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-panel p-6 sm:p-10 rounded-3xl shadow-2xl border border-amber-500/25 max-w-3xl mx-auto"
          >
            {/* Micro tag line */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-4 tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Young, NSW · Hilltops Region</span>
            </div>

            {/* Bold localized headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-100 tracking-tight leading-[1.15] text-balance">
              Authentic Thai Flavors & Western Comfort Food in Young
            </h1>

            <p className="mt-4 text-stone-300 text-sm sm:text-base max-w-xl mx-auto font-sans leading-relaxed">
              Experience sizzling wok-tossed Thai delicacies, hearty Australian schnitzels, and our exclusive 2026 Uji matcha and artisanal boba creations.
            </p>

            {/* Micro-animated CTA buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate('menu')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all"
              >
                <span>Explore Digital Menu</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate('reservations')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-stone-100 border border-stone-700/80 font-semibold text-sm flex items-center justify-center gap-2 transition-all"
              >
                <span>Reserve a Table</span>
              </motion.button>
            </div>

            {/* Quick Micro Status */}
            <div className="mt-6 pt-5 border-t border-stone-800/80 flex flex-wrap items-center justify-center gap-4 text-xs text-stone-400">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>Mon–Sat 5:00 PM – 9:00 PM</span>
              </div>
              <span className="text-stone-600 hidden sm:inline">·</span>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                <span>219 Boorowa St, Young</span>
              </div>
            </div>
          </motion.div>

          {/* Carousel Slide Indicators */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 transition-all rounded-full ${
                  currentSlide === idx ? 'w-8 bg-amber-400' : 'w-2 bg-stone-700 hover:bg-stone-500'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: CULINARY USP GRID */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-mono uppercase tracking-widest text-amber-500 mb-2 font-semibold">
            Our Culinary Identity
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-100 tracking-tight">
            Three Worlds, One Kitchen in Young
          </h2>
          <p className="mt-3 text-stone-400 text-sm">
            Whether you are craving sizzling Thai wok hei, a golden country schnitzel, or refreshing iced ceremonial matcha, DK Dream Kitchen brings it together under one roof.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Authentic Thai */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl glass-card p-7 border border-stone-800 hover:border-amber-500/40 transition-colors flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-5 group-hover:scale-105 transition-transform">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-serif text-stone-100 mb-2">
                Authentic Thai Cuisine
              </h3>
              <p className="text-stone-400 text-sm leading-relaxed">
                Traditional street-style Pad Thai, fiery Drunken Noodles (Pad Kee Mao), rich slow-cooked Massaman beef, and royal green curry seasoned with authentic Thai herbs and fresh lime.
              </p>
              <div className="mt-4 pt-4 border-t border-stone-800/80 flex items-center gap-2 text-xs text-stone-400">
                <span className="font-medium text-amber-400">Signature:</span>
                <span>King Prawn Pad Thai & Drunken Noodles</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('menu')}
              className="mt-6 flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
            >
              <span>Explore Thai Menu</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>

          {/* Card 2: Western Comfort */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl glass-card p-7 border border-stone-800 hover:border-amber-500/40 transition-colors flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-5 group-hover:scale-105 transition-transform">
                <Utensils className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-serif text-stone-100 mb-2">
                Western Comfort Staples
              </h3>
              <p className="text-stone-400 text-sm leading-relaxed">
                Hand-crumbed golden Chicken Schnitzels, decadent melted mozzarella Parmigianas, Italian Napolitana pasta with San Marzano tomatoes, and prime Angus burgers with crisp chips.
              </p>
              <div className="mt-4 pt-4 border-t border-stone-800/80 flex items-center gap-2 text-xs text-stone-400">
                <span className="font-medium text-amber-400">Favorite:</span>
                <span>DK 300g Chicken Parmigiana & Gravy</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('menu')}
              className="mt-6 flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
            >
              <span>Explore Western Menu</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>

          {/* Card 3: 2026 Boba & Matcha Series */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl glass-card p-7 border border-stone-800 hover:border-amber-500/40 transition-colors flex flex-col justify-between group relative overflow-hidden"
          >
            <div className="absolute -right-8 -top-8 w-24 h-24 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-5 group-hover:scale-105 transition-transform">
                <Coffee className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold font-serif text-stone-100">
                  2026 Boba & Matcha Bar
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500 text-stone-950 uppercase">
                  New
                </span>
              </div>
              <p className="text-stone-400 text-sm leading-relaxed">
                Ceremonial Uji Japanese matcha hand-whisked to order. Savor layered Strawberry Matcha, Tropical Mango Matcha Fresca, and warm Brown Sugar Tiger Boba fresh milk.
              </p>
              <div className="mt-4 pt-4 border-t border-stone-800/80 flex items-center gap-2 text-xs text-stone-400">
                <span className="font-medium text-amber-400">Hit:</span>
                <span>Layered Strawberry Matcha & Brown Sugar Boba</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('menu')}
              className="mt-6 flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
            >
              <span>Explore Drink Series</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: VISUAL MICRO-PROMOTIONS / BEST SELLERS */}
      <section className="py-16 bg-stone-900/50 border-y border-stone-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-amber-500 font-semibold mb-1">
                Tonight's Crowd Pleasers
              </p>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
                Top Rated Dishes in Young
              </h2>
            </div>
            <button
              onClick={() => onNavigate('menu')}
              className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
            >
              <span>View Full 20+ Item Menu</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {spotlightDishes.map((dish) => {
              const isAdded = addedItemIds.includes(dish.id);
              return (
                <motion.div
                  key={dish.id}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl bg-stone-900 border border-stone-800/80 overflow-hidden flex flex-col justify-between group shadow-lg"
                >
                  <div className="relative h-48 overflow-hidden bg-stone-800">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-stone-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-amber-400 font-mono text-xs font-bold border border-white/10">
                      ${dish.price.toFixed(2)} AUD
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-[11px] text-stone-400 mb-1">
                        <span>{dish.tags[0]}</span>
                        {dish.tags[1] && (
                          <>
                            <span>·</span>
                            <span>{dish.tags[1]}</span>
                          </>
                        )}
                      </div>
                      <h4 className="text-base font-bold text-stone-100 group-hover:text-amber-400 transition-colors line-clamp-1">
                        {dish.name}
                      </h4>
                      <p className="mt-2 text-xs text-stone-400 line-clamp-2 leading-relaxed">
                        {dish.description}
                      </p>
                    </div>

                    <button
                      onClick={() => handleQuickAdd(dish)}
                      className={`mt-4 w-full py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        isAdded
                          ? 'bg-emerald-500 text-stone-950'
                          : 'bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-stone-200 border border-stone-700/60'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added to Order!</span>
                        </>
                      ) : (
                        <>
                          <span>Add to Order</span>
                          <span className="font-mono tabular-nums">(${dish.price.toFixed(2)})</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: LOCAL ESSENCE & SOCIAL PROOF */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-semibold">
              Proudly Local in Young NSW
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-100 leading-tight">
              A Welcoming Kitchen for Families, Travellers & Food Lovers
            </h2>
            <p className="mt-4 text-stone-400 text-sm leading-relaxed">
              Established on Boorowa Street, DK Dream Kitchen was born from a passion for blending authentic Thai culinary heritage with comforting local Australian favorites. We source quality regional ingredients, craft our sauces from scratch, and prepare every dish fresh to order.
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs text-stone-300">
                  <strong className="text-stone-100 font-medium">Fresh Daily Wok & Fry:</strong> High-heat wok cooking preserving crisp vegetables, tender proteins, and authentic aromatics.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs text-stone-300">
                  <strong className="text-stone-100 font-medium">Dietary Accommodating:</strong> Dedicated vegetarian and gluten-free preparation upon request.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs text-stone-300">
                  <strong className="text-stone-100 font-medium">Warm Regional Hospitality:</strong> Attentive service for relaxed dinners, milestone celebrations, and speedy takeaways.
                </p>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <button
                onClick={() => onNavigate('reservations')}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition-colors"
              >
                Book Your Table
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800 font-medium text-xs transition-colors"
              >
                Find Our Location
              </button>
            </div>
          </div>

          {/* Testimonials Card Block */}
          <div className="space-y-4">
            <div className="glass-card p-6 rounded-2xl border border-stone-800">
              <div className="flex items-center gap-1 text-amber-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-stone-300 italic leading-relaxed">
                "The Pad Thai here in Young is genuinely as good as what you find in Bangkok, and my husband was thrilled with the giant chicken parmigiana. The new Strawberry Matcha is a must-try!"
              </p>
              <div className="mt-3 flex items-center justify-between text-xs text-stone-500">
                <span className="font-semibold text-stone-200">Sarah & Mark T.</span>
                <span>Young Local Residents · Google Review</span>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-stone-800">
              <div className="flex items-center gap-1 text-amber-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-stone-300 italic leading-relaxed">
                "Stopped here on our road trip through the Hilltops. The Drunken Noodles had incredible wok flavor and perfect heat. Fast service and super clean restaurant."
              </p>
              <div className="mt-3 flex items-center justify-between text-xs text-stone-500">
                <span className="font-semibold text-stone-200">Liam K.</span>
                <span>Canberra Weekend Visitor · TripAdvisor</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
