import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AdsController } from './controller/ads.controller';
import { AdsService } from './service/ads.service';
import { SubscriptionsModule } from '../subscriptions/subscriptions.module';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';

@Module({
  imports: [JwtModule.register({}), SubscriptionsModule],
  controllers: [AdsController],
  providers: [AdsService, JwtAuthGuard],
})
export class AdsModule {}
