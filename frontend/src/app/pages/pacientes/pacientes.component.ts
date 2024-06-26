import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Pacientes } from 'src/app/interfaces/Pacientes';
import { PacientesState } from 'src/app/state/paciente.state';
import * as XLSX from 'xlsx'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent {
  public allPacientes$: Observable<Pacientes[]>
  public view: boolean
  public pacSeleccionados: number[] = [];

  ngOnInit(): void {
    this.iniciar()
  }

  constructor(private readonly pacienteState: PacientesState, private router: Router, private readonly toastr: ToastrService) {
    this.setStateSelector()
  }

  private setStateSelector() {
    this.allPacientes$ = this.pacienteState.allPacientes$;
  }

  public iniciar(): void {
    this.pacienteState.getAllPacientes().pipe(take(1)).subscribe(data => {
      console.log(data)
      this.view = true
    })
  }

  public descargarExcel(): void {
    this.allPacientes$.pipe(take(1)).subscribe(dat => {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dat);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Datos');
      XLSX.writeFile(wb, 'pacientes.xlsx');
    })
  }

  public borrarPacientes(){
    console.log(this.pacSeleccionados)
    this.pacienteState.borrarPacientes(this.pacSeleccionados).pipe(take(1)).subscribe(dat => {
      console.log(dat)
      if (dat.cod == 200) {
        this.toastr.success('Pacientes borrados con éxito.', 'Éxito')
        this.iniciar()
      } else {
        this.toastr.error('Error al borrar los pacientes.', 'Error')
      }
    })

    this.pacienteState.getAllPacientes()
    this.pacSeleccionados = []
  }
}
