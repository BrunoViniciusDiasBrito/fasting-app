import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/database/prisma.service';

@Injectable()
export class FastingSessionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: { userId: string; protocolId?: string; startAt: Date; expectedEndAt: Date }) {
    return this.prisma.fastingSession.create({ data: { ...data, status: 'ACTIVE' } });
  }

  findActiveByUser(userId: string) {
    return this.prisma.fastingSession.findFirst({ where: { userId, status: 'ACTIVE' }, orderBy: { createdAt: 'desc' } });
  }

  findById(id: string, userId: string) {
    return this.prisma.fastingSession.findFirst({ where: { id, userId } });
  }

  finish(id: string, data: { endedAt: Date; totalHours: number; pointsEarned: number; mood?: string; notes?: string }) {
    return this.prisma.fastingSession.update({ where: { id }, data: { ...data, status: 'FINISHED' } });
  }

  history(userId: string) {
    return this.prisma.fastingSession.findMany({ where: { userId }, orderBy: { createdAt: 'desc' }, take: 50 });
  }
}
