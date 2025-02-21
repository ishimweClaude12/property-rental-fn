import { Component, computed, input, OnInit } from '@angular/core';
import { Property } from '../../models/property-response.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  property = input.required<Property>();
  env = environment;

  ngOnInit(): void {
    console.log(this.property().propertyImages[0].url);
  }
  
  image = computed(() => {
    const extractedImage = this.property().propertyImages[0].url;
    const removedDot = extractedImage.slice(1);
    return this.env.imageRoot + removedDot;
  });
}
