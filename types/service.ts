
export interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  currency: string;
  providerId: string;
  providerName: string;
  providerVerified: boolean;
  providerPremium: boolean;
  rating: number;
  reviewCount: number;
  imageUrl?: string;
  location: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location: string;
  verified: boolean;
  premium: boolean;
  premiumExpiryDate?: string;
  bio?: string;
  skills: string[];
  rating: number;
  reviewCount: number;
  servicesOffered: Service[];
}
