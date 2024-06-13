import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthState } from '../state/auth.state';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor (private authState: AuthState) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authState.checkSession()){
      // console.log('true')
      return true;
    }
    else {
      // console.log('false')
      // alert('No tienes acceso a esta página.\r\nIntroduce unas credenciales válidas.');
      this.authState.logout();
      return false;
    }
  }

}