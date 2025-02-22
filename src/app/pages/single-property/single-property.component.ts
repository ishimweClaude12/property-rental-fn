import { CommonModule } from '@angular/common';
import {
  afterNextRender,
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from '../../models/property-response.model';
import { environment } from '../../../environments/environment';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MessageConversationService } from '../../services/message-conversation/message-conversation.service';
import { ConversationMessageErrorResponse } from '../../models/conversation-response.model';
import { HttpErrorResponse } from '@angular/common/http';
import { BookingService } from '../../services/booking/booking.service';
import { BookingRequest } from '../../models/booking.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-single-property',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './single-property.component.html',
  styleUrl: './single-property.component.scss',
})
export class SinglePropertyComponent implements OnInit {
  router = inject(Router);
  imageIndex = signal<number>(0);
  images = signal<string[] | undefined>(undefined);
  imageLength: number = 0;
  property = signal<Property | null>(null);
  env = environment;
  invalidBookingForm = signal<boolean>(false);

  route = inject(ActivatedRoute);
  fb = inject(FormBuilder);
  bookingService = inject(BookingService);
  toastr = inject(ToastrService);
  messageForm: FormGroup | undefined;
  bookingForm: FormGroup | undefined;
  messageConversationService = inject(MessageConversationService);

  constructor() {
    this.messageForm = this.fb.group({
      name: [''],
    });

    this.bookingForm = this.fb.group({
      checkIn: [''],
      checkOut: [''],
      guestCount: ['1'],
    });
    effect(() => {
      console.log('property', this.property());
      console.log(
        'property amenity',
        this.property()?.propertyAmenities[0]?.aminty
      );
      console.log('image index', this.imageIndex());
      console.log('images', this.images());
      console.log('image string', this.getImageString());
      console.log('form boolean: ', this.invalidBookingForm());
    });
  }

  ngOnInit(): void {
    this.property.set(this.route.snapshot.data['property']);
    if (this.property() && this.property()!.propertyImages) {
      for (const image of this.property()!.propertyImages) {
        this.images.set([...(this.images() || []), image.url]);
      }
    }
    this.imageLength = this.images()?.length || 0;
  }

  goBackHome() {
    this.router.navigate(['/home']);
  }

  getNextImage() {
    const nextIndex = this.imageIndex() + 1;
    if (nextIndex < this.imageLength) {
      this.imageIndex.set(this.imageIndex() + 1);
    } else {
      this.imageIndex.set(0);
    }
  }

  getPreviousImage() {
    const previousIndex = this.imageIndex() - 1;
    if (previousIndex >= 0 && previousIndex < this.imageLength) {
      this.imageIndex.set(this.imageIndex() - 1);
    } else {
      const images = this.images();
      this.imageIndex.set(images ? images.length - 1 : 0);
    }
  }

  getImageString = computed(() => {
    const images = this.images();
    if (images) return images[this.imageIndex()];
    return '';
  });

  async sendMessage() {
    const content = this.messageForm?.value.name;
    try {
      const response = await this.messageConversationService.postConversation(
        this.property()?.property_id || ''
      );
      const conversationId = response.data.conversation_id;
      if (conversationId) {
        try {
          const messageResponse =
            await this.messageConversationService.postMessage(
              conversationId,
              content
            );
          console.log('Message sent', messageResponse);
          this.toastr.success('Message sent');
        } catch (error) {
          console.error('Error posting message', error);
        }
      }
    } catch (error: unknown) {
      if (error instanceof HttpErrorResponse) {
        const errorResponse = error.error as ConversationMessageErrorResponse;
        if (error.status === 400 && errorResponse.success === false) {
          console.log('Conversation already exist');
          this.toastr.error(errorResponse.message);
        }
      }
    }
  }

  getNumberOfGuests() {
    const guests = this.bookingForm?.value.guests;
    if (guests) {
      return guests;
    }
    return;
  }

  async book() {
    console.log(this.bookingForm?.get('checkIn')?.value.length > 0);
    console.log('Booked values', this.bookingForm?.value);
    const formValues = this.bookingForm?.value;
    const formValuesToSend: BookingRequest = {
      property_id: this.property()?.property_id,
      ...formValues,
    };
    console.log('Booked values to send', formValuesToSend);
    if (
      this.bookingForm?.get('checkIn')?.value.length > 0 &&
      this.bookingForm?.get('checkOut')?.value.length > 0
    ) {
      try {
        this.invalidBookingForm.set(false);
        console.log('invalidBookingForm', this.invalidBookingForm());
        const response = await this.bookingService.createBooking(
          formValuesToSend
        );
        console.log('Booking response', response);
        this.toastr.success('Booking successful');
      } catch (error) {
        if (error instanceof HttpErrorResponse) {
          const errorResponse = error.error as ConversationMessageErrorResponse;
          if (error.status === 401 && errorResponse.success === false) {
            console.log('Conversation already exist', error);
            this.toastr.error(errorResponse.message);
          }
        }
      }
    } else {
      this.invalidBookingForm.set(true);
      console.log('invalidBookingForm', this.invalidBookingForm());
    }
  }
}
