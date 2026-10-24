import React, { useState } from 'react';
import { Page } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantInfo';
import { ShoppingBag, Phone, Menu as MenuIcon, X, UtensilsCrossed } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  cartCount: number;
  openCartDrawer?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  setCurrentPage,
  cartCount,
  openCartDrawer,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: Page; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Digital Menu' },
    { id: 'order', label: 'Order Online' },
    { id: 'reservations', label: 'Reservations' },
    { id: 'contact', label: 'Contact & Location' },
  ];

  const handleNavClick = (page: Page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Bar Announcement / Quick Info */}
      <div className="bg-stone-950/90 border-b border-stone-800/80 px-4 py-1.5 text-xs text-stone-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-amber-500 font-medium">Tonight in Young, NSW:</span>
            <span>Open 5:00 PM – 9:00 PM</span>
            <span className="hidden sm:inline text-stone-600">·</span>
            <span className="hidden sm:inline">Dine-in & Takeaway</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`tel:${RESTAURANT_INFO.phoneRaw}`}
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span>{RESTAURANT_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-stone-900/90 backdrop-blur-md border-b border-stone-800/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          
          {/* Zone 1: Single Wordmark Brand */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg group whitespace-nowrap shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-stone-950 font-bold shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <UtensilsCrossed className="w-5 h-5 text-stone-950" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-stone-100 font-serif leading-none group-hover:text-amber-400 transition-colors">
                DK Dream Kitchen
              </span>
              <span className="text-[11px] font-medium text-amber-500/90 tracking-widest uppercase mt-1">
                Young · NSW
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative py-1 text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-amber-400 font-semibold'
                      : 'text-stone-300 hover:text-stone-100'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action & Cart */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Quick Cart Trigger */}
            <button
              onClick={() => {
                if (openCartDrawer) {
                  openCartDrawer();
                } else {
                  handleNavClick('order');
                }
              }}
              aria-label="View Order and Cart"
              className="relative p-2.5 rounded-xl bg-stone-800/80 hover:bg-stone-700/80 text-stone-200 hover:text-amber-400 transition-all border border-stone-700/50 flex items-center gap-2 group"
            >
              <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className="bg-amber-500 text-stone-950 font-bold text-xs px-2 py-0.5 rounded-full tabular-nums"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            {/* Primary Action: Book a Table */}
            <button
              onClick={() => handleNavClick('reservations')}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-stone-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-md shadow-amber-500/10 hover:shadow-amber-500/25 transition-all whitespace-nowrap shrink-0"
            >
              Book a Table
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="lg:hidden p-2.5 rounded-xl bg-stone-800/80 text-stone-300 hover:text-stone-100 hover:bg-stone-700/80 transition-colors border border-stone-700/50"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Animated Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[113px] bottom-0 z-30 bg-stone-950/98 backdrop-blur-xl border-t border-stone-800 p-6 flex flex-col justify-between overflow-y-auto lg:hidden"
          >
            <div className="space-y-3">
              <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                Navigation
              </p>
              {navLinks.map((link) => {
                const isActive = currentPage === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`w-full text-left px-4 py-3.5 rounded-xl text-base font-medium flex items-center justify-between transition-colors ${
                      isActive
                        ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                        : 'text-stone-300 hover:bg-stone-900 hover:text-stone-100'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-6 border-t border-stone-800/80 space-y-4">
              <div className="bg-stone-900/80 rounded-2xl p-4 border border-stone-800">
                <p className="text-xs text-amber-500 font-semibold mb-1">DK Dream Kitchen Young</p>
                <p className="text-xs text-stone-400">{RESTAURANT_INFO.address}</p>
                <p className="text-xs text-stone-400 mt-1">Open Mon-Sat: 5:00 PM – 9:00 PM</p>
                <a
                  href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                  className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-amber-400 hover:underline"
                >
                  <Phone className="w-3.5 h-3.5" /> Call {RESTAURANT_INFO.phone}
                </a>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleNavClick('order')}
                  className="w-full py-3 px-4 rounded-xl text-xs font-semibold text-stone-100 bg-stone-800 hover:bg-stone-700 transition-colors text-center"
                >
                  Order Online
                </button>
                <button
                  onClick={() => handleNavClick('reservations')}
                  className="w-full py-3 px-4 rounded-xl text-xs font-semibold text-stone-950 bg-amber-500 hover:bg-amber-400 transition-colors text-center"
                >
                  Book Table
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
