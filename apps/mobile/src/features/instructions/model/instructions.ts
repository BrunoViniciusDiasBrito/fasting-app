export const INSTRUCTION_SECTIONS = [
  {
    title: 'Preparação para o jejum',
    tone: 'primary' as const,
    items: [
      'Faça uma refeição equilibrada antes de iniciar.',
      'Hidrate-se bem e evite começar após exageros.',
      'Escolha um protocolo realista, como 12h ou 14h no início.',
    ],
  },
  {
    title: 'Durante o jejum',
    tone: 'secondary' as const,
    items: [
      'Beba água e observe sinais do corpo.',
      'Evite treinos intensos se estiver começando.',
      'Não force jejuns longos para ganhar mais pontos.',
    ],
  },
  {
    title: 'Quebra do jejum',
    tone: 'tertiary' as const,
    items: [
      'Quebre o jejum com alimentos leves e nutritivos.',
      'Coma devagar e evite compensações exageradas.',
      'Registre como você se sentiu para ajustar a rotina.',
    ],
  },
];

export const MEDICAL_DISCLAIMER =
  'O FastFlow não substitui orientação médica. Pessoas com diabetes, gestantes, lactantes, menores de idade, histórico de transtorno alimentar ou condições clínicas devem consultar profissional de saúde.';
