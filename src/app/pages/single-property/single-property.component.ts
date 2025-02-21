import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-single-property',
  standalone: true,
  imports: [],
  templateUrl: './single-property.component.html',
  styleUrl: './single-property.component.scss',
})
export class SinglePropertyComponent {
  router = inject(Router);
  goBackHome() {
    this.router.navigate(['/home']);
  }
}
