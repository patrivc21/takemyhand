import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacientesComponent } from './pacientes.component';
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
import { SliderModule } from 'primeng/slider'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { ProgressSpinnerModule } from 'primeng/progressspinner';

const routes: Routes = [{ path: '', component: PacientesComponent }];


@NgModule({
  providers: [ConfirmationService],
  declarations: [
    PacientesComponent
  ],
  imports: [
    CommonModule,
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
    SliderModule,
    InputTextareaModule,
    ProgressSpinnerModule
  ]
})
export class PacientesModule { }
