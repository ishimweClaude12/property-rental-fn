import { HomepageContentComponent } from './components/homepage-content/homepage-content.component';
import { Routes } from '@angular/router';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { HomepageComponent } from './pages/homepage/homepage.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomepageComponent,
    children: [
      { path: '', redirectTo: 'content', pathMatch: 'full' },
      { path: 'content', component: HomepageContentComponent },
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
