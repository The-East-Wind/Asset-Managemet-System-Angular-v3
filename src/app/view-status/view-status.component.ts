import { HttpErrorResponse } from '@angular/common/http';
import { Request } from './../entities/Request';
import { RequestService } from './../request.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-view-status',
  templateUrl: './view-status.component.html',
  styleUrls: ['./view-status.component.css']
})
export class ViewStatusComponent implements OnInit {
  approved: number;
  requestStatus: string;
  displaySpinner = false;
  viewStatusForm = new FormGroup({
    id: new FormControl('', [Validators.required, Validators.pattern(/^\d{1,}$/)])
  });
  viewStatus = (event: Event) => {
    event.preventDefault();
    if (this.viewStatusForm.valid) {
      this.requestStatus = undefined;
      this.displaySpinner = true;
      const enteredid = Number(this.viewStatusForm.value.id);
      this._requestService.fetchRequestWithId(enteredid)
      .pipe(catchError((error: HttpErrorResponse) => {
        this.requestStatus = 'Invalid Request ID!';
        this.approved = 2;
        this.displaySpinner = false;
        return throwError('Request Not Found');
      })).subscribe((data: any) => {
        console.log(data);
        const requestWithId: Request = data;
        switch (requestWithId.status) {
            case 'Approved': this.approved = 0; break;
            case 'Pending': this.approved = 1; break;
            case 'Rejected': this.approved = 2; break;
            case 'Asset Deleted': this.approved = 3;break;
        }
        if (this.approved === 1) {
          this.requestStatus = `Your request is In Process`;
        } else if (this.approved === 3) {
          this.requestStatus = `The asset you had request is no longer available in the catalog`;
        } else {
          this.requestStatus = `Your request is ${requestWithId.status}`;
        }
        this.displaySpinner = false;
      });
    }
  }
  // tslint:disable-next-line: variable-name
  constructor(private _requestService: RequestService) {
  }
  ngOnInit(): void {
  }

}
