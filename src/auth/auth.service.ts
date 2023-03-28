import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload-interface';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private dataSource: DataSource,
        private useRepository: UserRepository,
        private jwtService: JwtService
    ) { }


    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<UserEntity> {
        return this.useRepository.signUp(authCredentialsDto)
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const username = await this.useRepository.validateUserPassword(authCredentialsDto)
        console.log(username)
        if (!username) {
            throw new UnauthorizedException('Invalid Credentials : Incorrect User ')
        }

        const payload: JwtPayload = { username };
        const accessToken = await this.jwtService.sign(payload)
        return { accessToken }


    }
}


