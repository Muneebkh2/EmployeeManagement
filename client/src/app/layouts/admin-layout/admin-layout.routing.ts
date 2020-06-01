import { Routes } from '@angular/router';

import { AllEmployeesComponent } from 'src/app/pages/employee/all-employees/all-employees.component';
import { AddEmployeeComponent } from 'src/app/pages/employee/add-employee/add-employee.component';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { AddAdminComponent } from 'src/app/pages/admin/add-admin/add-admin.component';
import { AllAdminComponent } from 'src/app/pages/admin/all-admin/all-admin.component';
import { EmployeeProfileComponent } from 'src/app/pages/employee/employee-profile/employee-profile.component';
import { UpdateAdminComponent } from 'src/app/pages/admin/update-admin/update-admin.component';
import { UpdateEmployeeComponent } from 'src/app/pages/employee/update-employee/update-employee.component';

import { RoleGuardService } from '../../services/role-guard.service'

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [RoleGuardService], data: { expectedRole: 1 } },
    // employee related
    { path: 'all-employees', component: AllEmployeesComponent, canActivate: [RoleGuardService], data: { expectedRole: 1 } },
    { path: 'create-employee', component: AddEmployeeComponent, canActivate: [RoleGuardService], data: { expectedRole: 1 } },
    { path: 'employee-profile', component: EmployeeProfileComponent, canActivate: [RoleGuardService], data: { expectedRole: 3 } },
    { path: 'update-employee/:ID', component: UpdateEmployeeComponent, canActivate: [RoleGuardService], data: { expectedRole: 1 } },
    // admin related 
    { path: 'create-admin', component: AddAdminComponent, canActivate: [RoleGuardService], data: { expectedRole: 1 } },
    { path: 'all-admins', component: AllAdminComponent, canActivate: [RoleGuardService], data: { expectedRole: 1 } },
    { path: 'update-admin/:ID', component: UpdateAdminComponent, canActivate: [RoleGuardService], data: { expectedRole: 1 } },
]