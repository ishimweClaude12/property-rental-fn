import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  BookingRequest,
  BookingResponse,
} from '../../models/booking.interface';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  http = inject(HttpClient);
  env = environment;
  constructor() {}

  createBooking = async (
    bookingRequest: BookingRequest
  ): Promise<BookingResponse> => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const booking$ = this.http.post<BookingResponse>(
      `${this.env.apiRoot}/booking`,
      bookingRequest,
      { headers }
    );

    return firstValueFrom(booking$);
  };
}
