import { Injectable } from '@nestjs/common';
import { ConflictException, InternalServerErrorException } from '@nestjs/common/exceptions';
import { DataSource, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserEntity } from './user.entity';

@Injectable()

export class UserRepository extends Repository<UserEntity> {
    constructor(private dataSource: DataSource) {
        super(UserEntity, dataSource.createEntityManager())

    }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<UserEntity> {
        const { username, password } = authCredentialsDto;
        const user = new UserEntity()
        user.username = username;
        user.password = password;
        // await user.save()
        try {

            await user.save()
        } catch (error) {
            // console.log(error)
            if (error.code === "23505") {
                throw new ConflictException('Username already exists')
            }
            else {
                throw new InternalServerErrorException()
            }
        }
        return user
    }

}

// import { Injectable } from '@nestjs/common';
// import { DataSource, EntityRepository, Repository } from 'typeorm';
// import { AuthCredentialsDto } from './dto/auth-credentials.dto';
// import { User } from './user.entity';

// @EntityRepository(User)
// @Injectable()
// export class UserRepository extends Repository<User> {
//     constructor(private dataSource: DataSource) {
//         super(User, dataSource.createEntityManager());
//     }

//     async signUp(authCredentialsDto: AuthCredentialsDto) {
//         const { username, password } = authCredentialsDto;
//         const user = new UserEntity();
//         user.username = username;
//         user.password = password;
//         await user.save();
//     }
// }

