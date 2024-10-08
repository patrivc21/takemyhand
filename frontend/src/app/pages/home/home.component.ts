import { identifierName } from '@angular/compiler';
import { Component, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { DropdownFilterOptions } from 'primeng/dropdown';
import { Observable, map, take } from 'rxjs';
import { IEstadoAnimo } from 'src/app/interfaces/Pacientes';
import { User } from 'src/app/interfaces/Usuarios';
import { FormularioService } from 'src/app/services/formulario.service';
import { PacientesService } from 'src/app/services/pacientes.service';
import { PlanService } from 'src/app/services/planseguridad.service';
import { AuthState } from 'src/app/state/auth.state';
import { FormularioState } from 'src/app/state/formulario.state';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  private readonly authState = inject(AuthState);
  private readonly planService = inject(PlanService);
  private readonly pacService = inject(PacientesService);
  public items: MenuItem[] | undefined;
  @ViewChild('profileMenu') profileMenu: any;
  public usuario: any
  public paciente: any
  public viewPerfil: boolean
  public perfilBusqueda: boolean

  public users$: Observable<User[]>
  public selectedPerfil: any = {}
  filterValue: string | undefined = '';

  public verDialog$: Observable<boolean>
  public showEstado$: Observable<boolean>
  public displayDialog: boolean = false
  public cerrarEstado: boolean = false
  public displayChat: boolean = false
  public displayRecurso: boolean = false

  public BACKEND_FILES = environment.BACKEND_FILES
  public datos: any
  public onePlan$: Observable<any>
  public value: number;

  ngOnInit(): void {
    this.usuario = this.authState.getUser()
    if(this.usuario.rol == 2){
      this.pacService.getOnePaciente(this.usuario.id).subscribe(dat => {
        console.log(dat)
        this.paciente = dat.data.paciente
      })
    }
    this.authState.getUserByEmail(this.usuario.email).pipe(take(1)).subscribe(dat => {
      this.authState.getAllUsersExceptMe(dat.data.user.id)
    })

    this.planService.getOnePlan(this.usuario.id).pipe(take(1)).subscribe(dat => {
      this.datos = dat.data.plan.nombre_archivo
    })
  }

  constructor(private readonly router: Router, private pacientesService: PacientesService, private formularioService: FormularioService, private formState: FormularioState) {
    this.items = [
      {
        label: 'Cerrar sesión',
        icon: 'pi pi-sign-out',
        command: () => this.cerrar()
      }
    ];
    this.setStateSelector()
  }

  private setStateSelector() {
    this.users$ = this.authState.users$;
    this.verDialog$ = this.authState.verDialog$;
    this.onePlan$ = this.formState.onePlan$
    this.showEstado$ = this.authState.showEstado$;
  }


  public logOut(){
    this.authState.logout()
  }

  public cerrar(): void {
    this.displayRecurso = false;
  }

  public verPerfil(){
    this.router.navigate(['/home/editar-perfil']);
  }


  public abrirChat(){
    this.displayChat = true
  }

  public buscar(){
    this.perfilBusqueda = true
  }

  public cerrarBusqueda(){
    this.selectedPerfil = null
    this.perfilBusqueda = false
  }

  public hideDialog() {
    this.authState.closeDialog()
    this.displayDialog = false
  }

  public cerrarEstadoDialog() {
    this.authState.closeEstado()
    this.cerrarEstado = false
  }

  public navigateToForm() {
    this.hideDialog();
    this.router.navigate(['/formulario']);
  }

  public guardar() {
    const estado: IEstadoAnimo = {
      id: 0,
      estado: this.value,               // el valor de p-rating
      fecha: new Date(),                // la fecha actual
      id_usuario: this.usuario.id       // el id del usuario
    };
    this.pacientesService.addEstado(estado).subscribe()
    this.cerrarEstadoDialog();
  }

}
