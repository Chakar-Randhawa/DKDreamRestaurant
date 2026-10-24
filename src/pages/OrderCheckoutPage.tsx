import React, { useState } from 'react';
import { CartItem, Page } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantInfo';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  CheckCircle2,
  Clock,
  MapPin,
  Tag,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Phone
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface OrderCheckoutPageProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onNavigateToMenu: () => void;
  onNavigateToHome: () => void;
}

export const OrderCheckoutPage: React.FC<OrderCheckoutPageProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onNavigateToMenu,
  onNavigateToHome,
}) => {
  const [fulfillmentType, setFulfillmentType] = useState<'pickup' | 'delivery'>('pickup');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  
  // Promo code simulation
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPct: number } | null>(null);
  const [promoError, setPromoError] = useState('');

  // Tip simulation
  const [tipAmount, setTipAmount] = useState<number>(0);

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderReference, setOrderReference] = useState('');
  const [confirmedOrderSummary, setConfirmedOrderSummary] = useState<{
    items: CartItem[];
    total: number;
    fulfillment: 'pickup' | 'delivery';
    name: string;
  } | null>(null);

  // Math
  const itemsSubtotal = cartItems.reduce(
    (sum, item) => sum + item.menuItem.price * item.quantity,
    0
  );

  const deliveryFee = fulfillmentType === 'delivery' ? 5.00 : 0.00;
  const discount = appliedPromo ? (itemsSubtotal * appliedPromo.discountPct) / 100 : 0;
  const grandTotal = Math.max(0, itemsSubtotal - discount + deliveryFee + tipAmount);

  const handleApplyPromo = () => {
    setPromoError('');
    if (promoCode.trim().toUpperCase() === 'YOUNG2026' || promoCode.trim().toUpperCase() === 'DKDREAM') {
      setAppliedPromo({ code: promoCode.trim().toUpperCase(), discountPct: 10 });
    } else {
      setPromoError('Invalid promo code. Try "YOUNG2026" for 10% off.');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    if (!customerName.trim() || !customerPhone.trim()) {
      alert('Please provide your name and contact phone number.');
      return;
    }
    if (fulfillmentType === 'delivery' && !customerAddress.trim()) {
      alert('Please provide your delivery address in Young.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const generatedRef = `DK-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderReference(generatedRef);
      setConfirmedOrderSummary({
        items: [...cartItems],
        total: grandTotal,
        fulfillment: fulfillmentType,
        name: customerName,
      });
      setIsSubmitting(false);
      setOrderConfirmed(true);
      onClearCart();
    }, 900);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <p className="text-xs font-mono uppercase tracking-widest text-amber-500 font-semibold mb-2">
            Online Ordering & Checkout
          </p>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-100 tracking-tight">
            Review Your Order
          </h1>
          <p className="mt-2 text-stone-400 text-sm">
            Freshly cooked to order at 219 Boorowa St, Young NSW. Pay securely upon pickup or on delivery.
          </p>
        </div>

        {/* Empty Bag State */}
        {cartItems.length === 0 && !orderConfirmed && (
          <div className="max-w-xl mx-auto py-16 px-6 rounded-3xl glass-card text-center border border-stone-800">
            <div className="w-16 h-16 rounded-full bg-stone-800 flex items-center justify-center mx-auto text-amber-500 mb-4">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold font-serif text-stone-200">Your bag is currently empty</h2>
            <p className="mt-2 text-xs text-stone-400 leading-relaxed">
              Discover our authentic Thai specialties, hand-crumbed chicken schnitzels, and 2026 Uji matcha drinks to build your feast.
            </p>
            <button
              onClick={onNavigateToMenu}
              className="mt-6 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs inline-flex items-center gap-2 shadow-lg transition-colors"
            >
              <span>Explore Digital Menu</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Two-Column Checkout Panel */}
        {cartItems.length > 0 && !orderConfirmed && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: Items in Cart (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="glass-card rounded-2xl p-6 border border-stone-800">
                <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                  <h2 className="text-lg font-bold font-serif text-stone-100 flex items-center gap-2">
                    <span>Selected Items</span>
                    <span className="text-xs font-mono font-normal text-stone-400">
                      ({cartItems.reduce((acc, it) => acc + it.quantity, 0)} items)
                    </span>
                  </h2>
                  <button
                    onClick={onNavigateToMenu}
                    className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1"
                  >
                    <span>+ Add More Dishes</span>
                  </button>
                </div>

                <div className="divide-y divide-stone-800/80">
                  {cartItems.map((item) => (
                    <div
                      key={item.menuItem.id}
                      className="py-4 flex gap-4 items-center justify-between"
                    >
                      <img
                        src={item.menuItem.image}
                        alt={item.menuItem.name}
                        referrerPolicy="no-referrer"
                        className="w-20 h-20 rounded-xl object-cover bg-stone-800 shrink-0 border border-stone-700/50"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="text-sm font-bold text-stone-100 truncate">
                              {item.menuItem.name}
                            </h3>
                            <p className="text-xs text-stone-400">
                              ${item.menuItem.price.toFixed(2)} AUD each
                            </p>
                          </div>
                          <span className="text-sm font-bold text-amber-400 font-mono tabular-nums shrink-0">
                            ${(item.menuItem.price * item.quantity).toFixed(2)} AUD
                          </span>
                        </div>

                        {/* Quantity and Controls */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center rounded-lg bg-stone-900 border border-stone-700">
                            <button
                              onClick={() => onUpdateQuantity(item.menuItem.id, -1)}
                              className="p-1.5 hover:text-amber-400 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-3 text-xs font-bold tabular-nums text-stone-100">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.menuItem.id, 1)}
                              className="p-1.5 hover:text-amber-400 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.menuItem.id)}
                            className="text-stone-500 hover:text-red-400 text-xs flex items-center gap-1 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Kitchen Special Notes */}
              <div className="glass-card rounded-2xl p-6 border border-stone-800">
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                  Special Kitchen Request or Allergy Note
                </label>
                <textarea
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="e.g. Mild chili for Drunken Noodles, no peanuts on Pad Thai, sauce on the side for Schnitzel..."
                  rows={2}
                  className="w-full bg-stone-900/80 border border-stone-800 rounded-xl p-3 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* RIGHT COLUMN: Order Summary & Place Order Form (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <form onSubmit={handlePlaceOrder} className="glass-card rounded-2xl p-6 border border-stone-800 space-y-5">
                
                {/* Fulfillment Toggle */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                    Fulfillment Method
                  </label>
                  <div className="grid grid-cols-2 gap-2 p-1 bg-stone-900 rounded-xl border border-stone-800">
                    <button
                      type="button"
                      onClick={() => setFulfillmentType('pickup')}
                      className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                        fulfillmentType === 'pickup'
                          ? 'bg-amber-500 text-stone-950 shadow-sm'
                          : 'text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Takeaway Pickup (Free)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFulfillmentType('delivery')}
                      className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                        fulfillmentType === 'delivery'
                          ? 'bg-amber-500 text-stone-950 shadow-sm'
                          : 'text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>Young Delivery (+$5)</span>
                    </button>
                  </div>

                  <p className="mt-2 text-[11px] text-stone-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-500" />
                    <span>
                      {fulfillmentType === 'pickup'
                        ? 'Ready for pickup in ~20–30 mins at 219 Boorowa St'
                        : 'Local Young township delivery within 35–45 mins'}
                    </span>
                  </p>
                </div>

                {/* Customer Details Form */}
                <div className="space-y-3 pt-2 border-t border-stone-800">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-300">
                    Customer Information
                  </h3>
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name *"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="tel"
                      required
                      placeholder="Phone Number *"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                    />
                    <input
                      type="email"
                      placeholder="Email (for receipt)"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  {fulfillmentType === 'delivery' && (
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Street Address in Young, NSW 2594 *"
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  )}
                </div>

                {/* Promo Code Input */}
                <div className="pt-2 border-t border-stone-800">
                  <label className="block text-xs font-medium text-stone-400 mb-1.5 flex items-center justify-between">
                    <span>Have a Promo Code?</span>
                    <span className="text-[11px] text-amber-500/80">Try YOUNG2026</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs uppercase text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-xl transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {appliedPromo && (
                    <p className="mt-1.5 text-xs text-emerald-400 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Code {appliedPromo.code} applied! (10% off)</span>
                    </p>
                  )}
                  {promoError && (
                    <p className="mt-1.5 text-xs text-amber-400">{promoError}</p>
                  )}
                </div>

                {/* Tip Option */}
                <div className="pt-2 border-t border-stone-800">
                  <label className="block text-xs font-medium text-stone-400 mb-1.5">
                    Add a Tip for Kitchen & Staff (Optional)
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[0, 2, 4, 6].map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => setTipAmount(amount)}
                        className={`py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                          tipAmount === amount
                            ? 'bg-amber-500 text-stone-950 border-amber-500'
                            : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-stone-200'
                        }`}
                      >
                        {amount === 0 ? 'None' : `$${amount}`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mathematical Price Breakdown */}
                <div className="pt-4 border-t border-stone-800 space-y-2 text-xs">
                  <div className="flex justify-between text-stone-400">
                    <span>Dishes Subtotal</span>
                    <span className="font-mono tabular-nums text-stone-200">${itemsSubtotal.toFixed(2)} AUD</span>
                  </div>

                  {appliedPromo && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Promo Discount ({appliedPromo.discountPct}%)</span>
                      <span className="font-mono tabular-nums">-${discount.toFixed(2)} AUD</span>
                    </div>
                  )}

                  <div className="flex justify-between text-stone-400">
                    <span>Fulfillment ({fulfillmentType === 'pickup' ? 'Pickup' : 'Local Delivery'})</span>
                    <span className="font-mono tabular-nums text-stone-200">
                      {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)} AUD`}
                    </span>
                  </div>

                  {tipAmount > 0 && (
                    <div className="flex justify-between text-stone-400">
                      <span>Kitchen Staff Tip</span>
                      <span className="font-mono tabular-nums text-stone-200">${tipAmount.toFixed(2)} AUD</span>
                    </div>
                  )}

                  <div className="flex justify-between items-baseline pt-2 border-t border-stone-800 text-base font-bold text-stone-100">
                    <span>Total Due</span>
                    <span className="text-xl font-mono text-amber-400 tabular-nums">
                      ${grandTotal.toFixed(2)} AUD
                    </span>
                  </div>
                  <p className="text-[10px] text-stone-500">Includes Australian GST where applicable.</p>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                      <span>Sending to Kitchen...</span>
                    </span>
                  ) : (
                    <>
                      <span>Place Order (${grandTotal.toFixed(2)} AUD)</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-stone-500 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                  <span>Pay upon pickup at counter (Cash/Card/EFTPOS)</span>
                </p>
              </form>
            </div>

          </div>
        )}

        {/* ANIMATED SUCCESS CONFIRMATION MODAL */}
        <AnimatePresence>
          {orderConfirmed && confirmedOrderSummary && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="glass-panel max-w-lg w-full rounded-3xl p-6 sm:p-8 border border-amber-500/40 shadow-2xl relative text-center"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-bold">
                  Order Successfully Processed!
                </span>
                <h2 className="text-2xl font-bold font-serif text-stone-100 mt-1">
                  Thank You, {confirmedOrderSummary.name}!
                </h2>
                <p className="text-xs text-stone-400 mt-1">
                  The kitchen has received your order and started cooking.
                </p>

                {/* Reference Box */}
                <div className="mt-5 p-4 rounded-2xl bg-stone-900 border border-stone-800 text-left space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-stone-400">Order Reference:</span>
                    <span className="font-mono font-bold text-amber-400">{orderReference}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-stone-400">Estimated Ready Time:</span>
                    <span className="font-medium text-stone-200">
                      {confirmedOrderSummary.fulfillment === 'pickup' ? '20–30 Minutes' : '35–45 Minutes'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-stone-400">Collection Location:</span>
                    <span className="text-stone-200">219 Boorowa St, Young NSW</span>
                  </div>
                  <div className="flex justify-between items-center text-xs pt-2 border-t border-stone-800">
                    <span className="text-stone-300 font-semibold">Total Paid / Due:</span>
                    <span className="font-mono font-bold text-amber-400 text-sm">
                      ${confirmedOrderSummary.total.toFixed(2)} AUD
                    </span>
                  </div>
                </div>

                {/* Action CTA */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      setOrderConfirmed(false);
                      onNavigateToHome();
                    }}
                    className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-colors"
                  >
                    Return to Home
                  </button>
                  <button
                    onClick={() => {
                      setOrderConfirmed(false);
                      onNavigateToMenu();
                    }}
                    className="flex-1 py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800 text-xs font-semibold transition-colors"
                  >
                    Order Another Meal
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
