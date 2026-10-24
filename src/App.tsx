import React, { useState } from 'react';
import { Page, MenuItem, CartItem } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ChatbotWidget } from './components/ChatbotWidget';
import { CartDrawer } from './components/CartDrawer';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { OrderCheckoutPage } from './pages/OrderCheckoutPage';
import { ReservationPage } from './pages/ReservationPage';
import { ContactPage } from './pages/ContactPage';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ShoppingBag } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cart operations
  const handleAddToCart = (item: MenuItem) => {
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.menuItem.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.menuItem.id === item.id
            ? { ...ci, quantity: ci.quantity + 1 }
            : ci
        );
      }
      return [...prev, { menuItem: item, quantity: 1 }];
    });

    // Trigger toast notification
    setToastMessage(`Added "${item.name}" to your bag`);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((ci) => {
          if (ci.menuItem.id === id) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter((ci): ci is CartItem => ci !== null)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.menuItem.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col justify-between selection:bg-amber-500 selection:text-stone-950 font-sans">
      
      {/* Navigation Header */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={navigateTo}
        cartCount={totalCartCount}
        openCartDrawer={() => setIsCartDrawerOpen(true)}
      />

      {/* Main Content with Page Transitions */}
      <main className="flex-1 relative">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <HomePage
                onNavigate={navigateTo}
                onAddToCart={handleAddToCart}
              />
            </motion.div>
          )}

          {currentPage === 'menu' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <MenuPage
                onAddToCart={handleAddToCart}
                onNavigateToOrder={() => navigateTo('order')}
                cartCount={totalCartCount}
              />
            </motion.div>
          )}

          {currentPage === 'order' && (
            <motion.div
              key="order"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <OrderCheckoutPage
                cartItems={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onClearCart={handleClearCart}
                onNavigateToMenu={() => navigateTo('menu')}
                onNavigateToHome={() => navigateTo('home')}
              />
            </motion.div>
          )}

          {currentPage === 'reservations' && (
            <motion.div
              key="reservations"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <ReservationPage
                onNavigateToHome={() => navigateTo('home')}
                onNavigateToMenu={() => navigateTo('menu')}
              />
            </motion.div>
          )}

          {currentPage === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <ContactPage
                onNavigateToReservations={() => navigateTo('reservations')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating 24/7 AI Chatbot Assistant */}
      <ChatbotWidget onNavigate={navigateTo} />

      {/* Slide-over Cart Quick Drawer */}
      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onNavigateToCheckout={() => navigateTo('order')}
      />

      {/* Ephemeral Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-6 z-50 glass-panel px-4 py-3 rounded-2xl border border-amber-500/40 text-xs text-stone-100 flex items-center gap-2.5 shadow-2xl"
          >
            <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Check className="w-3 h-3" />
            </div>
            <span>{toastMessage}</span>
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="ml-2 text-amber-400 font-semibold underline hover:text-amber-300"
            >
              View Bag
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Deep Responsive Footer */}
      <Footer setCurrentPage={navigateTo} />
    </div>
  );
}
