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
      personasEmails: this.fb.array([]), // Combinamos personas y emails
      hobbies: this.fb.array([]),
    });
  }
  

  public iniciar() {
    this.route.params.subscribe(params => {
      this.id_usuario = params['id'];
    });
  }

  public cerrar(): void {
    window.location.reload();
    this.planState.getOnePlan(this.id_usuario)
    this.res.emit()
  }

  public volver(){
    this.router.navigate(['/home']);
  }

  public onFileChange(event: any, index: number): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files) as File[];
      const control = this.nombre_archivo.at(index);
      control.setValue(fileArray); // Asigna el array de archivos al form control específico
    }
  }

  // Método para añadir una nueva persona y su email
  public addPersonEmail() {
    const group = this.fb.group({
      persona: ['', Validators.required], // Nombre de la persona
      email: ['', [Validators.required, Validators.email]] // Email de la persona
    });
    this.personasEmails.push(group);
  }

  // Método para eliminar una persona y su email por índice
  public removePersonEmail(index: number) {
    this.personasEmails.removeAt(index);
  }

  // Getters para acceder al FormArray
  get personasEmails(): FormArray {
    return this.form.get('personasEmails') as FormArray;
  }

  
  public crear() {
    let result = this.form.value;
    const files: File[] = [];
    this.nombre_archivo.controls.forEach(control => {
      if (control.value && Array.isArray(control.value)) {
        files.push(...control.value);
      }
    });
  
    // Separar personas y emails del FormArray combinado
    const personas = result.personasEmails.map((item: any) => item.persona);
    const emails = result.personasEmails.map((item: any) => item.email);

    // Llamar a addPlan con personas y emails por separado
    this.planState.addPlan(files, this.id_usuario, result.lugares, personas, result.hobbies, emails)
    .pipe(take(1))
    .subscribe(() => {
      this.planState.getOnePlan(this.id_usuario).pipe(take(1)).subscribe(() => {
        this.cerrar(); 
        window.location.reload();
      });
    });
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

  public addEmails() {
    this.emails.push(this.fb.control(''));
  }
  
  get lugares(): FormArray {return this.form.get('lugares') as FormArray;}
  get personas(): FormArray {return this.form.get('personas') as FormArray;}
  get hobbies(): FormArray {return this.form.get('hobbies') as FormArray;}
  get emails(): FormArray {return this.form.get('emails') as FormArray;}
  get nombre_archivo(): FormArray {return this.form.get('nombre_archivo') as FormArray;}
}
