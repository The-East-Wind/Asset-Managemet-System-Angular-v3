import { Asset } from './../entities/Asset';
import { AssetService } from './../asset.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  displayedColumns: string[];
  assetDataSource: any;
  assets: Asset[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(public assetService: AssetService) {
    this.fetchAssets();
  }
  ngOnInit(): void {
  }
  fetchAssets = () => {
    this.assetService.getAssets().subscribe((data: any) => {
      this.assets = data;
      this.assetDataSource = new MatTableDataSource<Asset>(this.assets);
      this.assetDataSource.paginator = this.paginator;
      this.displayedColumns = Object.keys(this.assets[0]).filter(key => key !== 'allottedTo');
    });
  }
  applySearchFilter = (event: Event) => {
    const searchFilter = (event.target as HTMLInputElement).value;
    console.log(typeof searchFilter);
    console.log(typeof this.assetDataSource.filter);
    this.assetDataSource.filter = searchFilter.trim().toLowerCase();
  }
}
