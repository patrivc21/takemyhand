import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { Router } from '@angular/router';
import { GenericResponse } from '../interfaces/GenericResponse';
import { PlanService } from '../services/planseguridad.service';
import { PlanSeguridad } from '../interfaces/PlanSeguridad';
import { ToastrService } from 'ngx-toastr';

interface IPlanState {
    onePlan?: any;
}

@Injectable({
    providedIn: 'root'
})
export class PlanState {

    private initialState: IPlanState = {};

    private _state: BehaviorSubject<IPlanState> = new BehaviorSubject(
        this.initialState
    );

    public readonly onePlan$: Observable<any> = this._state
        .asObservable()
        .pipe(map((state) => state && state.onePlan));

    private get state() {
        return this._state.getValue();
    }

    constructor(private service: PlanService, private readonly toastr: ToastrService) { }

    public reset(): void {
        this._state.next(this.initialState);
    }


    public addPlan(nombre_archivo: any[], id_usuario: number, lugares: string[], personas: string[], hobbies: string[], emails: string[]) {
		const data = this.service.addPlan(nombre_archivo, id_usuario, lugares, personas, hobbies, emails);

		data.pipe(take(1)).subscribe((response) => {
			if (response.cod == 200) {
				this.getOnePlan(id_usuario)
                this._state.next({
                    ...this.state,
                    onePlan: response.data.plan
                  })
			}else{
                this.toastr.error('El contenido de esta publicación no cumple con las políticas de la aplicación', 'Error')
              }
		});
        this.getOnePlan(id_usuario)
		return data;
	}


    public getOnePlan(id_usuario:number): Observable<GenericResponse> {
        const data = this.service.getOnePlan(id_usuario)
        data.pipe(take(1)).subscribe((response) => {
          console.log(response)
          if (response.cod == 200) {
            this._state.next({
              ...this.state,
              onePlan: response.data.plan
            })
          }
        })
        return data
    }


}