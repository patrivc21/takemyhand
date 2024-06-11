export interface UserLogin {
    username: string;
    password: string;
}

export interface User {
  id: number;
  nombre: string;
  email: string;
  password: string;
  apellidos: string;
  username: string;
  rol: number;
}