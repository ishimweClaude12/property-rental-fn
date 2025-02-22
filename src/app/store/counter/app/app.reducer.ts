import { createReducer, on } from '@ngrx/store';

import { closeDropdown, toggleDropdown } from './app.actions';

export interface AppState {
  dropdownOpen: boolean;
}

export const initialState: AppState = {
  dropdownOpen: false,
};

export const appReducer = createReducer(
  initialState,
  on(toggleDropdown, (state) => ({
    ...state,
    dropdownOpen: !state.dropdownOpen,
  })),
  on(closeDropdown, (state) => ({
    ...state,
    dropdownOpen: false,
  }))
);
