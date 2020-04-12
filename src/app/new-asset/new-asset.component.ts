import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Asset } from './../entities/Asset';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AssetService } from './../asset.service';
import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-new-asset',
  templateUrl: './new-asset.component.html',
  styleUrls: ['./new-asset.component.css']
})
export class NewAssetComponent implements OnInit {

  newAssetForm = new FormGroup({
    assetName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z\s0-9-]{5,25}$/)]),
    assetDescription: new FormControl(''),
    assetCategory: new FormControl(Validators.required)
  });
  // tslint:disable-next-line: variable-name
  constructor(private _assetService: AssetService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  addNewAsset(): void {
    if (this.newAssetForm.valid) {
      const newAsset = new Asset();
      newAsset.allottedTo = null;
      newAsset.availability = 'Available';
      newAsset.assetName = this.newAssetForm.value.assetName;
      newAsset.assetDescription = this.newAssetForm.value.assetDescription;
      newAsset.assetCategory = this.newAssetForm.value.assetCategory;
      this._assetService.addNewAsset(newAsset).pipe(catchError((error: HttpErrorResponse) => {
        this._snackBar.open('Uh-oh! An Error Occurred. Please try again later', '', {
          duration: 10000, panelClass: 'failure'
        });
        return throwError('Error Adding Asset');
      })).subscribe((data: any) => {
        this._snackBar.open('Asset was successfully added!', '', {
          duration: 10000, panelClass: 'success'
        });
        this.newAssetForm.reset();
      });
    }
  }
}
