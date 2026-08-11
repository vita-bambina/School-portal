import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

import { PrismaModule } from '../Prisma/prisma.module';


@Module({
  imports:[
    PrismaModule,

    PassportModule,

    JwtModule.register({
      secret:'mySecretKey',
      signOptions:{
        expiresIn:'1d'
      }
    })
  ],

  controllers:[
    AuthController
  ],

  providers:[
    AuthService,
    JwtStrategy
  ],

  exports:[
    JwtStrategy
  ]
})
export class AuthModule {}


