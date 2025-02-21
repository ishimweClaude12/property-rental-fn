import { afterNextRender, Component, inject, signal } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { PropertyService } from '../../services/property/property.service';
import { Property } from '../../models/property-response.model';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../services/loader/loading.service';

@Component({
  selector: 'app-homepage-content',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './homepage-content.component.html',
  styleUrl: './homepage-content.component.scss',
})
export class HomepageContentComponent {
  properties = signal<Property[]>([]);
  loadingService = inject(LoadingService);
  page = 1;
  pageSize = 4;

  constructor(private readonly propertyService: PropertyService) {
    afterNextRender(() => {
      this.loadProperties(this.page, this.pageSize);
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

  showMore() {
    this.pageSize = this.pageSize * 2;
    this.loadProperties(this.page, this.pageSize);
  }
}
