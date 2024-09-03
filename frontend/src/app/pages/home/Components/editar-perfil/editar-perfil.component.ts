import { ChangeDetectorRef, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { EventoCalendarioService } from 'src/app/services/eventocalendario.service';
import { ProfesionalesService } from 'src/app/services/profesionales.service';
import { AuthState } from 'src/app/state/auth.state';
import { eventoCalendarioState } from 'src/app/state/eventocalendario.state';
import { ProfesionalesState } from 'src/app/state/profesionales.state';

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
  private readonly calendarioService = inject(EventoCalendarioService);
  private readonly fb = inject(FormBuilder)
  private readonly profService = inject(ProfesionalesService);
  
  public form!: FormGroup;
  public formEvento!: FormGroup;
  public formEditEvento!: FormGroup;
  public formUbicacion!: FormGroup;
  public enviado: boolean = false;
  public loading = false
  public editarPerfil = true

  public imageSrc: string | ArrayBuffer | null = null;
  
  public eventoUser$: Observable<any[]>;
  public vistaDisp: 'tabla' | 'calendario' = 'tabla'
  public abrirAddEvento: boolean = false
  public editarClinica: boolean = false
  public abrirEditEvento: boolean

  public evntosSeleccionados: number[] = [];
  public eventoId: number; 

  ngOnInit(): void {
    this.usuario = this.authState.getUser()
    this.generateLoginForm();
    this.generateEventoForm()
    this.generateUbicacionForm()
    this.authState.getUserByEmail(this.usuario.email).pipe(take(1)).subscribe(dat => {
        this.form.setValue(
          {
            email: dat.data.user.email,
            nombre: dat.data.user.nombre,
            apellidos: dat.data.user.apellidos,
            username: dat.data.user.username,
            rol: dat.data.user.rol
          }
        );
    })
    this.calendarioState.getEventosUser(this.usuario.id)
    this.profService.getOneProfesional(this.usuario.id).subscribe(dat => {
        this.formUbicacion.setValue(
          {
            ciudad: dat.data.result.ciudad,
            latitud: dat.data.result.latitud,
            longitud: dat.data.result.longitud,
            direccion: dat.data.result.direccion,
          }
        );
    })
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
      fecha_hora_inicio: [null, Validators.required],   
      fecha_hora_fin: [null, Validators.required],    
    });

    this.formEditEvento = this.fb.group({
      nombre_evento: ['', [Validators.required]],
      fecha_hora_inicio: [null, Validators.required],   
      fecha_hora_fin: [null, Validators.required],    
    });
  }

  private generateUbicacionForm(): void {
    this.formUbicacion = this.fb.group({
      direccion: [''],
      longitud: [0],
      latitud: [0],
      ciudad: [''], 
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
    data = {
      ...data,
      id_usuario: this.usuario.id
    }

    this.calendarioState.addEvento(data)
    this.cerrarEvento()
  }

  public borrarEventos(){
    this.calendarioState.borrarEventos(this.evntosSeleccionados)
    this.calendarioState.getEventosUser(this.usuario.id)
    this.evntosSeleccionados = []
  }

  public editarUbicacion(){
    let data = this.formUbicacion.value
    data = {
      ...data,
      id_usuario: this.usuario.id
    }
    this.profService.updateProfesional(data)
    this.editarClinica = false
  }

  public editarEvento(id: number){
    this.eventoId = id
    console.log(this.eventoId)
    this.calendarioService.getOneEvento(id).subscribe(dat => {
      this.formEditEvento.patchValue({
        nombre_evento: dat.data[0].nombre_evento,
        fecha_hora_inicio: new Date(dat.data[0].fecha_hora_inicio),
        fecha_hora_fin: new Date(dat.data[0].fecha_hora_fin)
      });
      this.abrirEditEvento = true
    })
  }

  public editEvento(){
    let data = this.formEditEvento.value
    data = {
      ...data,
      id: this.eventoId,
      id_usuario: this.usuario.id
    }

    console.log(data)

    this.calendarioService.updateEvento(data).subscribe(dat => {
      this.calendarioState.getEventosUser(this.usuario.id)
      this.abrirEditEvento = false
    })
  }

  public cerrarEditEvento(){
    this.abrirEditEvento = false
  }

  get email(): AbstractControl | null { return this.form.get('email'); }
  get nombre(): AbstractControl | null { return this.form.get('nombre'); }
  get apellidos(): AbstractControl | null { return this.form.get('apellidos'); }
  get username(): AbstractControl | null { return this.form.get('username'); }
  get rol(): AbstractControl | null { return this.form.get('rol'); }


  get nombre_evento(): AbstractControl | null { return this.formEvento.get('nombre_evento'), this.formEditEvento.get('nombre_evento'); }
  get fecha_hora_inicio(): AbstractControl | null { return this.formEvento.get('fecha_hora_inicio'), this.formEditEvento.get('fecha_hora_inicio'); }  
  get fecha_hora_fin(): AbstractControl | null { return this.formEvento.get('fecha_hora_fin'), this.formEditEvento.get('fecha_hora_fin'); }  

  get ciudad(): AbstractControl | null { return this.formUbicacion.get('ciudad'); }
  get latitud(): AbstractControl | null { return this.formUbicacion.get('latitud'); }
  get longitud(): AbstractControl | null { return this.formUbicacion.get('longitud'); }
  get direccion(): AbstractControl | null { return this.formUbicacion.get('direccion'); }


}
