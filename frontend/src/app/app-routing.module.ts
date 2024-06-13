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
  { path: 'register', loadChildren: () => import('./pages/registro/registro.module').then(m => m.RegistroModule) },
  { path: 'home', canActivate: [AuthGuard], loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
