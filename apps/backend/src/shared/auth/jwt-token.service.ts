import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenService {
  constructor(private readonly jwtService: JwtService) {}

  signAccessToken(payload: { sub: string; role: string }) {
    return this.jwtService.signAsync(payload, { expiresIn: '15m' });
  }

  signRefreshToken(payload: { sub: string; sessionId: string }) {
    return this.jwtService.signAsync(payload, { expiresIn: '30d' });
  }
}
