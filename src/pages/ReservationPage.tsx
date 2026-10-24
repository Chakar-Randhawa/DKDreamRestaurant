import React, { useState } from 'react';
import { Page, ReservationData } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantInfo';
import {
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  MapPin,
  Sparkles,
  Phone,
  AlertCircle,
  ArrowRight,
  Utensils
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ReservationPageProps {
  onNavigateToHome: () => void;
  onNavigateToMenu: () => void;
}

export const ReservationPage: React.FC<ReservationPageProps> = ({
  onNavigateToHome,
  onNavigateToMenu,
}) => {
  const timeSlots = [
    '5:00 PM',
    '5:30 PM',
    '6:00 PM',
    '6:30 PM',
    '7:00 PM',
    '7:30 PM',
    '8:00 PM',
    '8:30 PM',
  ];

  const seatingOptions: { id: ReservationData['seatingPreference']; label: string }[] = [
    { id: 'standard', label: 'Main Dining Table' },
    { id: 'window', label: 'Window Street View' },
    { id: 'booth', label: 'Cozy Timber Booth' },
    { id: 'quiet', label: 'Quiet Corner' },
  ];

  const occasionOptions = [
    'Casual Dinner',
    'Birthday Celebration',
    'Romantic Date Night',
    'Family Gathering',
    'Business / Group',
  ];

  // Today formatted as YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState<ReservationData>({
    name: '',
    phone: '',
    email: '',
    guests: 2,
    date: todayStr,
    timeSlot: '6:30 PM',
    seatingPreference: 'standard',
    specialOccasion: 'Casual Dinner',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [bookingReference, setBookingReference] = useState('');
  const [dateWarning, setDateWarning] = useState('');

  const handleDateChange = (val: string) => {
    // Check if Sunday (in JavaScript 0 is Sunday)
    const selectedDate = new Date(val);
    if (selectedDate.getUTCDay() === 0) {
      setDateWarning('Note: DK Dream Kitchen is closed on Sundays. Please select Monday through Saturday.');
    } else {
      setDateWarning('');
    }
    setFormData((prev) => ({ ...prev, date: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Please enter your name and phone number.');
      return;
    }

    const selectedDate = new Date(formData.date);
    if (selectedDate.getUTCDay() === 0) {
      alert('We are closed on Sundays. Please choose Monday through Saturday.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const ref = `DK-RES-${Math.floor(1000 + Math.random() * 9000)}`;
      setBookingReference(ref);
      setIsSubmitting(false);
      setIsConfirmed(true);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Evening Dining · Young NSW</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-100 tracking-tight">
            Reserve Your Table
          </h1>
          <p className="mt-3 text-stone-400 text-sm sm:text-base leading-relaxed">
            Join us for an unforgettable dinner at 219 Boorowa St. We take reservations Monday to Saturday from 5:00 PM to 9:00 PM.
          </p>
        </div>

        {/* Form or Success State */}
        <AnimatePresence mode="wait">
          {!isConfirmed ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="glass-card rounded-3xl p-6 sm:p-10 border border-stone-800 shadow-2xl"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* 1. Date, Time & Guest Count Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Guests Stepper */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-amber-500" />
                      <span>Number of Guests</span>
                    </label>
                    <div className="flex items-center rounded-xl bg-stone-900 border border-stone-800 p-1">
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            guests: Math.max(1, prev.guests - 1),
                          }))
                        }
                        className="w-10 h-10 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 flex items-center justify-center font-bold text-base transition-colors"
                      >
                        -
                      </button>
                      <div className="flex-1 text-center font-mono font-bold text-base text-amber-400">
                        {formData.guests} {formData.guests === 1 ? 'Guest' : 'Guests'}
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            guests: Math.min(20, prev.guests + 1),
                          }))
                        }
                        className="w-10 h-10 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 flex items-center justify-center font-bold text-base transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Date Picker */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-500" />
                      <span>Reservation Date</span>
                    </label>
                    <input
                      type="date"
                      required
                      min={todayStr}
                      value={formData.date}
                      onChange={(e) => handleDateChange(e.target.value)}
                      className="w-full h-12 bg-stone-900 border border-stone-800 rounded-xl px-3.5 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                    />
                    {dateWarning && (
                      <p className="mt-1.5 text-[11px] text-amber-400 flex items-start gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                        <span>{dateWarning}</span>
                      </p>
                    )}
                  </div>

                  {/* Opening Window Callout */}
                  <div className="flex flex-col justify-end">
                    <div className="p-3 bg-stone-900/60 rounded-xl border border-stone-800/80 text-xs text-stone-400">
                      <p className="font-semibold text-amber-400 mb-0.5">Dinner Window</p>
                      <p>Mon – Sat: 5:00 PM – 9:00 PM</p>
                      <p className="text-[11px] text-stone-500 mt-1">Sun: Closed for rest</p>
                    </div>
                  </div>

                </div>

                {/* 2. Time Slot Buttons */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-3 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    <span>Select Seating Time Slot (5:00 PM – 9:00 PM Window)</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {timeSlots.map((slot) => {
                      const isSelected = formData.timeSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, timeSlot: slot }))}
                          className={`py-3 px-3 rounded-xl text-xs font-semibold font-mono tracking-tight transition-all ${
                            isSelected
                              ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20 border border-amber-400'
                              : 'bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Seating Preference */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-3">
                    Seating Preference
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {seatingOptions.map((opt) => {
                      const isSelected = formData.seatingPreference === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({ ...prev, seatingPreference: opt.id }))
                          }
                          className={`py-2.5 px-3 rounded-xl text-xs font-medium transition-colors ${
                            isSelected
                              ? 'bg-stone-800 text-amber-400 border border-amber-500/40'
                              : 'bg-stone-900 text-stone-400 border border-stone-800 hover:text-stone-200'
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Occasion */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-3">
                    Special Occasion (Optional)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {occasionOptions.map((occ) => {
                      const isSelected = formData.specialOccasion === occ;
                      return (
                        <button
                          key={occ}
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({ ...prev, specialOccasion: occ }))
                          }
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                            isSelected
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                              : 'bg-stone-900 text-stone-400 border border-stone-800 hover:text-stone-200'
                          }`}
                        >
                          {occ}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 5. Contact Inputs */}
                <div className="pt-4 border-t border-stone-800 space-y-4">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-300">
                    Lead Guest Contact Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Full Name *"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, name: e.target.value }))
                        }
                        className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        required
                        placeholder="Mobile Number *"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, phone: e.target.value }))
                        }
                        className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, email: e.target.value }))
                        }
                        className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <textarea
                      placeholder="High chair needed? Dietary requirements or birthday candle requests?"
                      rows={2}
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, notes: e.target.value }))
                      }
                      className="w-full bg-stone-900 border border-stone-800 rounded-xl p-3 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                        <span>Confirming Reservation...</span>
                      </span>
                    ) : (
                      <>
                        <span>Confirm Table Reservation</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-center text-stone-500 mt-2">
                    Instant confirmation. No deposit or credit card required.
                  </p>
                </div>

              </form>
            </motion.div>
          ) : (
            /* SUCCESS CONFIRMATION BLOCK */
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="glass-card rounded-3xl p-8 sm:p-12 border border-amber-500/40 text-center max-w-2xl mx-auto shadow-2xl"
            >
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-bold">
                Table Reserved!
              </span>
              <h2 className="text-3xl font-serif font-bold text-stone-100 mt-2">
                We Look Forward to Welcoming You
              </h2>
              <p className="mt-2 text-stone-400 text-sm">
                Your reservation at DK Dream Kitchen in Young, NSW is confirmed.
              </p>

              {/* Booking Summary Card */}
              <div className="mt-8 p-6 rounded-2xl bg-stone-900 border border-stone-800 text-left space-y-3.5">
                <div className="flex justify-between items-center text-xs pb-3 border-b border-stone-800">
                  <span className="text-stone-400">Confirmation Reference:</span>
                  <span className="font-mono font-bold text-amber-400 text-sm">{bookingReference}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-stone-400">Guest Name:</span>
                  <span className="font-semibold text-stone-200">{formData.name}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-stone-400">Party Size:</span>
                  <span className="text-stone-200">{formData.guests} Guests</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-stone-400">Date & Time:</span>
                  <span className="font-semibold text-amber-400">
                    {formData.date} at {formData.timeSlot}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-stone-400">Seating Area:</span>
                  <span className="text-stone-200 capitalize">{formData.seatingPreference} Table</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-stone-400">Occasion:</span>
                  <span className="text-stone-200">{formData.specialOccasion}</span>
                </div>
                <div className="pt-3 border-t border-stone-800 text-xs flex items-start gap-2 text-stone-400">
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>219 Boorowa St, Young NSW 2594 (Table held for 15 minutes past booking time)</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={onNavigateToMenu}
                  className="flex-1 py-3 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Utensils className="w-4 h-4" />
                  <span>Browse Our Menu in Advance</span>
                </button>
                <button
                  onClick={() => setIsConfirmed(false)}
                  className="flex-1 py-3 px-5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800 font-semibold text-xs transition-colors"
                >
                  Make Another Reservation
                </button>
              </div>

              <div className="mt-6 text-xs text-stone-500">
                Need to amend or cancel? Call us directly at{' '}
                <a href={`tel:${RESTAURANT_INFO.phoneRaw}`} className="text-amber-400 hover:underline">
                  {RESTAURANT_INFO.phone}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
