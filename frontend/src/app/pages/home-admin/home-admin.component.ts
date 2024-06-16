import { Component, ViewChild, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthState } from 'src/app/state/auth.state';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent {
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
