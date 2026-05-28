import { IsBoolean, IsEnum, IsISO8601, IsOptional, IsString, MaxLength } from 'class-validator';

export enum ReminderTypeDto {
  HOURLY_FASTING = 'HOURLY_FASTING',
  SAFETY = 'SAFETY',
  EATING_WINDOW_END = 'EATING_WINDOW_END',
  BREAK_FAST = 'BREAK_FAST',
}

export class CreateReminderDto {
  @IsEnum(ReminderTypeDto)
  type!: ReminderTypeDto;

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
