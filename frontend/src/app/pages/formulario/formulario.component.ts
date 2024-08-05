import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { FormularioService } from 'src/app/services/formulario.service';
import { AuthState } from 'src/app/state/auth.state';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  private readonly authState = inject(AuthState);
  private confirmationService = inject(ConfirmationService)
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
  public pagina: number = 1
  public usuario: any

  constructor(private cuestionarioService: FormularioService, private router: Router) {}

  ngOnInit(): void {
    this.usuario = this.authState.getUser()
  }


  public enviarCuestionario() {
    console.log(this.usuario.id)
    this.cuestionarioService.enviarRespuestas(this.usuario.id, this.respuestas)
      .subscribe(response => {
        console.log('Resultado:', response);
        this.volver()
      });
  }

  public volver(){
    this.router.navigate(['/home']);
  }

  public ver(){
    this.verForm = true
  }

  public cambiarPagina(pagina: number) {
    this.pagina = pagina;
  }

  public guardar(){
    this.confirmationService.confirm({
      message: 'Muchas gracias por realizar el cuestionario. Nos pondremos en contacto contigo',
      header: 'Respuesta enviada',
      icon: 'pi pi-heart-fill',
      acceptLabel: 'Cerrar',
      rejectVisible: false,
      accept: () => this.enviarCuestionario()
    })
  }
}
