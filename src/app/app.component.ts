import { EmployeeService } from './employee.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private auth: AuthService) {
  }
  title = 'Asset Management System';
  isAuthenticated: boolean;
  showViewStatus: boolean;
  userName: string;
  home: string[];
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
        this.isAuthenticated = true;
        this.home = [this.router.routerState.snapshot.url];
                      }break;
    }
    if (this.home.length !== 0) {
      this.userName = this.auth.currentUser.employeeName;
    }
  }

  logout(): void {
    if (this.router.routerState.snapshot.url === '/login') {
      this.auth.logout();
    }
  }
  ngOnInit() {
  }
}
