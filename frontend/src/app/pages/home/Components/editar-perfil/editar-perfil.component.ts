import { ChangeDetectorRef, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { AuthState } from 'src/app/state/auth.state';
import { eventoCalendarioState } from 'src/app/state/eventocalendario.state';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent {
  // @Input() usuario !: any
  public usuario: any
  @Output() res: EventEmitter<boolean> = new EventEmitter<boolean>()

  private readonly authState = inject(AuthState);
  private readonly calendarioState = inject(eventoCalendarioState);
  private readonly fb = inject(FormBuilder)
  
  public form!: FormGroup;
  public formEvento!: FormGroup;
  public enviado: boolean = false;
  public loading = false
  public editarPerfil = true

  public imageSrc: string | ArrayBuffer | null = null;
  
  public eventoUser$: Observable<any[]>;
  public vistaDisp: 'tabla' | 'calendario' = 'tabla'
  public abrirAddEvento: boolean = false

  ngOnInit(): void {
    this.usuario = this.authState.getUser()
    this.generateLoginForm();
    this.generateEventoForm()
    this.authState.getUserByEmail(this.usuario.email).pipe(take(1)).subscribe(dat => {
      this.form.setValue(
        {
          email: dat.data.user.email,
          nombre: dat.data.user.nombre,
          apellidos: dat.data.user.apellidos,
          username: dat.data.user.username,
          rol: dat.data.user.rol,
        }
      );
    })
    this.calendarioState.getEventosUser(this.usuario.id)
  }

  constructor(private readonly router: Router, private route: ActivatedRoute) {
    this.setStateSelector();
  }

  private generateLoginForm(): void {
    this.form = this.fb.group({
      email: [{value: '', disabled: true}, [Validators.required]],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      username: ['', Validators.required],
      rol: [null],
    });
  }

  private generateEventoForm(): void {
    this.formEvento = this.fb.group({
      nombre_evento: ['', [Validators.required]],
      fecha_hora: ['', Validators.required],      
    });
  }


  private setStateSelector() {
    this.eventoUser$ = this.calendarioState.eventoUser$;
  }

  public updatePerfil(){
    let perfil = this.form.value;
    this.loading = true;

    this.authState.updateUsuario(perfil)
    this.loading = false
    this.cerrar();     
  }

  public cerrar(): void {
    this.res.emit()
  }

  public volver(){
    this.router.navigate(['/home']);
  }

  public add(){
    this.abrirAddEvento = true
  }

  public cerrarEvento(){
    this.abrirAddEvento = false
  }

  public addEvento(): void {
    let data = this.formEvento.value
    console.log('aqui', data)
    data = {
      ...data,
      id_usuario: this.usuario.id
    }

    this.calendarioState.addEvento(data)
    this.cerrarEvento()
  }

  get email(): AbstractControl | null { return this.form.get('email'); }
  get nombre(): AbstractControl | null { return this.form.get('nombre'); }
  get apellidos(): AbstractControl | null { return this.form.get('apellidos'); }
  get username(): AbstractControl | null { return this.form.get('username'); }
  get rol(): AbstractControl | null { return this.form.get('rol'); }


  get nombre_evento(): AbstractControl | null { return this.formEvento.get('nombre_evento'); }
  get fecha_hora(): AbstractControl | null { return this.formEvento.get('fecha_hora'); }  

  // get password(): AbstractControl | null { return this.form.get('password'); }

}
