import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserRepository])
  ],
  controllers: [AuthController],
  providers: [AuthService, UserEntity, UserRepository]
})
export class AuthModule { }
