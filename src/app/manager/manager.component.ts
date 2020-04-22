import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { RequestService } from './../request.service';
import { EmployeeService } from './../employee.service';
import { Request } from './../entities/Request';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Asset } from './../entities/Asset';
import { AssetService } from './../asset.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { NewRequestComponent } from '../new-request/new-request.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  assets: Asset[];
  assetDataSource: any;
  columnHeaders: string[];
  selectedAsset = new SelectionModel<Asset>(false, []);
  noneSelected: boolean;
  constructor(
    // tslint:disable-next-line: variable-name
    private _assetService: AssetService, private _router: Router, private _dialog: MatDialog,
    // tslint:disable-next-line: variable-name
    private _employeeService: EmployeeService, private _requestService: RequestService, private _snackBar: MatSnackBar) {
    this.fetchAssets();
  }
  fetchAssets = () => {
    this._assetService.getAssets().subscribe((data: any) => {
      this.assets = data;
      this.assetDataSource = new MatTableDataSource<Asset>(this.assets.filter(asset => asset.availability === 'Available'));
      this.columnHeaders = Object.keys(this.assets[0]).filter(key => key !== 'allottedTo');
      this.columnHeaders.unshift('select');
      this.assetDataSource.filterPredicate = (filterData, filter: string) => {
        return String(filterData.assetId).indexOf(filter) !== -1;
      };
    });
  }
  ngOnInit(): void {
  }
  applyFilter = (event: Event) => {
    const filter = (event.target as HTMLInputElement).value;
    this.assetDataSource.filter = filter;
  }
  openRequestForm = (): void => {
    if  (this.selectedAsset.hasValue()) {
      this.noneSelected = false;
      const newRequest = new Request();
      newRequest.requestedAsset = this.selectedAsset.selected[0];
      newRequest.requestedBy = this._employeeService.user;
      // newRequest.id = 10;
      newRequest.status = 'Pending';
      const dialogRef = this._dialog.open(NewRequestComponent, {
        maxWidth: '350px', maxHeight: '500px'
      });
      dialogRef.afterClosed().subscribe(formData => {
        this.selectedAsset.clear();
        if (formData !== undefined) {
          console.log(formData);
          newRequest.fromDate = this.dateFormatter(formData.fromDate);
          newRequest.toDate = this.dateFormatter(formData.toDate);
          newRequest.requestedFor = formData.requestedFor;
          this._requestService.addNewRequest(newRequest).pipe(catchError((error: HttpErrorResponse) => {
            this._snackBar.open('Uh-oh! An Error occurred. Request could not be submitted.Please try again later', '', {
              duration: 10000, panelClass: 'failure', verticalPosition: 'bottom'
            });
            return throwError('Error adding Request.');
          })).subscribe((data: any) => {
            // console.log(data);
            this._snackBar.open(`Your Request was submitted successfully ! Request ID is: ${data.requestId}`, '', {
              duration: 10000, panelClass: 'success', verticalPosition: 'bottom'
            });
          });
        }
      });
    } else {
      this.noneSelected = true;
    }
  }
  dateFormatter(date: Date): string {
    let formattedDate: string;
    formattedDate = date.toJSON();
    return formattedDate.slice(0, formattedDate.indexOf('T'));
  }
}
