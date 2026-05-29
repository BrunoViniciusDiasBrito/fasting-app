import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { FastingSessionsController } from './controller/fasting-sessions.controller';
import { FastingSessionsService } from './service/fasting-sessions.service';
import { FastingSessionsRepository } from './repository/fasting-sessions.repository';
import { PrismaService } from '../../shared/database/prisma.service';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { GamificationModule } from '../gamification/gamification.module';

@Module({
  imports: [JwtModule.register({}), GamificationModule],
  controllers: [FastingSessionsController],
  providers: [FastingSessionsService, FastingSessionsRepository, PrismaService, JwtAuthGuard],
})
export class FastingSessionsModule {}
