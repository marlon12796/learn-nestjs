import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
  async create(createUserDto: CreateUserDto) {
    const user = this.userRepo.create(createUserDto);
    return await this.userRepo.save(user);
  }
  async updateHashedRefreshToken(id: number, hashedRefreshToken: string) {
    return await this.userRepo.update({ id }, { hashedRefreshToken });
  }
  findAll() {
    return `This action returns all user`;
  }
  async findByEmail(email: string) {
    const foundEmail = await this.userRepo.findOne({
      where: {
        email,
      },
    });
    return foundEmail;
  }

  findOne(id: number) {
    return this.userRepo.findOne({
      where: {
        id,
      },
      select: [
        'id',
        'firstName',
        'lastName',
        'avatarUrl',
        'hashedRefreshToken',
        'role',
      ],
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
