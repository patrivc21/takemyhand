import { ChangeDetectorRef, Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import { AuthState } from 'src/app/state/auth.state';
import { ProfesionalesState } from 'src/app/state/profesionales.state';
import * as CKEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-respuesta',
  templateUrl: './respuesta.component.html',
  styleUrls: ['./respuesta.component.css']
})
export class RespuestaComponent {
 @Output() res: EventEmitter<boolean> = new EventEmitter<boolean>()
 @Input() id: number
 
 @ViewChild('fileUpload') fileUpload: FileUpload;
  private readonly authState = inject(AuthState);
  private readonly profState = inject(ProfesionalesState);

  private readonly fb = inject(FormBuilder)
  public form!: FormGroup;
  public enviado: boolean = false;
  public img: File  
  public img_url: string | ArrayBuffer = null;
  public crearView = true 
  public usuario: any

  public Editor = CKEditor.default;  
  public editorConfig = {
    toolbar: ['bold', 'italic', 'link']
  };

  ngOnInit(): void {
    this.generateForm();
    this.usuario = this.authState.getUser()
  }

  constructor(private cdr: ChangeDetectorRef) {
    this.setStateSelector();
  }

  private generateForm(): void {
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
    console.log(this.id)

    // if(this.usuario.rol == 3){
      this.profState.addRespuesta(this.img, this.usuario.id, data.titulo, data.mensaje, this.id)
      this.cerrar()
    // }
  }

  public cerrar(): void {
    this.res.emit()
  }

  get titulo(): AbstractControl | null { return this.form.get('titulo'); }
  get mensaje(): AbstractControl | null { return this.form.get('mensaje'); }  
  get archivo_adjunto(): AbstractControl | null { return this.form.get('archivo_adjunto') }

}
