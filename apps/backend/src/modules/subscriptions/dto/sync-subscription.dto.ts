import { IsOptional, IsString } from 'class-validator';

export class SyncSubscriptionDto {
  @IsOptional()
  @IsString()
  providerCustomerId?: string;

  @IsOptional()
  @IsString()
  entitlementId?: string;

  @IsOptional()
  @IsString()
  planCode?: string;
}
