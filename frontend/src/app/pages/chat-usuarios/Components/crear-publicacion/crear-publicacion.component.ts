import { ChangeDetectorRef, Component, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { AuthState } from 'src/app/state/auth.state';
import * as CKEditor from '@ckeditor/ckeditor5-build-classic';
import { take } from 'rxjs';

@Component({
  selector: 'app-crear-publicacion',
  templateUrl: './crear-publicacion.component.html',
  styleUrls: ['./crear-publicacion.component.css']
})
export class CrearPublicacionComponent {
  @Output() res: EventEmitter<boolean> = new EventEmitter<boolean>()
  public Editor = CKEditor.default;  
  public editorConfig = {
    toolbar: ['bold', 'italic', 'link', 'mediaEmbed'],
    mediaEmbed: {
      previewsInData: true,
    },
    link: {
      addTargetToExternalLinks: true
    }
  };
  @ViewChild('fileUpload') fileUpload: FileUpload;
  private readonly authState = inject(AuthState);
  private readonly fb = inject(FormBuilder)
  private readonly confirmationService = inject(ConfirmationService)
  
  public form!: FormGroup;
  public enviado: boolean = false;

  public usuario: any
  public img: File  
  public img_url: string | ArrayBuffer = null;
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
      mensaje: ['', Validators.required],      
      archivo_adjunto: ['', [Validators.required]]
    });
  }


  private setStateSelector() {
  }

  public addImage(e: any): void {
    const file = e.files[0];
    this.img = e.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        this.img_url = event.target.result;
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    } else {
      this.quitarImagen();
    }
  }

  public quitarImagen() {
    this.img = null;
    this.img_url = null;
    this.fileUpload.clear();
  }

  public crear(): void {
    let data = this.form.value

    this.authState.addPublicacion(this.img, this.usuario.id, data.titulo, data.mensaje)
    this.cerrar()
  }

  public cerrar(): void {
    this.res.emit()
  }

  get titulo(): AbstractControl | null { return this.form.get('titulo'); }
  get mensaje(): AbstractControl | null { return this.form.get('mensaje'); }  
  get archivo_adjunto(): AbstractControl | null { return this.form.get('archivo_adjunto') }
}
