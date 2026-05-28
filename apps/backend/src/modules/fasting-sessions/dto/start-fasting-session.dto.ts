import { IsISO8601, IsOptional, IsString } from 'class-validator';

export class StartFastingSessionDto {
  @IsOptional()
  @IsString()
  protocolId?: string;

  @IsISO8601()
  startAt!: string;

  @IsISO8601()
  expectedEndAt!: string;
}
