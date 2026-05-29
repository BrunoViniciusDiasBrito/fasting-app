import { BadRequestException } from '@nestjs/common';
import { FastingSessionsService } from '../service/fasting-sessions.service';

describe('FastingSessionsService', () => {
  it('prevents starting when active session exists', async () => {
    const repo = {
      findActiveByUser: jest.fn().mockResolvedValue({ id: 'active' }),
      create: jest.fn(),
    } as any;
    const gamification = { calculatePointsFromHours: jest.fn() } as any;
    const service = new FastingSessionsService(repo, gamification);

    await expect(
      service.start('u1', { startAt: new Date().toISOString(), expectedEndAt: new Date().toISOString() }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
