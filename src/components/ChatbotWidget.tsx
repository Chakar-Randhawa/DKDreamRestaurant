import React, { useState, useRef, useEffect } from 'react';
import { Page, ChatMessage } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantInfo';
import { MessageSquare, X, Send, Bot, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatbotWidgetProps {
  onNavigate: (page: Page) => void;
}

export const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: "Sawasdee khrap & welcome to DK Dream Kitchen! I'm your virtual concierge. How can I help you today in Young, NSW?",
      timestamp: 'Just now',
    },
    {
      id: 'welcome-2',
      sender: 'assistant',
      text: "We serve authentic Thai wok dishes, Western pub classics, and our new 2026 Uji matcha & boba lineup. We're open Mon–Sat 5:00 PM – 9:00 PM.",
      timestamp: 'Just now',
      actionPrompt: {
        label: 'View Digital Menu',
        page: 'menu',
      },
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const quickPrompts = [
    { label: "What are your hours?", query: "What are your opening hours and days?" },
    { label: "Where in Young are you?", query: "Where are you located?" },
    { label: "Book a table", query: "Can I make a table reservation?" },
    { label: "Boba & Matcha drinks", query: "Tell me about your Boba and Matcha lineup" },
    { label: "Gluten-free options", query: "Do you offer gluten-free or vegetarian dishes?" },
  ];

  const generateBotResponse = (userText: string): { text: string; actionPrompt?: { label: string; page: Page } } => {
    const q = userText.toLowerCase();

    if (q.includes('hour') || q.includes('time') || q.includes('open') || q.includes('close')) {
      return {
        text: `We are open Monday through Saturday from 5:00 PM to 9:00 PM (kitchen closes at 8:45 PM). We are closed on Sundays for preparation and rest.`,
      };
    }

    if (q.includes('where') || q.includes('location') || q.includes('address') || q.includes('street')) {
      return {
        text: `DK Dream Kitchen is located at 219 Boorowa St, Young NSW 2594, right in the center of town with plenty of street parking nearby.`,
        actionPrompt: {
          label: 'View Location & Map',
          page: 'contact',
        },
      };
    }

    if (q.includes('book') || q.includes('reserv') || q.includes('table') || q.includes('seat')) {
      return {
        text: `We'd love to host you! You can reserve your table online in seconds. Dinner seatings run from 5:00 PM to 8:30 PM with options for window or booth seating.`,
        actionPrompt: {
          label: 'Open Table Booking Form',
          page: 'reservations',
        },
      };
    }

    if (q.includes('matcha') || q.includes('boba') || q.includes('drink') || q.includes('tea')) {
      return {
        text: `Our 2026 Boba & Matcha Series is made with authentic ceremonial Uji matcha! Best-sellers include our Layered Strawberry Matcha Latte ($8.90) and Brown Sugar Tiger Boba Fresh Milk ($8.50).`,
        actionPrompt: {
          label: 'Explore Matcha Lineup',
          page: 'menu',
        },
      };
    }

    if (q.includes('pad thai') || q.includes('thai') || q.includes('curry') || q.includes('drunken') || q.includes('noodle')) {
      return {
        text: `Our Thai wok dishes are cooked fresh to order with intense wok hei! You'll love our Authentic King Prawn Pad Thai ($24.50), Pad Kee Mao (Drunken Noodles, $23.90), and Royal Thai Green Curry.`,
        actionPrompt: {
          label: 'See Thai Dishes',
          page: 'menu',
        },
      };
    }

    if (q.includes('schnitzel') || q.includes('parmi') || q.includes('parmigiana') || q.includes('western') || q.includes('burger')) {
      return {
        text: `Our Western comfort menu features our house favorite Golden Crispy Chicken Schnitzel ($25.00) and DK Signature Chicken Parmigiana ($27.50), served with chips, salad, and gravy!`,
        actionPrompt: {
          label: 'Order Western Classics',
          page: 'menu',
        },
      };
    }

    if (q.includes('gluten') || q.includes('vegetar') || q.includes('vegan') || q.includes('dairy') || q.includes('diet')) {
      return {
        text: `Yes! Many dishes like our Pad Thai, Massaman Beef, and Green Curry can be made 100% Gluten-Free. We also have vegetarian spring rolls, Napolitana pasta, and dairy-free oat milk matcha options.`,
        actionPrompt: {
          label: 'Browse Menu Tags',
          page: 'menu',
        },
      };
    }

    if (q.includes('order') || q.includes('takeaway') || q.includes('pickup') || q.includes('delivery')) {
      return {
        text: `You can order directly through our website! Pickup orders are typically ready in 20-30 minutes at our front counter. Local Young delivery is also available.`,
        actionPrompt: {
          label: 'Start Online Order',
          page: 'order',
        },
      };
    }

    if (q.includes('phone') || q.includes('call') || q.includes('contact')) {
      return {
        text: `You can call our team directly at ${RESTAURANT_INFO.phone} during opening hours or email us at ${RESTAURANT_INFO.email}.`,
        actionPrompt: {
          label: 'Go to Contact Page',
          page: 'contact',
        },
      };
    }

    // Default helpful fallback
    return {
      text: `Thanks for asking! At DK Dream Kitchen in Young, we pride ourselves on authentic Thai recipes, hearty Western comfort foods, and fresh Boba drinks. You can browse our digital menu, book a table, or call us directly!`,
      actionPrompt: {
        label: 'Explore Our Menu',
        page: 'menu',
      },
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateBotResponse(text);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: response.text,
        timestamp: 'Just now',
        actionPrompt: response.actionPrompt,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Chat Trigger Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="relative group p-4 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold shadow-xl shadow-amber-500/25 flex items-center gap-3 border border-amber-400/40"
          aria-label="Open 24/7 AI Restaurant Assistant"
        >
          <MessageSquare className="w-6 h-6 text-stone-950 fill-stone-950" />
          <span className="hidden sm:inline text-xs font-bold tracking-tight">
            Chat with DK Assistant
          </span>
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-400"></span>
          </span>
        </motion.button>
      )}

      {/* Glassmorphic Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="w-[90vw] sm:w-[380px] h-[540px] max-h-[85vh] rounded-2xl glass-panel shadow-2xl flex flex-col overflow-hidden border border-amber-500/20"
          >
            {/* Header */}
            <div className="bg-stone-900/90 px-4 py-3.5 border-b border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-stone-950 font-bold">
                  <Bot className="w-4 h-4 text-stone-950" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-stone-100 flex items-center gap-1.5">
                    <span>DK Assistant</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  </h3>
                  <p className="text-[11px] text-stone-400">Young NSW · Virtual Concierge</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-stone-400 hover:text-stone-100 hover:bg-stone-800 rounded-lg transition-colors"
                aria-label="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-stone-950/40 text-xs">
              {messages.map((msg) => {
                const isBot = msg.sender === 'assistant';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                        isBot
                          ? 'bg-stone-800 text-stone-200 border border-stone-700/60 rounded-tl-sm'
                          : 'bg-amber-500 text-stone-950 font-medium rounded-tr-sm'
                      }`}
                    >
                      <p>{msg.text}</p>
                    </div>

                    {/* Action Prompt Button inside Bot response */}
                    {isBot && msg.actionPrompt && (
                      <button
                        onClick={() => {
                          onNavigate(msg.actionPrompt!.page);
                          setIsOpen(false);
                        }}
                        className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-medium text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 px-2.5 py-1 rounded-lg transition-colors"
                      >
                        <span>{msg.actionPrompt.label}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}

                    <span className="text-[10px] text-stone-500 mt-0.5 px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex items-center gap-1.5 bg-stone-800/80 px-3 py-2 rounded-xl w-16 border border-stone-700/50">
                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce"></span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts Carousel */}
            <div className="px-3 py-2 bg-stone-900/60 border-t border-stone-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt.query)}
                  className="px-2.5 py-1 text-[11px] whitespace-nowrap rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-amber-400 border border-stone-700/60 transition-colors shrink-0"
                >
                  {prompt.label}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-stone-900 border-t border-stone-800 flex items-center gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about menu, hours, booking..."
                className="flex-1 bg-stone-950 border border-stone-800 text-stone-100 placeholder-stone-500 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-500 transition-colors"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim()}
                className="p-2.5 rounded-xl bg-amber-500 disabled:opacity-40 text-stone-950 hover:bg-amber-400 transition-colors shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
