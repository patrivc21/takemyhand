import { Component, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { DropdownFilterOptions } from 'primeng/dropdown';
import { Observable, map, take } from 'rxjs';
import { User } from 'src/app/interfaces/Usuarios';
import { FormularioService } from 'src/app/services/formulario.service';
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
  public items: MenuItem[] | undefined;
  @ViewChild('profileMenu') profileMenu: any;
  public usuario: any
  public viewPerfil: boolean
  public perfilBusqueda: boolean

  public users$: Observable<User[]>
  public selectedPerfil: any
  filterValue: string | undefined = '';

  public verDialog$: Observable<boolean>
  public displayDialog: boolean = false

  public BACKEND_FILES = environment.BACKEND_FILES
  public datos: any
  public onePlan$: Observable<any>

  ngOnInit(): void {
    this.usuario = this.authState.getUser()
    this.authState.getUserByEmail(this.usuario.email).pipe(take(1)).subscribe(dat => {
      console.log(dat)
      this.authState.getAllUsersExceptMe(dat.data.user.id)
    })

    this.formularioService.getOnePlan(2).pipe(take(1)).subscribe(dat => {
      console.log(dat)
      this.datos = dat.data.plan.nombre_archivo
      console.log(this.datos)
    })

    console.log(this.BACKEND_FILES + this.datos)
  }

  constructor(private readonly router: Router, private formularioService: FormularioService, private formState: FormularioState) {
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
  }


  public logOut(){
    this.authState.logout()
  }

  public cerrar(): void {
    this.viewPerfil = false;
  }


  public verPerfil(){
    this.viewPerfil = true
  }

  public buscar(){
    console.log(this.selectedPerfil)
    this.perfilBusqueda = true
  }

  public cerrarBusqueda(){
    this.selectedPerfil = []
    this.perfilBusqueda = false
  }

  public hideDialog() {
    this.authState.closeDialog()
    this.displayDialog = false
  }

  public navigateToForm() {
    this.hideDialog();
    this.router.navigate(['/formulario']);
  }

}
