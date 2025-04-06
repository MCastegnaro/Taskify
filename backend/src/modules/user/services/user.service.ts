/* eslint-disable @typescript-eslint/no-unsafe-return */
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { UserEntity } from 'src/config/database/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, CreateUserResponse, UserDto } from '../dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(newUser: CreateUserDto): Promise<CreateUserResponse> {
    const { username, password, email, name } = newUser;

    const userExists = await this.findByUserName(username);

    if (userExists) {
      throw new ConflictException(`User '${username}' already registered!`);
    }

    const hashedPassword = this.hashPassword(password);

    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
      email,
      name,
    });

    const savedUser = await this.usersRepository.save(user);

    return {
      id: savedUser.id,
      username: savedUser.username,
    };
  }

  async findByUserName(username: string): Promise<UserDto | null> {
    const userFound = await this.usersRepository.findOne({
      where: { username },
    });

    if (!userFound) {
      return null;
    }

    return {
      id: userFound.id,
      username: userFound.username,
      password: userFound.password,
    };
  }

  private hashPassword(password: string): string {
    return bcryptHashSync(password, 10);
  }
}
