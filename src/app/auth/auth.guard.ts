import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogin(state.url);
  }
  constructor(private auth: AuthService, private router: Router, private active: ActivatedRoute) {

  }

  checkLogin(url: string): boolean {
    if (this.auth.isEmployee) {
      return true;
    }
    this.router.navigate(['/access-denied']);
    return false;
  }
}
