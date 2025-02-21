import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-single-property',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-property.component.html',
  styleUrl: './single-property.component.scss',
})
export class SinglePropertyComponent {
  router = inject(Router);
  imageIndex = signal<number>(0);
  images = [
    'assets/images/rental-image.png',
    'assets/images/rental-image1.png',
  ];
  imageLength = this.images.length;

  goBackHome() {
    this.router.navigate(['/home']);
  }

  getNextImage() {
    const nextIndex = this.imageIndex() + 1;
    if (nextIndex < this.imageLength) {
      this.imageIndex.set(this.imageIndex() + 1);
    } else {
      this.imageIndex.set(0);
    }
  }

  getPreviousImage() {
    const previousIndex = this.imageIndex() - 1;
    if (previousIndex >= 0 && previousIndex < this.imageLength) {
      this.imageIndex.set(this.imageIndex() - 1);
    } else {
      this.imageIndex.set(this.images.length - 1);
    }
  }

  getImageString = computed(() => {
    return this.images[this.imageIndex()];
  });
}
