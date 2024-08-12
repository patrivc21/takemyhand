import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { Profesionales } from 'src/app/interfaces/Profesionales';
import { ProfesionalesState } from 'src/app/state/profesionales.state';

@Component({
  selector: 'app-listado-profesionales',
  templateUrl: './listado-profesionales.component.html',
  styleUrls: ['./listado-profesionales.component.css']
})
export class ListadoProfesionalesComponent {
  public allProfesionales$: Observable<Profesionales[]>
  public allCiudades$: Observable<any[]>
  public view: boolean

  // almacenamiento de datos para el mapa
  public map = {} as any
  public mapView = false
  public display = true

  public ciudadSelect: string

  ngOnInit(): void {
    this.iniciar()
  }

  constructor(private readonly profState: ProfesionalesState, private router: Router) {
    this.setStateSelector()
  }

  private setStateSelector() {
    this.allProfesionales$ = this.profState.allProfesionales$;
    this.allCiudades$ = this.profState.allCiudades$;
  }

  public iniciar(): void {
    this.profState.getAllProfesionales().pipe(take(1)).subscribe(data => {
      console.log(data)
      this.view = true
    })

    this.profState.getCiudades()
  }
  
  public verMapa(direccion: string, latitud: number, longitud: number): void {
    this.map = { direccion, latitud, longitud };
    this.mapView = true;
  }
  

  public cerrarMapa (): void {
    this.mapView = false
  }

  public filtrar () {
    this.profState.getProfByCiudad(this.ciudadSelect)
  }

  public volver(){
    this.router.navigate(['/home']);
  }
}
