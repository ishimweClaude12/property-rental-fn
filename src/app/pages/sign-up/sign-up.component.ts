import { Component } from '@angular/core';
import { AuthLayoutComponent } from '../../components/auth-layout/auth-layout.component';
import { InputComponent } from '../../components/input/input.component';
import { ButtonComponent } from '../../components/button/button.component';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { UserInterface } from '../../models/auth.interfaces';
import { ToastrService } from 'ngx-toastr';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    AuthLayoutComponent,
    InputComponent,
    ButtonComponent,
    ReactiveFormsModule,
    LoaderComponent,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  passwordVisible: boolean = false;
  ConfirmPasswordVisible = false;
  isLoading: boolean = false;
  error: string = '';
  selectedFile: File | null = null; // Store the selected file
  form: FormGroup = this.fb.group(
    {
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      avatar: [File, [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/),
        ],
      ],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: this.passwordMatchValidator }
  );

  constructor(
    private router: Router,
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly toastr: ToastrService
  ) {}

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.selectedFile = file;
  }
  showPassword(event: Event) {
    event.preventDefault();
    this.passwordVisible = !this.passwordVisible;
  }

  navigateToLogin(): void {
    this.router.navigate(['/sign-in']);
  }

  showConfirmPassword(event: Event) {
    event.preventDefault();
    this.ConfirmPasswordVisible = !this.ConfirmPasswordVisible;
  }

  signUp(): void {
    if (this.form.invalid || !this.selectedFile) {
      this.form.markAllAsTouched();
      if (!this.selectedFile) {
        this.error = 'Profile image is required';
      }
    } else {
      const { name, email, phoneNumber, password } = this.form.value;
      this.isLoading = true;

      const user: UserInterface = {
        name,
        email,
        phoneNumber,
        avatar: this.selectedFile, // Use the selected file
        password,
        confirmPassword: this.form.get('confirmPassword')?.value,
      };

      this.authService.signUp(user).subscribe(
        (res) => {
          this.isLoading = false;
          const token = res.token;
          localStorage.setItem('token', token ?? '');
          this.router.navigate(['/sign-in']);
          this.toastr.success('Registration successful', 'Success');
        },
        (err) => {
          this.isLoading = false;
          this.error = err.error.message;
        }
      );
    }
  }
  isControleInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);

    if (!control) {
      return true;
    } else if (
      controlName === 'confirmPassword' &&
      this.form.errors?.['passwordMismatch']
    ) {
      return true;
    }
    return control?.invalid && control?.touched ? true : false;
  }

  continueWithGoogle(): void {
    this.authService.continueWithGoogle();
  }
}
