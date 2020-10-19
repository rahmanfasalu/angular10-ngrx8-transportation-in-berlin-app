/* NgRx */
import { createAction, props } from '@ngrx/store';
import { Stop } from '../../../../interfaces';
import { Journey } from '../../../../interfaces/journey.type';
export const searchJourney = createAction(
  '[Journey] search',
  props<{ from: Stop; to: Stop }>()
);
export const searchJourneySuccess = createAction(
  '[Journey] search Success',
  props<{ journeys: Journey[] }>()
);

export const searchJourneyReset = createAction('[Journey] search reset');

export const searchJourneyFailure = createAction(
  '[Journey] search Failure',
  props<{ error: string }>()
);
