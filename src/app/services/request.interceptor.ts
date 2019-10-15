import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import {Store} from '@ngrx/store';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private store: Store<{todos: any}>) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.store.dispatch({type: '[Interceptor] Start Requesting'});

    return next.handle(request).pipe(finalize(() => {
      this.store.dispatch({type: '[Interceptor] Stop Requesting'});
    }));
  }
}
