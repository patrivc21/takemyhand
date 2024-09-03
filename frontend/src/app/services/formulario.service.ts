import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, catchError, map, shareReplay, throwError } from 'rxjs';
import { GenericResponse } from '../interfaces/GenericResponse';
import { Pacientes } from '../interfaces/Pacientes';

const BACKEND_API = environment.BACKEND_API + "cuestionarios"

@Injectable({
  providedIn: 'root'
})

export class FormularioService {
  constructor(private http: HttpClient) { }

  public enviarRespuestas(id_usuario: number, cuestionario: string[]): Observable<GenericResponse> {

    return this.http.post<GenericResponse>(`${BACKEND_API}/cuestionarioPlutchik`, { id_usuario, cuestionario }).pipe(shareReplay());
  }

  // public getOnePlan(id: number): Observable<GenericResponse> {
  //   return this.http.post<GenericResponse>(`${BACKEND_API}/getOnePlan`, { id }).pipe(shareReplay());
  // }

}