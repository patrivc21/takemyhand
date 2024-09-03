import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { Router } from '@angular/router';
import { GenericResponse } from '../interfaces/GenericResponse';
import { EventoCalendarioService } from '../services/eventocalendario.service';
import { IEventoCalendario } from '../interfaces/IEventoCalendario';

import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es';
import timeGridPlugin from '@fullcalendar/timegrid'

interface IEventoCalendarioState {
  allEventos?: CalendarOptions
  loadingCalendario: boolean
  eventoUser?: any[]
}

@Injectable({
    providedIn: 'root'
})
export class eventoCalendarioState {

    private initialState: IEventoCalendarioState = { loadingCalendario: false};

    private _state: BehaviorSubject<IEventoCalendarioState> = new BehaviorSubject(
        this.initialState
    );

    public readonly allEventos$: Observable<CalendarOptions> = this._state
        .asObservable()
        .pipe(map((state) => state && state.allEventos));

    public readonly eventoUser$: Observable<any[]> = this._state
        .asObservable()
        .pipe(map((state) => state && state.eventoUser));

    public readonly loadingCalendario$: Observable<boolean> = this._state
        .asObservable()
        .pipe(map((state) => state && state.loadingCalendario));

    private get state() {
        return this._state.getValue();
    }

    constructor(private service: EventoCalendarioService, private router: Router) { }

    public reset(): void {
        this._state.next(this.initialState);
    }

    public updatePaciente(evento: IEventoCalendario) {
        const data = this.service.updateEvento(evento);
        return data
    }

    
    public borrarEventos(id: number[]): Observable<GenericResponse> {
      const data = this.service.deleteEvento(id)
      return data
    }


    public addEvento(evento: IEventoCalendario) {
      console.log(evento)
      const data = this.service.addEvento(evento);
      data.pipe(take(1)).subscribe((response) => {
        if (response.cod == 200) {
          this.getEventosUser(evento.id_usuario)
        }
      });
      return data;
    }

    public getEventosUser(id:number): Observable<any[]> {
      const data = this.service.getEventosUsuario(id)
      data.pipe(take(1)).subscribe((response) => {
        console.log(response)
        if (response.cod == 200) {
          const eventos = Array.isArray(response.data) ? response.data : [response.data];
          console.log(eventos)
          this._state.next({
            ...this.state,
            eventoUser: eventos
          });
        }
      })
      return data
    }

    public getEventos(id:number): Observable<any> {
      this._state.next({ ...this.state, loadingCalendario: true });
      const data = this.service.getEventosUsuario(id)
      data.pipe(take(1)).subscribe((response) => {
        console.log(response)
        this._state.next({ ...this.state, loadingCalendario: false });
        if (response.cod == 200) {
          let eventos = [];
          if (Array.isArray(response.data)) {
            // Si es un array, mapeamos cada objeto
            eventos = response.data.map(evento => ({
              title: evento.nombre_evento,
              start: evento.fecha_hora_inicio,
              end: evento.fecha_hora_fin
            }));
          } else if (response.data && typeof response.data === 'object') {
            // Si es un solo objeto, lo convertimos en un array de un solo elemento
            eventos = [{
              title: response.data.nombre_evento,
              start: response.data.fecha_hora_inicio,
              end: response.data.fecha_hora_fin
            }];

            console.log('eventos', eventos)
          } 

          let calendarOptions: CalendarOptions = {
            locale: esLocale,
              plugins: [dayGridPlugin, timeGridPlugin],
              initialView: 'dayGridMonth',
              headerToolbar: {
                start: 'prev,next,today',
                center: 'title',
                end: 'dayGridMonth,timeGridWeek,timeGridDay'
              },
              weekends: true,
              events: eventos,
              editable: true,
              selectable: true,
              selectMirror: true,
              dayMaxEvents: true,
              slotEventOverlap: false,
              eventOverlap: false,
          };
          
          console.log('calendarOptions', calendarOptions)

          this._state.next({
            ...this.state,
            allEventos: calendarOptions,
          })
        }
      })
      return data
    }
  
    public getCalendarioEscuela(id: number): Observable<GenericResponse> {
      this._state.next({ ...this.state, loadingCalendario: true });
      const data = this.service.getEventosUsuario(id);
    
      data.pipe(take(1)).subscribe((response) => {
        console.log('Response:', response);
        this._state.next({ ...this.state, loadingCalendario: false });
    
        if (response.code === 200 && response.data) {
          const eventos = response.data || [];  // Asegúrate de que eventos siempre es un array
          let auxiliarDisp = [];
          let eventosPorDia: { [fecha: string]: number } = {};
    
          eventos.forEach(evento => {
            const fechaEvento = evento.fecha_inicio.split('T')[0];
            if (!eventosPorDia[fechaEvento]) {
              eventosPorDia[fechaEvento] = 1;
            } else {
              eventosPorDia[fechaEvento]++;
            }
    
            auxiliarDisp.push({
              title: evento.nombre_evento,
              start: evento.fecha_inicio,
              end: evento.fecha_fin,
              extendedProps: {
                hora: evento.fecha_inicio.split('T')[1].split(':')[0] + ':' + evento.fecha_inicio.split('T')[1].split(':')[1],
                num_evento: eventosPorDia[fechaEvento],
                fecha: fechaEvento
              }
            });
          });
    
          let calendarOptionsDisponib: CalendarOptions = {
            locale: esLocale,
            plugins: [dayGridPlugin, timeGridPlugin],
            initialView: 'dayGridMonth',
            weekends: true,
            events: auxiliarDisp,
            headerToolbar: {
              start: 'prev,next,today',
              center: 'title',
              end: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            slotEventOverlap: false,
            eventOverlap: false,
            editable: true
          };
    
          console.log('Calendar Options:', calendarOptionsDisponib);
    
          this._state.next({
            ...this.state,
            allEventos: calendarOptionsDisponib
          });
        } else {
          console.error('Error: No se encontraron eventos o la respuesta no es válida.');
        }
      });
    
      return data;
    }
    

}