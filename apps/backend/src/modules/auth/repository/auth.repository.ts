import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/database/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  createUser(input: { name: string; email: string; passwordHash: string }) {
    return this.prisma.user.create({ data: input });
  }

  findUserByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  findSessionById(id: string) {
    return this.prisma.authSession.findUnique({ where: { id } });
  }

  createSession(input: { id: string; userId: string; refreshTokenHash: string; expiresAt: Date }) {
    return this.prisma.authSession.create({ data: input });
  }

  revokeSession(id: string) {
    return this.prisma.authSession.update({
      where: { id },
      data: { revokedAt: new Date() },
    });
  }

  updateSessionToken(id: string, refreshTokenHash: string, expiresAt: Date) {
    return this.prisma.authSession.update({ where: { id }, data: { refreshTokenHash, expiresAt } });
  }
}
