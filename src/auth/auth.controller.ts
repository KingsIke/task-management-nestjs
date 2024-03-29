import { Body, Controller, Post } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserEntity } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {

    }
    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<UserEntity> {
        console.log(authCredentialsDto)
        return this.authService.signUp(authCredentialsDto)
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        return this.authService.signIn(authCredentialsDto)
    }


    //=========== For Decorator testing to get users==============
    // @Post('/test')
    // @UseGuards(AuthGuard())
    // test(@GetUser() user: UserEntity) {
    //     console.log(user)
    // }

    // test(@Req() req) {
    //     console.log(req)
    // }
}
