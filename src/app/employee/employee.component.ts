import { Asset } from './../entities/Asset';
import { AssetService } from './../asset.service';
// import { FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(public assetService: AssetService) {
  }
  ngOnInit(): void {
    this.fetchAssets();
  }
  fetchAssets = () => {
    this.assetService.getAssets().subscribe((data: any) => {
      this.assets = data;
      this.assetDataSource = new MatTableDataSource<Asset>(this.assets);
      this.assetDataSource.paginator = this.paginator;
      this.displayedColumns = Object.keys(this.assets[0]).filter(key => key !== 'allottedTo');
      this.assetDataSource.sort = this.sort;
    });
  }
  applySearchFilter = (event: Event) => {
    const searchFilter = (event.target as HTMLInputElement).value;
    console.log(typeof searchFilter);
    console.log(typeof this.assetDataSource.filter);
    this.assetDataSource.filter = searchFilter.trim().toLowerCase();
  }
}
