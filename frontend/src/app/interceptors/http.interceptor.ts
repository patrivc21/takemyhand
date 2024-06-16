import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AuthState } from '../state/auth.state';

@Injectable()
export class HttInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService, private authState: AuthState) { }

  // intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  //   console.log('Intercepting request to:', request.url);
  //   if (request.url.includes('login') || request.url.includes('register')) {
  //     return next.handle(request)
  //   } else {

  //     if (!this.authState.checkSession()) {
  //       this.authState.logout()
  //     }

  //     if (this.cookieService.check('token')) {
  //       localStorage.removeItem('token')
  //       localStorage.setItem('token', this.cookieService.get('token'))
  //       this.cookieService.delete('token')
  //     }
  //     const headers = new HttpHeaders({
  //       Authorization: 'Bearer ' + localStorage.getItem('token')
  //     })

  //     const reqClone = request.clone({
  //       headers,
  //       withCredentials: true,
  //     })
  //     return next.handle(reqClone);
  //   }
  // }

  intercept (request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Verificar si la solicitud tiene el encabezado 'Skip-Auth'
    if (!request.headers.has('Skip-Auth')) {
      const token: string | null = this.authState.getToken()
      if (token != null && token.length > 0) {
        request = request.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        })
      }
    } else {
      // Clonar la solicitud sin el encabezado 'Skip-Auth' antes de pasarla
      request = request.clone({
        headers: request.headers.delete('Skip-Auth')
      })
    }
    return next.handle(request)
  }
}