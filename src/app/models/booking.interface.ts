export interface Booking {
  booking_id: string;
  property_id: string;
  renter_id: string;
  checkIn: string; // ISO date string
  checkOut: string; // ISO date string
  booking_status: string; // Define possible statuses
  totalPrice: number;
  guestCount: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  canceledAt?: string | null; // Nullable
  cancelReason?: string | null; // Nullable
  deleted_at?: string | null; // Nullable
  status: string; // Define possible statuses
}

export interface BookingRequest {
  property_id: string;
  checkIn: string; // ISO date string (YYYY-MM-DD)
  checkOut: string; // ISO date string (YYYY-MM-DD)
  guestCount: number;
}

export interface BookingResponse {
  success: boolean;
  message: string;
  data: Booking;
}
