
import { Booking, ServiceRequest, PrivacySettings } from '@/types/booking';

export const mockBookings: Booking[] = [
  {
    id: '1',
    serviceId: '1',
    serviceTitle: 'Complete Residential Cleaning',
    providerId: '1',
    providerName: 'Maria Silva',
    clientId: 'client1',
    clientName: 'John Doe',
    date: '2025-02-15',
    time: '10:00',
    status: 'confirmed',
    location: 'Zurich, Switzerland',
    notes: 'Please bring cleaning supplies',
    price: 120,
    currency: 'CHF',
  },
  {
    id: '2',
    serviceId: '2',
    serviceTitle: 'Residential Electrical Repairs',
    providerId: '2',
    providerName: 'João Santos',
    clientId: 'client1',
    clientName: 'John Doe',
    date: '2025-02-20',
    time: '14:00',
    status: 'pending',
    location: 'Geneva, Switzerland',
    price: 85,
    currency: 'CHF',
  },
];

export const mockServiceRequests: ServiceRequest[] = [
  {
    id: '1',
    title: 'Need a plumber for bathroom renovation',
    description: 'Looking for an experienced plumber to help with a complete bathroom renovation. Need to replace pipes, install new fixtures, and ensure everything is up to code.',
    category: 'Plumber',
    budget: 500,
    currency: 'CHF',
    location: 'Zurich, Switzerland',
    preferredDate: '2025-03-01',
    preferredTime: '09:00',
    clientId: 'client1',
    clientName: 'John Doe',
    status: 'open',
    createdAt: '2025-01-20T10:00:00Z',
    bids: [
      {
        id: 'bid1',
        requestId: '1',
        providerId: 'provider1',
        providerName: 'Carlos Mendes',
        providerRating: 4.8,
        providerVerified: true,
        providerPremium: true,
        price: 480,
        currency: 'CHF',
        message: 'I have 15 years of experience in bathroom renovations. I can start on your preferred date.',
        estimatedDuration: '2-3 days',
        createdAt: '2025-01-21T08:00:00Z',
      },
    ],
  },
];

export const defaultPrivacySettings: PrivacySettings = {
  showPhone: true,
  showEmail: true,
  showLocation: true,
  allowMessages: true,
  allowNotifications: true,
  dataSharing: false,
};
