import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: 36000
      }
    }),
    TypeOrmModule.forFeature([UserEntity, UserRepository])
  ],
  controllers: [
    AuthController,
  ],
  providers: [AuthService, UserEntity, UserRepository, JwtStrategy],

  exports: [
    JwtStrategy,
    PassportModule
  ]
})
export class AuthModule { }
