

export interface JwtPayload {
    email: string;

    //Se puede grabar lo que se quiera en el payload 
    //JWT viaja entre el front y el back por lo que debe ser muy ligero 
    //No se debe guardar información sensible allí 
}