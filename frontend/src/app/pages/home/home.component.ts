import { Component, ViewChild, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DropdownFilterOptions } from 'primeng/dropdown';
import { Observable, take } from 'rxjs';
import { User } from 'src/app/interfaces/Usuarios';
import { AuthState } from 'src/app/state/auth.state';

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

  ngOnInit(): void {
    this.usuario = this.authState.getUser();
    console.log(this.usuario.email)
    this.authState.getUserByEmail(this.usuario.email).pipe(take(1)).subscribe(dat => {
      console.log(dat)
    })

    this.authState.getAllUsersExceptMe(this.usuario.id)
  }

  constructor() {
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

}
