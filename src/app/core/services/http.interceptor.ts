import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { getAPIURL } from '../../constants/urls';

@Injectable()
export class HTTPInterceptorService implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      headers: request.headers.set('Content-Type', 'application/json'),
      url: `${getAPIURL()}/${request.url}`,
    });

    return next.handle(request);
  }
}
