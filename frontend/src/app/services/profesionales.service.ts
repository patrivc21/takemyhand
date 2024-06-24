import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, catchError, map, shareReplay, throwError } from 'rxjs';
import { GenericResponse } from '../interfaces/GenericResponse';
import { Profesionales } from '../interfaces/Profesionales';

const BACKEND_API = environment.BACKEND_API + "profesionales"

@Injectable({
  providedIn: 'root'
})

export class ProfesionalesService {
  constructor(private http: HttpClient) { }

  public getAllProfesionales(): Observable<GenericResponse> {
    return this.http.get<GenericResponse>(`${BACKEND_API}/getAllProfesionales`, {}).pipe(
      map((data) => {
        return data
      }),
      catchError(() => {
        return throwError(() => new Error('Error al obtener los profesionales'))
      })
    )
  }

//   public updatePaciente(paciente: Pacientes):  Observable<GenericResponse> {
//     return this.http.put<GenericResponse>(`${BACKEND_API}/updatePaciente`, paciente).pipe(shareReplay());
// }


}