import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/database/prisma.service';

@Injectable()
export class PrivacyRepository {
  constructor(private readonly prisma: PrismaService) {}

  createRequest(userId: string, type: 'EXPORT' | 'DELETE_ACCOUNT') {
    return this.prisma.privacyRequest.create({
      data: { userId, type, status: 'REQUESTED' },
    });
  }
}
