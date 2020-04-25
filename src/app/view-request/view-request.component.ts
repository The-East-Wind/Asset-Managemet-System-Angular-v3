import { Asset } from './../entities/Asset';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AssetService } from './../asset.service';
import { Request } from './../entities/Request';
import { RequestService } from './../request.service';
import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-view-request',
  templateUrl: './view-request.component.html',
  styleUrls: ['./view-request.component.css']
})
export class ViewRequestComponent implements OnInit {

  requests: Request[];
  currentRequest: Request;
  isLoaded: boolean;
  expandAsset = false;
  expandBy = false;
  expandFor = false;
  index: number;
  disableAll = false;
  noPendingRequest = false;
  // tslint:disable-next-line: variable-name
  constructor(private _requestService: RequestService, private _assetService: AssetService, private _snackBar: MatSnackBar) {
  }
  getPendingRequests(): void {
    this._requestService.fetchRequests().subscribe((data: any) => {
      this.requests = data.filter((request: Request) => request.status === 'Pending');
      if (this.requests.length === 0) {
        this.noPendingRequest = true;
      } else {
        this.currentRequest = this.requests[0];
        this.index = 0;
      }
      this.isLoaded = true;
    });
  }
  ngOnInit(): void {
    this.getPendingRequests();
  }
  acceptRequest(): void {
    this.disableAll = true;
    this._assetService.getAssetWithId(this.currentRequest.requestedAsset.assetId).pipe(catchError((error: HttpErrorResponse) => {
      this.rejectRequest();
      return throwError('Error fetching Asset with given ID');
    })).subscribe((data: Asset) => {
      if  (data.availability === 'Not Available') {
        this.rejectRequest();
      } else if (data.availability === 'Available') {
        this.currentRequest.requestedAsset.allottedTo = this.currentRequest.requestedFor;
        this.currentRequest.requestedAsset.availability = 'Not Available';
        this._assetService.updateAsset(this.currentRequest.requestedAsset)
        .pipe(catchError((error: HttpErrorResponse) => {
          this._snackBar.open(error.error.message, '', {
            duration: 5000, panelClass: 'failure'
          });
          this.disableAll = false;
          return throwError('Error Updating Request Status');
        })).subscribe((data: any) => {
          this.currentRequest.status = 'Approved';
          this._requestService.updateRequest(this.currentRequest).pipe(catchError((error: HttpErrorResponse) => {
            this._snackBar.open('Uh-oh! An error occurred,couldn\'t update request status. Try again later.', '', {
              duration: 5000, panelClass: 'failure'
            });
            this.disableAll = false;
            return throwError('Error Updating Request Status');
          })).subscribe((data: any) => {
            this._snackBar.open('Request was Approved!', '', {
              duration: 5000, panelClass: 'success'
            });
            this.disableAll = false;
            this.next();
          });
        });
      }
    });
  }
  rejectRequest(): void {
    this.disableAll = true;
    this.currentRequest.status = 'Rejected';
    this._requestService.updateRequest(this.currentRequest).pipe(catchError((error: HttpErrorResponse) => {
      this._snackBar.open('Uh-oh! An error occured. Please Try again later.', '', {
        duration: 5000, panelClass: 'failure'
      });
      this.disableAll = false;
      return throwError('Error Updating Request Status');
    })).subscribe((data: any) => {
      this._snackBar.open('Request was rejected!', '', {
        duration: 5000, panelClass: 'success'
      });
      this.disableAll = false;
      this.next();
    });
  }
  next(): void {
    this.index++;
    if (this.index < this.requests.length) {
      this.currentRequest = this.requests[this.index];
    } else {
      this.noPendingRequest = true;
    }
  }
}
