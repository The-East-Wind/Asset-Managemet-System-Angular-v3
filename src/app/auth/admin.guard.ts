import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogin(state.url);
  }

  // tslint:disable-next-line: variable-name
  constructor(private _auth: AuthService, private _router: Router) {

  }

  checkLogin(url: string) {
    if (this._auth.isAdmin) {
      return true;
    }
    this._router.navigate(['/access-denied']);
    return false;
  }
}
