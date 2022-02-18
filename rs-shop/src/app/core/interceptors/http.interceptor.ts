import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const URL = 'http://127.0.0.1:3004';
    return next.handle(
      request.clone({
        url: `${URL}/${request.url}`,
      }),
    );
  }
}
