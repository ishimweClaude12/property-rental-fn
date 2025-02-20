import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthLayoutComponent } from '../../components/auth-layout/auth-layout.component';
import { InputComponent } from '../../components/input/input.component';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [AuthLayoutComponent, InputComponent, ButtonComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  passwordVisible: boolean = false;
  ConfirmPasswordVisible = false;
  constructor(private router: Router) {}
  showPassword(event: Event) {
    event.preventDefault();

    this.passwordVisible = !this.passwordVisible;
  }

  navigateToSignUp(): void {
    this.router.navigate(['/sign-up']);
  }

  showConfirmPassword(event: Event) {
    event.preventDefault();

    this.ConfirmPasswordVisible = !this.ConfirmPasswordVisible;
  }
}
