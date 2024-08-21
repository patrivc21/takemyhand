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
    verDialog: boolean
    allPublis?: any[]
    onePubli?: any;
    showEstado: boolean
    allRespuestas?: any[]
}

@Injectable({
  providedIn: 'root'
})
export class AuthState {
  private readonly initialState: IAuthState = { user: {} as User,
    token: '',
    users: [], 
    loadingButton: false, 
    verDialog: true,
    showEstado: false
  }

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

  public readonly verDialog$: Observable<boolean> = this._state
    .asObservable()
    .pipe(map((state) => state && state.verDialog))

  public readonly allPublis$: Observable<any[]> = this._state
    .asObservable()
    .pipe(map((state) => state && state.allPublis));

  public readonly onePubli$: Observable<any> = this._state
    .asObservable()
    .pipe(map((state) => state && state.onePubli));

  public readonly showEstado$: Observable<boolean> = this._state
    .asObservable()
    .pipe(map((state) => state && state.showEstado))

  public readonly allRespuestas$: Observable<any[]> = this._state
    .asObservable()
    .pipe(map((state) => state && state.allRespuestas));

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

  public verDialog(){
    this._state.next({...this.state, verDialog: true})
  }

  public closeDialog(){
    this._state.next({...this.state, verDialog: false})
  }

  public verEstado(){
    this._state.next({...this.state, showEstado: true})
  }

  public closeEstado(){
    this._state.next({...this.state, showEstado: false})
  }

  public async login(data: UserLogin): Promise<void> {
    this._state.next({ ...this.state, loadingButton: true})
    this.authService.login(data).subscribe(res => {
      console.log('login', res)
      if (res.cod == 200) {
        this.setUser(res.data.user);
        localStorage.setItem('token', res.data.token);
        this.toastr.success('Sesion iniciada con éxito', 'Éxito')
        console.log('login', res.data.rol)
        if(res.data.user.rol == 1){
          this.router.navigate(['/home-admin']);
        }else if(res.data.user.rol == 2){
          this.router.navigate(['/home']);
          this.verEstado()
        }else if(res.data.user.rol == 3){
          this.router.navigate(['/home']);
        }
      } else {
        this._state.next({ ...this.state, loadingButton: false })
        this.toastr.error('Error al iniciar sesion', 'Error')
      }
    });
  }

  public register(dat: any): Observable<GenericResponse> {
    const data = this.authService.register(dat)
    data.pipe(take(1)).subscribe(res => {
      if (res.cod == 200) {
        localStorage.setItem('token', res.data.token);
        this.setDialog(true);
        this.toastr.success('¡Usuario creado con éxito!', 'Éxito')

        if(res.data.user.rol == 1){
          this.router.navigate(['/home-admin']);
        }else if(res.data.user.rol == 2){
          this.router.navigate(['/home']);
          this.verDialog()
        }else if(res.data.user.rol == 3){
          this.router.navigate(['/home']);
        }
   
      } else {
        this.toastr.error('Error al crear el usuario', 'Error')
      }
    });
    return data;
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
      console.log(res.data)
      if (res.cod == 200) {
        const users = res.data.users.map((user: any) => (
          { ...user, 
          activo: user.activo == 1 ? "Si" : "No", 
          rol: user.rol === 1 ? "Administrador" : user.rol === 2 ? "Paciente" : "Profesional"
        }));
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


  public updateUsuario(usuario: any): Observable<GenericResponse> {
    const data = this.authService.updateUser(usuario);
    data.pipe(take(1)).subscribe((response) => {
        console.log(response);
        if(response.cod==200){
          this.setUser(response.data.user);
          this.toastr.success('Perfil del usuario editado con éxito.', 'Éxito')
        }
        else {
            this.toastr.error('Error al editar el perfil del usuario.', 'Error')
            return;
        }
        // this.getUsers();
    });
    return data
  }

  public getUserByEmail(email: string): Observable<GenericResponse> {
    const data = this.authService.getUserByEmail(email);
    return data
  }

  public getAllUsersExceptMe(id: number): Observable<GenericResponse> {
    const data = this.authService.getAllUsersExceptMe(id);
    data.pipe(take(1)).subscribe((res) => {
      console.log(res);
      console.log(res.data)
      if (res.cod == 200) {
        const users = res.data.users.map((user: any) => (
          { ...user, 
          activo: user.activo == 1 ? "Si" : "No", 
          rol: user.rol === 1 ? "Administrador" : user.rol === 2 ? "Paciente" : "Profesional"
        }));
        this._state.next({ ...this._state.getValue(), users: users });
        return [];
      } else {
        this.toastr.error('Error al obtener a los usuarios', 'Error')
        return [];
      }
  });
    return data
  }



  public addPublicacion(archivo_adjunto: any, id_usuario: any, titulo: string, mensaje: string) {
    const data = this.authService.addPublicacion(archivo_adjunto, id_usuario, titulo, mensaje);
    data.pipe(take(1)).subscribe((response) => {
        if (response.cod == 200) {
          this.getAllComentarios()
        }
    });
    return data;
  }

  public getAllComentarios(): Observable<GenericResponse> {
    const data = this.authService.getAllComentarios()
    data.pipe(take(1)).subscribe((response) => {
      console.log('aqui1', response)
      if (response.cod == 200) {
        this._state.next({
          ...this.state,
          allPublis: response.data.result
        })
      }
    })
    return data
  }

  public getOnePubli(id:number): Observable<GenericResponse> {
    const data = this.authService.getOneComent(id)
    data.pipe(take(1)).subscribe((response) => {
      console.log(response)
      if (response.cod == 200) {
        this._state.next({
          ...this.state,
          onePubli: response.data.result
        })
      }
    })
    return data
  }

  public search(fecha: any, fecha2: any){
    const data = this.authService.buscar(fecha, fecha2);
    data.pipe(take(1)).subscribe((response) => {
      if(response.cod !== 200){
          return;
      }

      this._state.next({
          ...this.state,
          allPublis: response.data.result
      })
    })
    return data;
  }

  public addRespuesta(archivo_adjunto: any, id_usuario: number, titulo: string, mensaje: string, id_hilo: number) {
    const data = this.authService.addRespuesta(archivo_adjunto, id_usuario, titulo, mensaje, id_hilo);

    data.pipe(take(1)).subscribe((response) => {
      if (response.cod == 200) {
        this.getRespuestas(id_hilo)
      }
    });
    return data;
  }

  public getRespuestas(id: number){
    const data = this.authService.getRespuestas(id);
    data.pipe(take(1)).subscribe((response) => {
      console.log(response)
      if(response.cod == 200){
        this._state.next({
          ...this.state,
          allRespuestas: response.data.result
        })
      }
    })
    return data;
  }
}