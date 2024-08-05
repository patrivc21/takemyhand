import { ChangeDetectorRef, Component, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { AuthState } from 'src/app/state/auth.state';
import { ProfesionalesState } from 'src/app/state/profesionales.state';
import * as CKEditor from '@ckeditor/ckeditor5-build-classic';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-crear-publicacion',
  templateUrl: './crear-publicacion.component.html',
  styleUrls: ['./crear-publicacion.component.css']
})
export class CrearPublicacionComponent {
  @Output() res: EventEmitter<boolean> = new EventEmitter<boolean>()
  public Editor = CKEditor.default;  
  public editorConfig = {
    toolbar: ['bold', 'italic', 'link']
  };
  @ViewChild('fileUpload') fileUpload: FileUpload;
  private readonly authState = inject(AuthState);
  private readonly fb = inject(FormBuilder)
  private readonly confirmationService = inject(ConfirmationService)
  private readonly profState = inject(ProfesionalesState);
  
  public form!: FormGroup;
  public enviado: boolean = false;

  public usuario: any
  public img: File  
  public img_url: string | ArrayBuffer = null;
  public crearView = true

  ngOnInit(): void {
    this.generateLoginForm();
    this.usuario = this.authState.getUser()
  }

  constructor(private cdr: ChangeDetectorRef) {
    this.setStateSelector();
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
    console.log(data)
    console.log(this.img)

    if(this.usuario.rol == 3){
      this.profState.addPublicacion(this.img, this.usuario.id, data.titulo, data.mensaje)
      this.cerrar()
    }
    
  }

  public cerrar(): void {
    this.res.emit()
  }

  get titulo(): AbstractControl | null { return this.form.get('titulo'); }
  get mensaje(): AbstractControl | null { return this.form.get('mensaje'); }  
  get archivo_adjunto(): AbstractControl | null { return this.form.get('archivo_adjunto') }
}
