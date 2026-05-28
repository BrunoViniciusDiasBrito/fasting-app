import { IsOptional, IsString, MaxLength } from 'class-validator';

export class FinishFastingSessionDto {
  @IsOptional()
  @IsString()
  @MaxLength(120)
  mood?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  notes?: string;
}
