import { IsBoolean, IsEnum, IsString } from 'class-validator';

export enum ConsentTypeDto {
  TERMS = 'TERMS',
  PRIVACY = 'PRIVACY',
  NOTIFICATIONS = 'NOTIFICATIONS',
  MARKETING = 'MARKETING',
  ANALYTICS = 'ANALYTICS',
}

export class CreateConsentDto {
  @IsEnum(ConsentTypeDto)
  consentType!: ConsentTypeDto;

  @IsString()
  version!: string;

  @IsBoolean()
  accepted!: boolean;
}
