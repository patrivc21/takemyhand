import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthState } from 'src/app/state/auth.state';
import { PlanState } from 'src/app/state/planseguridad.state';

@Component({
  selector: 'app-crear-plan',
  templateUrl: './crear-plan.component.html',
  styleUrls: ['./crear-plan.component.css']
})
export class CrearPlanComponent {
  private readonly fb = inject(FormBuilder)
  public crearView = true
  @Output() res: EventEmitter<boolean> = new EventEmitter<boolean>()
  public form !: FormGroup
  public loading = false

  @Input() id_usuario: number;
  public usuario: any

  ngOnInit(): void {
    this.usuario = this.authState.getUser
    this.generateForm()
  }

  constructor(private route: ActivatedRoute, private router: Router,  private authState: AuthState, private planState: PlanState) {
    this.setStateSelector();
  }

  private setStateSelector() {
  }

  private generateForm(): void {
    this.form = this.fb.group({
      nombre_archivo: this.fb.array([]),
      lugares: this.fb.array([]),
      personas: this.fb.array([]),
      hobbies: this.fb.array([]),
    });
  }

  public iniciar() {
    this.route.params.subscribe(params => {
      this.id_usuario = params['id'];
    });
  }

  public cerrar(): void {
    this.res.emit()
  }

  public volver(){
    this.router.navigate(['/home']);
  }

  public onFileChange(event: any, index: number): void {
    const file = event.target.files[0];
    if (file) {
      this.nombre_archivo.at(index).setValue(file);
    }
  }

  public crear() {
    let result = this.form.value
    const files: File[] = this.nombre_archivo.controls.map(control => control.value).filter(file => file);

    this.planState.addPlan(files, this.id_usuario, result.lugares, result.personas, result.hobbies).pipe(take(1)).subscribe(dat => {
      console.log(dat);
    });

    this.cerrar()
  }

  public readFile(variable: string, file: File){
    const reader = new FileReader()

    reader.onload = (e) => {
      this[variable] = e.target?.result
    };
    reader.readAsDataURL(file)
  }

  public addHappyPlace() {
    this.lugares.push(this.fb.control(''));
  }

  public addPeople() {
    this.personas.push(this.fb.control(''));
  }


  public addHobbies() {
    this.hobbies.push(this.fb.control(''));
  }

  public addMoments() {
    this.nombre_archivo.push(this.fb.control(''));
  }

  
  get lugares(): FormArray {return this.form.get('lugares') as FormArray;}
  get personas(): FormArray {return this.form.get('personas') as FormArray;}
  get hobbies(): FormArray {return this.form.get('hobbies') as FormArray;}
  get nombre_archivo(): FormArray {return this.form.get('nombre_archivo') as FormArray;}
}
