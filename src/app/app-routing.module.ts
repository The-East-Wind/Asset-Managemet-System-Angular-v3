import { ManageAssetComponent } from './manage-asset/manage-asset.component';
import { ViewRequestComponent } from './view-request/view-request.component';
import { NewAssetComponent } from './new-asset/new-asset.component';
import { AdminGuard } from './auth/admin.guard';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth/auth.guard';
import { ViewStatusComponent } from './view-status/view-status.component';
import { ManagerComponent } from './manager/manager.component';
import { EmployeeComponent } from './employee/employee.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagerGuard } from './auth/manager.guard';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
{path: 'admin', component: AdminComponent, canActivate: [AdminGuard], children: [
  {path: 'new', component: NewAssetComponent},
  {path: 'view-requests', component: ViewRequestComponent},
  {path: 'manage', component: ManageAssetComponent}
]},
{path: 'employee', component: EmployeeComponent, canActivate: [AuthGuard]},
{path: 'manager', component: ManagerComponent, canActivate: [ManagerGuard]},
{path: 'access-denied', component: AccessDeniedComponent},
{path: 'login', component: LoginComponent},
{path: 'view-status', component: ViewStatusComponent},
{path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
