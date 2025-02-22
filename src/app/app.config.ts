import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { counterReducer } from './store/counter/counter.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { loadingInterceptor } from './interceptors/loading.interceptor';
import { provideToastr } from 'ngx-toastr';
import { authInterceptor } from './interceptors/auth/auth.interceptor';
import { appReducer } from './store/counter/app/app.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(),
    provideState({ name: 'app', reducer: appReducer }),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: true, // Restrict extension to log-only mode in production
    }),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimations(), // required animations providers
    provideToastr(),
    provideHttpClient(withFetch(), withInterceptors([loadingInterceptor])),
  ],
};
