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
  isEmployee = false;
  isManager = false;
  isAdmin = false;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  // tslint:disable-next-line: variable-name
  constructor(private _http: HttpClient) {
  }

  authenticateUser(enteredCredentials: Credential): Observable<Credential> {
    return this._http.post<Credential>(this.serverUrl, enteredCredentials, this.httpOptions);
  }
}
