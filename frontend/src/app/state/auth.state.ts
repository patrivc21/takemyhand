import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, map, take } from 'rxjs'
import { AuthService } from '../services/auth.service'
import { Buffer } from 'buffer'
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router'
import { UserLogin, User} from '../interfaces/Usuarios'
import { CookieService } from 'ngx-cookie-service';
import { IRoles } from '../interfaces/IRoles'
import { GenericResponse } from '../interfaces/GenericResponse'
import { environment } from 'src/environments/environment'

interface IAuthState {
    user: User;
    users: User[];
    token: string;
    loadingButton: boolean
    allRoles?: IRoles[]
}

@Injectable({
  providedIn: 'root'
})
export class AuthState {
  private readonly initialState: IAuthState = { user: {} as User,
  token: '',
  users: [], loadingButton: false}

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

  public readonly loadingButton$: Observable<boolean> = this._state
    .asObservable()
    .pipe(map((state) => state && state.loadingButton))

  public readonly allRoles$: Observable<IRoles[]> = this._state
    .asObservable()
    .pipe(map((state) => state && state.allRoles))

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

  public getToken(): string | null {
    return localStorage.getItem('token')
  }


  public async login(data: UserLogin): Promise<void> {
    this._state.next({ ...this.state, loadingButton: true })
    this.authService.login(data).subscribe(res => {
      console.log('login', res)
      if (res.cod == 200) {
        this.setUser(res.data.user);
        console.log(res.data.token)
        localStorage.setItem('token', res.data.token);
        this.toastr.success('Sesion iniciada con éxito', 'Éxito')
        console.log('login', res.data.rol)
        if(res.data.user.rol == 1){
          this.router.navigate(['/home-admin']);
        }else if(res.data.user.rol == 2){
          this.router.navigate(['/home']);
        }else if(res.data.user.rol == 3){
          this.router.navigate(['/home-prof']);
        }
      } else {
        this._state.next({ ...this.state, loadingButton: false })
        this.toastr.error('Error al iniciar sesion', 'Error')
      }
    });
  }

  public register(data: any): void {
    this.authService.register(data).pipe(take(1)).subscribe(res => {
      console.log(res)
      if (res.cod == 200) {
        // this.getUsers();
        localStorage.setItem('token', res.data.token);
        this.setDialog(false);
        this.toastr.success('¡Usuario creado con éxito!', 'Éxito')

        if(res.data.user.rol == 1){
          this.router.navigate(['/home-admin']);
        }else if(res.data.user.rol == 2){
          this.router.navigate(['/home']);
        }else if(res.data.user.rol == 3){
          this.router.navigate(['/home-prof']);
        }
        
        return true
      } else {
        this.toastr.error('Error al crear el usuario', 'Error')
        return false
      }
    });
  }

  public async logout(): Promise<void> {
    localStorage.removeItem('token');
    this.reset();
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Devuelve true si el token existe
  }



  public checkSession(): boolean {
    const token = this.cookie.get('token') || localStorage.getItem('token');
    console.log('Token:', token);
    if (token) {
      const token_data = this.parseJwt(token);
      console.log('Token data:', token_data);
      if (token_data.exp < Date.now() / 1000) {
        this.logout();
        console.log('Token expired');
        return false;
      } else {
        const user = token_data.user;
        this.setUser(user);
        return true;
      }
    } else {
      this.logout();
      console.log('No token found');
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

  public getRoles(): void {
    this.authService.getRolesUsuarios().pipe(take(1)).subscribe((roles) => {
      console.log(roles)
      this._state.next({
        ...this._state.value,
        allRoles: roles
      });
    });
  }


}