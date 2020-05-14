import { Router } from '@angular/router';
import { Employee } from './../entities/Employee';
import { Credential } from '../entities/credential';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  serverUrl = 'http://localhost:4444/auth-service/login';
  currentUser: Employee;
  authToken: string;
  sessionStorage: Storage;
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  /* httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }; */
  // tslint:disable-next-line: variable-name
  constructor(private _http: HttpClient, private _router: Router) {
    this.sessionStorage = window.sessionStorage;
  }

  authenticateUser(enteredCredentials: Credential): Observable<HttpResponse<Credential>> {
    return this._http.post<Credential>(this.serverUrl, enteredCredentials,{headers: this.headers, observe: 'response'});
  }
  logout() {
    // clear user data from local storage
    this.sessionStorage.removeItem('loggedInUser');
    this.sessionStorage.removeItem('token');
    this.currentUser = undefined;
    this.authToken = undefined;
    this._router.navigate(['/login']);
  }
  login(authenticatedUser: Employee, token: string) {
    // store data to local storage
    const authenticatedUserString = JSON.stringify(authenticatedUser);
    this.sessionStorage.setItem('loggedInUser', authenticatedUserString);
    this.sessionStorage.setItem('token', token);
    this.currentUser = authenticatedUser;
    this.authToken = token;
    const path = '/' + this.currentUser.employeeDesignation.toLowerCase();
    this._router.navigate([path]);
  }
  isLoggedIn(): boolean {
    // check if data is available in localStorage
    const loggedInUserString = this.sessionStorage.getItem('loggedInUser');
    const storedAuthToken = this.sessionStorage.getItem('token');
    if (loggedInUserString !== null && storedAuthToken !== null) {
      this.currentUser = JSON.parse(loggedInUserString);
      this.authToken = storedAuthToken;
      return true;
    }
    return false;
  }
}
