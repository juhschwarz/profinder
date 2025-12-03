
import { Booking, ServiceRequest, PrivacySettings } from '@/types/booking';

// Empty bookings array - ready for user registrations
export const mockBookings: Booking[] = [];

// Empty service requests array - ready for user registrations
export const mockServiceRequests: ServiceRequest[] = [];

export const defaultPrivacySettings: PrivacySettings = {
  showPhone: true,
  showEmail: true,
  showLocation: true,
  allowMessages: true,
  allowNotifications: true,
  dataSharing: false,
};
