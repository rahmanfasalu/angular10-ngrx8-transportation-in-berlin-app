import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Departure, Journey, Journeys, Stop } from '../../../interfaces';
import { API_ENDPOINTS } from '../../../constants/urls';

@Injectable({
  providedIn: 'root',
})
export class TravelService {
  constructor(private http: HttpClient) {}

  getLocations(query: string): Observable<Stop[]> {
    let url = API_ENDPOINTS.locations.replace('##', query);
    return this.http.get<Stop[]>(url).pipe(
      //tap((data) => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getStopDetails(id: string): Observable<Departure[]> {
    let url = API_ENDPOINTS.departures.replace('##', id);
    return this.http.get<Departure[]>(url).pipe(
      //tap((data) => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  searchJourney({ from, to }: { from: Stop; to: Stop }): Observable<Journeys> {
    const params = [
      from.id,
      to.id,
      to.name,
      `${to.location.latitude}`,
      `${to.location.longitude}`,
    ];

    let url = API_ENDPOINTS.journeys.replace(
      /%(\d+)/g,
      (_, n) => params[+n - 1]
    );
    return this.http.get<Journeys>(url).pipe(
      //tap((data) => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(err: any) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    return throwError(errorMessage);
  }
}
