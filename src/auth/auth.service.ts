import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private dataSource: DataSource,
        private useRepository: UserRepository
    ) { }


    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<UserEntity> {
        return this.useRepository.signUp(authCredentialsDto)
    }
    // async signUp(authCredentialsDto: AuthCredentialsDto) {
    //     return this.useRepository.signUp(authCredentialsDto)
    // }
}


// import { Injectable } from '@nestjs/common';
// import { DataSource } from 'typeorm';
// import { AuthCredentialsDto } from './dto/auth-credentials.dto';
// import { UserEntity } from './user.entity';
// import { UserRepository } from './user.repository';

// @Injectable()
// export class AuthService {
//     constructor(private dataSource: DataSource, private userRepository: UserRepository) { }

//     async signUp(authCredentialsDto: AuthCredentialsDto) {
//         return this.userRepository.signUp(authCredentialsDto);
//     }
// }
