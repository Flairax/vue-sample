import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, mergeMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const tokenized = this.addTokenHeader(req);

    return next.handle(tokenized).pipe(
      catchError((e) => {
        if (e.status !== HttpStatusCode.Unauthorized)
          return throwError(() => e);

        return this.authService.refresh().pipe(
          catchError(() => {
            this.authService.clear();
            this.router.navigate([`auth`])
            return throwError(() => new Error(`Token refresh failed`))
          }),
          mergeMap(() => next.handle(this.addTokenHeader(req))),
        );
      })
    );
  }

  private addTokenHeader(req: HttpRequest<any>) {
    const auth = this.authService.state.data;
    if (!auth) return req;

    const token = `Bearer ${auth.access}`;
    const clone = req.clone({
      headers: req.headers.set('authorization', token),
    });

    return clone;
  }
}


export function authIntercepter(
  req: HttpRequest<any>,
  next: HttpHandler
) {
  
}
