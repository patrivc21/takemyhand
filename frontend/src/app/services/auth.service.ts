import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserLogin } from '../interfaces/Usuarios';
import { shareReplay } from 'rxjs';
import { GenericResponse } from '../interfaces/GenericResponse';

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

}