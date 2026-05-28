import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { FastingSessionsRepository } from '../repository/fasting-sessions.repository';
import { StartFastingSessionDto } from '../dto/start-fasting-session.dto';
import { FinishFastingSessionDto } from '../dto/finish-fasting-session.dto';
import { GamificationService } from '../../gamification/service/gamification.service';

@Injectable()
export class FastingSessionsService {
  constructor(
    private readonly fastingSessionsRepository: FastingSessionsRepository,
    private readonly gamificationService: GamificationService,
  ) {}

  async start(userId: string, dto: StartFastingSessionDto) {
    const active = await this.fastingSessionsRepository.findActiveByUser(userId);
    if (active) throw new BadRequestException('Já existe jejum ativo para este usuário.');

    return this.fastingSessionsRepository.create({
      userId,
      protocolId: dto.protocolId,
      startAt: new Date(dto.startAt),
      expectedEndAt: new Date(dto.expectedEndAt),
    });
  }

  async finish(userId: string, id: string, dto: FinishFastingSessionDto) {
    const session = await this.fastingSessionsRepository.findById(id, userId);
    if (!session) throw new NotFoundException('Sessão de jejum não encontrada.');
    if (session.status !== 'ACTIVE') throw new BadRequestException('Sessão não está ativa.');

    const endedAt = new Date();
    const totalHours = Math.max(0, Math.floor((endedAt.getTime() - session.startAt.getTime()) / (1000 * 60 * 60)));
    const pointsEarned = this.gamificationService.calculatePointsFromHours(totalHours);

    return this.fastingSessionsRepository.finish(id, {
      endedAt,
      totalHours,
      pointsEarned,
      mood: dto.mood,
      notes: dto.notes,
    });
  }

  current(userId: string) {
    return this.fastingSessionsRepository.findActiveByUser(userId);
  }

  history(userId: string) {
    return this.fastingSessionsRepository.history(userId);
  }
}
