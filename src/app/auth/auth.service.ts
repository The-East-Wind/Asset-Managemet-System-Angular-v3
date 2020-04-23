import { Router } from '@angular/router';
import { Employee } from './../entities/Employee';
import { Credential } from '../entities/credential';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  serverUrl = 'http://localhost:8080/login';
  currentUser: Employee;
  sessionStorage: Storage;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  // tslint:disable-next-line: variable-name
  constructor(private _http: HttpClient, private _router: Router) {
    this.sessionStorage = window.sessionStorage;
  }

  authenticateUser(enteredCredentials: Credential): Observable<Credential> {
    return this._http.post<Credential>(this.serverUrl, enteredCredentials, this.httpOptions);
  }
  logout() {
    // clear user data from local storage
    this.sessionStorage.removeItem('loggedInUser');
    this.currentUser = undefined;
    this._router.navigate(['/login']);
  }
  login(authenticatedUser: Employee) {
    // store data to local storage
    const authenticatedUserString = JSON.stringify(authenticatedUser);
    this.sessionStorage.setItem('loggedInUser', authenticatedUserString);
    this.currentUser = authenticatedUser;
    const path = '/' + this.currentUser.employeeDesignation.toLowerCase();
    this._router.navigate([path]);
  }
  isLoggedIn(): boolean {
    // check if data is available in localStorage
    const loggedInUserString = this.sessionStorage.getItem('loggedInUser');
    if (loggedInUserString !== null) {
      this.currentUser = JSON.parse(loggedInUserString);
      return true;
    }
    return false;
  }
}
