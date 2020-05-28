import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthLayoutRoutes } from './auth-layout.routing';
// components imports
import { LoginComponent } from 'src/app/pages/auth/login/login.component';
import { ResetComponent } from 'src/app/pages/auth/reset/reset.component';
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
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent,
    ResetComponent,
  ],
  exports: [
    LoginComponent,
    ResetComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(AuthLayoutRoutes),
    MatSliderModule,
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
  ]
})
export class AuthLayoutModule { }
