import { IsBoolean, IsInt, IsString, Max, Min } from 'class-validator';

export class CreateFastingProtocolDto {
  @IsString()
  name!: string;

  @IsInt()
  @Min(8)
  @Max(24)
  fastingHours!: number;

  @IsInt()
  @Min(1)
  @Max(16)
  eatingWindowHours!: number;

  @IsBoolean()
  isDefault!: boolean;
}
