import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt'

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './entities/user.entity';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([
      User,
    ]), 
    PassportModule.register({defaultStrategy: 'jwt'}),

    JwtModule.registerAsync({
      imports:[ConfigModule], 
      inject:[ConfigService], 
      useFactory: ( configService: ConfigService ) => {
        //console.log('JWT Secret', configService.get('SECRET_JWT'))
        //console.log('JWT Secret', process.env.SECRET_JWT)
        //console.log(process.env.SECRET_JWT)
        return {
          secret: configService.get('SECRET_JWT'),
          signOptions: {
          expiresIn:'2h'
        }
      }
    }})
    // JwtModule.register({
    //   secret: process.env.SECRET_JWT,
    //   signOptions: {
    //     expiresIn:'2h'
    //   }
    // })
  ], 
  exports: [
    TypeOrmModule, 
    JwtStrategy,
    PassportModule, 
    JwtModule
  ]
})
export class AuthModule {}
