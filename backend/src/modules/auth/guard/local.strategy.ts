import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.services/auth.service';
import LoginUserDTO from '../../../DTO/loginUserDTO';
/**
 * NestJS documentation suggests using the Passport library 
 * and provides us with the means to do so. Passport 
 * gives us an abstraction over the authentication, 
 * thus relieving us from some heavy lifting. 
 * Also, it is heavily tested in production by many developers.
 * Applications have different approaches to authentication.
 * Passport calls those mechanisms strategies.
 * The first strategy that we want to implement is the passport-local strategy.
 * It is a strategy for authenticating with a username and password.
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authenticationService: AuthService) {
    super({
        usernameField: 'email',
    });
    }
    async validate(email:string,password:string): Promise<string> {
        return this.authenticationService.login({email,password});
    }
}