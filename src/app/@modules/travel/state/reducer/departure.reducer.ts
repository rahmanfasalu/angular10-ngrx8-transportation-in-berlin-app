/* NgRx */
import { createReducer, on } from '@ngrx/store';
import { Departure, Stop } from '../../../../interfaces';
import { StopsActions } from '../actions';

/* Intialise State */
export const initialState: Departure[] = [];

// author reducer
export const departureReducer = createReducer<Departure[]>(
  initialState,
  on(
    StopsActions.loadStopDetailsSuccess,
    (state, { departure }): Departure[] => {
      return [...departure];
    }
  )
);
