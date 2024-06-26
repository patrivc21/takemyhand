import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, catchError, map, shareReplay, throwError } from 'rxjs';
import { GenericResponse } from '../interfaces/GenericResponse';
import { Pacientes } from '../interfaces/Pacientes';

const BACKEND_API = environment.BACKEND_API + "pacientes"

@Injectable({
  providedIn: 'root'
})

export class PacientesService {
  constructor(private http: HttpClient) { }

  public getAllPacientes(): Observable<GenericResponse> {
    return this.http.get<GenericResponse>(`${BACKEND_API}/getAllPacientes`, {}).pipe(
      map((data) => {
        return data
      }),
      catchError(() => {
        return throwError(() => new Error('Error al obtener los pacientes'))
      })
    )
  }

  public updatePaciente(paciente: any):  Observable<GenericResponse> {
    return this.http.put<GenericResponse>(`${BACKEND_API}/updatePaciente`, paciente).pipe(shareReplay());
  } 

  public deletePacientes(ids: number[]): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(`${BACKEND_API}/deletePacientes`, { ids }).pipe(shareReplay());
  }


}