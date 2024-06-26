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


}