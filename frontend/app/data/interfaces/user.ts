export interface RegisterUserParams {
  username: string;
  password: string;
  name: string;
  email: string;
}

export interface CreateUserResponse {
  username: string;
}

export interface CreateUserParams {
  username: string;
  password: string;
  name: string;
  email: string;
}
