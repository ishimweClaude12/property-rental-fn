import { afterNextRender, Component, signal } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { PropertyService } from '../../services/property.service';
import { Property } from '../../models/property-response.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homepage-content',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './homepage-content.component.html',
  styleUrl: './homepage-content.component.scss',
})
export class HomepageContentComponent {
  properties = signal<Property[]>([]);

  constructor(private readonly propertyService: PropertyService) {
    afterNextRender(() => {
      this.loadProperties();
    });
  }
  async loadProperties() {
    try {
      const properties = await this.propertyService.loadAllProperties();
      if (properties && properties.data.length > 0) {
        this.properties.set(properties.data);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
