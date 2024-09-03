import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { AuthState } from 'src/app/state/auth.state';
import { ProfesionalesState } from 'src/app/state/profesionales.state';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent {
  public allPublisUser$: Observable<any[]>
  public usuario: any;
  public prof: any;
  public view: boolean
  public publisSeleccionados: number[] = [];

  public idSelec: number

  public viewEditar: boolean = false

  constructor(private readonly profState: ProfesionalesState, private readonly authState: AuthState, private router: Router) {
    this.setStateSelector()
  }

  ngOnInit(): void {
    this.usuario = this.authState.getUser()
   this.iniciar()
  }

  public iniciar(){
    this.profState.getOneProf(this.usuario.id).pipe(take(1)).subscribe(dat => {
      this.prof = dat.data.result.id
      this.profState.getPublisUser(this.prof)
    })
  }

  private setStateSelector() {
    this.allPublisUser$ = this.profState.allPublisUser$;
  }

  public volver(){
    this.router.navigate(['/foroprofesionales']);
  }


  public descargarExcel(): void {
    this.allPublisUser$.pipe(take(1)).subscribe(dat => {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dat);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Datos');
      XLSX.writeFile(wb, 'profesionales.xlsx');
    })
  }


  public borrarPublicaciones(){
    console.log(this.publisSeleccionados)
    this.profState.borrarPublicaciones(this.publisSeleccionados).pipe(take(1)).subscribe(dat => {
      console.log(dat)
      if (dat.cod == 200) {
        this.iniciar()
      } 
    })
    this.iniciar()
    this.publisSeleccionados = []
  }

  public editarPubli(id: number){
    this.idSelec = id
    this.viewEditar = true
  }
}
