export type Page = 'home' | 'menu' | 'order' | 'reservations' | 'contact';

export interface MenuItem {
  id: string;
  name: string;
  thaiName?: string;
  category: 'thai' | 'western' | 'boba-matcha' | 'appetizers-desserts';
  price: number;
  description: string;
  tags: string[];
  spiceLevel?: 0 | 1 | 2 | 3;
  popular?: boolean;
  image: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  specialInstructions?: string;
  selectedOption?: string;
}

export interface ReservationData {
  name: string;
  phone: string;
  email: string;
  guests: number;
  date: string;
  timeSlot: string;
  seatingPreference: 'standard' | 'window' | 'booth' | 'quiet';
  specialOccasion?: string;
  notes?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  actionPrompt?: {
    label: string;
    page: Page;
  };
}
