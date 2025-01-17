import { Controller, Post, UploadedFile, UseInterceptors, BadRequestException, Get, Param, Res } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileNamer, fileFilter } from './helpers';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';


@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService
  ) {}


  @Get('product/:imageName')
  findProductByImage(
    @Res() res: Response, 
    @Param( 'imageName') imageName: string
   ){

      const path = this.filesService.getStaticProductImage(imageName)
      
      // res.status(403).json({
      //   ok: false, 
      //   path: path
      // })

      res.sendFile(path)
    }
  

  // Carga de archivos usualmente se usa POST 
  @Post('product')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter, 
    //limits: {fileSize: 2000}
    storage: diskStorage({
      destination: './static/products',
      filename: fileNamer
    })
  }))
  uploadProductImage(
    @UploadedFile() file: Express.Multer.File,
  ){

    if (!file) {
      throw new BadRequestException('Asegurese de que el archivo sea una imagen')
    }

    const secureUrl = `${this.configService.get('HOST_API')}/files/product/${file.filename}`

    //console.log({ fileInController: file})

    return {
      //fileName: file.originalname
      secureUrl
    };
  }

}
