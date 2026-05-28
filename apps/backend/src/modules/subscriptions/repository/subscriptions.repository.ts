import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/database/prisma.service';

@Injectable()
export class SubscriptionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  getUserActiveSubscription(userId: string) {
    return this.prisma.subscription.findFirst({
      where: { userId, status: { in: ['ACTIVE', 'TRIALING'] } },
      include: { plan: true },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async getPlanByCode(code: string) {
    return this.prisma.plan.findUnique({ where: { code } });
  }

  async upsertSubscription(userId: string, planId: string, payload: { provider: string; providerCustomerId?: string; entitlementId?: string }) {
    const current = await this.prisma.subscription.findFirst({ where: { userId, status: { in: ['ACTIVE', 'TRIALING'] } } });
    if (current) {
      return this.prisma.subscription.update({
        where: { id: current.id },
        data: {
          planId,
          provider: payload.provider,
          providerCustomerId: payload.providerCustomerId ?? current.providerCustomerId,
          providerEntitlementId: payload.entitlementId ?? current.providerEntitlementId,
          status: 'ACTIVE',
          lastSyncedAt: new Date(),
        },
      });
    }

    return this.prisma.subscription.create({
      data: {
        userId,
        planId,
        provider: payload.provider,
        providerCustomerId: payload.providerCustomerId ?? `rc-${userId}`,
        providerEntitlementId: payload.entitlementId,
        status: 'ACTIVE',
        lastSyncedAt: new Date(),
      },
    });
  }
}
