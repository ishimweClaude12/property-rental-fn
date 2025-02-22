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

  ngOnInit(): void {
    console.log(this.property().propertyImages[0]?.url ?? '');
  }
  image = computed(() => {
    const extractedImage = this.property().propertyImages[0]?.url ?? '';
    const removedDot = extractedImage.slice(1);
    return this.env.imageRoot + extractedImage;
  });

  goToPropertyDetails(id: string): void {
    this.router.navigate(['home/property', id]);
  }
}
