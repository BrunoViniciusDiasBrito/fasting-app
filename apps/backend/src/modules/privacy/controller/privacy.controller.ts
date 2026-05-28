import { Controller, Post, UseGuards } from '@nestjs/common';
import { PrivacyService } from '../service/privacy.service';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';
import { CurrentUser } from '../../../shared/decorators/current-user.decorator';

@Controller('privacy/requests')
@UseGuards(JwtAuthGuard)
export class PrivacyController {
  constructor(private readonly privacyService: PrivacyService) {}

  @Post('export')
  requestExport(@CurrentUser() user: { sub: string }) {
    return this.privacyService.requestExport(user.sub);
  }

  @Post('delete-account')
  requestDelete(@CurrentUser() user: { sub: string }) {
    return this.privacyService.requestDeleteAccount(user.sub);
  }
}
