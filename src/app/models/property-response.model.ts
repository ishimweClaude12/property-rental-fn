export interface PropertyImage {
  image_id: string;
  property_id: string;
  url: string;
  isPrimary: boolean;
  createdAt: string;
  deleted_at: string | null;
  status: string;
}

export interface Amenity {
  id: string;
  name: string;
  amenityCode: string;
}

export interface PropertyAmenity {
  propertyAmenity_id: string;
  property_id: string;
  amenity_id: string;
  deleted_at: string | null;
  status: string;
  aminty?: Amenity;
}

export interface Hoster {
  user_id: string;
  email: string;
  name: string;
  avatar: string | null;
  role: string;
  google_id: string | null;
  isVerified: boolean;
  phoneNumber: string | null;
  password: string;
  password_changed_at: string;
  password_reset_experis_in: string;
  password_reset_token: string | null;
  createdAt: string;
  updatedAt: string;
  deleted_at: string | null;
  status: string;
}

export interface Property {
  property_id: string;
  title: string;
  description: string;
  pricePerNight: number;
  location: string;
  host_id: string;
  createdAt: string;
  updatedAt: string;
  maxGuests: number;
  bathrooms: number;
  latitude: number;
  longitude: number;
  bedrooms: number;
  deleted_at: string | null;
  status: string;
  hoster?: Hoster;
  propertyImages: PropertyImage[];
  propertyAmenities: PropertyAmenity[];
}

export interface PropertyResponse {
  success: boolean;
  message: string;
  data: Property[];
}
