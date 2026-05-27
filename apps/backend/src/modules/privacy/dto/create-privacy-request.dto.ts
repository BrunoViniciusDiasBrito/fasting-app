import { IsEnum } from 'class-validator';

export enum PrivacyRequestTypeDto {
  EXPORT = 'EXPORT',
  DELETE_ACCOUNT = 'DELETE_ACCOUNT',
}

export class CreatePrivacyRequestDto {
  @IsEnum(PrivacyRequestTypeDto)
  type!: PrivacyRequestTypeDto;
}
