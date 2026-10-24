import React, { useState, useMemo } from 'react';
import { MenuItem, Page } from '../types';
import { MENU_ITEMS, CATEGORIES } from '../data/menuData';
import {
  Search,
  Filter,
  Check,
  Flame,
  ShoppingBag,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MenuPageProps {
  onAddToCart: (item: MenuItem) => void;
  onNavigateToOrder: () => void;
  cartCount: number;
}

export const MenuPage: React.FC<MenuPageProps> = ({
  onAddToCart,
  onNavigateToOrder,
  cartCount,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDietaryFilter, setSelectedDietaryFilter] = useState<string>('all');
  const [addedItemIds, setAddedItemIds] = useState<string[]>([]);

  const handleAdd = (item: MenuItem) => {
    onAddToCart(item);
    setAddedItemIds((prev) => [...prev, item.id]);
    setTimeout(() => {
      setAddedItemIds((prev) => prev.filter((id) => id !== item.id));
    }, 1500);
  };

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;

      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.thaiName && item.thaiName.includes(searchQuery));

      const matchesDietary =
        selectedDietaryFilter === 'all' ||
        (selectedDietaryFilter === 'gf' &&
          item.tags.some((t) => t.toLowerCase().includes('gluten-free'))) ||
        (selectedDietaryFilter === 'veg' &&
          item.tags.some((t) => t.toLowerCase().includes('vegetarian'))) ||
        (selectedDietaryFilter === 'popular' && item.popular);

      return matchesCategory && matchesSearch && matchesDietary;
    });
  }, [selectedCategory, searchQuery, selectedDietaryFilter]);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DK Dream Kitchen · Young NSW</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-100 tracking-tight">
            Digital Image Menu
          </h1>
          <p className="mt-3 text-stone-400 text-sm sm:text-base leading-relaxed">
            Authentic Thai wok dishes, hearty Western comfort staples, and our custom hand-whisked 2026 Boba & Matcha creations. Add dishes directly to your takeaway or dine-in order.
          </p>
        </div>

        {/* Filter Bar & Controls */}
        <div className="mb-8 space-y-4">
          
          {/* Horizontal Category Tab Bar with Sliding Motion Indicator */}
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-2 no-scrollbar gap-1.5 p-1.5 bg-stone-900/90 rounded-2xl border border-stone-800/80 max-w-4xl mx-auto">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`relative px-4 py-2 text-xs sm:text-sm font-medium rounded-xl whitespace-nowrap shrink-0 transition-colors ${
                    isSelected
                      ? 'text-stone-950 font-bold'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeCategoryTab"
                      className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl shadow-md"
                      transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search & Dietary Filters Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto pt-2">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search Pad Thai, Schnitzel, Matcha..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-stone-900/90 border border-stone-800 rounded-xl pl-9 pr-4 py-2 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Dietary quick filter buttons */}
            <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              <span className="text-xs text-stone-500 hidden md:inline flex items-center gap-1 mr-1">
                <Filter className="w-3 h-3" /> Filter:
              </span>
              <button
                onClick={() => setSelectedDietaryFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedDietaryFilter === 'all'
                    ? 'bg-stone-800 text-amber-400 border border-amber-500/30'
                    : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                }`}
              >
                All Diets
              </button>
              <button
                onClick={() => setSelectedDietaryFilter('gf')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedDietaryFilter === 'gf'
                    ? 'bg-stone-800 text-amber-400 border border-amber-500/30'
                    : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                }`}
              >
                Gluten-Free
              </button>
              <button
                onClick={() => setSelectedDietaryFilter('veg')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedDietaryFilter === 'veg'
                    ? 'bg-stone-800 text-amber-400 border border-amber-500/30'
                    : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                }`}
              >
                Vegetarian
              </button>
              <button
                onClick={() => setSelectedDietaryFilter('popular')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedDietaryFilter === 'popular'
                    ? 'bg-stone-800 text-amber-400 border border-amber-500/30'
                    : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                }`}
              >
                Favorites
              </button>
            </div>
          </div>
        </div>

        {/* Digital Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              const isAdded = addedItemIds.includes(item.id);
              return (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-2xl glass-card border border-stone-800/80 overflow-hidden flex flex-col justify-between group hover:border-amber-500/40 transition-all shadow-xl"
                >
                  {/* Food Image Container */}
                  <div className="relative h-56 sm:h-52 w-full overflow-hidden bg-stone-800">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Price in AUD */}
                    <div className="absolute top-3 right-3 bg-stone-950/85 backdrop-blur-md px-3 py-1 rounded-xl text-amber-400 font-mono text-sm font-bold border border-white/10 shadow-lg">
                      ${item.price.toFixed(2)} <span className="text-[10px] text-stone-400">AUD</span>
                    </div>

                    {/* Spice Level Indicator */}
                    {item.spiceLevel !== undefined && item.spiceLevel > 0 && (
                      <div className="absolute top-3 left-3 bg-stone-950/80 backdrop-blur-md px-2.5 py-1 rounded-xl flex items-center gap-1 border border-white/10">
                        {[...Array(item.spiceLevel)].map((_, i) => (
                          <Flame key={i} className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Dietary & Category Tags (No pill spam, clean text metadata) */}
                      <div className="flex items-center gap-2 text-xs text-stone-400 mb-1.5 font-medium">
                        {item.tags.map((tag, idx) => (
                          <React.Fragment key={tag}>
                            <span>{tag}</span>
                            {idx < item.tags.length - 1 && (
                              <span aria-hidden="true" className="text-stone-600">·</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>

                      {/* Dish Title & Thai Subname */}
                      <h3 className="text-lg font-bold font-serif text-stone-100 group-hover:text-amber-400 transition-colors">
                        {item.name}
                      </h3>
                      {item.thaiName && (
                        <p className="text-xs text-amber-500/80 mt-0.5 font-sans">
                          {item.thaiName}
                        </p>
                      )}

                      {/* Description */}
                      <p className="mt-3 text-xs sm:text-sm text-stone-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Action Button: Add to Order */}
                    <div className="mt-5 pt-4 border-t border-stone-800/80 flex items-center justify-between gap-3">
                      <div className="text-stone-300 text-xs font-mono tabular-nums">
                        ${item.price.toFixed(2)} AUD
                      </div>

                      <button
                        onClick={() => handleAdd(item)}
                        className={`py-2 px-4 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                          isAdded
                            ? 'bg-emerald-500 text-stone-950'
                            : 'bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-stone-200 border border-stone-700/60'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added!</span>
                          </>
                        ) : (
                          <>
                            <span>Add to Order</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="py-16 text-center text-stone-400">
            <p className="text-base font-semibold text-stone-200">No dishes found matching your search</p>
            <p className="text-xs text-stone-500 mt-1">Try clearing your search terms or selecting another category.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedDietaryFilter('all');
              }}
              className="mt-4 px-4 py-2 bg-stone-800 hover:bg-stone-700 text-amber-400 text-xs font-medium rounded-xl border border-stone-700"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Bottom Floating Order Callout if Cart has items */}
        {cartCount > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30">
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={onNavigateToOrder}
              className="px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold text-xs sm:text-sm shadow-2xl flex items-center gap-3 border border-amber-400/40"
            >
              <ShoppingBag className="w-4 h-4 text-stone-950" />
              <span>{cartCount} item{cartCount > 1 ? 's' : ''} in Bag · Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        )}

      </div>
    </div>
  );
};
