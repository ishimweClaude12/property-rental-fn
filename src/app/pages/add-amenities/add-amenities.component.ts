import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AmenityCardComponent } from '../../components/amenity-card/amenity-card.component';
import { PropertyService } from '../../services/property/property.service';
import { ToastrService } from 'ngx-toastr';
import { ButtonComponent } from '../../components/button/button.component';
import { ActivatedRoute, Router } from '@angular/router';

export type Amenity = {
  id: string;
  name: string;
  amenityCode: string;
};

@Component({
  selector: 'app-add-amenities',
  standalone: true,
  imports: [CommonModule, AmenityCardComponent, ButtonComponent],
  templateUrl: './add-amenities.component.html',
  styleUrl: './add-amenities.component.scss',
})
export class AddAmenitiesComponent implements OnInit {
  data: { id: string; name: string; aminity: Amenity[] }[] = [
    {
      id: '1',
      name: 'Interior Amenities',
      aminity: [
        { id: '1', name: '✅ Air Conditioning', amenityCode: '1' },
        { id: '10', name: '✅ Home Office/Study Room', amenityCode: '1' },
        { id: '2', name: '✅ Heating (Central/Furnace)', amenityCode: '1' },
        { id: '3', name: '✅ Smart Home Features', amenityCode: '1' },
        { id: '4', name: '✅ Hardwood Floors', amenityCode: '1' },
        { id: '5', name: '✅ Carpeted Floors', amenityCode: '1' },
        { id: '6', name: '✅ Fireplace', amenityCode: '1' },
        { id: '7', name: '✅ Ceiling Fans', amenityCode: '1' },
        { id: '8', name: '✅ Walk-in Closet', amenityCode: '1' },
        { id: '9', name: '✅ Storage Space', amenityCode: '1' },
      ],
    },
    {
      id: '2',
      name: 'Kitchen Amenities',
      aminity: [
        { id: '11', name: '🍽️ Dishwasher', amenityCode: '2' },
        { id: '12', name: '🍳 Microwave', amenityCode: '2' },
        { id: '13', name: '🏠 Kitchen Island', amenityCode: '2' },
        { id: '14', name: '☕ Coffee Bar/Nook', amenityCode: '2' },
        { id: '15', name: '🧊 Refrigerator', amenityCode: '2' },
        { id: '16', name: '🔥 Gas/Electric Stove', amenityCode: '2' },
        { id: '17', name: '🍷 Wine Storage', amenityCode: '2' },
      ],
    },
    {
      id: '3',
      name: 'Bathroom Amenities',
      aminity: [
        { id: '18', name: '🛁 Bathtub', amenityCode: '3' },
        { id: '19', name: '🚿 Walk-in Shower', amenityCode: '3' },
        { id: '20', name: '🧼 Double Sink Vanity', amenityCode: '3' },
        { id: '21', name: '🔥 Heated Floors', amenityCode: '3' },
      ],
    },
    {
      id: '4',
      name: 'Outdoor & Security Features',
      aminity: [
        { id: '22', name: '🌳 Private Backyard', amenityCode: '4' },
        { id: '23', name: '🏊 Swimming Pool', amenityCode: '4' },
        { id: '24', name: '🔥 Outdoor Fireplace/Fire Pit', amenityCode: '4' },
        { id: '25', name: '🏠 Garage (Attached/Detached)', amenityCode: '4' },
        { id: '26', name: '🚗 Driveway Parking', amenityCode: '4' },
        { id: '27', name: '🎥 Security Cameras', amenityCode: '4' },
        { id: '28', name: '🔐 Gated Entry', amenityCode: '4' },
      ],
    },
    {
      id: '5',
      name: 'Community Amenities',
      aminity: [
        { id: '22', name: '🌳 Private Backyard', amenityCode: '4' },
        { id: '23', name: '🏊 Swimming Pool', amenityCode: '4' },
        { id: '24', name: '🔥 Outdoor Fireplace/Fire Pit', amenityCode: '4' },
        { id: '25', name: '🏠 Garage (Attached/Detached)', amenityCode: '4' },
        { id: '26', name: '🚗 Driveway Parking', amenityCode: '4' },
        { id: '27', name: '🎥 Security Cameras', amenityCode: '4' },
        { id: '28', name: '🔐 Gated Entry', amenityCode: '4' },
      ],
    },
  ];

  property_id: string = '';

  constructor(
    private readonly propertyService: PropertyService,
    private readonly toastr: ToastrService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.property_id = params['id'];
    });
  }
  onClick(amenity: Amenity): void {
    this.propertyService.addAmenities(this.property_id, amenity.id).subscribe(
      (response) => {
        console.log('Response:', response);
      },
      (error) => {
        this.toastr.error('Oops! Something went wrong. Please try again.');
      }
    );
  }

  onSubmit(): void {
    this.router.navigate(['/home']);
  }
}
