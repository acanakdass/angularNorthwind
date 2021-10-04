import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = localStorage.getItem("token");
    let requestWithBearer: HttpRequest<any>;
    requestWithBearer = request.clone({
      headers: request.headers.set("Authorization", "Bearer " + token)
    });
    console.log(requestWithBearer);
    return next.handle(requestWithBearer);
  }
}
