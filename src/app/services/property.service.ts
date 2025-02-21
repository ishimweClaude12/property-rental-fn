import { environment } from './../../environments/environment';
import { inject, Injectable } from '@angular/core';
import { PropertyResponse } from '../models/property-response.model';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  http = inject(HttpClient);
  env = environment;
  constructor() {}

  loadAllProperties = async (): Promise<PropertyResponse | undefined> => {
    const properties$ = this.http.get<PropertyResponse>(
      `${this.env.apiRoot}/property?page=1&limit=2`
    );

    const response = await firstValueFrom(properties$);
    return response;
  };
}
