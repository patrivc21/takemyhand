import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
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
      return true;
    }
    else {
      this.authState.logout();
      return false;
    }
  }
}

