import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { EmployeeService } from './../employee.service';
import { Employee } from './../entities/Employee';
import { Router } from '@angular/router';
import { Credential } from './../entities/credential';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: Employee;
  isAuthenticated: boolean;

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z.]{3,24}$/)]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9$_@#&!]{8,24}$/)])
  });

  forgot = false;
  authenticationError: boolean;
  // @Output() authenticationEvent = new EventEmitter<Credential>();
  forgotCredentials = () => {
    this.forgot = !this.forgot;
  }

  authenticate = (event: Event) => {
    event.preventDefault();
    if (this.loginForm.valid) {
      // tslint:disable-next-line: prefer-const
      const enteredCredentials: Credential = {
        username: this.loginForm.value.username, password: this.loginForm.value.password
      };
      this._authService.authenticateUser(enteredCredentials)
      .pipe(catchError((error: HttpErrorResponse) => {
        this.authenticationError = true;
        return throwError('Authentication failed');
      }))
      .subscribe((data: any) => {
        this._employeeService.user = data;
        switch (this._employeeService.user.employeeDesignation) {
          case 'Employee': this._authService.isEmployee = true; break;
          case 'Manager': this._authService.isManager = true; break;
          case 'Admin': this._authService.isAdmin = true; break;
        }
        this.isAuthenticated = true;
        const path = '/' + this._employeeService.user.employeeDesignation.toLowerCase();
        this._router.navigate([path]);
      });
    }
  }

  logout = () => {
    switch (this._employeeService.user.employeeDesignation) {
      case 'Employee': this._authService.isEmployee = false; break;
      case 'Manager': this._authService.isManager = false; break;
      case 'Admin': this._authService.isAdmin = false; break;
    }
    this.isAuthenticated = false;
    this._employeeService.user = undefined;
  }
  // tslint:disable-next-line: variable-name
  constructor(private _authService: AuthService, private _router: Router, private _employeeService: EmployeeService) { }

  ngOnInit(): void {
  }
}
