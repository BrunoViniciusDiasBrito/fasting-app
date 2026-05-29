import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SubscriptionsController } from './controller/subscriptions.controller';
import { SubscriptionsService } from './service/subscriptions.service';
import { SubscriptionsRepository } from './repository/subscriptions.repository';
import { PrismaService } from '../../shared/database/prisma.service';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';

@Module({
  imports: [JwtModule.register({})],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService, SubscriptionsRepository, PrismaService, JwtAuthGuard],
  exports: [SubscriptionsService],
})
export class SubscriptionsModule {}
