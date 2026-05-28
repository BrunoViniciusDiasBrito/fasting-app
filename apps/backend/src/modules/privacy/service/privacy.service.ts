import { Injectable } from '@nestjs/common';
import { PrivacyRepository } from '../repository/privacy.repository';

@Injectable()
export class PrivacyService {
  constructor(private readonly privacyRepository: PrivacyRepository) {}

  requestExport(userId: string) {
    return this.privacyRepository.createRequest(userId, 'EXPORT');
  }

  requestDeleteAccount(userId: string) {
    return this.privacyRepository.createRequest(userId, 'DELETE_ACCOUNT');
  }
}
