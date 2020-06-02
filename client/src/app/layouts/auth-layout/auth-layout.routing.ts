import { Routes } from '@angular/router';
import { LoginComponent } from 'src/app/pages/auth/login/login.component';
import { ResetComponent } from 'src/app/pages/auth/reset/reset.component';

export const AuthLayoutRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: "full" },
    { path: 'login', component: LoginComponent },
    { path: 'reset-password/:token', component: ResetComponent },
]