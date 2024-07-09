export default class Cuestionario {
    public sexo: string;
    public semanasDuracion: number;
    public visitasPsiquiatra: number;
    public tentativasPrevias: string;
    public ideasSuicidas: string;
    public resultado: number

    constructor() {
        this.sexo = "";
        this.semanasDuracion = 0;
        this.visitasPsiquiatra = 0;
        this.tentativasPrevias = "";
        this.ideasSuicidas = "";
        this.resultado = 0;
    }
}