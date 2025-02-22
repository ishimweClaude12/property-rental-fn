import { HomepageContentComponent } from './components/homepage-content/homepage-content.component';
import { Routes } from '@angular/router';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { SinglePropertyComponent } from './pages/single-property/single-property.component';
import { propertyResolver } from './pages/single-property/single-property.resolver';
import { CreatePropertyComponent } from './pages/create-property/create-property.component';
import { AddImagesComponent } from './pages/add-images/add-images.component';
import { AddAmenitiesComponent } from './pages/add-amenities/add-amenities.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomepageComponent,
    children: [
      { path: '', redirectTo: 'property', pathMatch: 'full' },
      { path: 'property', component: HomepageContentComponent },
      {
        path: 'property/:id',
        component: SinglePropertyComponent,
        resolve: { property: propertyResolver },
      },
      {
        path: 'create-property',
        component: CreatePropertyComponent,
      },
      {
        path: 'attach-images/:id',
        component: AddImagesComponent,
      },
      {
        path: 'create-amenities/:id',
        component: AddAmenitiesComponent,
      },
    ],
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'sign-in',
    component: SignInComponent,
  },
];
