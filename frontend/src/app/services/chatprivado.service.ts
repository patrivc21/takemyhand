import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, catchError, map, shareReplay, throwError } from 'rxjs';
import { GenericResponse } from '../interfaces/GenericResponse';
import { IEventoCalendario } from '../interfaces/IEventoCalendario';
import { ChatPrivado } from '../interfaces/ChatPrivado';

const BACKEND_API = environment.BACKEND_API + "chat"

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  constructor(private http: HttpClient) { }

  public addChat (chat: ChatPrivado):  Observable<GenericResponse> {
    return this.http.post<GenericResponse>(`${BACKEND_API}/addChatPrivado`, chat).pipe(shareReplay());
  }

  public getChatPrivado(id_emisor:number, id_receptor: number): Observable<any> {
    return this.http.post<any>(`${BACKEND_API}/getOneChatPrivado`, {id_emisor, id_receptor}).pipe(
      map((data) => {
        return data
      }),
      catchError(() => {
        return throwError(() => new Error('Error al obtener el chat'))
      })
    )
  }


}