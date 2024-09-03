const palabrasProhibidas = [
    'suicidio',
    'matarme',
    'quitarme la vida',
    'no quiero vivir',
    'autolesion',
    'cortarme',
    'morir',
    'no merece la pena vivir',
    'terminar con todo',
    'acabar con mi vida',
    'dejarlo todo',
    'desaparecer',
    'desaparecer del mapa',
    'mejor morir',
    'lo mejor es morir',
    'solo quiero morir',
    'muerte',
    'me quiero morir',
    'autolesión',
    'autoagresión',
    'tengo ganas de morir',
    'no tengo salida',
    'me siento sin esperanza',
    'me siento vacío',
    'no hay razón para vivir',
    'no puedo soportarlo más',
    'todo está perdido',
    'no hay salida',
    'no quiero seguir',
    'no puedo más',
    'me quiero hacer daño',
    'caer en la desesperación',
    'no veo futuro',
    'no encuentro solución',
    'sentirse inútil',
    'no tengo motivación',
    'no tengo razón para vivir',
    'no quiero seguir viviendo',
    'sentirse deprimido',
    'depresión',
    'tristeza extrema',
    'crisis existencial',
    'sentimiento de desesperanza',
    'decaído',
    'rendirse',
    'sentirse atrapado', 
    
    // Hobbies relacionados con suicidio o autolesiones
    'cortarme',
    'autolesionarme',
    'lastimarme',
    'hacerme daño',
    'drogarme',
    'alcoholizarme',
    'abusar de sustancias',
    'jugar a la ruleta rusa',

    // Personas que pueden incitar a pensamientos suicidas
    'mi ex',
    'acosador',
    'persona tóxica',
    'agresor',
    'maltratador',
    'persona que me lastima',
    'alguien que me hace daño',

    // Lugares que pueden incitar a pensamientos suicidas
    'precipicio',
    'puente alto',
    'edificio alto',
    'lugar solitario',
    'lugar oscuro',
    'barranco',
    'lugar abandonado',
    'carretera peligrosa',
    'lugar desolado',
    'lugar peligroso',
    'acantilado',
    'vía del tren',
    'rocas afiladas',
    'edificio vacío',
    'lugar sin salida',
    'bosque profundo',
    'faro solitario'
];


export const validarContenido = (mensaje: string): boolean => {
    const mensajeLowerCase = mensaje.toLowerCase();

    for (const palabra of palabrasProhibidas) {
        if (mensajeLowerCase.includes(palabra)) {
            return false; // El texto contiene palabras prohibidas
        }
    }

    return true; // El texto está limpio
}
