import { Request } from "express";

export const fileFilter = (req: Request, file: Express.Multer.File, cb: Function) => {

    //console.log({file})

    if(!file) return cb (new Error('El archivo está vacío'), false);

    const fileExtension = file.mimetype.split('/')[1];
    const validExtension = ['jpg', 'png', 'gif', 'jpeg'];

    // console.log(fileExtension)
    // console.log(validExtension)

    if (validExtension.includes(fileExtension)){
        return cb(null, true)
     }
    
    cb(null, false)
}