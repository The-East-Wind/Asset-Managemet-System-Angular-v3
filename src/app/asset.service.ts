import { Asset } from './entities/Asset';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AssetService {
  serverUrl = 'http://localhost:4444/asset-service/assets';
  idGenerator = 10;
  assets: Asset[];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this._authService.authToken
    })
  };
  // tslint:disable-next-line: variable-name
  constructor(private _http: HttpClient, private _authService: AuthService) {
    this.getAssets();
  }

  getAssets = (): Observable<Asset> => {
    return this._http.get<Asset>(this.serverUrl, this.httpOptions).pipe(retry(1), catchError((error: HttpErrorResponse) => {
      console.log(error.statusText);
      console.log(this._authService.authToken);
      console.log(error.message);
      console.log(error.name);
      return throwError('Error Reading assets.json');
    }));
  }

  addNewAsset(newAsset: Asset): Observable<Asset> {
    newAsset.assetId = this.idGenerator++;
    return this._http.post<Asset>(this.serverUrl, newAsset, this.httpOptions);
  }

  updateAsset(updatedAsset: Asset): Observable<Asset> {
    const url = `${this.serverUrl}/${updatedAsset.assetId}`;
    return this._http.put<Asset>(url, updatedAsset, this.httpOptions);
  }

  getAssetWithId(assetId: number): Observable<Asset> {
    const url = `${this.serverUrl}/${assetId}`;
    return this._http.get<Asset>(url,this.httpOptions);
  }

  deleteAssetWithId(toBeDeletedAsset: Asset): Observable<Asset> {
    const url = `${this.serverUrl}/${toBeDeletedAsset.assetId}`;
    return this._http.delete<Asset>(url,this.httpOptions);
  }
}
