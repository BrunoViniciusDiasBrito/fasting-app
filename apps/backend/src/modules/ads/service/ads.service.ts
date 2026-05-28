import { Injectable } from '@nestjs/common';
import { SubscriptionsService } from '../../subscriptions/service/subscriptions.service';

@Injectable()
export class AdsService {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  async shouldShowAds(userId: string) {
    const status = await this.subscriptionsService.status(userId);
    return {
      showAds: status.adsEnabled,
      reason: status.adsEnabled ? 'FREE_OR_ADS_ENABLED_PLAN' : 'ADS_DISABLED_BY_PLAN',
    };
  }
}
