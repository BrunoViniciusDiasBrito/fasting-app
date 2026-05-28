import { Injectable } from '@nestjs/common';
import { CreateReminderDto } from '../dto/create-reminder.dto';
import { UpdateReminderDto } from '../dto/update-reminder.dto';
import { RemindersRepository } from '../repository/reminders.repository';

@Injectable()
export class RemindersService {
  constructor(private readonly remindersRepository: RemindersRepository) {}

  create(userId: string, dto: CreateReminderDto) {
    return this.remindersRepository.create(userId, {
      ...dto,
      scheduledAt: new Date(dto.scheduledAt),
    });
  }

  list(userId: string) {
    return this.remindersRepository.list(userId);
  }

  update(userId: string, id: string, dto: UpdateReminderDto) {
    return this.remindersRepository.update(id, userId, dto);
  }

  delete(userId: string, id: string) {
    return this.remindersRepository.delete(id, userId);
  }
}
