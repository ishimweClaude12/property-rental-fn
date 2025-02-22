import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Booking } from '../../models/booking.types';
import { BookingService } from '../../services/booking/booking.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-my-guests',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './my-guests.component.html',
  styleUrl: './my-guests.component.scss',
})
export class MyGuestsComponent implements OnInit {
  data$!: Observable<Booking[]>;

  constructor(
    private readonly bookingService: BookingService,
    private readonly toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.data$ = this.bookingService.getReservationHistory().pipe(
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
        this.toastr.error(
          'Failed to cancel this reservation. Please try again.'
        );
      },
    });
  }

  approveBooking(id: string): void {
    this.bookingService.approveReservation(id).subscribe({
      next: (response) => {
        this.toastr.success(
          response.message ?? 'Reservation Approved successfully'
        );

        this.data$ = this.data$.pipe(
          map((data) =>
            data.map((r) =>
              r.booking_id === id ? { ...r, booking_status: 'APPROVED' } : r
            )
          )
        );
      },
      error: (error) => {
        this.toastr.error(
          'Failed to approve this reservation. Please try again.'
        );
      },
    });
  }
}
