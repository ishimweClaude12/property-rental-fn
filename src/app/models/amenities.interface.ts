export interface AmenityResponse<T> {
  status: string;
  message: string;
  data: T;
}

export type AmenityData = {
  propertyAmenity_id: string;
  property_id: string;
  amenity_id: number;
  deleted_at: string | null;
  status: string;
};
