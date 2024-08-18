import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthState } from 'src/app/state/auth.state';
import { ProfesionalesState } from 'src/app/state/profesionales.state';
import { Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-profesionales',
  templateUrl: './chat-profesionales.component.html',
  styleUrls: ['./chat-profesionales.component.css']
})
export class ChatProfesionalesComponent {
  private readonly authState = inject(AuthState);
  private readonly fb = inject(FormBuilder)

  public crearPubli: boolean
  public allPublis$: Observable<any[]>
  public onePubli$: Observable<any>
  public selectedComment: any;
  public show: boolean
  public usuario: any
  public form: FormGroup;

  public comments: any[] = [];
  public display_error: boolean;

  public rangeDates: Date[] = [];
  public fecha_inicio: string;
  public fecha_fin: string;

  public showResponder: boolean;
  public responderSelect: number;
  public allRespuestas$: Observable<any[]>
  public showVer: boolean

  public BACKEND_FILES = environment.BACKEND_FILES

  ngOnInit(): void {
    this.profesionalState.getAllComentarios()
    this.usuario = this.authState.getUser()
  }

  constructor(private readonly profesionalState: ProfesionalesState, private router: Router) {
    this.setStateSelector()
    this.generateLoginForm()
  }

  private setStateSelector() {
    this.allPublis$ = this.profesionalState.allPublis$;
    this.onePubli$ = this.profesionalState.onePubli$
    this.allRespuestas$ = this.profesionalState.allRespuestas$
  }

  private generateLoginForm(): void {
    this.form = this.fb.group({
      desde: ['', []],
      hasta: ['', []]
    });
  }


  public crearPlan(){
    this.crearPubli = true
  }

  public cerrar(){
    this.crearPubli = false
  }

  public isImageUrl(value: string): boolean {
    return value.startsWith('http://') || value.startsWith('https://');
  }

  public readMore(id: number) {
    console.log('aqui', id)
    this.profesionalState.getOnePubli(id).pipe(take(1)).subscribe(datos => {
      console.log('aqui', datos.data)
  
      const archivos = datos.data.result[0].archivos;
      const imagen = archivos.length > 0 ? archivos[0].archivo_adjunto : null;
  
      this.selectedComment = ({
        autor: datos.data.result[0].profesional.nombre,
        titulo: datos.data.result[0].titulo,
        mensaje: datos.data.result[0].mensaje,
        date: datos.data.result[0].fecha_creacion,
        imagen: imagen,
        fecha_hora: datos.data.result[0].fecha_hora
      })
  
      this.show = true;
    });
  }


  public search() {
    const fechaInicio: Date = this.rangeDates[0];
    const fechaFin: Date = this.rangeDates[1];

    // Ajustar fechaFin para incluir todo el día
    const adjustedFechaFin = new Date(fechaFin);
    adjustedFechaFin.setHours(23, 59, 59, 999);

    console.log(fechaInicio.toISOString());
    console.log(adjustedFechaFin.toISOString());

    this.profesionalState.search(fechaInicio.toISOString(), adjustedFechaFin.toISOString()).pipe(take(1)).subscribe(datos => {
      this.comments = datos.data.result.map(comentario => ({
        id: comentario.id,
        author: comentario.nombre,
        text: comentario.texto,
        date: comentario.fecha_creacion,
        imagen: comentario.imagen
      }));
    });
  }
  
  public limpiar(){
    this.rangeDates = []
    this.profesionalState.getAllComentarios();
  }

  public volver(){
    this.router.navigate(['/home']);
  }

  public responder(id: number) {
    this.showResponder = true
    this.responderSelect = id
  }

  public cerrarResponder(): void {
    this.showResponder = false;
  }

  public selectedCommentId: number | null = null;
  public respuestasFiltradas: any[] = [];
  public respuestasVisibles: { [key: number]: boolean } = {}; // Track visibility of responses

  public verRespuestas(id: number) {
    if (this.selectedCommentId === id && this.respuestasVisibles[id]) {
      // Si ya están visibles, ocultarlas
      this.respuestasVisibles[id] = false;
      this.selectedCommentId = null;
      this.respuestasFiltradas = [];
    } else {
      // Si no están visibles, mostrarlas
      this.selectedCommentId = id;
      this.profesionalState.getRespuestas(id).subscribe(res => {
        this.respuestasFiltradas = res.data.result.map(r => ({
          id: r.id,
          id_hilo: r.id_hilo || id,
          titulo: r.titulo,
          mensaje: r.mensaje,
          archivos: r.archivos || [],
          fecha_hora: r.fecha_hora,
          nombre: r.usuario.nombre,
          apellidos: r.usuario.apellidos
        }));
        this.respuestasVisibles[id] = true;
      });
    }
  }

  


  get desde(): AbstractControl | null { return this.form.get('desde'); }
  get hasta(): AbstractControl | null { return this.form.get('hasta'); }  
  
}
