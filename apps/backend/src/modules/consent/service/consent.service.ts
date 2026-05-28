import { Injectable } from '@nestjs/common';
import { CreateConsentDto } from '../dto/create-consent.dto';
import { ConsentRepository } from '../repository/consent.repository';

@Injectable()
export class ConsentService {
  constructor(private readonly consentRepository: ConsentRepository) {}

  listConsents(userId: string) {
    return this.consentRepository.listByUser(userId);
  }

  createConsent(userId: string, dto: CreateConsentDto, meta: { ipAddress?: string; userAgent?: string }) {
    return this.consentRepository.create({
      userId,
      consentType: dto.consentType,
      version: dto.version,
      accepted: dto.accepted,
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    });
  }

  revokeConsent(id: string) {
    return this.consentRepository.revoke(id);
  }
}
