import { Routes } from '@angular/router';

import { AllEmployeesComponent } from 'src/app/pages/employee/all-employees/all-employees.component';
import { AddEmployeeComponent } from 'src/app/pages/employee/add-employee/add-employee.component';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { AddAdminComponent } from 'src/app/pages/admin/add-admin/add-admin.component';
import { AllAdminComponent } from 'src/app/pages/admin/all-admin/all-admin.component';
import { EmployeeProfileComponent } from 'src/app/pages/employee/employee-profile/employee-profile.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'all-employees', component: AllEmployeesComponent },
    { path: 'create-employee', component: AddEmployeeComponent },
    { path: 'create-admin', component: AddAdminComponent },
    { path: 'all-admins', component: AllAdminComponent },
    { path: 'employee-profile', component: EmployeeProfileComponent },
]