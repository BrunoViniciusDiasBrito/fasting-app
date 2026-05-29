import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { FastingProtocolsService } from '../service/fasting-protocols.service';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';
import { CurrentUser } from '../../../shared/decorators/current-user.decorator';
import { CreateFastingProtocolDto } from '../dto/create-fasting-protocol.dto';

@Controller('fasting-protocols')
@UseGuards(JwtAuthGuard)
export class FastingProtocolsController {
  constructor(private readonly protocolsService: FastingProtocolsService) {}

  @Post()
  create(@CurrentUser() user: { sub: string }, @Body() dto: CreateFastingProtocolDto) {
    return this.protocolsService.create(user.sub, dto);
  }

  @Get()
  list(@CurrentUser() user: { sub: string }) {
    return this.protocolsService.list(user.sub);
  }
}
