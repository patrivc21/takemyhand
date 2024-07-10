import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormularioService } from 'src/app/services/formulario.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  public preguntas = [
    '¿Toma de forma habitual algún medicamento, como aspirinas o pastillas para dormir?', 
    '¿Tiene dificultades para conciliar el sueño?', 
    '¿A veces nota que podría perder el control sobre sí mismo/a?', 
    '¿Tiene poco interés en relacionarse con la gente?', 
    '¿Ve su futuro con más pesimismo que optimismo?', 
    '¿Se ha sentido alguna vez inútil o inservible?', 
    '¿Ve su futuro sin ninguna esperanza?', 
    '¿Se ha sentido alguna vez fracasado/a, que sólo quería meterse en la cama y abandonarlo todo?', 
    '¿Está deprimido/a ahora?', 
    '¿Está Vd. separado/a, divorciado/a o viudo/a?', 
    '¿Sabe si alguien de su familia ha intentado suicidarse alguna vez?', 
    '¿Alguna vez se ha sentido tan enfadado/a que habría sido capaz de matar a alguien?', 
    '¿Ha pensado alguna vez en suicidarse?', 
    '¿Le ha comentado a alguien, en alguna ocasión, que quería suicidarse?', 
    '¿Ha intentado alguna vez quitarse la vida?'
  ];
  public respuestas: string[] = Array(this.preguntas.length).fill('NO');
  public verForm: boolean = false

  constructor(private cuestionarioService: FormularioService, private router: Router) {}

  public enviarCuestionario() {
    this.cuestionarioService.enviarRespuestas(this.respuestas)
      .subscribe(response => {
        console.log('Resultado:', response);
      });
  }

  public volver(){
    this.router.navigate(['/home']);
  }

  public ver(){
    this.verForm = true
  }
}
