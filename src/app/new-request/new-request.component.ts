import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { EmployeeService } from './../employee.service';
// import { Request } from './../entities/Request';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.css']
})
export class NewRequestComponent implements OnInit {
  minFromDate: Date;
  maxFromDate: Date;
  minToDate: Date;
  maxToDate: Date;
  validEmployee = true;
  assetRequestForm = new FormGroup({
    requestedFrom: new FormControl(new Date(), Validators.required),
    requestedTill : new FormControl(new Date(), Validators.required),
    requestedFor: new FormControl('', [Validators.required, Validators.pattern(/^[1-9][0-9]{3}$/)])
  });
  // tslint:disable-next-line: variable-name
  constructor(public dialogRef: MatDialogRef<NewRequestComponent>, private _employeeService: EmployeeService) {
    const today = new Date();
    this.minFromDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    this.maxFromDate = new Date(today.getFullYear(), today.getMonth() + 3, today.getDate());
  }

  ngOnInit(): void {
  }

  setMinToDate(): void {
    // tslint:disable-next-line: no-string-literal
    const requestedFrom = this.assetRequestForm.value.requestedFrom;
    this.minToDate = new Date(requestedFrom.getFullYear(), requestedFrom.getMonth(), requestedFrom.getDate() + 1);
    this.maxToDate = new Date(requestedFrom.getFullYear(), requestedFrom.getMonth() + 3, requestedFrom.getDate());
  }
  submitFormData(): void {
    // this.validEmployee = true;
    if (this.assetRequestForm.valid) {
      this._employeeService.fetchEmployeeWithId(Number(this.assetRequestForm.value.requestedFor))
      .pipe(catchError((error: HttpErrorResponse) => {
        this.validEmployee = false;
        this.assetRequestForm.setValue({
          requestedFrom: this.assetRequestForm.value.requestedFrom, requestedTill: this.assetRequestForm.value.requestedTill, requestedFor: ''});
        return throwError(error);
      }))
      .subscribe((data: any) => {
        console.log(data);
        this.validEmployee = true;
        this.assetRequestForm.setValue({
          requestedFrom: this.assetRequestForm.value.requestedFrom, requestedTill: this.assetRequestForm.value.requestedTill, requestedFor: data});
        this.dialogRef.close(this.assetRequestForm.value);
      });
    }
  }
  closeDialog(): void {
    this.assetRequestForm.reset();
    this.dialogRef.close();
  }
}
