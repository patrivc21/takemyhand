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
import { ChatPrivado } from '../interfaces/ChatPrivado';
import { ChatService } from '../services/chatprivado.service';

interface IChatPrivadoState {
  allChat?: ChatPrivado[]
}

@Injectable({
    providedIn: 'root'
})
export class ChatState {

    private initialState: IChatPrivadoState = {};

    private _state: BehaviorSubject<IChatPrivadoState> = new BehaviorSubject(
        this.initialState
    );

    public readonly allChat$: Observable<ChatPrivado[]> = this._state
        .asObservable()
        .pipe(map((state) => state && state.allChat));

    private get state() {
        return this._state.getValue();
    }

    constructor(private service: ChatService, private router: Router) { }

    public reset(): void {
        this._state.next(this.initialState);
    }


    public addChat(chat: ChatPrivado) {
      const data = this.service.addChat(chat);
      data.pipe(take(1)).subscribe((response) => {
        if (response.cod == 200) {
          this.getChatPrivado(chat.id_emisor, chat.id_receptor)
        }
      });
      return data;
    }

    public getChatPrivado(id_emisor:number, id_receptor): Observable<any[]> {
      const data = this.service.getChatPrivado(id_emisor, id_receptor)
      data.pipe(take(1)).subscribe((response) => {
        console.log(response)
        if (response.cod == 200) {
        
           let mensajes = response.data.map((msg: any) => {
                return {
                    id_emisor: msg.id_emisor,
                    id_receptor: msg.id_receptor,
                    mensaje: msg.mensaje,
                    fecha_hora: msg.fecha_hora
                };
            });

            this._state.next({
                ...this.state,
                allChat: mensajes
            });
        }
      })
      return data
    }


}