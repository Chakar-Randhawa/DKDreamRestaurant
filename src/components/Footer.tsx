import React from 'react';
import { Page } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantInfo';
import { MapPin, Phone, Mail, Clock, UtensilsCrossed, ArrowRight, Heart } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: Page) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
  const handleNav = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-stone-800/60">
          
          {/* Col 1: Brand & Story */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-stone-950 font-bold shadow-md shadow-amber-500/15">
                <UtensilsCrossed className="w-4 h-4 text-stone-950" />
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-stone-100 font-serif">
                  DK Dream Kitchen
                </span>
                <p className="text-[11px] text-amber-500 uppercase tracking-widest">
                  Young, NSW Australia
                </p>
              </div>
            </div>

            <p className="text-sm text-stone-400 leading-relaxed">
              Bringing authentic wok-tossed Thai street food delicacies alongside comforting Australian pub favorites and artisan 2026 Uji matcha boba drinks to the heart of the Hilltops region.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={RESTAURANT_INFO.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
                aria-label="Visit DK Dream Kitchen Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>

              <a
                href={RESTAURANT_INFO.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
                aria-label="Visit DK Dream Kitchen Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation & Sections */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-stone-200 uppercase tracking-widest font-mono">
              Explore Menu & Venue
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-amber-500/70" />
                  <span>Home Showcase</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('menu')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-amber-500/70" />
                  <span>Digital Food & Drinks Menu</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('order')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-amber-500/70" />
                  <span>Takeaway & Online Ordering</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('reservations')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-amber-500/70" />
                  <span>Table Reservations (5-9 PM)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-amber-500/70" />
                  <span>Location Map & Contact</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Operational Hours */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-stone-200 uppercase tracking-widest font-mono flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500" />
              <span>Dinner Service Hours</span>
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-stone-800/80">
                <span className="text-stone-300">Monday – Saturday</span>
                <span className="text-amber-400 font-medium tabular-nums">5:00 PM – 9:00 PM</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-stone-800/80">
                <span className="text-stone-400">Sunday</span>
                <span className="text-stone-500 font-medium">Closed</span>
              </div>
              <p className="text-[11px] text-stone-500 pt-2 leading-relaxed">
                Kitchen closes at 8:45 PM for final orders. Advance table bookings strongly recommended for Friday & Saturday evenings.
              </p>
            </div>
          </div>

          {/* Col 4: Location & Contact Direct */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-stone-200 uppercase tracking-widest font-mono flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-500" />
              <span>Find Us in Young</span>
            </h4>
            <div className="space-y-3 text-sm text-stone-400">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.phoneRaw}`} className="hover:text-amber-400 transition-colors">
                  {RESTAURANT_INFO.phone}
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a href={`mailto:${RESTAURANT_INFO.email}`} className="hover:text-amber-400 transition-colors">
                  {RESTAURANT_INFO.email}
                </a>
              </p>
              <div className="pt-1">
                <button
                  onClick={() => handleNav('reservations')}
                  className="w-full py-2.5 px-3 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-xl text-xs font-medium transition-colors text-center"
                >
                  Reserve a Table Tonight
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Note */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© 2026 DK Dream Kitchen Restaurant. All rights reserved. Young, NSW 2594.</p>
          <p className="flex items-center gap-1.5">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>for local dining & authentic Thai fusion</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
