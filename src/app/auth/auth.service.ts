import { Router, ɵangular_packages_router_router_a } from '@angular/router';
import { Employee } from './../entities/Employee';
import { retry, catchError } from 'rxjs/operators';
import { Credential } from '../entities/credential';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  serverUrl = 'http://localhost:8080/login';
  currentUser: Employee;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  // tslint:disable-next-line: variable-name
  constructor(private _http: HttpClient,private _router: Router) {
  }

  authenticateUser(enteredCredentials: Credential): Observable<Credential> {
    return this._http.post<Credential>(this.serverUrl, enteredCredentials, this.httpOptions);
  }
  logout() {
    this.currentUser = undefined;
    // clear user data from local storage
  }
  login(authenticatedUser: Employee) {
    this.currentUser = authenticatedUser;
    // store data to local storage
    const path = '/' + this.currentUser.employeeDesignation.toLowerCase();
    this._router.navigate([path]);
  }
  isLoggedIn() {
    // check if data is available in localStorage and if stored navigate to respective userpage
  }
}
