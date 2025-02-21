import { environment } from '../../../environments/environment';
import { inject, Injectable } from '@angular/core';
import { PropertyResponse } from '../../models/property-response.model';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ApiResponse } from '../../models/single-property-response.model';

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
      `${this.env.apiRoot}/property?page=${page}&limit=${size}`
    );

    const response = await firstValueFrom(properties$);
    return response;
  };

  getPropertyById = async (id: string): Promise<ApiResponse | undefined> => {
    const property$ = this.http.get<ApiResponse>(
      `${this.env.apiRoot}/property/${id}`
    );

    return firstValueFrom(property$);
  };
}
