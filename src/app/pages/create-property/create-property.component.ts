import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../components/input/input.component';
import { AuthLayoutComponent } from '../../components/auth-layout/auth-layout.component';
import { ButtonComponent } from '../../components/button/button.component';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { PropertyService } from '../../services/property/property.service';
import { Property } from '../../models/property-response.model';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-property',
  standalone: true,
  imports: [
    InputComponent,
    AuthLayoutComponent,
    ButtonComponent,
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent,
    CommonModule,
  ],
  templateUrl: './create-property.component.html',
  styleUrl: './create-property.component.scss',
})
export class CreatePropertyComponent {
  form: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', Validators.maxLength(500)],
    pricePerNight: ['', [Validators.required, Validators.min(0)]],
    location: ['', [Validators.required, Validators.maxLength(200)]],
    maxGuests: ['', [Validators.required, Validators.min(1)]],
    bathrooms: ['', [Validators.required, Validators.min(1)]],
    bedrooms: ['', [Validators.required, Validators.min(1)]],
    latitude: [
      '',
      [Validators.required, Validators.min(-90), Validators.max(90)],
    ],
    longitude: [
      '',
      [Validators.required, Validators.min(-180), Validators.max(180)],
    ],
  });

  error: string = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly propertyService: PropertyService,
    private readonly toastr: ToastrService,
    private readonly router: Router
  ) {}

  isControlInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return control ? control.invalid && control.touched : false;
  }

  createProperty(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const {
      title,
      description,
      pricePerNight,
      location,
      maxGuests,
      bathrooms,
      bedrooms,
      latitude,
      longitude,
    } = this.form.value;

    const property: Partial<Property> = {
      title,
      description,
      pricePerNight,
      location,
      maxGuests,
      bathrooms,
      bedrooms,
      latitude,
      longitude,
    };
    this.propertyService.createProperty(property).subscribe({
      next: (res) => {
   
        const propertyId = res.data?.property_id;
        this.toastr.success('Property created successfully');
        this.router.navigate(['/home/attach-images', propertyId]);
      },
      error: (error) => {
        this.error = error ?? 'An error occurred. Please try again later.';
      },
    });
  }

  next(): void {
    console.log('Next');
  }
}
