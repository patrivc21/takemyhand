import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { AuthState } from 'src/app/state/auth.state';
import { FormsModule } from '@angular/forms';
import { ChatService } from 'src/app/services/chatprivado.service';
import { Observable, take } from 'rxjs';
import { ChatState } from 'src/app/state/chatprivado.state';
import { ChatPrivado } from 'src/app/interfaces/ChatPrivado';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule,ButtonModule] 
})

export class ChatComponent {
  @Input() id_receptor!: number;
  @Output() res: EventEmitter<boolean> = new EventEmitter<boolean>();

  public allChat$: Observable<{ [fecha: string]: ChatPrivado[] }>;
  public nuevoMensaje: string = "";
  public usuario: any;
  public mostrarChat: boolean = false;

  private readonly authState = inject(AuthState);
  private readonly chatState = inject(ChatState);

  Object = Object;

  constructor(private cdr: ChangeDetectorRef, private readonly router: Router) {
    this.setStateSelector();
  }

  ngOnInit(): void {
    this.usuario = this.authState.getUser();
    this.cargarMensajes();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id_receptor'] && !changes['id_receptor'].isFirstChange()) {
      this.cargarMensajes();
    }
  }

  ngAfterViewChecked(): void {
    this.scrollToTheLastElementByClassName();
  }

  private setStateSelector() {
    this.allChat$ = this.chatState.allChat$;
  }

  private cargarMensajes(): void {
    this.chatState.getChatPrivado(this.usuario.id, this.id_receptor).pipe(take(1)).subscribe(dat => {
      console.log(dat);
      this.scrollToTheLastElementByClassName();
    });
  }

  public enviarMensaje() {
    if (this.nuevoMensaje === "") return;

    let mensaje = {
      id_emisor: this.usuario.id,
      id_receptor: this.id_receptor,
      mensaje: this.nuevoMensaje,
      id: 0,
      fecha_hora: new Date()
    };

    this.chatState.addChat(mensaje);
    this.nuevoMensaje = "";
    this.cdr.detectChanges();
  }

  private scrollToTheLastElementByClassName() {
    const contenedor = document.getElementById('contenedorMensajes');
    if (contenedor) {
      contenedor.scrollTop = contenedor.scrollHeight;
    }
  }

  public volver() {
    this.router.navigate(['/home']);
  }

}
