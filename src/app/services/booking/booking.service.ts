import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking, BookingResponse } from '../../models/booking.types';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  http = inject(HttpClient);
  baseUrl: string = environment.apiRoot;

  constructor() {}

  getBookingHistory(): Observable<BookingResponse<Booking[]>> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return this.http.get<BookingResponse<Booking[]>>(
      `${this.baseUrl}/booking`,
      {
        headers,
      }
    );
  }

  cancelBooking(id: string): Observable<{ SUCCESS: boolean; message: string }> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return this.http.post<{ SUCCESS: boolean; message: string }>(
      `${this.baseUrl}/booking/${id}`,
      {},
      {
        headers,
      }
    );
  }

  getReservationHistory(): Observable<BookingResponse<Booking[]>> {
    const userStr = localStorage.getItem('user');

    const user: {
      user_id: string;
      name: string;
      email: string;
      role: 'HOSTER' | 'RENTER';
      avatar: string | null;
    } = JSON.parse(userStr ?? '');
    const token = localStorage.getItem('token');
    if (!token || !user) {
      throw new Error('No token found');
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return this.http.get<BookingResponse<Booking[]>>(
      `${this.baseUrl}/property/host/${user.user_id}`,
      {
        headers,
      }
    );
  }

  approveReservation(
    id: string
  ): Observable<{ SUCCESS: boolean; message: string }> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return this.http.put<{ SUCCESS: boolean; message: string }>(
      `${this.baseUrl}/booking/${id}`,
      {},
      {
        headers,
      }
    );
  }
}
