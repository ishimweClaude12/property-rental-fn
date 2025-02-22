import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from './app.reducer';

// Select the feature state
export const selectAppFeature = createFeatureSelector<AppState>('app');

// Select the dropdown state
export const selectDropdownState = createSelector(
  selectAppFeature,
  (state: AppState) => state.dropdownOpen
);
