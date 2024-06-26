import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { Profesionales } from 'src/app/interfaces/Profesionales';
import { ProfesionalesState } from 'src/app/state/profesionales.state';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-profesionales',
  templateUrl: './profesionales.component.html',
  styleUrls: ['./profesionales.component.css']
})
export class ProfesionalesComponent {
  public allProfesionales$: Observable<Profesionales[]>
  public view: boolean
  public profSeleccionados: number[] = [];

  ngOnInit(): void {
    this.iniciar()
  }

  constructor(private readonly profState: ProfesionalesState, private router: Router) {
    this.setStateSelector()
  }

  private setStateSelector() {
    this.allProfesionales$ = this.profState.allProfesionales$;
  }

  public iniciar(): void {
    this.profState.getAllProfesionales().pipe(take(1)).subscribe(data => {
      console.log(data)
      this.view = true
    })
  }

  public descargarExcel(): void {
    this.allProfesionales$.pipe(take(1)).subscribe(dat => {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dat);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Datos');
      XLSX.writeFile(wb, 'pacientes.xlsx');
    })
  }


  public borrarProfesionales(){
    console.log(this.profSeleccionados)
    this.profState.borrarProfesionales(this.profSeleccionados).pipe(take(1)).subscribe(dat => {
      console.log(dat)
      if (dat.cod == 200) {
        this.iniciar()
      } 
    })

    this.profState.getAllProfesionales()
    this.profSeleccionados = []
  }
}
