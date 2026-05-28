export const APP_BRAND = {
  name: 'FastFlow',
  tagline: 'Jejum com ritmo, segurança e consistência.',
  splashSubtitle: 'Rotina inteligente para evoluir sem extremos.',
};

export const DEFAULT_FASTING_PROTOCOL = {
  label: 'Jejum 16:8',
  fastingHours: 16,
  eatingWindowHours: 8,
};

export const APP_ROUTES = [
  { href: '/tips', label: 'Dicas', icon: 'lightbulb-on-outline' },
  { href: '/recommendations', label: 'Recomendações', icon: 'chart-timeline-variant' },
  { href: '/settings', label: 'Configurações', icon: 'cog-outline' },
] as const;

export const PLAN_ORDER = {
  FREE: 0,
  REMOVE_ADS: 1,
  PROFICIENT: 2,
  PERFORMANCE: 3,
} as const;

export type PlanCode = keyof typeof PLAN_ORDER;

export const FEATURE_GATES = {
  advancedRecommendations: {
    minPlan: 'PERFORMANCE' as PlanCode,
    title: 'Recomendações inteligentes',
    description: 'Análise de consistência, relatórios avançados e sugestões para ajustar sua rotina com segurança.',
  },
  fullHistory: {
    minPlan: 'PROFICIENT' as PlanCode,
    title: 'Histórico completo',
    description: 'Acesse todo o histórico de jejuns e estatísticas avançadas.',
  },
} as const;

export const RECOMMENDATION_CARDS = [
  {
    title: 'Consistência antes de intensidade',
    description: 'Prefira manter 12h–16h com regularidade antes de aumentar duração.',
    metric: '7 dias',
  },
  {
    title: 'Quebra de jejum leve',
    description: 'Priorize proteínas, fibras e hidratação em vez de grandes volumes de comida.',
    metric: 'baixa carga',
  },
  {
    title: 'Ajuste por sensação',
    description: 'Se houver tontura, fraqueza forte ou mal-estar, encerre o jejum e reavalie.',
    metric: 'segurança',
  },
];
