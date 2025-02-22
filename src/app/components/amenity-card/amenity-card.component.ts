import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { Amenity } from '../../pages/add-amenities/add-amenities.component';

@Component({
  selector: 'app-amenity-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './amenity-card.component.html',
  styleUrl: './amenity-card.component.scss',
})
export class AmenityCardComponent {
  @Input({ required: true }) amenity!: Amenity;
  isActive: boolean = false;

  @Output() selected: EventEmitter<boolean> = new EventEmitter();

  onToggle() {
    this.isActive = !this.isActive;
    this.selected.emit(this.isActive);
  }
}
