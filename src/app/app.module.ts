import { RequestService } from './request.service';
import { AssetService } from './asset.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ViewStatusComponent } from './view-status/view-status.component';
import { EmployeeComponent } from './employee/employee.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ManagerComponent } from './manager/manager.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AuthService } from './auth/auth.service';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { NewRequestComponent } from './new-request/new-request.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { EmployeeService } from './employee.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AdminComponent } from './admin/admin.component';
import { MatTabsModule } from '@angular/material/tabs';
import { NewAssetComponent } from './new-asset/new-asset.component';
import { ViewRequestComponent } from './view-request/view-request.component';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { ManageAssetComponent } from './manage-asset/manage-asset.component';
import { ModifyAssetComponent } from './modify-asset/modify-asset.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ViewStatusComponent,
    EmployeeComponent,
    ManagerComponent,
    AccessDeniedComponent,
    NewRequestComponent,
    AdminComponent,
    NewAssetComponent,
    ViewRequestComponent,
    ManageAssetComponent,
    ModifyAssetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    FlexLayoutModule,
    HttpClientModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatTabsModule,
    MatListModule,
    MatExpansionModule
  ],
  entryComponents: [ NewRequestComponent ],
  providers: [ AssetService, RequestService, AuthService, EmployeeService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
