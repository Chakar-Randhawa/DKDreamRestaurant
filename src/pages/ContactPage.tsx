import React, { useState } from 'react';
import { Page } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantInfo';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Navigation,
  Compass,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ContactPageProps {
  onNavigateToReservations: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigateToReservations }) => {
  // Contact form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [enquiryType, setEnquiryType] = useState('General Enquiry');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  // Mock Google Maps UI states
  const [mapZoom, setMapZoom] = useState(15);
  const [mapLayer, setMapLayer] = useState<'streets' | 'satellite'>('streets');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      alert('Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 700);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Find Us & Say Hello</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-100 tracking-tight">
            Contact & Location Matrix
          </h1>
          <p className="mt-3 text-stone-400 text-sm sm:text-base leading-relaxed">
            Located on Boorowa Street in the heart of Young, NSW. Come dine with us or get in touch with our kitchen team.
          </p>
        </div>

        {/* SECTION 1: LOCATION MATRIX (Hours Juxtaposed with Mock Google Maps) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-stretch">
          
          {/* Left: Operating Hours & Direct Contact (5 cols) */}
          <div className="lg:col-span-5 glass-card rounded-3xl p-6 sm:p-8 border border-stone-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-amber-500" />
                <h2 className="text-xl font-bold font-serif text-stone-100">
                  Operating Hours Matrix
                </h2>
              </div>
              <p className="text-xs text-stone-400 mb-6">
                Our dinner service runs nightly Monday through Saturday. Final food orders accepted at 8:45 PM.
              </p>

              <div className="space-y-3">
                {RESTAURANT_INFO.hours.map((item) => (
                  <div
                    key={item.day}
                    className="flex justify-between items-center py-2 px-3 rounded-xl bg-stone-900/60 border border-stone-800/80 text-xs"
                  >
                    <span className="font-medium text-stone-300">{item.day}</span>
                    <span
                      className={`font-mono tabular-nums ${
                        item.open ? 'text-amber-400 font-semibold' : 'text-stone-500'
                      }`}
                    >
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Contact Info */}
            <div className="pt-6 mt-6 border-t border-stone-800 space-y-3 text-xs">
              <div className="flex items-center gap-3 text-stone-300">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                <span>219 Boorowa St, Young NSW 2594</span>
              </div>
              <div className="flex items-center gap-3 text-stone-300">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.phoneRaw}`} className="hover:text-amber-400 transition-colors">
                  {RESTAURANT_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-3 text-stone-300">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a href={`mailto:${RESTAURANT_INFO.email}`} className="hover:text-amber-400 transition-colors">
                  {RESTAURANT_INFO.email}
                </a>
              </div>

              <div className="pt-2">
                <button
                  onClick={onNavigateToReservations}
                  className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition-colors text-center"
                >
                  Book Dinner Table
                </button>
              </div>
            </div>
          </div>

          {/* Right: Mock Google Maps Visual Component (7 cols) */}
          <div className="lg:col-span-7 glass-card rounded-3xl overflow-hidden border border-stone-800 relative min-h-[460px] flex flex-col justify-between">
            
            {/* Map Top Header Controls */}
            <div className="p-4 bg-stone-900/90 backdrop-blur-md border-b border-stone-800 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Navigation className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-stone-200">Google Maps Live Pinpoint</h3>
                  <p className="text-[11px] text-stone-400">219 Boorowa St, Young NSW 2594</p>
                </div>
              </div>

              {/* Map layer toggle */}
              <div className="flex items-center gap-1 bg-stone-950 p-1 rounded-lg border border-stone-800">
                <button
                  onClick={() => setMapLayer('streets')}
                  className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors ${
                    mapLayer === 'streets' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  Map View
                </button>
                <button
                  onClick={() => setMapLayer('satellite')}
                  className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors ${
                    mapLayer === 'satellite' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  Satellite
                </button>
              </div>
            </div>

            {/* Stylized Interactive Map Canvas */}
            <div className="relative flex-1 bg-stone-950 overflow-hidden flex items-center justify-center min-h-[340px]">
              {/* Grid Roads and Town Street Simulation */}
              <div
                className={`absolute inset-0 transition-opacity duration-300 ${
                  mapLayer === 'satellite' ? 'opacity-30' : 'opacity-80'
                }`}
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 50% 50%, #1c1917 0%, #0c0a09 100%),
                    linear-gradient(to right, #292524 1px, transparent 1px),
                    linear-gradient(to bottom, #292524 1px, transparent 1px)
                  `,
                  backgroundSize: `${30 * (mapZoom / 15)}px ${30 * (mapZoom / 15)}px`,
                }}
              />

              {/* Simulated Young NSW Main Streets */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Boorowa Street (Main artery) */}
                <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-8 bg-stone-800/80 border-y border-stone-700/60 flex items-center justify-center">
                  <span className="text-[11px] font-mono tracking-widest text-stone-400 font-semibold uppercase">
                    Boorowa Street (B81)
                  </span>
                </div>
                {/* Lynch Street Crossroad */}
                <div className="absolute top-0 bottom-0 left-1/3 -translate-x-1/2 w-8 bg-stone-800/80 border-x border-stone-700/60 flex items-center justify-center">
                  <span className="text-[10px] font-mono tracking-widest text-stone-400 font-semibold uppercase rotate-90 whitespace-nowrap">
                    Lynch St
                  </span>
                </div>
                {/* Cloete Street Crossroad */}
                <div className="absolute top-0 bottom-0 right-1/4 -translate-x-1/2 w-8 bg-stone-800/80 border-x border-stone-700/60 flex items-center justify-center">
                  <span className="text-[10px] font-mono tracking-widest text-stone-400 font-semibold uppercase rotate-90 whitespace-nowrap">
                    Cloete St
                  </span>
                </div>
              </div>

              {/* Landmark Callouts */}
              <div className="absolute top-8 left-10 p-2 rounded-lg bg-stone-900/90 border border-stone-700 text-[10px] text-stone-400 shadow-md">
                Young Town Hall
              </div>
              <div className="absolute bottom-8 right-12 p-2 rounded-lg bg-stone-900/90 border border-stone-700 text-[10px] text-stone-400 shadow-md">
                Anderson Park & Heritage Walk
              </div>

              {/* Central Restaurant Pin */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="relative z-20 flex flex-col items-center cursor-pointer group"
              >
                <div className="glass-panel px-3.5 py-1.5 rounded-xl border border-amber-500 shadow-xl text-center mb-1 group-hover:scale-105 transition-transform bg-stone-900">
                  <span className="text-xs font-bold text-amber-400 block font-serif">
                    DK Dream Kitchen
                  </span>
                  <span className="text-[10px] text-stone-300">219 Boorowa St</span>
                </div>

                <div className="relative">
                  <MapPin className="w-10 h-10 text-amber-500 fill-amber-500 drop-shadow-lg" />
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-1 bg-amber-500/40 rounded-full blur-[2px]" />
                </div>
              </motion.div>

              {/* Map Zoom Controls */}
              <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-1 bg-stone-900/90 p-1 rounded-xl border border-stone-700">
                <button
                  onClick={() => setMapZoom((prev) => Math.min(18, prev + 1))}
                  className="w-7 h-7 flex items-center justify-center text-stone-200 hover:text-amber-400 hover:bg-stone-800 rounded-lg text-sm font-bold transition-colors"
                  aria-label="Zoom in"
                >
                  +
                </button>
                <button
                  onClick={() => setMapZoom((prev) => Math.max(12, prev - 1))}
                  className="w-7 h-7 flex items-center justify-center text-stone-200 hover:text-amber-400 hover:bg-stone-800 rounded-lg text-sm font-bold transition-colors"
                  aria-label="Zoom out"
                >
                  -
                </button>
              </div>

              {/* Location Badge */}
              <div className="absolute bottom-4 left-4 z-20 bg-stone-900/90 px-3 py-1.5 rounded-xl border border-stone-800 text-[11px] text-stone-400 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-amber-500" />
                <span>Hilltops Cherry Capital · Young, NSW 2594</span>
              </div>
            </div>

            {/* Map Footer Bar with Direct Directions Action */}
            <div className="p-4 bg-stone-900/90 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="text-stone-400 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-amber-500" />
                <span>Plenty of free street and rear parking available</span>
              </div>
              <a
                href="https://maps.google.com/?q=219+Boorowa+St,+Young+NSW+2594"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-amber-400 font-semibold rounded-xl border border-stone-700 flex items-center gap-1.5 transition-colors"
              >
                <span>Open in Google Maps App</span>
                <Navigation className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

        {/* SECTION 2: CONTACT GATEWAY FORM */}
        <div className="max-w-3xl mx-auto glass-card rounded-3xl p-6 sm:p-10 border border-stone-800 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold font-serif text-stone-100">
              Send Our Team a Message
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-stone-400">
              Have a question about large group bookings, private events, or dietary preparations? Drop us a line.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!isSent ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="0412 345 678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                      Enquiry Topic
                    </label>
                    <select
                      value={enquiryType}
                      onChange={(e) => setEnquiryType(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                    >
                      <option value="General Enquiry">General Enquiry</option>
                      <option value="Group / Event Booking">Group / Event Booking (10+ people)</option>
                      <option value="Dietary Question">Dietary or Allergy Question</option>
                      <option value="Catering">Catering & Platter Request</option>
                      <option value="Feedback">Customer Compliment or Feedback</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us how we can help make your dining experience memorable..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl p-3.5 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                      <span>Sending Message...</span>
                    </span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message to DK Dream Kitchen</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* Success alert state */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-xl font-bold font-serif text-stone-100">
                  Message Successfully Dispatched!
                </h3>
                <p className="text-xs text-stone-400 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. A member of our Young team will review your message and reply via email or phone shortly.
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="px-5 py-2.5 bg-stone-800 hover:bg-stone-700 text-amber-400 text-xs font-semibold rounded-xl border border-stone-700 transition-colors"
                >
                  Send Another Note
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};
