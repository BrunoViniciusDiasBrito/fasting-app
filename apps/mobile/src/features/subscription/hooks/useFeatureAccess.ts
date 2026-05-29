import { useQuery } from '@tanstack/react-query';
import { fetchSubscriptionStatus } from '../api/subscription-api';
import { FEATURE_GATES, PLAN_ORDER, PlanCode } from '@/src/shared/config/app-content';

export function hasPlanAccess(currentPlan: string | undefined, minPlan: PlanCode) {
  const normalized = (currentPlan ?? 'FREE') as PlanCode;
  return (PLAN_ORDER[normalized] ?? PLAN_ORDER.FREE) >= PLAN_ORDER[minPlan];
}

export function useFeatureAccess(feature: keyof typeof FEATURE_GATES) {
  const subscription = useQuery({ queryKey: ['subscription', 'status'], queryFn: fetchSubscriptionStatus });
  const gate = FEATURE_GATES[feature];
  const canAccess = hasPlanAccess(subscription.data?.plan, gate.minPlan);

  return {
    ...subscription,
    gate,
    canAccess,
    currentPlan: subscription.data?.plan ?? 'FREE',
  };
}
