import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor( private readonly userService: UserService,private readonly jwtService:JwtService) {  
  }
  async validateUser(email: string, password: string) { 
 
    const user = await this.userService.findByEmail(email)
    if (!user) throw new NotFoundException("User Not Found!")
    const isPasswordMatch=await compare(password,user.password)
    if (!isPasswordMatch) {
      throw new UnauthorizedException("Invalid Password!")
    }
    return {id:user.id,email:user.email}
  }
  async login() {
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
