import { GamificationService } from '../service/gamification.service';

describe('GamificationService', () => {
  const service = new GamificationService();

  it('calculates points with daily cap', () => {
    expect(service.calculatePointsFromHours(10)).toBe(100);
    expect(service.calculatePointsFromHours(30)).toBe(240);
  });

  it('resolves levels', () => {
    expect(service.resolveLevel(0)).toBe('Iniciante');
    expect(service.resolveLevel(500)).toBe('Consistente');
    expect(service.resolveLevel(1600)).toBe('Focado');
    expect(service.resolveLevel(3500)).toBe('Avançado');
    expect(service.resolveLevel(7000)).toBe('Performance');
  });
});
