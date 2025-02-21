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

@Component({
  selector: 'app-create-property',
  standalone: true,
  imports: [
    InputComponent,
    AuthLayoutComponent,
    ButtonComponent,
    ReactiveFormsModule,
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

  constructor(private readonly fb: FormBuilder) {}

  isControlInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return control ? control.invalid && control.touched : false;
  }

  createProperty(): void {
    console.log(this.form.value);
  }

  next(): void {
    console.log('Next');
  }
}
