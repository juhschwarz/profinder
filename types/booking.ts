
export interface Booking {
  id: string;
  serviceId: string;
  serviceTitle: string;
  providerId: string;
  providerName: string;
  clientId: string;
  clientName: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  location: string;
  notes?: string;
  price: number;
  currency: string;
}

export interface ServiceRequest {
  id: string;
  title: string;
  description: string;
  category: string;
  budget: number;
  currency: string;
  location: string;
  preferredDate?: string;
  preferredTime?: string;
  clientId: string;
  clientName: string;
  status: 'open' | 'in_progress' | 'closed';
  createdAt: string;
  bids: Bid[];
}

export interface Bid {
  id: string;
  requestId: string;
  providerId: string;
  providerName: string;
  providerRating: number;
  providerVerified: boolean;
  providerPremium: boolean;
  price: number;
  currency: string;
  message: string;
  estimatedDuration: string;
  createdAt: string;
}

export interface PrivacySettings {
  showPhone: boolean;
  showEmail: boolean;
  showLocation: boolean;
  allowMessages: boolean;
  allowNotifications: boolean;
  dataSharing: boolean;
}
