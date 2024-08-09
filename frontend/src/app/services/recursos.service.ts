import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, catchError, map, shareReplay, throwError } from 'rxjs';
import { GenericResponse } from '../interfaces/GenericResponse';

const BACKEND_API = environment.BACKEND_API + "recurso"

@Injectable({
  providedIn: 'root'
})

export class RecursosService {
  constructor(private http: HttpClient) { }

  public getAllRecursos(): Observable<GenericResponse> {
    return this.http.get<GenericResponse>(`${BACKEND_API}/getAllRecursos`, {}).pipe(
      map((data) => {
        return data
      }),
      catchError(() => {
        return throwError(() => new Error('Error al obtener los recursos'))
      })
    )
  }


}