import { ChangeDetectorRef, Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import { AuthState } from 'src/app/state/auth.state';
import * as CKEditor from '@ckeditor/ckeditor5-build-classic';
import { take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { Conditional } from '@angular/compiler';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent {
  @Input() id_publi !: any
  @Output() res: EventEmitter<boolean> = new EventEmitter<boolean>()
  public Editor = CKEditor.default;  
  public editorConfig = {
    toolbar: ['bold', 'italic', 'link']
  };
  @ViewChild('fileUpload') fileUpload: FileUpload;
  private readonly authState = inject(AuthState);
  private readonly authService= inject(AuthService);
  private readonly fb = inject(FormBuilder)
  public form!: FormGroup;
  public enviado: boolean = false;

  public usuario: any
  public img: File  
  public img_url: string | ArrayBuffer = null;
  public crearView = true
  public BACKEND_FILES = environment.BACKEND_FILES


  constructor(private cdr: ChangeDetectorRef) {
    this.setStateSelector();
  }

  ngOnInit(): void {
    this.usuario = this.authState.getUser()
    this.generateLoginForm();
    this.authState.getOnePubli(this.id_publi).pipe(take(1)).subscribe(dat => {
      this.form.patchValue({
        titulo: dat.data.result[0].titulo,
        mensaje: dat.data.result[0].mensaje,
        archivo_adjunto: dat.data.result[0].archivos[0]?.archivo_adjunto || ''
      });

      if (dat.data.result[0].archivos[0]?.archivo_adjunto) {
        this.img_url = this.BACKEND_FILES + '/' + dat.data.result[0].archivos[0].archivo_adjunto;
      } else {
        this.img_url = null; 
      }

    })
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
    console.log('aqui', data)
    this.authService.editPublicacion(this.id_publi, this.img, this.usuario.id, data.titulo, data.mensaje).subscribe(dat => {
    console.log(dat)
    })
    this.cerrar()
  }

  public cerrar(): void {
    this.res.emit()
  }

  get titulo(): AbstractControl | null { return this.form.get('titulo'); }
  get mensaje(): AbstractControl | null { return this.form.get('mensaje'); }  
  get archivo_adjunto(): AbstractControl | null { return this.form.get('archivo_adjunto') }
  
}
