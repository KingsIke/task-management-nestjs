import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from './jwt-payload-interface';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import * as config from 'config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'),
        })
    }

    async validate(payload: JwtPayload): Promise<UserEntity> {
        const { username } = payload
        const user = await this.userRepository.findOne({
            where: {
                username,
            }
        });

        if (!user) {
            throw new UnauthorizedException('Unauthorized access')
        }
        return user;
    }
}