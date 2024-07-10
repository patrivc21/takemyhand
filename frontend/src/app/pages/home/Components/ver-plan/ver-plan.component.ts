import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { PlanSeguridad } from 'src/app/interfaces/PlanSeguridad';
import { AuthState } from 'src/app/state/auth.state';
import { PlanState } from 'src/app/state/planseguridad.state';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ver-plan',
  templateUrl: './ver-plan.component.html',
  styleUrls: ['./ver-plan.component.css']
})
export class VerPlanComponent {
  public onePlan$: Observable<PlanSeguridad>
  public usuario: any
  public plan: any
  public verPlan: boolean
  public id_usuario: number
  public BACKEND_FILES = environment.BACKEND_FILES

  ngOnInit(): void {
    this.usuario = this.authState.getUser()
    this.iniciar()
  }

  constructor(private router: Router, private authState: AuthState, private planState: PlanState) {
    this.setStateSelector()
  }

  private setStateSelector() {
    this.onePlan$ = this.planState.onePlan$
  }

  public iniciar(){
    this.planState.getOnePlan(this.usuario.id).pipe(take(1)).subscribe(dat => {
      console.log(dat)
      this.plan = dat.data.plan
    })
  }

  public volver(){
    this.router.navigate(['/home']);
  }

  public crearPlan(id: number){
    // this.router.navigate(['/home/crearPlan/' + this.usuario.id]);
    console.log(id)
    this.verPlan = true
    this.id_usuario = id
  }

  public cerrar(){
    this.verPlan = false
  }
}
