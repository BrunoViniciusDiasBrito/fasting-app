import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { PasswordService } from '../../../shared/crypto/password.service';
import { JwtTokenService } from '../../../shared/auth/jwt-token.service';
import { AuthRepository } from '../repository/auth.repository';
import { RefreshDto } from '../dto/refresh.dto';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';

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
      id: sessionId,
      userId: user.id,
      refreshTokenHash,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    return { accessToken, refreshToken };
  }

  async refresh(payload: RefreshDto) {
    const decoded = await this.jwtTokenService.verifyRefreshToken(payload.refreshToken);
    const session = await this.authRepository.findSessionById(decoded.sessionId);

    if (!session || session.revokedAt || session.expiresAt < new Date()) {
      throw new UnauthorizedException('Sessão inválida ou expirada.');
    }

    const validRefresh = await this.passwordService.verify(session.refreshTokenHash, payload.refreshToken);
    if (!validRefresh) throw new UnauthorizedException('Refresh token inválido.');

    const accessToken = await this.jwtTokenService.signAccessToken({ sub: decoded.sub, role: 'USER' });
    const newRefreshToken = await this.jwtTokenService.signRefreshToken({ sub: decoded.sub, sessionId: session.id });
    const newRefreshHash = await this.passwordService.hash(newRefreshToken);

    await this.authRepository.updateSessionToken(session.id, newRefreshHash, new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));

    return { accessToken, refreshToken: newRefreshToken };
  }

  async logout(payload: RefreshDto) {
    const decoded = await this.jwtTokenService.verifyRefreshToken(payload.refreshToken);
    await this.authRepository.revokeSession(decoded.sessionId);
    return { success: true };
  }

  async forgotPassword(payload: ForgotPasswordDto) {
    const user = await this.authRepository.findUserByEmail(payload.email.toLowerCase());
    if (!user) return { success: true };
    return { success: true, resetToken: `dev-reset-${user.id}` };
  }

  async resetPassword(_payload: ResetPasswordDto) {
    return { success: true, message: 'TODO: persistir token de reset com expiração e invalidar uso.' };
  }
}
