import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/database/prisma.service';

@Injectable()
export class ConsentRepository {
  constructor(private readonly prisma: PrismaService) {}

  listByUser(userId: string) {
    return this.prisma.consentRecord.findMany({
      where: { userId },
      orderBy: { acceptedAt: 'desc' },
    });
  }

  create(input: {
    userId: string;
    consentType: 'TERMS' | 'PRIVACY' | 'NOTIFICATIONS' | 'MARKETING' | 'ANALYTICS';
    version: string;
    accepted: boolean;
    ipAddress?: string;
    userAgent?: string;
  }) {
    return this.prisma.consentRecord.create({
      data: {
        ...input,
        acceptedAt: input.accepted ? new Date() : null,
      },
    });
  }

  revoke(id: string) {
    return this.prisma.consentRecord.update({
      where: { id },
      data: { accepted: false, revokedAt: new Date() },
    });
  }
}
