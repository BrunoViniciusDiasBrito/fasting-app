import '../src/shared/config/load-env';
import { PrismaPg } from '@prisma/adapter-pg';
import { hash } from 'argon2';
import {
  ConsentType,
  FastStatus,
  PlanBillingType,
  PrivacyRequestStatus,
  PrivacyRequestType,
  PurchaseStatus,
  PurchaseType,
  ReminderType,
  SubscriptionStatus,
  UserRole,
} from '../src/generated/prisma/enums';
import { PrismaClient } from '../src/generated/prisma/client';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL must be defined before running prisma/seed.ts');
}

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

const plans = [
  {
    code: 'FREE',
    name: 'Iniciante',
    price: 0,
    billingType: PlanBillingType.FREE,
    adsEnabled: true,
    featuresJson: {
      historyLimitDays: 7,
      basicProtocols: true,
      basicInstructions: true,
      advancedStats: false,
      smartRecommendations: false,
      wearableIntegration: false,
    },
  },
  {
    code: 'REMOVE_ADS',
    name: 'Remover Ads',
    price: 4.99,
    billingType: PlanBillingType.ONE_TIME,
    adsEnabled: false,
    featuresJson: {
      removesAds: true,
      unlocksPremium: false,
      basicProtocols: true,
      basicInstructions: true,
    },
  },
  {
    code: 'PROFICIENT',
    name: 'Proficiente',
    price: 9.99,
    billingType: PlanBillingType.MONTHLY,
    adsEnabled: false,
    featuresJson: {
      fullHistory: true,
      advancedStats: true,
      unlimitedCustomProtocols: true,
      expandedMotivationalMessages: true,
      smartRecommendations: false,
    },
  },
  {
    code: 'PERFORMANCE',
    name: 'Performance',
    price: 19.9,
    billingType: PlanBillingType.MONTHLY,
    adsEnabled: false,
    featuresJson: {
      fullHistory: true,
      advancedStats: true,
      advancedReports: true,
      consistencyAnalysis: true,
      smartRecommendations: true,
      advancedContent: true,
      futureWearables: true,
    },
  },
] as const;

const instructions = [
  {
    slug: 'preparacao-para-o-jejum',
    title: 'Preparação para o jejum',
    category: 'PREPARATION',
    content:
      'Comece com protocolos realistas, hidrate-se, faça uma refeição equilibrada antes do início e evite iniciar jejuns em dias de estresse físico intenso.',
    scientificNote:
      'Conteúdo educativo e geral. O app não substitui acompanhamento de nutricionista ou médico.',
    isPremium: false,
  },
  {
    slug: 'durante-o-jejum',
    title: 'Durante o jejum',
    category: 'DURING_FAST',
    content:
      'Beba água, observe sinais do corpo, mantenha atividades leves se estiver começando e não force jejuns longos para ganhar pontos.',
    scientificNote:
      'Pessoas com condições clínicas, diabetes, gestantes, lactantes, menores de idade ou histórico de transtorno alimentar devem consultar profissional de saúde.',
    isPremium: false,
  },
  {
    slug: 'quebra-do-jejum',
    title: 'Quebra do jejum',
    category: 'BREAK_FAST',
    content:
      'Quebre o jejum com alimentos leves, mastigue devagar, priorize proteínas, fibras e hidratação, e registre como você se sentiu.',
    scientificNote:
      'Evite promessas médicas ou compensações alimentares agressivas.',
    isPremium: false,
  },
  {
    slug: 'analise-de-consistencia',
    title: 'Análise de consistência',
    category: 'ADVANCED',
    content:
      'Acompanhe padrões semanais, regularidade e sinais de fadiga para ajustar protocolos sem incentivar comportamento extremo.',
    scientificNote:
      'Recurso premium educativo, sem diagnóstico ou prescrição médica.',
    isPremium: true,
  },
] as const;

async function seedPlans() {
  for (const plan of plans) {
    await prisma.plan.upsert({
      where: { code: plan.code },
      update: {
        name: plan.name,
        price: plan.price,
        billingType: plan.billingType,
        adsEnabled: plan.adsEnabled,
        featuresJson: plan.featuresJson,
      },
      create: plan,
    });
  }
}

async function seedInstructions() {
  for (const instruction of instructions) {
    await prisma.instructionContent.upsert({
      where: { slug: instruction.slug },
      update: instruction,
      create: instruction,
    });
  }
}

async function seedDemoUser() {
  const email = 'demo@fastflow.app';
  const passwordHash = await hash('FastFlow@123');

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      name: 'Usuário Demo',
      role: UserRole.USER,
      timezone: 'America/Sao_Paulo',
      deletedAt: null,
    },
    create: {
      name: 'Usuário Demo',
      email,
      passwordHash,
      role: UserRole.USER,
      timezone: 'America/Sao_Paulo',
    },
  });

  await prisma.gamificationProfile.upsert({
    where: { userId: user.id },
    update: {
      totalPoints: 320,
      currentLevel: 'Iniciante',
      currentStreak: 3,
      bestStreak: 5,
    },
    create: {
      userId: user.id,
      totalPoints: 320,
      currentLevel: 'Iniciante',
      currentStreak: 3,
      bestStreak: 5,
    },
  });

  const defaultProtocol = await prisma.fastingProtocol.findFirst({
    where: { userId: user.id, name: '16:8 Equilibrado' },
  });

  const protocol = defaultProtocol
    ? await prisma.fastingProtocol.update({
        where: { id: defaultProtocol.id },
        data: { fastingHours: 16, eatingWindowHours: 8, isDefault: true },
      })
    : await prisma.fastingProtocol.create({
        data: {
          userId: user.id,
          name: '16:8 Equilibrado',
          fastingHours: 16,
          eatingWindowHours: 8,
          isDefault: true,
        },
      });

  const finishedSession = await prisma.fastingSession.findFirst({
    where: { userId: user.id, notes: 'Sessão demo criada pelo seed.' },
  });

  if (!finishedSession) {
    const startAt = new Date(Date.now() - 18 * 60 * 60 * 1000);
    const endedAt = new Date(Date.now() - 2 * 60 * 60 * 1000);

    await prisma.fastingSession.create({
      data: {
        userId: user.id,
        protocolId: protocol.id,
        startAt,
        expectedEndAt: new Date(startAt.getTime() + 16 * 60 * 60 * 1000),
        endedAt,
        status: FastStatus.FINISHED,
        mood: 'equilibrado',
        notes: 'Sessão demo criada pelo seed.',
        totalHours: 16,
        pointsEarned: 160,
      },
    });
  }

  const reminder = await prisma.reminder.findFirst({
    where: { userId: user.id, type: ReminderType.HOURLY_FASTING, title: 'Hora completa de jejum' },
  });

  if (!reminder) {
    await prisma.reminder.create({
      data: {
        userId: user.id,
        type: ReminderType.HOURLY_FASTING,
        title: 'Hora completa de jejum',
        message: 'Você concluiu mais uma hora. Continue observando seu corpo e hidrate-se.',
        scheduledAt: new Date(Date.now() + 60 * 60 * 1000),
        recurrenceRule: 'FREQ=HOURLY',
        enabled: true,
      },
    });
  }

  for (const consentType of [ConsentType.TERMS, ConsentType.PRIVACY, ConsentType.NOTIFICATIONS, ConsentType.ANALYTICS]) {
    const existing = await prisma.consentRecord.findFirst({
      where: { userId: user.id, consentType, version: 'v1.0.0' },
    });

    if (!existing) {
      await prisma.consentRecord.create({
        data: {
          userId: user.id,
          consentType,
          version: 'v1.0.0',
          accepted: true,
          acceptedAt: new Date(),
          ipAddress: '127.0.0.1',
          userAgent: 'FastFlow seed',
        },
      });
    }
  }

  const proficientPlan = await prisma.plan.findUniqueOrThrow({ where: { code: 'PROFICIENT' } });
  const subscription = await prisma.subscription.findFirst({
    where: { userId: user.id, provider: 'REVENUECAT', providerEntitlementId: 'proficient' },
  });

  if (!subscription) {
    await prisma.subscription.create({
      data: {
        userId: user.id,
        planId: proficientPlan.id,
        provider: 'REVENUECAT',
        providerCustomerId: `seed-${user.id}`,
        providerEntitlementId: 'proficient',
        status: SubscriptionStatus.ACTIVE,
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        cancelAtPeriodEnd: false,
        lastSyncedAt: new Date(),
      },
    });
  }

  const purchase = await prisma.purchase.findFirst({
    where: { userId: user.id, transactionId: 'seed-remove-ads-transaction' },
  });

  if (!purchase) {
    await prisma.purchase.create({
      data: {
        userId: user.id,
        provider: 'REVENUECAT',
        productId: 'fastflow_remove_ads',
        transactionId: 'seed-remove-ads-transaction',
        type: PurchaseType.REMOVE_ADS,
        status: PurchaseStatus.COMPLETED,
        purchasedAt: new Date(),
      },
    });
  }

  const privacyRequest = await prisma.privacyRequest.findFirst({
    where: { userId: user.id, type: PrivacyRequestType.EXPORT, status: PrivacyRequestStatus.COMPLETED },
  });

  if (!privacyRequest) {
    await prisma.privacyRequest.create({
      data: {
        userId: user.id,
        type: PrivacyRequestType.EXPORT,
        status: PrivacyRequestStatus.COMPLETED,
        requestedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
        completedAt: new Date(),
      },
    });
  }

  const auditLog = await prisma.auditLog.findFirst({
    where: { userId: user.id, action: 'seed.demo_user.created', entity: 'User' },
  });

  if (!auditLog) {
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'seed.demo_user.created',
        entity: 'User',
        entityId: user.id,
        metadataJson: { source: 'prisma/seed.ts', safe: true },
        ipAddress: '127.0.0.1',
      },
    });
  }

  return user;
}

async function main() {
  await seedPlans();
  await seedInstructions();
  const user = await seedDemoUser();

  console.log('Seed FastFlow concluído com sucesso.');
  console.log(`Usuário demo: ${user.email}`);
  console.log('Senha demo: FastFlow@123');
}

main()
  .catch((error) => {
    console.error('Erro ao executar seed FastFlow:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
