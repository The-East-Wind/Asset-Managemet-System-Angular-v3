import { HttpErrorResponse } from '@angular/common/http';
import { AssetService } from './asset.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private auth: AuthService, private asset: AssetService) {
    if (auth.isLoggedIn()) {
      router.navigate(['/' + auth.currentUser.employeeDesignation.toLowerCase()]);
    } else {
      router.navigate(['/login']);
    }
  }
  title = 'Asset Management System';
  isAuthenticated: boolean;
  showViewStatus: boolean;
  showReport: boolean;
  userName: string;
  home: string[];
  downloadURL: string;
  changeNavBar(event: Event): void {
    switch (this.router.routerState.snapshot.url) {
      case '/login' : this.isAuthenticated = false ; break;
      case '/employee' : {
        this.showViewStatus = true;
        this.isAuthenticated = true;
        this.home = [this.router.routerState.snapshot.url];
                        }break;
      case '/manager' : {
        this.showViewStatus = true;
        this.isAuthenticated = true;
        this.home = [this.router.routerState.snapshot.url];
                        }break;
      case '/admin' : {
        this.showViewStatus = false;
        this.showReport = true;
        this.downloadURL = 'http://localhost:8080/assets/report';
        this.isAuthenticated = true;
        this.home = [this.router.routerState.snapshot.url];
                      }break;
    }
    if (this.home !== undefined && this.auth.currentUser !== undefined) {
      this.userName = this.auth.currentUser.employeeName;
    }
  }

  logout(): void {
    this.isAuthenticated = false;
    this.auth.logout();
  }

  ngOnInit() {
  }
}
