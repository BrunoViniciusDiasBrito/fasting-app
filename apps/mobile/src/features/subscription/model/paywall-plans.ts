export const PAYWALL_PLANS = [
  { code: 'FREE', title: 'Iniciante', priceLabel: 'Grátis', perks: ['Com anúncios', 'Protocolos básicos'] },
  { code: 'REMOVE_ADS', title: 'Remover Ads', priceLabel: 'R$ 4,99', perks: ['Sem anúncios no plano free'] },
  { code: 'PROFICIENT', title: 'Proficiente', priceLabel: 'R$ 9,99/mês', perks: ['Sem anúncios', 'Histórico completo'] },
  { code: 'PERFORMANCE', title: 'Performance', priceLabel: 'R$ 19,90/mês', perks: ['Tudo do Proficiente', 'Relatórios avançados'] },
] as const;
