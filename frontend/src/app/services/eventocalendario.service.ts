import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, catchError, map, shareReplay, throwError } from 'rxjs';
import { GenericResponse } from '../interfaces/GenericResponse';
import { IEventoCalendario } from '../interfaces/IEventoCalendario';

const BACKEND_API = environment.BACKEND_API + "evento"

@Injectable({
  providedIn: 'root'
})

export class EventoCalendarioService {
  constructor(private http: HttpClient) { }

  public deleteEvento(ids: number[]): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(`${BACKEND_API}/deleteEventoCalendario`, { ids }).pipe(shareReplay());
  }

  public updateEvento(evento: IEventoCalendario):  Observable<GenericResponse> {
    return this.http.post<GenericResponse>(`${BACKEND_API}/updateEventoCalendario`, evento).pipe(shareReplay());
  } 

  public addEvento (evento: IEventoCalendario):  Observable<GenericResponse> {
    return this.http.post<GenericResponse>(`${BACKEND_API}/addEventoCalendario`, evento).pipe(shareReplay());
  }

  public getEventosUsuario(id:number): Observable<any> {
    return this.http.post<any>(`${BACKEND_API}/getEventosUsuario`, {id}).pipe(
      map((data) => {
        return data
      }),
      catchError(() => {
        return throwError(() => new Error('Error al obtener los eventos del usuario'))
      })
    )
  }


}