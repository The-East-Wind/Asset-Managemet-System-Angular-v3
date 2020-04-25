import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  links: string[] = ['./view-requests', './new', './manage'];
  labels: string[] = ['View Pending Requests', 'Add New Asset', 'Manage Assets'];
  activeLink = this.links[0];
  // tslint:disable-next-line: variable-name
  constructor(private _router: Router, private _route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this._router.navigate([this.activeLink], { relativeTo: this._route });
  }
}
