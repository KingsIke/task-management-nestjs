import { Body, Controller, Post } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserEntity } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {

    }
    @Post()
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<UserEntity> {
        console.log(authCredentialsDto)
        return this.authService.signUp(authCredentialsDto)
    }
}
