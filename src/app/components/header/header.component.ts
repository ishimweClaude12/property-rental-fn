import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/counter/app/app.reducer';
import { selectDropdownState } from '../../store/counter/app/app.selectors';
import { CommonModule } from '@angular/common';
import * as appActions from '../../store/counter/app/app.actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  userStr = localStorage.getItem('user');
  user: {
    user_id: string;
    name: string;
    email: string;
    role: 'HOSTER' | 'RENTER';
    avatar: string | null;
  } = JSON.parse(this.userStr ?? '{}');

  dropdownState$ = this.store.select(selectDropdownState);

  toggleDropdown = false;
  constructor(
    private readonly router: Router,
    private readonly store: Store<AppState>
  ) {}
  navigateToCreateProperty() {
    this.router.navigate(['/home/create-property']);
  }

  onToggleDropdown(event: Event): void {
    event.stopPropagation();
    this.store.dispatch(appActions.toggleDropdown());
  }

  logOut(): void {
    localStorage.clear();
    this.router.navigate(['/sign-in']);
  }

  onCloseDropDown(event: Event): void {
    event.stopPropagation();
    this.store.dispatch(appActions.closeDropdown());
  }

  navigateToBooking(): void {
    this.router.navigate(['/home/host-booking']);
  }

  navigateToMyGuests(): void {
    this.router.navigate(['/home/my-guests']);
  }

  navigateToHome(event: Event) {
    event.stopPropagation();
    this.router.navigate(['/home']);
  }
}
