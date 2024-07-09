import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { Router } from '@angular/router';
import { GenericResponse } from '../interfaces/GenericResponse';
import { Pacientes } from '../interfaces/Pacientes';
import { PacientesService } from '../services/pacientes.service';
import { FormularioService } from '../services/formulario.service';

interface IFormularioState {
    onePlan?: any;
}

@Injectable({
    providedIn: 'root'
})
export class FormularioState {

    private initialState: IFormularioState = {};

    private _state: BehaviorSubject<IFormularioState> = new BehaviorSubject(
        this.initialState
    );

    public readonly onePlan$: Observable<any> = this._state
        .asObservable()
        .pipe(map((state) => state && state.onePlan));

    private get state() {
        return this._state.getValue();
    }

    constructor(private service: FormularioService, private router: Router) { }

    public reset(): void {
        this._state.next(this.initialState);
    }


    public getOnePlan(id:number): Observable<GenericResponse> {
        const data = this.service.getOnePlan(id)
        data.pipe(take(1)).subscribe((response) => {
          // console.log(response)
          if (response.cod == 200) {
            this._state.next({
              ...this.state,
              onePlan: response.data.plan
            })
          }
        })
        return data
      }


}