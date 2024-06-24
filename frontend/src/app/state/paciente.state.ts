import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { Router } from '@angular/router';
import { GenericResponse } from '../interfaces/GenericResponse';
import { Pacientes } from '../interfaces/Pacientes';
import { PacientesService } from '../services/pacientes.service';

interface IPacientesState {
    allPacientes?: Pacientes[];
}

@Injectable({
    providedIn: 'root'
})
export class PacientesState {

    private initialState: IPacientesState = {};

    private _state: BehaviorSubject<IPacientesState> = new BehaviorSubject(
        this.initialState
    );

    public readonly allPacientes$: Observable<Pacientes[] | undefined> = this._state
        .asObservable()
        .pipe(map((state) => state && state.allPacientes));

    private get state() {
        return this._state.getValue();
    }

    constructor(private service: PacientesService, private router: Router) { }

    public reset(): void {
        this._state.next(this.initialState);
    }


    public getAllPacientes(): Observable<GenericResponse> {
        const data = this.service.getAllPacientes()
        data.pipe(take(1)).subscribe((response) => {
          // console.log(response)
          if (response.cod == 200) {
            this._state.next({
              ...this.state,
              allPacientes: response.data.pacientes
            })
          }
        })
        return data
      }

    public updatePaciente(paciente: Pacientes): void {
        const data = this.service.updatePaciente(paciente);
        data.pipe(take(1)).subscribe((response) => {
            console.log(response);
            if(response.cod==200){
            }
            else {
                return;
            }
            this.getAllPacientes();
        });
    }

    // public borrarPaciente(id: number[]): Observable<GenericResponse> {
    //     const data = this.service.borrarPacientes(id);
    //     return data;
    // }

}