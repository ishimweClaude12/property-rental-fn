import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthLayoutComponent } from '../../components/auth-layout/auth-layout.component';
import { InputComponent } from '../../components/input/input.component';
import { ButtonComponent } from '../../components/button/button.component';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    AuthLayoutComponent,
    InputComponent,
    ButtonComponent,
    ReactiveFormsModule,
    LoaderComponent,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  passwordVisible: boolean = false;
  ConfirmPasswordVisible = false;
  error: string = '';
  isLoading: boolean = false;
  form: FormGroup = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/),
        ],
      ],
    
    },

  );

  constructor(
    private router: Router,
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly toastr: ToastrService
  ) {}
  showPassword(event: Event) {
    event.preventDefault();

    this.passwordVisible = !this.passwordVisible;
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  navigateToSignUp(): void {
    this.router.navigate(['/sign-up']);
  }

  showConfirmPassword(event: Event) {
    event.preventDefault();

    this.ConfirmPasswordVisible = !this.ConfirmPasswordVisible;
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

  signIn(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    const { email, password } = this.form.value;
    this.authService.signin(email, password).subscribe(
      (data) => {
        this.isLoading = false;
        const token = data.token;
        localStorage.setItem('token', token ?? '');
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('role', data?.user?.role ?? '');
        this.toastr.success(data.message);
        this.router.navigate(['/home']);
      },
      (error) => {
        this.isLoading = false;
        this.error = error.error.message;
      }
    );
  }

  signInWithGoogle(): void {
    this.authService.continueWithGoogle();
  }
}
