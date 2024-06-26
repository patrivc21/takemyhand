import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule } from 'primeng/paginator';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MultiSelectModule } from 'primeng/multiselect';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { RouterModule, Routes } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { RippleModule } from 'primeng/ripple';
import { MenuModule } from 'primeng/menu';
import { EditarPerfilComponent } from './Components/editar-perfil/editar-perfil.component';

const routes: Routes = [{ path: '', component: HomeComponent },
  {path: 'editar', component: EditarPerfilComponent}
];


@NgModule({
  providers: [ConfirmationService],
  declarations: [
    HomeComponent,
    EditarPerfilComponent
  ],
  imports: [
    CommonModule,
    BadgeModule,
    MenuModule,
    AvatarModule,
    RippleModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    PaginatorModule,
    DropdownModule,
    InputSwitchModule,
    ConfirmDialogModule,
    MultiSelectModule,
    CascadeSelectModule,
    RouterModule.forChild(routes),
    PasswordModule,
    MenubarModule
  ]
})
export class HomeModule { }
