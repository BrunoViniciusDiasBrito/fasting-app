import { Injectable } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';

@Injectable()
export class AuthService {
  async register(payload: RegisterDto) {
    return {
      message: 'register scaffold',
      user: { id: 'stub', name: payload.name, email: payload.email },
    };
  }

  async login(payload: LoginDto) {
    return {
      message: 'login scaffold',
      accessToken: 'stub-access-token',
      refreshToken: 'stub-refresh-token',
      email: payload.email,
    };
  }

  async refresh() {
    return { accessToken: 'stub-new-access-token' };
  }

  async logout() {
    return { success: true };
  }
}
