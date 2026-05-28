import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';
import { CurrentUser } from '../../../shared/decorators/current-user.decorator';
import { SubscriptionsService } from '../service/subscriptions.service';
import { SyncSubscriptionDto } from '../dto/sync-subscription.dto';

@Controller('subscriptions')
@UseGuards(JwtAuthGuard)
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Get('status')
  status(@CurrentUser() user: { sub: string }) {
    return this.subscriptionsService.status(user.sub);
  }

  @Post('sync')
  sync(@CurrentUser() user: { sub: string }, @Body() dto: SyncSubscriptionDto) {
    return this.subscriptionsService.sync(user.sub, dto);
  }

  @Get('entitlements')
  entitlements(@CurrentUser() user: { sub: string }) {
    return this.subscriptionsService.entitlements(user.sub);
  }

  @Post('revenuecat/webhook')
  webhook() {
    return { received: true };
  }
}
