import { Component, ViewEncapsulation, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';
import { AuthState } from 'src/app/state/auth.state';

@Component({
  selector: 'app-navigation',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [TabMenuModule, ButtonModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  private readonly authState = inject(AuthState);
  public usuario: any
  public items: MenuItem[] | undefined;

  ngOnInit(): void {
    this.usuario = this.authState.getUser();
  }

  constructor() {
    this.items = [
      {
        label: 'Usuarios',
        icon: 'pi pi-user',
        routerLink: ['/pacientes']
      },
      {
        label: 'Profesionales',
        icon: 'pi pi-user',
        routerLink: ['/profesionales']
      },
    ];
  }

  public logOut(){
    this.authState.logout()
  }
}
