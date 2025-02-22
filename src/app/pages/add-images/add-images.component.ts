import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../services/property/property.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-images',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-images.component.html',
  styleUrl: './add-images.component.scss',
})
export class AddImagesComponent implements OnInit {
  images: File[] = [];
  imagePreviews: string[] = [];
  error: string = '';
  propertyId: string = '';
  constructor(
    private readonly propertyService: PropertyService,
    private readonly toastr: ToastrService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.propertyId = params['id'];
    });
  }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        this.images.push(file); // Add the file to the images array

        // Create a preview URL for the image
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          this.imagePreviews.push(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  removeImage(index: number): void {
    this.images.splice(index, 1);
    this.imagePreviews.splice(index, 1);
  }

  saveImages(): void {
    console.log('Images to save:', this.images);
    this.propertyService
      .savePropertyImages(this.propertyId, this.images)
      .subscribe({
        next: (res) => {
          this.toastr.success('Images saved successfully');
          this.router.navigate(['/home/create-amenities', this.propertyId]);
        },
        error: (error) => {
          this.toastr.error(
            error.message ?? 'An error occurred. Please try again'
          );
        },
      });
  }
}
