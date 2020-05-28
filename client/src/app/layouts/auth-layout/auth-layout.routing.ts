import { Routes } from '@angular/router';
import { LoginComponent } from 'src/app/pages/auth/login/login.component';

export const AuthLayoutRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: "full" },
    { path: 'login', component: LoginComponent },
]