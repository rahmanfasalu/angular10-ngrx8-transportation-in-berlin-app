/* NgRx */
import { createAction, props } from '@ngrx/store';
import { Stop } from '../../../../interfaces';

export const searchStops = createAction(
  '[Stop] search',
  props<{ query: string }>()
);
export const searchStopsSuccess = createAction(
  '[Stop] search Success',
  props<{ stops: Stop[] }>()
);

export const searchStopsReset = createAction('[Stop] search stops reset');

export const searchStopsFailure = createAction(
  '[Stop] search Failure',
  props<{ error: string }>()
);
