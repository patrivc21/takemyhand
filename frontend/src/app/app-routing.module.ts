import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AdminGuard } from './guards/admin.guard';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    title: 'Iniciar sesión',
    loadComponent: () => import('./pages/login/login.component').then((c) => c.LoginComponent)
  },
  { 
    path: 'register', 
    title: 'TMH • Registro',
    loadChildren: () => import('./pages/registro/registro.module').then(m => m.RegistroModule) 
  },
  { 
    path: 'home', 
    title: 'TMH • Homepage',
    canActivate: [AuthGuard], 
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) 
  },
  { 
    path: 'home-admin', 
    canActivate: [AdminGuard], 
    title: 'TMH • Homepage Administrador',
    // component: NavigationComponent,
    loadChildren: () => import('./pages/home-admin/home-admin.module').then(m => m.HomeAdminModule) 
  },
  { 
    path: 'pacientes', 
    // canActivate: [AuthGuard], 
    title: 'TMH • Pacientes',
    loadChildren: () => import('./pages/pacientes/pacientes.module').then(m => m.PacientesModule) 
  },
  { 
    path: 'profesionales', 
    title: 'TMH • Profesionales',
    // canActivate: [AuthGuard], 
    loadChildren: () => import('./pages/profesionales/profesionales.module').then(m => m.ProfesionalesModule) 
  },
  { 
    path: 'formulario', 
    title: 'TMH • Formulario',
    // canActivate: [AuthGuard], 
    loadChildren: () => import('./pages/formulario/formulario.module').then(m => m.FormularioModule) 
  },
  { 
    path: 'foroprofesionales', 
    title: 'TMH • Foro Profesionales',
    canActivate: [AuthGuard], 
    loadChildren: () => import('./pages/chat-profesionales/chat-profesionales.module').then(m => m.ChatProfesionalesModule) 
  },
  { 
    path: 'forousuarios', 
    title: 'TMH • Foro Usuarios',
    canActivate: [AuthGuard], 
    loadChildren: () => import('./pages/chat-usuarios/chat-usuarios.module').then(m => m.ChatUsuariosModule) 
  },
  { 
    path: 'recursos', 
    title: 'TMH • Novedades',
    canActivate: [AuthGuard], 
    loadChildren: () => import('./pages/recursos/recursos.module').then(m => m.RecursosModule) 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
