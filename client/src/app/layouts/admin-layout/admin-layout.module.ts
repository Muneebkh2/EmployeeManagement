import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { FormsModule } from '@angular/forms';
// components imports
import { AllEmployeesComponent } from '../../pages/employee/all-employees/all-employees.component';
import { AddEmployeeComponent } from '../../pages/employee/add-employee/add-employee.component';
import { AddAdminComponent } from '../../pages/admin/add-admin/add-admin.component';
import { AllAdminComponent } from '../../pages/admin/all-admin/all-admin.component';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { EmployeeProfileComponent } from '../../pages/employee/employee-profile/employee-profile.component';

// angular material imports
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';

// ant design imports
import { NzModalModule } from 'ng-zorro-antd/modal';

@NgModule({
  declarations: [
    AllEmployeesComponent,
    AddEmployeeComponent,
    AddAdminComponent,
    AllAdminComponent,
    DashboardComponent,
    EmployeeProfileComponent
  ],
  exports: [
    AllEmployeesComponent,
    AddEmployeeComponent,
    AddAdminComponent,
    AllAdminComponent,
    DashboardComponent,
    EmployeeProfileComponent
  ],
  imports: [
    RouterModule.forChild(AdminLayoutRoutes),
    CommonModule,
    FormsModule,
    // angular material
    MatSliderModule,
    MatSelectModule,
    MatIconModule,
    MatCheckboxModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatMenuModule,
    MatToolbarModule,
    MatTableModule,
    // ant design imports 
    NzModalModule
  ]
})
export class AdminLayoutModule { }
