import { Injectable } from '@nestjs/common';

@Injectable()
export class GamificationService {
  calculatePointsFromHours(hours: number) {
    const cappedHours = Math.min(hours, 24);
    return cappedHours * 10;
  }

  resolveLevel(totalPoints: number) {
    if (totalPoints >= 6000) return 'Performance';
    if (totalPoints >= 3000) return 'Avançado';
    if (totalPoints >= 1500) return 'Focado';
    if (totalPoints >= 500) return 'Consistente';
    return 'Iniciante';
  }
}
