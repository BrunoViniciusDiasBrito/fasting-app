import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenService {
  constructor(private readonly jwtService: JwtService) {}

  signAccessToken(payload: { sub: string; role: string }) {
    return this.jwtService.signAsync(payload, {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN ?? '15m',
      secret: process.env.JWT_ACCESS_SECRET,
    });
  }

  signRefreshToken(payload: { sub: string; sessionId: string }) {
    return this.jwtService.signAsync(payload, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? '30d',
      secret: process.env.JWT_REFRESH_SECRET,
    });
  }

  async verifyRefreshToken(token: string): Promise<{ sub: string; sessionId: string }> {
    try {
      return await this.jwtService.verifyAsync(token, { secret: process.env.JWT_REFRESH_SECRET });
    } catch {
      throw new UnauthorizedException('Refresh token inválido.');
    }
  }
}
