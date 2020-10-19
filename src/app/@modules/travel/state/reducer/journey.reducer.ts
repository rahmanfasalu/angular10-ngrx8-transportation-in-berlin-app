/* NgRx */
import { createReducer, on } from '@ngrx/store';
import { Journey, Stop } from '../../../../interfaces';
import { JourneyActions, LocationActions } from '../actions';

/* Intialise State */
export const initialState: Journey[] = [];

// author reducer
export const journeyReducer = createReducer<Journey[]>(
  initialState,
  on(JourneyActions.searchJourneySuccess, (state, { journeys }): Journey[] => {
    return [...journeys];
  }),
  on(LocationActions.searchStopsReset, (state): Journey[] => {
    return [];
  })
);
