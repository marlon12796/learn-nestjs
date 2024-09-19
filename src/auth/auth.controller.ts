import { Controller, Get, Post, Body,  UseGuards, Request, HttpStatus, HttpCode} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req) {
    return await this.authService.login(req.user)
     
  }
  @Post("refresh")
  @UseGuards(RefreshAuthGuard)
  async refreshToken(@Request() req) {
    return await this.authService.refresh(req.user);
    
  }
  @UseGuards(JwtAuthGuard)
  @Post("logout")
  async logout(@Request() req) {
    await this.authService.logout(req.user.id);
    return { message: 'Logged out' };
  }
}
