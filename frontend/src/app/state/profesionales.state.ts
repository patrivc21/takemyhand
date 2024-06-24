import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { Router } from '@angular/router';
import { GenericResponse } from '../interfaces/GenericResponse';
import { Profesionales } from '../interfaces/Profesionales';
import { ProfesionalesService } from '../services/profesionales.service';

interface IProfesionalesState {
    allProfesionales?: Profesionales[];
}

@Injectable({
    providedIn: 'root'
})
export class ProfesionalesState {

    private initialState: IProfesionalesState = {};

    private _state: BehaviorSubject<IProfesionalesState> = new BehaviorSubject(
        this.initialState
    );

    public readonly allProfesionales$: Observable<Profesionales[] | undefined> = this._state
        .asObservable()
        .pipe(map((state) => state && state.allProfesionales));

    private get state() {
        return this._state.getValue();
    }

    constructor(private service: ProfesionalesService, private router: Router) { }

    public reset(): void {
        this._state.next(this.initialState);
    }


    public getAllProfesionales(): Observable<GenericResponse> {
        const data = this.service.getAllProfesionales()
        data.pipe(take(1)).subscribe((response) => {
          // console.log(response)
          if (response.cod == 200) {
            this._state.next({
              ...this.state,
              allProfesionales: response.data.result
            })
          }
        })
        return data
      }

    // public updatePaciente(paciente: Pacientes): void {
    //     const data = this.service.updatePaciente(paciente);
    //     data.pipe(take(1)).subscribe((response) => {
    //         console.log(response);
    //         if(response.cod==200){
    //         }
    //         else {
    //             return;
    //         }
    //         this.getAllPacientes();
    //     });
    // }

    // public borrarPaciente(id: number[]): Observable<GenericResponse> {
    //     const data = this.service.borrarPacientes(id);
    //     return data;
    // }

}