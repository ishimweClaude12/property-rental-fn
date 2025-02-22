import { environment } from '../../../environments/environment';
import { inject, Injectable } from '@angular/core';
import {
  Property,
  PropertyResponse,
} from '../../models/property-response.model';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { ApiResponse } from '../../models/single-property-response.model';
import { AmenityData, AmenityResponse } from '../../models/amenities.interface';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  http = inject(HttpClient);
  env = environment;
  constructor() {}

  loadAllProperties = async (
    page = 1,
    size = 1
  ): Promise<PropertyResponse | undefined> => {
    const properties$ = this.http.get<PropertyResponse>(
      `${this.env.apiRoot}/property`
    );

    const response = await firstValueFrom(properties$);
    return response;
  };

  createProperty(
    property: Partial<Property>
  ): Observable<{ SUCCESS: boolean; message: string; data: Property }> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return this.http.post<{
      SUCCESS: boolean;
      message: string;
      data: Property;
    }>(`${this.env.apiRoot}/property`, property, { headers });
  }

  savePropertyImages(
    property_id: string,
    image: File[]
  ): Observable<{ SUCCESS: boolean; message: string }> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const formData = new FormData();
    image.forEach((image) => {
      formData.append('image', image);
    });

    formData.append('property_id', property_id);

    return this.http.post<{ SUCCESS: boolean; message: string }>(
      `${this.env.apiRoot}/images`,
      formData,
      { headers }
    );
  }

  getPropertyById = async (id: string): Promise<ApiResponse | undefined> => {
    const property$ = this.http.get<ApiResponse>(
      `${this.env.apiRoot}/property/${id}`
    );

    return firstValueFrom(property$);
  };

  addAmenities(
    property_id: string,
    amenity_id: string
  ): Observable<AmenityResponse<AmenityData>> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return this.http.post<AmenityResponse<AmenityData>>(
      `${this.env.apiRoot}/amenity`,
      { property_id, amenity_id },
      { headers }
    );
  }
}
