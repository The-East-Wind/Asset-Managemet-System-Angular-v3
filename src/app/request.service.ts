import { Request } from './entities/Request';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  serverUrl = 'http://localhost:4444/request-service/requests';
  idGenerator = 4;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this._authService.authToken
    })
  };
  // tslint:disable-next-line: variable-name
  constructor(private _http: HttpClient, private _authService: AuthService) { }
  fetchRequests = (): Observable<Request> => {
    return this._http.get<Request>(this.serverUrl).pipe(retry(1), catchError(() => {
      return throwError('Error Reading requests.json');
    }));
  }
  fetchRequestWithId(id: number): Observable<Request> {
    const url = `${this.serverUrl}/${id}`;
    return this._http.get<Request>(url, this.httpOptions).pipe(retry(1), catchError(() => {
      return throwError('Error Fetching Request');
    }));
  }

  addNewRequest(newRequest: Request): Observable<Request> {
    // newRequest.id = this.idGenerator++;
    return this._http.post<Request>(this.serverUrl, newRequest, this.httpOptions);
  }

  updateRequest(updatedRequest: Request): Observable<Request> {
    const url = `${this.serverUrl}/${updatedRequest.requestId}`;
    return this._http.put<Request>(url, updatedRequest, this.httpOptions);
  }
}
