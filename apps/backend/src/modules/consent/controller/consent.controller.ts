import { Body, Controller, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ConsentService } from '../service/consent.service';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';
import { CurrentUser } from '../../../shared/decorators/current-user.decorator';
import { CreateConsentDto } from '../dto/create-consent.dto';

@Controller('privacy/consents')
@UseGuards(JwtAuthGuard)
export class ConsentController {
  constructor(private readonly consentService: ConsentService) {}

  @Get()
  list(@CurrentUser() user: { sub: string }) {
    return this.consentService.listConsents(user.sub);
  }

  @Post()
  create(@CurrentUser() user: { sub: string }, @Body() dto: CreateConsentDto, @Req() req: { ip?: string; headers: Record<string, string> }) {
    return this.consentService.createConsent(user.sub, dto, {
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
    });
  }

  @Patch(':id/revoke')
  revoke(@Req() req: { params: { id: string } }) {
    return this.consentService.revokeConsent(req.params.id);
  }
}
