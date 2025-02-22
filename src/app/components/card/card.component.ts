import { Component, computed, inject, input, OnInit } from '@angular/core';
import { Property } from '../../models/property-response.model';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { CardSkeletonComponent } from '../card-skeleton/card-skeleton.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CardSkeletonComponent],
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
    return extractedImage;
  });

  goToPropertyDetails(id: string): void {
    this.router.navigate(['home/property', id]);
  }
}
