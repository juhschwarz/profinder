
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

// Empty services array - ready for user registrations
export const mockServices: Service[] = [];

// Empty current user - ready for authentication
export const currentUser: UserProfile = {
  id: '',
  name: '',
  email: '',
  phone: '',
  location: '',
  verified: false,
  premium: false,
  premiumExpiryDate: '',
  bio: '',
  skills: [],
  rating: 0,
  reviewCount: 0,
  servicesOffered: [],
};
