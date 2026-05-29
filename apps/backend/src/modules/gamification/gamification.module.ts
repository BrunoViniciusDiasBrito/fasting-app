import { Module } from '@nestjs/common';
import { GamificationService } from './service/gamification.service';

@Module({
  providers: [GamificationService],
  exports: [GamificationService],
})
export class GamificationModule {}
