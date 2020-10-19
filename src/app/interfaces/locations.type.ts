export interface Products {
  suburban?: boolean;
  subway?: boolean;
  tram?: boolean;
  bus?: boolean;
  ferry?: boolean;
  express?: boolean;
  regional?: boolean;
}
export interface Location {
  type: string;
  id: string;
  latitude: number;
  longitude: number;
}

export interface Stop {
  type: string;
  id: string;
  name: string;
  location: Location;
  products: Products;
}
