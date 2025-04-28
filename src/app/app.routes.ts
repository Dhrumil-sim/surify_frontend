import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/components/login/login.component';

export const routes: Routes = [
  { path: 'dashboard', component: LoginComponent },
  // Ensure DashboardComponent is created
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
