import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { AuthState } from 'src/app/state/auth.state';
import * as CKEditor from '@ckeditor/ckeditor5-build-classic';
import { FileUpload } from 'primeng/fileupload';
import { ProfesionalesState } from 'src/app/state/profesionales.state';

@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.component.html',
  styleUrls: ['./recursos.component.css']
})
export class RecursosComponent {
  @ViewChild('fileUpload') fileUpload: FileUpload;
  public Editor = CKEditor.default;  

  public editorConfig = {
    toolbar: ['bold', 'italic', 'link']
  };
  
  private readonly authState = inject(AuthState);
  private readonly fb = inject(FormBuilder)
  private readonly confirmationService = inject(ConfirmationService)  
  private readonly profesionalState = inject(ProfesionalesState);

  
  public form!: FormGroup;
  public enviado: boolean = false;

  public usuario: any
  public img: File  
  public img_urls: string[] = [];
  public img_files: File[] = [];
  public crearView = true

  constructor(private cdr: ChangeDetectorRef) {
    this.setStateSelector();
  }

  ngOnInit(): void {
    this.generateLoginForm();
    this.usuario = this.authState.getUser()
    console.log(this.usuario)
  }

  private generateLoginForm(): void {
    this.form = this.fb.group({
      titulo: ['', [Validators.required]],
      contenido: ['', Validators.required],      
      archivo_adjunto: ['', []],
      url_video: ['', []]
    });
  }


  private setStateSelector() {
  }


  addImages(event: any): void {
    const files = event.files;
    this.img_files = files;
    this.img_urls = [];
    
    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.img_urls.push(e.target.result);
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    });
  }

  quitarImagen(index: number): void {
    this.img_urls.splice(index, 1);
    this.img_files.splice(index, 1);
    this.cdr.detectChanges();
  }

  crear() {
    console.log(this.img_files)
      const { titulo, contenido, url_video } = this.form.value;
      console.log(this.img_files, titulo, contenido)
      this.profesionalState.addRecurso(this.img_files, titulo, contenido, 'image', url_video)
  }


  get titulo(): AbstractControl | null { return this.form.get('titulo'); }
  get contenido(): AbstractControl | null { return this.form.get('contenido'); }  
  get archivo_adjunto(): AbstractControl | null { return this.form.get('archivo_adjunto') }
  get url_video(): AbstractControl | null { return this.form.get('url_video') }
}
