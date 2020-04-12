import { Request } from './entities/Request';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  serverUrl = 'http://localhost:8080/requests';
  idGenerator = 4;
  // tslint:disable-next-line: variable-name
  constructor(private _http: HttpClient) { }
  fetchRequests = (): Observable<Request> => {
    return this._http.get<Request>(this.serverUrl).pipe(retry(1), catchError(() => {
      return throwError('Error Reading requests.json');
    }));
  }
  fetchRequestWithId(id: number): Observable<Request> {
    const url = `${this.serverUrl}/${id}`;
    return this._http.get<Request>(url).pipe(retry(1), catchError(() => {
      return throwError('Error Fetching Request');
    }));
  }

  addNewRequest(newRequest: Request): Observable<Request> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    // newRequest.id = this.idGenerator++;
    return this._http.post<Request>(this.serverUrl, newRequest, httpOptions);
  }

  updateRequest(updatedRequest: Request): Observable<Request> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const url = `${this.serverUrl}/${updatedRequest.requestId}`;
    return this._http.put<Request>(url, updatedRequest, httpOptions);
  }
}
