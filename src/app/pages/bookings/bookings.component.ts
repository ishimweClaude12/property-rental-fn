import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking/booking.service';
import { Booking } from '../../models/booking.types';
import { Observable, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.scss',
})
export class BookingsComponent implements OnInit {
  data$!: Observable<Booking[]>;

  constructor(
    private readonly bookingService: BookingService,
    private readonly toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.data$ = this.bookingService.getBookingHistory().pipe(
      map((response) => {
        console.log('response', response);
        return response.data;
      })
    );
  }

  cancelBooking(id: string): void {
    this.bookingService.cancelBooking(id).subscribe({
      next: (response) => {
        this.toastr.success(
          response.message ?? 'Reservation cancelled successfully'
        );

        this.data$ = this.data$.pipe(
          map((data) =>
            data.map((r) =>
              r.booking_id === id ? { ...r, booking_status: 'CANCELED' } : r
            )
          )
        );
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }
}
