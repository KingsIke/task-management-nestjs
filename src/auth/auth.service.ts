import { Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        private useRepository: UserRepository
    ) { }


    async signUp(authCredentialsDto: AuthCredentialsDto) {
        return this.useRepository.signUp(authCredentialsDto)
    }
    // async signUp(authCredentialsDto: AuthCredentialsDto) {
    //     return this.useRepository.signUp(authCredentialsDto)
    // }
}
