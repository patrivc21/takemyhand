import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { take } from 'rxjs';
import { AuthState } from 'src/app/state/auth.state';
import { PacientesState } from 'src/app/state/paciente.state';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent {
  @Input() usuario !: any
  @Output() res: EventEmitter<boolean> = new EventEmitter<boolean>()

  private readonly authState = inject(AuthState);
  private readonly fb = inject(FormBuilder)
  private readonly confirmationService = inject(ConfirmationService)
  
  public form!: FormGroup;
  public enviado: boolean = false;
  public loading = false
  public editarPerfil = true

  ngOnInit(): void {
    console.log(this.usuario)
    this.generateLoginForm();
    this.authState.getUserByEmail(this.usuario.email).pipe(take(1)).subscribe(dat => {
      console.log(dat)
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
  }

  constructor(private pacienteState: PacientesState) {
    this.setStateSelector();
  }

  private generateLoginForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      // password: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      username: ['', Validators.required],
      rol: [null],
    });
  }

  private setStateSelector() {
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

  get email(): AbstractControl | null { return this.form.get('email'); }
  get nombre(): AbstractControl | null { return this.form.get('nombre'); }
  get apellidos(): AbstractControl | null { return this.form.get('apellidos'); }
  get username(): AbstractControl | null { return this.form.get('username'); }
  get rol(): AbstractControl | null { return this.form.get('rol'); }
  // get password(): AbstractControl | null { return this.form.get('password'); }

}
