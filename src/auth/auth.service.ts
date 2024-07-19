import { BadRequestException, Inject, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt'
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

  private readonly logger = new Logger('UserService')

  //Para usar la entidad se debe usar una injección del repositorio que usa el modelo 
  //Es decir, de la entdiad User


  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, 

    private readonly jwtService: JwtService,
  ){}

  async createUser(createUserDto: CreateUserDto) {
    
    try {

      const {password, ...userData} = createUserDto

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10)
      })

      await this.userRepository.save(user)

      delete user.password;

      return {
        ...user, 
        token: this.getJwtToken({email: user.email})
      }

      //TODO: retornar JWT de acceso
      //Generación del JWT

      
    } catch (error) {
      this.handleExceptions(error)
    }
  }

  async loginUser(loginUserDto: LoginUserDto){
    
    const {password, email} = loginUserDto

    const user = await this.userRepository.findOne({
      where: {email}, 
      select: {email: true, password:true}
    })

    if(!user) 
      throw new UnauthorizedException('Credenciales incorrectas')

    if(bcrypt.compareSync(password, user.password)) 
      throw new UnauthorizedException('Credenciales no validas')

    return {
      ...user, 
      token: this.getJwtToken({email: user.email})
    }

    //TODO: retornar JWT
    
  }

  private getJwtToken(payload: JwtPayload){

    //Se genera el Token 

    const token = this.jwtService.sign(payload);

    return token;

  }

  //Tipo never es que nunca regresa un valor. Regresa bard req, server error, etc. 
  private handleExceptions(error: any): never {

    if(error.code === '23505')
      throw new BadRequestException(error.detail)

    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected error. Please check logs')

  }

}
