import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { Router } from '@angular/router';
import { GenericResponse } from '../interfaces/GenericResponse';
import { Pacientes } from '../interfaces/Pacientes';
import { PacientesService } from '../services/pacientes.service';
import { RecursosService } from '../services/recursos.service';

interface IRecursosState {
    allRecursos?: any[];
}

@Injectable({
    providedIn: 'root'
})
export class RecursosState {

    private initialState: IRecursosState = {};

    private _state: BehaviorSubject<IRecursosState> = new BehaviorSubject(
        this.initialState
    );

    public readonly allRecursos$: Observable<any[]> = this._state
        .asObservable()
        .pipe(map((state) => state && state.allRecursos));

    private get state() {
        return this._state.getValue();
    }

    constructor(private service: RecursosService, private router: Router) { }

    public reset(): void {
        this._state.next(this.initialState);
    }


    public getAllRecursos(): Observable<GenericResponse> {
        const data = this.service.getAllRecursos()
        data.pipe(take(1)).subscribe((response) => {
          console.log(response)
          if (response.cod == 200) {
            this._state.next({
              ...this.state,
              allRecursos: response.data.recurso
            })
          }
        })
        return data
    }

}