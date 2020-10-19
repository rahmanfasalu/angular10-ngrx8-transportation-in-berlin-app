/* NgRx */
import { createReducer, on } from '@ngrx/store';
import { Stop } from '../../../../interfaces';
import { LocationActions } from '../actions';

/* Intialise State */
export const initialState: Stop[] = [];

// author reducer
export const stopReducer = createReducer<Stop[]>(
  initialState,
  on(LocationActions.searchStopsSuccess, (state, { stops }): Stop[] => {
    return [...stops];
  }),
  on(LocationActions.searchStopsReset, (state): Stop[] => {
    return [];
  })
);
