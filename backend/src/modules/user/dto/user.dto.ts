export class UserDto {
  id: string;
  username: string;
  password: string;
}

export class CreateUserDto {
  id: string;
  username: string;
  password: string;
  email: string;
  name: string;
}

export interface CreateUserResponse {
  id: string;
  username: string;
}

export interface CreateSessionDto {
  username: string;
  password: string;
}
