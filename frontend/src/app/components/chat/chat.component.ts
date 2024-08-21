import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { AuthState } from 'src/app/state/auth.state';
import { FormsModule } from '@angular/forms';
import { ChatService } from 'src/app/services/chatprivado.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule] 
})
export class ChatComponent {
  @Input() id_receptor!: number;
  private readonly authState = inject(AuthState);
  private readonly chatService = inject(ChatService);

  nuevoMensaje: string = ""
  mensajes: any = []

  usuario: any
  mostrarChat: boolean

  constructor(){

  }

  ngOnInit(): void{
    this.usuario = this.authState.getUser()
    console.log(this.id_receptor)
     // Obtener los mensajes privados del chat entre el usuario y el receptor
     this.chatService.getChatPrivado(this.usuario.id, this.id_receptor).pipe(take(1)).subscribe(dat => {
      console.log(dat);
      
      // Procesar la data recibida
      this.mensajes = dat.data.map((msg: any) => {
        return {
          id_emisor: msg.id_emisor,
          id_receptor: msg.id_receptor,
          mensaje: msg.mensaje,
          fecha_hora: msg.fecha_hora
        };
      });

      // Opcional: Mostrar los mensajes procesados
      console.log(this.mensajes);
    });

  }

  enviarMensaje(){
    console.log(this.nuevoMensaje)

    //para no enviar mensajes vacios
    if(this.nuevoMensaje = "") return

    // let mensaje = {
    //   id_emisor = this.usuario.id,
    //   id_receptor = this.id_receptor,
    //   mensaje = this.nuevoMensaje
    // }

    this.nuevoMensaje = ""

    setTimeout(() => {
      this.scrollToTheLastElementByClassName()
    }, 20);
  }

  public scrollToTheLastElementByClassName(){
    //obtenemos todos los elementos con clase mensaje
    let elements = document.getElementsByClassName('msj')

    //obtenemos ultimo
    let ultimo: any = elements[(elements.length - 1)]

    //para scrollear automatico cada vez que enviamos mensaje
    let toppos = ultimo.offsetTop;

    document.getElementById('contenedorMensajes').scrollTop = toppos
  }
}
