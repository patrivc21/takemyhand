import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { User } from 'src/app/interfaces/Usuarios';
import { AuthState } from 'src/app/state/auth.state';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent {
  private readonly authState = inject(AuthState);
  public usuario: any
  public users$: Observable<User[]>

  public selectedUser: any = null;

  ngOnInit(): void {
    this.usuario = this.authState.getUser()
    this.authState.getUserByEmail(this.usuario.email).pipe(take(1)).subscribe(dat => {
      this.authState.getAllUsersExceptMe(dat.data.user.id)
    })
  }

  constructor(private readonly router: Router) {
    this.setStateSelector()
  }

  private setStateSelector() {
    this.users$ = this.authState.users$;
  }

  public selectUser(user: any) {
    console.log(user)
    this.selectedUser = user.id;
  }

  public volver(){
    this.router.navigate(['/home']);
  }

}
