export interface ChatPrivado {
    id: number;
    fecha_hora: Date;
    id_emisor: number;
    id_receptor: number;
    mensaje: string;
}