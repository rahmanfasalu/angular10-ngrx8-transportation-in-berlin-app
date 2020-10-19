/* NgRx */
import { createAction, props } from '@ngrx/store';
import { Departure, Stop } from '../../../../interfaces';

export const loadStopDetails = createAction(
  '[Load] Stop details',
  props<{ id: string }>()
);

export const loadStopDetailsSuccess = createAction(
  '[Stop] Stop details Success',
  props<{ departure: Departure[] }>()
);
