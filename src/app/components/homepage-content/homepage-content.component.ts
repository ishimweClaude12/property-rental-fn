import {
  closeDropdown,
  toggleDropdown,
} from './../../store/counter/app/app.actions';
import {
  afterNextRender,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { CardComponent } from '../card/card.component';
import { PropertyService } from '../../services/property/property.service';
import { Property } from '../../models/property-response.model';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../services/loader/loading.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/counter/app/app.reducer';
@Component({
  selector: 'app-homepage-content',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './homepage-content.component.html',
  styleUrl: './homepage-content.component.scss',
})
export class HomepageContentComponent implements OnInit {
  properties = signal<Property[]>([]);
  loadingService = inject(LoadingService);
  page = 1;
  pageSize = 4;

  constructor(
    private readonly propertyService: PropertyService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly store: Store<AppState>
  ) {
    afterNextRender(() => {
      this.loadProperties(this.page, this.pageSize);
    });
  }

  ngOnInit(): void {
    // Extract query parameters
    this.route.queryParams.subscribe((params) => {
      const token = params['token'];
      const user = params['user'];

      console.log('Token:', token);
      console.log('User:', user);

      if (token && user) {
        // Decode the user object
        const decodedUser = JSON.parse(decodeURIComponent(user));

        // Store token and user data in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(decodedUser));

        // Redirect to dashboard
        this.router.navigate(['/home/property']);
      }
    });
  }
  async loadProperties(page = 1, size = 1) {
    try {
      const properties = await this.propertyService.loadAllProperties(
        page,
        size
      );
      if (properties && properties.data.length > 0) {
        this.properties.set(properties.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  onToggleDropdown(): void {
    console.log('I got clicked');
    this.store.dispatch(closeDropdown());
  }

  showMore() {
    this.pageSize = this.pageSize * 2;
    this.loadProperties(this.page, this.pageSize);
  }
}
