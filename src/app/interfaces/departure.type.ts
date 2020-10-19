import { Line } from './journey.type';
import { Stop } from './locations.type';

export interface Departure {
  tripId: string;
  when: string;
  plannedWhen: string;
  line: Line;
  stop: Stop;
  delay: number;
  platform: any;
  plannedPlatform: any;
  direction: string;
  provenance: any;
  remarks: any;
}
