export interface Pacientes {
    id: number;
    rolpaciente: number
    nombre: string;
    apellidos: string
    username: string;
    email: string;
    password: string;
    activo: boolean
    id_usuario: number;
}

export interface IEstadoAnimo {
    id: number;
    estado: number
    fecha: Date;
    id_usuario: number;
}