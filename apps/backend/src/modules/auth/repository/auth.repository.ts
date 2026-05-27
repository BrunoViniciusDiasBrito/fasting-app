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

  createSession(input: { userId: string; refreshTokenHash: string; expiresAt: Date }) {
    return this.prisma.authSession.create({ data: input });
  }
}
