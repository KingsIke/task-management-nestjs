import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {

    @IsString()
    @MinLength(4)
    @MaxLength(15)
    username: string;


    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\w+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Password should have special character,Capital with small alphabet' })
    password: string
} 