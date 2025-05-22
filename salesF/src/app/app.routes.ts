import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  {
    path: 'products',
    loadComponent: () => import('./pages/product-list/product-list.component').then(m => m.ProductListComponent)
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
 {
    path: 'clients',
    loadComponent: () => import('./pages/client-create/client-create.component').then(m => m.ClientCreateComponent)
  },  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
  { path: 'signup', loadComponent: () => import('./pages/signup/signup.component').then(m => m.SignupComponent) },
];
