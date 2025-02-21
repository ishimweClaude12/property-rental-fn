export interface PropertyImage {
  image_id: string;
  property_id: string;
  url: string;
  isPrimary: boolean;
  createdAt: string;
  deleted_at: string | null;
  status: string;
}

export interface PropertyAmenity {
  propertyAmenity_id: string;
  property_id: string;
  amenity_id: string;
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
  propertyImages: PropertyImage[];
  propertyAmenities: PropertyAmenity[];
}

export interface PropertyResponse {
  success: boolean;
  message: string;
  data: Property[];
}
