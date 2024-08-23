import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatsComponent } from './chats.component';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule } from 'primeng/paginator';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { RouterModule, Routes } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { SliderModule } from 'primeng/slider'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FileUploadModule } from 'primeng/fileupload';
import {CardModule} from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { ChatComponent } from 'src/app/components/chat/chat.component';

const routes: Routes = [{ path: '', component: ChatsComponent }
];


@NgModule({
  declarations: [
    ChatsComponent
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
    ProgressSpinnerModule,
    CKEditorModule,
    FileUploadModule,
    CardModule,
    CalendarModule,
    ChatComponent
  ],
  exports:[ ChatsComponent]
})
export class ChatsModule { }
