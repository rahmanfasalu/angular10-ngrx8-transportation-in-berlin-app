import { Injectable } from '@angular/core';
import { mergeMap, map, catchError, concatMap, tap } from 'rxjs/operators';
import { of, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';

/* NgRx */
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TravelService } from '../../services/travel.service';
import { JourneyActions, LocationActions, StopsActions } from '../actions';
import { Departure, Journey, Journeys, Stop } from '../../../../interfaces';

@Injectable()
export class TravelEffects {
  constructor(
    private actions$: Actions,
    private travelService: TravelService
  ) {}

  loadStops$ = createEffect(() => {
    return this.actions$.pipe(
      /*
        Only emit values after a second has passed between the last emission,
        throw away all other values
      */
      // debounce(() => timer(100)),
      ofType(LocationActions.searchStops),
      mergeMap(({ query }: { query: string }) =>
        this.travelService.getLocations(query).pipe(
          map((stops: Stop[]) => {
            return LocationActions.searchStopsSuccess({
              stops: stops,
            });
          }),
          catchError((error) =>
            of(LocationActions.searchStopsFailure({ error }))
          )
        )
      )
    );
  });

  searchJourneys$ = createEffect(() => {
    return this.actions$.pipe(
      /*
        Only emit values after a second has passed between the last emission,
        throw away all other values
      */
      // debounce(() => timer(100)),
      ofType(JourneyActions.searchJourney),
      mergeMap(({ from, to }: { from: Stop; to: Stop }) =>
        this.travelService.searchJourney({ from, to }).pipe(
          map(({ journeys }: Journeys) => {
            return JourneyActions.searchJourneySuccess({
              journeys: journeys,
            });
          }),
          catchError((error) =>
            of(LocationActions.searchStopsFailure({ error }))
          )
        )
      )
    );
  });

  loadStopDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StopsActions.loadStopDetails),
      mergeMap(({ id }) =>
        this.travelService.getStopDetails(id).pipe(
          map((departure: Departure[]) => {
            return StopsActions.loadStopDetailsSuccess({
              departure: departure,
            });
          }),
          catchError((error) =>
            of(LocationActions.searchStopsFailure({ error }))
          )
        )
      )
    );
  });
}
