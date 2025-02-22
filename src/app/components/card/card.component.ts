import { Component, computed, inject, input, OnInit } from '@angular/core';
import { Property } from '../../models/property-response.model';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  property = input.required<Property>();
  env = environment;
  router = inject(Router);

  image = computed(() => {
    const extractedImage = this.property().propertyImages[0]?.url ?? '';
    console.log({
      extractedImage: extractedImage,
      'Whole image': this.env.imgRoot + extractedImage,
    });
    return this.env.imgRoot + extractedImage;
  });

  goToPropertyDetails(id: string): void {
    this.router.navigate(['home/property', id]);
  }
}
