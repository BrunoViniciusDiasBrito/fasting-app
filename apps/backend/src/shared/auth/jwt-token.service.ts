import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

function parseExpiresIn(value: string, fallbackSeconds: number): number {
  const raw = (value || '').trim();
  const match = raw.match(/^(\d+)([smhd])?$/i);
  if (!match) return fallbackSeconds;

  const amount = Number(match[1]);
  const unit = (match[2] || 's').toLowerCase();
  if (unit === 's') return amount;
  if (unit === 'm') return amount * 60;
  if (unit === 'h') return amount * 3600;
  if (unit === 'd') return amount * 86400;
  return fallbackSeconds;
}

@Injectable()
export class JwtTokenService {
  constructor(private readonly jwtService: JwtService) {}

  signAccessToken(payload: { sub: string; role: string }) {
    return this.jwtService.signAsync(payload, {
      expiresIn: parseExpiresIn(process.env.JWT_ACCESS_EXPIRES_IN ?? '15m', 900),
      secret: process.env.JWT_ACCESS_SECRET,
    });
  }

  signRefreshToken(payload: { sub: string; sessionId: string }) {
    return this.jwtService.signAsync(payload, {
      expiresIn: parseExpiresIn(process.env.JWT_REFRESH_EXPIRES_IN ?? '30d', 2592000),
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
