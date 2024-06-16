import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    title: 'Iniciar sesión',
    loadComponent: () => import('./pages/login/login.component').then((c) => c.LoginComponent)
  },
  { 
    path: 'register', 
    loadChildren: () => import('./pages/registro/registro.module').then(m => m.RegistroModule) 
  },
  { 
    path: 'home', 
    canActivate: [AuthGuard], 
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) 
  },
  { 
    path: 'home-admin', 
    canActivate: [AuthGuard], 
    loadChildren: () => import('./pages/home-admin/home-admin.module').then(m => m.HomeAdminModule) 
  },
  { 
    path: 'home-prof', 
    canActivate: [AuthGuard], 
    loadChildren: () => import('./pages/home-profesional/home-profesional.module').then(m => m.HomeProfesionalModule) 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
