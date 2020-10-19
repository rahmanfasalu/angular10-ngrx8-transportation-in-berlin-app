import { Stop, Location, Products } from './locations.type';

enum JourneyOptions {
  suburban,
  subway,
  tram,
  bus,
  ferry,
  express,
  regional,
}

interface Operator {
  type: string;
  id: string;
  name: string;
}
interface Color {
  [key: string]: string;
}
export interface Line {
  type: string;
  id: string;
  fahrtNr: string;
  name: string;
  public: boolean;
  adminCode: string;
  mode: string;
  product: JourneyOptions;
  operator: Operator;
  symbol: string;
  nr: number;
  metro: boolean;
  express: boolean;
  night: boolean;
  color: Color[];
}
export interface Cycle {
  min?: number;
  max?: number;
  nr?: number;
}
export interface Legs {
  origin: Stop;
  destination: Stop;
  departure: string;
  plannedDeparture: string;
  departureDelay: number;
  arrival: string;
  plannedArrival: string;
  arrivalDelay: number;
  reachable: boolean;
  tripId: string;
  direction: string;
  arrivalPlatform: string;
  plannedArrivalPlatform: string;
  departurePlatform: string;
  plannedDeparturePlatform: string;
  line?: Line;
  cycle: Cycle;
}
export interface Journey {
  type: string;
  legs: Legs;
  refreshToke: string;
  cycle: Cycle;
}

export interface Journeys {
  earlierRef?: string;
  journeys: Journey[];
  laterRef: string;
  realtimeDataFrom: number;
}
