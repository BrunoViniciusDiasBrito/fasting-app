import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';
import { CurrentUser } from '../../../shared/decorators/current-user.decorator';
import { AdsService } from '../service/ads.service';

@Controller('ads')
@UseGuards(JwtAuthGuard)
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @Get('status')
  status(@CurrentUser() user: { sub: string }) {
    return this.adsService.shouldShowAds(user.sub);
  }
}
