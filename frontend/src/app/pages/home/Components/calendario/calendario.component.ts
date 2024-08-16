import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Observable, take } from 'rxjs';
import { AuthState } from 'src/app/state/auth.state';
import { eventoCalendarioState } from 'src/app/state/eventocalendario.state';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  private readonly authState = inject(AuthState);
  private readonly calendarioState = inject(eventoCalendarioState);
  private readonly fb = inject(FormBuilder)
  
  public allEventos$: Observable<CalendarOptions>;
  public loadingCalendario$: Observable<boolean>;
  public usuario: any
  public options: any

  public mostrarTodos: { [fecha: string]: boolean } = {};

  ngOnInit(): void {
    this.usuario = this.authState.getUser()
    this.calendarioState.getEventos(this.usuario.id).pipe(take(1)).subscribe(response => {
    });
  }
  

  constructor() {
    this.setStateSelector();
  }

  private setStateSelector() {
    this.allEventos$ = this.calendarioState.allEventos$;
  }

 
  


}
