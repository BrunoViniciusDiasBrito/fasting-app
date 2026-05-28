export type AppError = { status?: number; code?: string; message: string };

export const normalizeError = (error: unknown): AppError => ({
  message: error instanceof Error ? error.message : 'Erro inesperado',
});
