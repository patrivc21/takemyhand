import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public showNav: boolean = false
  public mostrarChat: boolean = false

  title = 'frontend';

  constructor(private router: Router){
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        const routesWithNavbar = ['/home-admin']
        this.showNav = routesWithNavbar.includes(event.urlAfterRedirects)
      }
    })
  }
}
