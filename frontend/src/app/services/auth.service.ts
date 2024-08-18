import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserLogin } from '../interfaces/Usuarios';
import { Observable, catchError, map, shareReplay, throwError } from 'rxjs';
import { GenericResponse } from '../interfaces/GenericResponse';
import { IRoles } from '../interfaces/IRoles';

const BACKEND_API = environment.BACKEND_API + "usuarios"

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient) { }

  public login = (data: UserLogin) => {
    return this.http.post<GenericResponse>(`${BACKEND_API}/login`, data).pipe(shareReplay());
  }

  public register = (data: any) => {
    return this.http.post<GenericResponse>(`${BACKEND_API}/register`, data).pipe(shareReplay());
  }

  public getUsers = () => {
    return this.http.get<GenericResponse>(`${BACKEND_API}/getAllUsers`).pipe(shareReplay());
  }

  public getRolesUsuarios(): Observable<IRoles[]> {
    return this.http.get<GenericResponse>(`${BACKEND_API}/getAllRoles`).pipe(
      map((response) => response.data),
      
      catchError(() => {
        return throwError(() => new Error('Error al ver los roles'));
      })
    );
  }


  public updateUser(user: any):  Observable<GenericResponse> {
    return this.http.put<GenericResponse>(`${BACKEND_API}/updateUsuario`, user).pipe(shareReplay());
  } 

  public getUserByEmail(email: string): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(`${BACKEND_API}/getUserByEmail`, {email}).pipe(shareReplay());
  }

  public getAllUsersExceptMe(id: number): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(`${BACKEND_API}/getAllUsersExceptMe`, {id}).pipe(shareReplay());
  }



  public addPublicacion(archivo_adjunto: File, id_usuario: number, titulo: string, mensaje: string): Observable<GenericResponse> {

    const formData = new FormData();
    formData.append('id_usuario', id_usuario.toString());
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


  public addRespuesta(archivo_adjunto: File, id_usuario: number, titulo: string, mensaje: string, id_hilo: number, ): Observable<GenericResponse> {

    const formData = new FormData();
    formData.append('id_usuario', id_usuario.toString());
    formData.append('titulo', titulo ? titulo : '');
    formData.append('mensaje', mensaje ? mensaje : '');
    formData.append('id_hilo', id_hilo.toString());
    if (archivo_adjunto != null) formData.append('archivo_adjunto', archivo_adjunto, archivo_adjunto.name);
    console.log(formData);

    return this.http.post<GenericResponse>(`${BACKEND_API}/addRespuesta`, formData).pipe(shareReplay());
  }

  public getRespuestas(id:number): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(`${BACKEND_API}/getRespuestas`, {id}).pipe(
      map((data) => {
        return data
      }),
      catchError(() => {
        return throwError(() => new Error('Error al obtener las respuestas'))
      })
    )
  }

}