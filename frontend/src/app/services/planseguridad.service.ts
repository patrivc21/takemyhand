import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, catchError, map, shareReplay, throwError } from 'rxjs';
import { GenericResponse } from '../interfaces/GenericResponse';

const BACKEND_API = environment.BACKEND_API + "plan"

@Injectable({
  providedIn: 'root'
})

export class PlanService {
  constructor(private http: HttpClient) { }

  public getOnePlan(id_usuario: number): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(`${BACKEND_API}/getOnePlan`, { id_usuario }).pipe(shareReplay());
  }


  public addPlan(nombre_archivo: File[], id_usuario: number, lugares: string[], personas: string[], hobbies: string[]): Observable<GenericResponse> {

    const formData = new FormData();
    formData.append('id_usuario', id_usuario.toString());
    formData.append('lugares', lugares ? lugares.join(',') : '');
    formData.append('personas', personas ? personas.join(',') : '');
    formData.append('hobbies', hobbies ? hobbies.join(',') : '');

    if (nombre_archivo) {
        let i = 0;
        const fileListArray: File[] = Array.from(nombre_archivo);

        fileListArray.forEach(image => {
            formData.append('image' + i, image, image.name);
            i++;
        })

        console.log(formData)
    }
    else {
        console.log('El valor proporcionado para la imagen no es un archivo válido.');
    }

    return this.http.post<GenericResponse>(`${BACKEND_API}/addPlan`, formData).pipe(shareReplay());
}


}