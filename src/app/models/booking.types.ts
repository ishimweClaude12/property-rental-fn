export type Booking = {
  booking_id: string;
  property_id: string;
  renter_id: string;
  checkIn: string; // ISO date string
  checkOut: string; // ISO date string
  booking_status: 'PENDING' | 'CANCELED' | 'APPROVED'; // Example statuses
  totalPrice: number;
  guestCount: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  canceledAt: string | null; // ISO date string or null
  cancelReason: string | null;
  deleted_at: string | null; // ISO date string or null
  status: 'ACTIVE' | 'INACTIVE'; // Example statuses
  property: {
    property_id: string;
    title: string;
    description: string;
    pricePerNight: number;
    location: string;
    host_id: string;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    maxGuests: number;
    bathrooms: number;
    latitude: number;
    longitude: number;
    bedrooms: number;
    deleted_at: string | null; // ISO date string or null
    status: 'ACTIVE' | 'INACTIVE'; // Example statuses
  };
  hoster: {
    user_id: string;
    email: string;
    name: string;
    avatar: string | null;
    role: 'HOSTER' | 'RENTER'; // Example roles
    google_id: string | null;
    isVerified: boolean;
    phoneNumber: string | null;
    password: string;
    password_changed_at: string; // ISO date string
    password_reset_experis_in: string; // ISO date string
    password_reset_token: string | null;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    deleted_at: string | null; // ISO date string or null
    status: 'ACTIVE' | 'DELETED'; // Example statuses
  };
};

export interface BookingResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
