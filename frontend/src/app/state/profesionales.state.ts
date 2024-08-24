import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { Router } from '@angular/router';
import { GenericResponse } from '../interfaces/GenericResponse';
import { Profesionales } from '../interfaces/Profesionales';
import { ProfesionalesService } from '../services/profesionales.service';
import { RecursosState } from './recurso.state';

interface IProfesionalesState {
    allProfesionales?: Profesionales[];
    allPublis?: any[];
    onePubli?: any;
    allCiudades?: any[];
    allRespuestas?: any[]
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

    public readonly allPublis$: Observable<any[]> = this._state
        .asObservable()
        .pipe(map((state) => state && state.allPublis));

    public readonly onePubli$: Observable<any> = this._state
        .asObservable()
        .pipe(map((state) => state && state.onePubli));

    public readonly allCiudades$: Observable<any[]> = this._state
        .asObservable()
        .pipe(map((state) => state && state.allCiudades));

    public readonly allRespuestas$: Observable<any[]> = this._state
        .asObservable()
        .pipe(map((state) => state && state.allRespuestas));

    private get state() {
        return this._state.getValue();
    }

    constructor(private service: ProfesionalesService, private router: Router, private recursoState: RecursosState,) { }

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

    
    public borrarProfesionales(id: number[]): Observable<GenericResponse> {
      const data = this.service.deleteProfesionales(id)
      this.getAllProfesionales()
      return data
    }


    public addPublicacion(archivo_adjunto: any, id_usuario: number, titulo: string, mensaje: string) {
      const data = this.service.addPublicacion(archivo_adjunto, id_usuario, titulo, mensaje);
  
      data.pipe(take(1)).subscribe((response) => {
        if (response.cod == 200) {
          this.getAllComentarios()
        }
      });
      return data;
    }

    public getAllComentarios(): Observable<GenericResponse> {
      const data = this.service.getAllComentarios()
      data.pipe(take(1)).subscribe((response) => {
        console.log('resp', response)
        if (response.cod == 200) {
          this._state.next({
            ...this.state,
            allPublis: response.data.result
          })
        }
      })
      return data
    }

    public getOnePubli(id:number): Observable<GenericResponse> {
      const data = this.service.getOneComent(id)
      data.pipe(take(1)).subscribe((response) => {
        console.log(response)
        if (response.cod == 200) {
          this._state.next({
            ...this.state,
            onePubli: response.data.result
          })
        }
      })
      return data
    }

    public search(fecha: any, fecha2: any){
      const data = this.service.buscar(fecha, fecha2);
      data.pipe(take(1)).subscribe((response) => {
        if(response.cod !== 200){
            return;
        }

        this._state.next({
            ...this.state,
            allPublis: response.data.result
        })
      })
      return data;
    }

    public addRecurso(archivo_adjunto: any, titulo: string, contenido: string, tipo: string, url_video: string) {
      const data = this.service.addRecursos(archivo_adjunto, titulo, contenido, tipo, url_video);
      data.pipe(take(1)).subscribe((response) => {
        if (response.cod == 200) {
          this.recursoState.getAllRecursos()
        }
      });
      return data;
    }

    public getCiudades(): Observable<GenericResponse> {
      const data = this.service.getCiudades()
      data.pipe(take(1)).subscribe((response) => {
        console.log(response)
        if (response.cod == 200) {
          this._state.next({
            ...this.state,
            allCiudades: response.data
          })
        }
      })
      return data
    }

    public getProfByCiudad(ciudad: string){
      const data = this.service.getProfByCiudad(ciudad);
      data.pipe(take(1)).subscribe((response) => {
        if(response.cod == 200){
          this._state.next({
            ...this.state,
            allProfesionales: response.data.result
        })
        }
      })
      return data;
    }

    public addRespuesta(archivo_adjunto: any, id_usuario: number, titulo: string, mensaje: string, id_hilo: number) {
      const data = this.service.addRespuesta(archivo_adjunto, id_usuario, titulo, mensaje, id_hilo);
  
      data.pipe(take(1)).subscribe((response) => {
        if (response.cod == 200) {
          this.getRespuestas(id_hilo)
        }
      });
      return data;
    }

    public getRespuestas(id: number){
      const data = this.service.getRespuestas(id);
      data.pipe(take(1)).subscribe((response) => {
        console.log(response)
        if(response.cod == 200){
          this._state.next({
            ...this.state,
            allRespuestas: response.data.result
          })
        }
      })
      return data;
    }
}