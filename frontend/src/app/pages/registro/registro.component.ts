import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Observable, take } from 'rxjs';
import { IRoles } from 'src/app/interfaces/IRoles';
import { UserLogin } from 'src/app/interfaces/Usuarios';
import { AuthState } from 'src/app/state/auth.state';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  private readonly authState = inject(AuthState);
  private readonly fb = inject(FormBuilder)
  private readonly confirmationService = inject(ConfirmationService)
  
  public form!: FormGroup;
  public enviado: boolean = false;
  public roles: any
  public loading = false

  public allRoles$: Observable<IRoles[]>;
  public displayDialog: boolean = false;

  ngOnInit(): void {
    this.generateLoginForm();
    this.authState.getRoles()
  }

  constructor() {
    this.setStateSelector();
  }

  private generateLoginForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      username: ['', Validators.required],
      rol: [null, Validators.required],
      direccion: [''],
      latitud: [0],
      longitud: [0],
    });
  }

  private setStateSelector() {
    this.allRoles$ = this.authState.allRoles$;
  }

  public crear(): void {
    this.enviado = true;
    this.loading = true
    let data = this.form.value
    
    if (data.rol === 3) {
      data = {
        ...data,
        activo: true,
      };
    } else if (data.rol === 2) {
      data = {
        ...data,
        activo: true,
        rolpaciente: 1,
        resultado_formulario: 0
      };
    } else {
      data = { ...data }; 
    }

    console.log(data)

    if (this.form.valid) {
      this.loading = true
      this.authState.register(data)
    }
  }

  public guardar(): void {
    this.confirmationService.confirm({
      message: '¿Deseas crear la publicación con los datos que has facilitado?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      acceptButtonStyleClass: 'boton-guardar',
      rejectButtonStyleClass: 'custom-reject-button',
      accept: () => this.crear()
    })
  }

  get email(): AbstractControl | null { return this.form.get('email'); }
  get nombre(): AbstractControl | null { return this.form.get('nombre'); }
  get apellidos(): AbstractControl | null { return this.form.get('apellidos'); }
  get username(): AbstractControl | null { return this.form.get('username'); }
  get password(): AbstractControl | null { return this.form.get('password'); }
  get rol(): AbstractControl | null { return this.form.get('rol'); }
  get direccion(): AbstractControl | null { return this.form.get('direccion'); }
  get latitud(): AbstractControl | null { return this.form.get('latitud'); }
  get longitud(): AbstractControl | null { return this.form.get('longitud'); }
}
