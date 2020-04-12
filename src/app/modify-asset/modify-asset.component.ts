import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Asset } from './../entities/Asset';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-modify-asset',
  templateUrl: './modify-asset.component.html',
  styleUrls: ['./modify-asset.component.css']
})
export class ModifyAssetComponent implements OnInit {

  modifyAssetForm = new FormGroup({
    assetId: new FormControl(this.data.assetId),
    assetName: new FormControl(this.data.assetName, [Validators.required, Validators.pattern(/^[a-zA-Z\s0-9-]{5,25}$/)]),
    assetDescription: new FormControl(this.data.assetDescription),
    assetCategory: new FormControl(this.data.assetCategory, Validators.required),
    availability: new FormControl(this.data.availability)
  });

  constructor(public dialogRef: MatDialogRef<ModifyAssetComponent>, @Inject(MAT_DIALOG_DATA) public data: Asset) {

  }

  ngOnInit(): void {
  }

  modify(): void {
    if (this.modifyAssetForm.valid) {
      if (this.modifyAssetForm.dirty) {
        const modifiedData: Asset = this.modifyAssetForm.value;
        if (this.data.allottedTo === undefined) {
          modifiedData.allottedTo = null;
        } else {
          modifiedData.allottedTo = this.data.allottedTo;
        }
        this.dialogRef.close(modifiedData);
      } else {
        this.dialogRef.close();
      }
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
