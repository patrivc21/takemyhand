import { Component, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RouterModule } from '@angular/router';
import { AuthState } from 'src/app/state/auth.state';
import { UserLogin } from 'src/app/interfaces/Usuarios';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, ButtonModule, InputTextModule, PasswordModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private readonly authState = inject(AuthState);
  private readonly fb = inject(FormBuilder);

  public loginForm!: FormGroup;
  public enviado: boolean = false;

  public loadingButton$: Observable<boolean>;
  router: any;

  ngOnInit(): void {
    this.generateLoginForm();
  }

  constructor() {
    this.setStateSelector();
  }

  private generateLoginForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  private setStateSelector() {
    this.loadingButton$ = this.authState.loadingButton$;
  }

  public onSubmit(): void {
    this.enviado = true;
    if (this.loginForm.valid) {
      const data: UserLogin = this.loginForm.value;
      this.authState.login(data);
    }
  }

  public goRegister(){
    this.router.navigate(['/register']);
  }


  get email(): AbstractControl | null { return this.loginForm.get('email'); }
  get password(): AbstractControl | null { return this.loginForm.get('password'); }
}
