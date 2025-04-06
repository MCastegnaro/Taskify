import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto, CreateUserResponse } from '../user/dto/user.dto';
import { UserService } from '../user/services/user.service';
import { AuthResponseDto } from './dto/auth.dto';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body('username') username: string,
    @Body('password') password: string,
  ): Promise<AuthResponseDto> {
    return await this.authService.signIn(username, password);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() user: CreateUserDto): Promise<CreateUserResponse> {
    return await this.userService.create(user);
  }
}
