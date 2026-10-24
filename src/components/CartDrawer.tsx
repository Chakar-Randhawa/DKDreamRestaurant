import React from 'react';
import { CartItem, Page } from '../types';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onNavigateToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onNavigateToCheckout,
}) => {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.menuItem.price * item.quantity,
    0
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm z-50"
          />

          {/* Slide-over panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-stone-900 border-l border-stone-800 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-5 border-b border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-stone-100 font-serif">Your Order Bag</h3>
                  <p className="text-xs text-stone-400">
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)} items selected
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 text-stone-400 hover:text-stone-100 hover:bg-stone-800 rounded-lg transition-colors"
                aria-label="Close cart drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Item List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-400">
                  <div className="w-16 h-16 rounded-full bg-stone-800/80 flex items-center justify-center mb-4 text-stone-600">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <p className="text-base font-medium text-stone-200">Your bag is empty</p>
                  <p className="text-xs text-stone-500 mt-1 max-w-xs">
                    Explore our authentic Thai dishes, Western classics, and artisan Matcha drinks.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-5 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs rounded-xl transition-colors"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.menuItem.id}
                    className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800/80 flex gap-3.5 items-center justify-between"
                  >
                    <img
                      src={item.menuItem.image}
                      alt={item.menuItem.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-lg object-cover bg-stone-800 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-stone-200 truncate">
                        {item.menuItem.name}
                      </h4>
                      <p className="text-xs text-amber-400 font-mono tabular-nums mt-0.5">
                        ${(item.menuItem.price * item.quantity).toFixed(2)} AUD
                      </p>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center rounded-lg bg-stone-800 border border-stone-700/60">
                          <button
                            onClick={() => onUpdateQuantity(item.menuItem.id, -1)}
                            className="p-1 hover:text-amber-400 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2 text-xs font-semibold tabular-nums text-stone-200">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.menuItem.id, 1)}
                            className="p-1 hover:text-amber-400 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.menuItem.id)}
                          className="p-1 text-stone-500 hover:text-red-400 transition-colors ml-auto"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Bottom Checkout Summary */}
            {cartItems.length > 0 && (
              <div className="p-5 border-t border-stone-800 bg-stone-950/80 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-stone-400">Order Subtotal</span>
                  <span className="text-stone-100 font-bold font-mono tabular-nums">
                    ${subtotal.toFixed(2)} AUD
                  </span>
                </div>
                <p className="text-[11px] text-stone-500">
                  Taxes and local pickup discounts calculated at checkout.
                </p>

                <button
                  onClick={() => {
                    onClose();
                    onNavigateToCheckout();
                  }}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
                >
                  <span>Go to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
