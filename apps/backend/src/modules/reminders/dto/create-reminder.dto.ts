import { IsBoolean, IsISO8601, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateReminderDto {
  @IsString()
  @MaxLength(50)
  type!: string;

  @IsString()
  @MaxLength(120)
  title!: string;

  @IsString()
  @MaxLength(500)
  message!: string;

  @IsISO8601()
  scheduledAt!: string;

  @IsOptional()
  @IsString()
  recurrenceRule?: string;

  @IsBoolean()
  enabled!: boolean;
}
