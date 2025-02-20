import { Component } from '@angular/core';
import { AuthLayoutComponent } from '../../components/auth-layout/auth-layout.component';
import { InputComponent } from '../../components/input/input.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [AuthLayoutComponent, InputComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  password: any;
  showPassword(event: Event) {
    // event.preventDefault();
    console.log('show password');
  }
}
