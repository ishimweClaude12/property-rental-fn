import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  http = inject(HttpClient);
  env = environment;
  constructor() {}

  createBooking = async () => {}
}
