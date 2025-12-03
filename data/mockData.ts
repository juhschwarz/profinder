
import { Service, ServiceCategory, UserProfile } from '@/types/service';
import { i18n } from '@/locales/translations';

// Function to get translated categories
export const getServiceCategories = (): ServiceCategory[] => [
  { id: '1', name: i18n.t('categories.cleaning'), icon: 'cleaning-services', count: 0 },
  { id: '2', name: i18n.t('categories.repairs'), icon: 'build', count: 0 },
  { id: '3', name: i18n.t('categories.gardening'), icon: 'yard', count: 0 },
  { id: '4', name: i18n.t('categories.painting'), icon: 'format-paint', count: 0 },
  { id: '5', name: i18n.t('categories.electrician'), icon: 'electrical-services', count: 0 },
  { id: '6', name: i18n.t('categories.plumber'), icon: 'plumbing', count: 0 },
  { id: '7', name: i18n.t('categories.moving'), icon: 'local-shipping', count: 0 },
  { id: '8', name: i18n.t('categories.beauty'), icon: 'face', count: 0 },
  { id: '9', name: i18n.t('categories.photography'), icon: 'camera-alt', count: 0 },
  { id: '10', name: i18n.t('categories.lessons'), icon: 'school', count: 0 },
  { id: '11', name: i18n.t('categories.itTech'), icon: 'computer', count: 0 },
  { id: '12', name: i18n.t('categories.other'), icon: 'more-horiz', count: 0 },
];

// Static categories for backward compatibility
export const serviceCategories: ServiceCategory[] = [
  { id: '1', name: 'Cleaning', icon: 'cleaning-services', count: 0 },
  { id: '2', name: 'Repairs', icon: 'build', count: 0 },
  { id: '3', name: 'Gardening', icon: 'yard', count: 0 },
  { id: '4', name: 'Painting', icon: 'format-paint', count: 0 },
  { id: '5', name: 'Electrician', icon: 'electrical-services', count: 0 },
  { id: '6', name: 'Plumber', icon: 'plumbing', count: 0 },
  { id: '7', name: 'Moving', icon: 'local-shipping', count: 0 },
  { id: '8', name: 'Beauty', icon: 'face', count: 0 },
  { id: '9', name: 'Photography', icon: 'camera-alt', count: 0 },
  { id: '10', name: 'Lessons', icon: 'school', count: 0 },
  { id: '11', name: 'IT & Tech', icon: 'computer', count: 0 },
  { id: '12', name: 'Other', icon: 'more-horiz', count: 0 },
];

// Empty services array - no example data
export const mockServices: Service[] = [];

export const currentUser: UserProfile = {
  id: '1',
  name: 'Maria Silva',
  email: 'maria.silva@email.com',
  phone: '+41 79 123 4567',
  location: 'Zurich, Switzerland',
  verified: true,
  premium: true,
  premiumExpiryDate: '2025-12-31',
  bio: 'Professional cleaner with 10 years of experience. Dedicated to leaving your home spotless!',
  skills: ['Residential Cleaning', 'Commercial Cleaning', 'Organization'],
  rating: 4.8,
  reviewCount: 127,
  servicesOffered: [],
};
