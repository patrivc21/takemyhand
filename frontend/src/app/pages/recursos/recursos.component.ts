import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthState } from 'src/app/state/auth.state';
import { RecursosState } from 'src/app/state/recurso.state';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.component.html',
  styleUrls: ['./recursos.component.css']
})
export class RecursosComponent {
  public allRecursos$: Observable<any[]>
  public usuario: any
  public id_usuario: number
  public BACKEND_FILES = environment.BACKEND_FILES

  ngOnInit(): void {
    this.usuario = this.authState.getUser()
    this.iniciar()
  }

  constructor(private router: Router, private authState: AuthState, private recursoState: RecursosState, private sanitizer: DomSanitizer,) {
    this.setStateSelector()
  }

  private setStateSelector() {
    this.allRecursos$ = this.recursoState.allRecursos$
  }

  public iniciar(){
    this.recursoState.getAllRecursos()
  }

  public getFileUrl(fileName: string): string {
    return `${this.BACKEND_FILES}/${fileName}`;
  }

  public getFileType(fileName: string): string {
    const extension = fileName.split('.').pop().toLowerCase();
    if (['png', 'jpg', 'jpeg', 'gif'].includes(extension)) {
      return 'image';
    } else if (['mp4', 'webm', 'ogg'].includes(extension)) {
      return 'video';
    } else {
      return 'default'; // Para otros tipos de archivos
    }
  }

  public getVideoIframe(url) {
    var video, results;

    if (url === null) {
      return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video = (results === null) ? url : results[1];

    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);
  }

  public volver(){
    this.router.navigate(['/home']);
  }

}
