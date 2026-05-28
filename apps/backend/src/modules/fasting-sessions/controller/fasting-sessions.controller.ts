import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';
import { CurrentUser } from '../../../shared/decorators/current-user.decorator';
import { FastingSessionsService } from '../service/fasting-sessions.service';
import { StartFastingSessionDto } from '../dto/start-fasting-session.dto';
import { FinishFastingSessionDto } from '../dto/finish-fasting-session.dto';

@Controller('fasting-sessions')
@UseGuards(JwtAuthGuard)
export class FastingSessionsController {
  constructor(private readonly fastingSessionsService: FastingSessionsService) {}

  @Post('start')
  start(@CurrentUser() user: { sub: string }, @Body() dto: StartFastingSessionDto) {
    return this.fastingSessionsService.start(user.sub, dto);
  }

  @Post(':id/finish')
  finish(@CurrentUser() user: { sub: string }, @Param('id') id: string, @Body() dto: FinishFastingSessionDto) {
    return this.fastingSessionsService.finish(user.sub, id, dto);
  }

  @Get('current')
  current(@CurrentUser() user: { sub: string }) {
    return this.fastingSessionsService.current(user.sub);
  }

  @Get('history')
  history(@CurrentUser() user: { sub: string }) {
    return this.fastingSessionsService.history(user.sub);
  }
}
