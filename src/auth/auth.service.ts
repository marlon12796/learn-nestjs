import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import refreshJwtConfig from './config/refresh-jwt.config';
import { ConfigType } from '@nestjs/config';
import { AuthJwtPayload } from './types/auth.jwtPayload';
import * as argon2 from 'argon2';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(refreshJwtConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>,
  ) {}
  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new NotFoundException('User Not Found!');
    const isPasswordMatch = await compare(password, user.password);
    if (!isPasswordMatch) throw new UnauthorizedException('Invalid Password!');

    return { id: user.id, email: user.email };
  }
 

  async generateAndStoreTokens(user: User) {
    console.log(user)
    const payload: AuthJwtPayload = { sub: user.id, email: user.email };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.refreshTokenConfig),
    ]);
    const hashedRefreshToken = await argon2.hash(refreshToken);
    await this.userService.updateHashedRefreshToken(user.id, hashedRefreshToken);
    
    return { accessToken, refreshToken };
  }
   async login(user: User) {
   const { accessToken, refreshToken } = await this.generateAndStoreTokens(user);
    return { accessToken, refreshToken, id: user.id };
  }
  async refresh(user: User) {
     const { accessToken, refreshToken } = await this.generateAndStoreTokens(user);
    return { accessToken, refreshToken };
  }
  async validateRefreshToken(userId: number, refreshToken: string) {
    console.log(userId)
    const user = await this.userService.findOne(userId);
    if (!user || !user.hashedRefreshToken)
      throw new NotFoundException('Refresh Token not found!');
    const isRefreshTokenValid = await argon2.verify(
      user.hashedRefreshToken,
      refreshToken,
    );
    if (!isRefreshTokenValid)
      throw new UnauthorizedException('Invalid Refresh Token!');
    return { id: userId };
  }
  async logout(userId:number) {
    // Implement logout logic here
   return this.userService.updateHashedRefreshToken(userId,null)
 }
}
