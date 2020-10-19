import { createFeatureSelector, createSelector } from '@ngrx/store';
import { stopReducer } from './reducer/stops.reducer';
import { journeyReducer } from './reducer/journey.reducer';
import { departureReducer } from './reducer/departure.reducer';
import { Departure, Journey, Stop } from '../../../interfaces';
import * as AppState from './app.state';

export const reducers = {
  stops: stopReducer,
  journey: journeyReducer,
  departure: departureReducer,
};

export interface TravelModuleState {
  stops: Stop[];
  journey: Journey[];
  departure: Departure[];
}

// Extends the app state to include the product feature.
// This is required because products are lazy loaded.
// So the reference to ProductState cannot be added to app.state.ts directly.
export interface State extends AppState.State {
  planner: TravelModuleState;
}

// Selector functions
const getTravelFeatureState = createFeatureSelector<TravelModuleState>(
  'planner'
);

// Category slice
export const selectAllStops = createSelector(
  getTravelFeatureState,
  (state: TravelModuleState) => state.stops
);

export const selectAllJournies = createSelector(
  getTravelFeatureState,
  (state: TravelModuleState) => state.journey
);

export const selectDepartureDetails = createSelector(
  getTravelFeatureState,
  (state: TravelModuleState) => {
    console.log('departuew');
    return state.departure;
  }
);
