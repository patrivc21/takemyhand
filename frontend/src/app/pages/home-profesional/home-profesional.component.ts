import { Component, ViewChild, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthState } from 'src/app/state/auth.state';

@Component({
  selector: 'app-home-profesional',
  templateUrl: './home-profesional.component.html',
  styleUrls: ['./home-profesional.component.css']
})
export class HomeProfesionalComponent {
  private readonly authState = inject(AuthState);
  public items: MenuItem[] | undefined;
  @ViewChild('profileMenu') profileMenu: any;
  
  ngOnInit(): void {
  }

  constructor() {
    this.items = [
      {
        label: 'Cerrar sesión',
        icon: 'pi pi-sign-out',
        command: () => this.cerrar()
      }
    ];
  }

  toggleMenu() {
    this.profileMenu.toggle(event);
  }

  public cerrar(){
    this.authState.logout()
  }
}
