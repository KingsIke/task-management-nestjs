import { Injectable } from '@nestjs/common';
import * as bcrypt from "bcrypt"
import { DataSource, Repository } from 'typeorm';
import { ConflictException, InternalServerErrorException } from '@nestjs/common/exceptions';
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
        user.salt = await bcrypt.genSalt()
        user.password = await this.hashPassword(password, user.salt)
        console.log(user.password)
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
    /////////////////////// HASHING PASSWORD ///////////////////////////////
    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt)
    }

    // ======================= VALIDATE PASSWORD ========================
    async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const { username, password } = authCredentialsDto;
        const user = await this.findOne({
            where: {
                username,
            },
        })

        if (user && await user.validatePassword(password)) {
            return user.username
        }
        else {
            return null
        }
    }
}
