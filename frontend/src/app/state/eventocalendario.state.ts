import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { Router } from '@angular/router';
import { GenericResponse } from '../interfaces/GenericResponse';
import { EventoCalendarioService } from '../services/eventocalendario.service';
import { IEventoCalendario } from '../interfaces/IEventoCalendario';

interface IEventoCalendarioState {
}

@Injectable({
    providedIn: 'root'
})
export class ventoCalendarioState {

    private initialState: IEventoCalendarioState = {};

    private _state: BehaviorSubject<IEventoCalendarioState> = new BehaviorSubject(
        this.initialState
    );

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
      const data = this.service.addEvento(evento);
      data.pipe(take(1)).subscribe((response) => {
        if (response.cod == 200) {
        //   this.getAllComentarios()
        }
      });
      return data;
    }


}