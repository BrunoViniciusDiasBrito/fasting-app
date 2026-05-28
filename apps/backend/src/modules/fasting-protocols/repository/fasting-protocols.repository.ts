import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/database/prisma.service';

@Injectable()
export class FastingProtocolsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: string, data: { name: string; fastingHours: number; eatingWindowHours: number; isDefault: boolean }) {
    return this.prisma.fastingProtocol.create({ data: { userId, ...data } });
  }

  list(userId: string) {
    return this.prisma.fastingProtocol.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
  }
}
