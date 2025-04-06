import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto, CreateUserResponse } from './dto/user.dto';
import { UserService } from './services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() user: CreateUserDto): Promise<CreateUserResponse> {
    return await this.userService.create(user);
  }
}
