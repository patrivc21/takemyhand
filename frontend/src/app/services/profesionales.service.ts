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

  public deleteProfesionales(ids: number[]): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(`${BACKEND_API}/deleteProfesionales`, { ids }).pipe(shareReplay());
  }


  public addPublicacion(archivo_adjunto: File, id_profesional: number, titulo: string, mensaje: string): Observable<GenericResponse> {

    const formData = new FormData();
    formData.append('id_profesional', id_profesional.toString());
    formData.append('titulo', titulo ? titulo : '');
    formData.append('mensaje', mensaje ? mensaje : '');
    if (archivo_adjunto != null) formData.append('archivo_adjunto', archivo_adjunto, archivo_adjunto.name);
    console.log(formData);

    return this.http.post<GenericResponse>(`${BACKEND_API}/addPublicacion`, formData).pipe(shareReplay());
  }

  public getAllComentarios(): Observable<GenericResponse> {
    return this.http.get<GenericResponse>(`${BACKEND_API}/getAllPublis`, {}).pipe(
      map((data) => {
        return data
      }),
      catchError(() => {
        return throwError(() => new Error('Error al obtener los comentarios'))
      })
    )
  }

  public getOneComent(id:number): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(`${BACKEND_API}/getOnePubli`, {id}).pipe(
      map((data) => {
        return data
      }),
      catchError(() => {
        return throwError(() => new Error('Error al obtener el comentario'))
      })
    )
  }

  public buscar(fechaInicio, fechaFin): Observable<GenericResponse> {
    const datos = {
      fechaInicio, fechaFin
    }
    return this.http.post<GenericResponse>(`${BACKEND_API}/buscar`, datos).pipe(
      map((data) => {
        return data
      }),
      catchError(() => {
        return throwError(() => new Error('Error al obtener el comentario'))
      })
    )
  }
  
  public addRecursos(nombre_archivo: File[], titulo: string, contenido: string, tipo: string, url_video: string): Observable<GenericResponse> {
    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('contenido', contenido);
    formData.append('tipo', tipo);
    formData.append('url_video', url_video);
    nombre_archivo.forEach((file, index) => {
      formData.append(`nombre_archivo_${index}`, file, file.name);
    });
    return this.http.post<GenericResponse>(`${BACKEND_API}/addRecursos`, formData).pipe(shareReplay());
  }


}