import { PAYWALL_PLANS } from '../model/paywall-plans';

describe('PAYWALL_PLANS', () => {
  it('contains required plan codes', () => {
    const codes = PAYWALL_PLANS.map((p) => p.code);
    expect(codes).toEqual(expect.arrayContaining(['FREE', 'REMOVE_ADS', 'PROFICIENT', 'PERFORMANCE']));
  });
});
