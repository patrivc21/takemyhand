import {Injectable} from '@angular/core';
import {HttpHandler, HttpRequest, HttpInterceptor} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {
  constructor (private toastService: MessageService) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError(error => {
        let errorMessage = '';
        if (error instanceof ErrorEvent) {
          // client-side error
          errorMessage = error.error.message;
        } else {
          // backend error
          errorMessage = error.msg || error.statusText;
        }
        
        this.toastService.add({severity:'error', summary:'Error', detail: errorMessage});
        return throwError(errorMessage);
      })
    );
  }
}
