import { Injectable } from '@nestjs/common';
import type { ReminderType } from '../../../generated/prisma/enums';
import { PrismaService } from '../../../shared/database/prisma.service';

@Injectable()
export class RemindersRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(
    userId: string,
    data: { type: ReminderType; title: string; message: string; scheduledAt: Date; recurrenceRule?: string; enabled: boolean },
  ) {
    return this.prisma.reminder.create({ data: { userId, ...data } });
  }

  list(userId: string) {
    return this.prisma.reminder.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
  }

  update(id: string, userId: string, data: { title?: string; message?: string; enabled?: boolean }) {
    return this.prisma.reminder.updateMany({ where: { id, userId }, data });
  }

  delete(id: string, userId: string) {
    return this.prisma.reminder.deleteMany({ where: { id, userId } });
  }
}
