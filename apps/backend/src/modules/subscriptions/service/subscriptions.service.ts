import { BadRequestException, Injectable } from '@nestjs/common';
import { SubscriptionsRepository } from '../repository/subscriptions.repository';
import { SyncSubscriptionDto } from '../dto/sync-subscription.dto';

@Injectable()
export class SubscriptionsService {
  constructor(private readonly subscriptionsRepository: SubscriptionsRepository) {}

  async status(userId: string) {
    const subscription = await this.subscriptionsRepository.getUserActiveSubscription(userId);
    return {
      hasSubscription: !!subscription,
      plan: subscription?.plan?.code ?? 'FREE',
      adsEnabled: subscription?.plan?.adsEnabled ?? true,
      subscription,
    };
  }

  async sync(userId: string, dto: SyncSubscriptionDto) {
    const planCode = dto.planCode ?? 'PROFICIENT';
    const plan = await this.subscriptionsRepository.getPlanByCode(planCode);
    if (!plan) throw new BadRequestException('Plano inválido para sincronização.');

    const updated = await this.subscriptionsRepository.upsertSubscription(userId, plan.id, {
      provider: 'REVENUECAT',
      providerCustomerId: dto.providerCustomerId,
      entitlementId: dto.entitlementId,
    });

    return { success: true, subscription: updated };
  }

  entitlements(userId: string) {
    return this.status(userId);
  }
}
