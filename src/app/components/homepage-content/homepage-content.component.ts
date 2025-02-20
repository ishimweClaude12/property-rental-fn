import { Component } from '@angular/core';
import { CardComponent } from "../card/card.component";

@Component({
  selector: 'app-homepage-content',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './homepage-content.component.html',
  styleUrl: './homepage-content.component.scss'
})
export class HomepageContentComponent {

}
