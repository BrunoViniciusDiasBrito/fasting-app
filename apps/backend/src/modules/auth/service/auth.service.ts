import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { PasswordService } from '../../../shared/crypto/password.service';
import { JwtTokenService } from '../../../shared/auth/jwt-token.service';
import { AuthRepository } from '../repository/auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly jwtTokenService: JwtTokenService,
    private readonly authRepository: AuthRepository,
  ) {}

  async register(payload: RegisterDto) {
    const existing = await this.authRepository.findUserByEmail(payload.email.toLowerCase());
    if (existing) throw new BadRequestException('E-mail já cadastrado.');

    const passwordHash = await this.passwordService.hash(payload.password);
    const user = await this.authRepository.createUser({
      name: payload.name,
      email: payload.email.toLowerCase(),
      passwordHash,
    });

    return { id: user.id, name: user.name, email: user.email };
  }

  async login(payload: LoginDto) {
    const user = await this.authRepository.findUserByEmail(payload.email.toLowerCase());
    if (!user) throw new UnauthorizedException('Credenciais inválidas.');

    const valid = await this.passwordService.verify(user.passwordHash, payload.password);
    if (!valid) throw new UnauthorizedException('Credenciais inválidas.');

    const sessionId = randomUUID();
    const accessToken = await this.jwtTokenService.signAccessToken({ sub: user.id, role: user.role });
    const refreshToken = await this.jwtTokenService.signRefreshToken({ sub: user.id, sessionId });

    const refreshTokenHash = await this.passwordService.hash(refreshToken);
    await this.authRepository.createSession({
      userId: user.id,
      refreshTokenHash,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    return { accessToken, refreshToken };
  }

  async refresh() {
    return { message: 'TODO: validar refresh token rotativo' };
  }

  async logout() {
    return { success: true };
  }
}
