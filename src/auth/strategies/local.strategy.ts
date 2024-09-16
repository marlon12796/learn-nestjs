import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { BadRequestException, Injectable,} from '@nestjs/common';
import { Request } from 'express';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email'});
  }
    authenticate(req: Request, options?: any): void {
    if (!req.body.email ||!req.body.password) {
      throw new BadRequestException('Please provide email and password');
    }
    super.authenticate(req, options);
  }
  async validate(username: string, password: string) {
    return   await this.authService.validateUser(username, password);
 
  
  }
}
