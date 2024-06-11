import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, map, take } from 'rxjs'
import { AuthService } from '../services/auth.service'
import { Buffer } from 'buffer'
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router'
import { UserLogin, User} from '../interfaces/Usuarios'
import { CookieService } from 'ngx-cookie-service';

interface IAuthState {
    user: User;
    users: User[];
    token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthState {
  private readonly initialState: IAuthState = { user: {} as User,
  token: '',
  users: [], }

  private readonly _state: BehaviorSubject<IAuthState> = new BehaviorSubject(
    this.initialState
  )

  private _showDialog: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly showDialog$: Observable<boolean> = this._showDialog.asObservable();

  public readonly user$: Observable<User> = this._state
    .asObservable()
    .pipe(map((state) => state && state.user))

  public readonly users$: Observable<User[]> = this._state
    .asObservable()
    .pipe(map((state) => state && state.users))

  private get state() {
    return this._state.getValue()
  }

  constructor(private readonly authService: AuthService, private readonly toastr: ToastrService, private readonly router: Router, private cookie: CookieService) { }

  public reset(): void {
    this._state.next(this.initialState)
  }


  public getUser(): any {
    return this._state.getValue().user;
  }

  public setUser(user: User): void {
    this._state.next({ ...this._state.getValue(), user: user });
  }

  public setDialog = (status: boolean) => {
    this._showDialog.next(status);
  }

  public async login(data: UserLogin): Promise<void> {
    this.authService.login(data).subscribe((res: any) => {
      if (res.cod == 200) {
        this.setUser(res.data.user);
        localStorage.setItem('token', res.data.token);
        this.router.navigate(['/']);
      } else {
        this.toastr.error('Error al iniciar sesion', 'Error')
      }
    });
  }

  public register = (data: any) => {
    this.authService.register(data).subscribe((res: any) => {
      if (res.cod == 200) {
        this.getUsers();
        this.setDialog(false);
        return true
      } else {
        this.toastr.error('Error al registrarse', 'Error')
        return false
      }
    });
  }

  public async logout(): Promise<void> {
    localStorage.removeItem('token');
    this.reset();
    this.router.navigate(['/login']);
  }

  public checkSession(): boolean {
    const token = this.cookie.get('token') || localStorage.getItem('token');
    if (token) {
      const token_data = this.parseJwt(token);
      if (token_data.exp < Date.now() / 1000) {
        this.logout();
        return false;

      } else {
        const user = token_data.user;
        this.setUser(user);
        return true;

      }
    } else {
      this.logout();
      return false;
    }
  }

  private parseJwt = (token: string) => {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  }

  public getUsers = () => {
    this.authService.getUsers().pipe(take(1)).subscribe((res: any) => {
      if (res.cod == 200) {
        const users = res.data.users.map((user: any) => ({ ...user, activo: user.activo == 1 ? "Si" : "No", }));
        this._state.next({ ...this._state.getValue(), users: users });
        return [];
      } else {
        this.toastr.error('Error al obtener a los usuarios', 'Error')
        return [];
      }
    }
    );
  }


}