import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrivacyController } from './controller/privacy.controller';
import { PrivacyService } from './service/privacy.service';
import { PrivacyRepository } from './repository/privacy.repository';
import { PrismaService } from '../../shared/database/prisma.service';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';

@Module({
  imports: [JwtModule.register({})],
  controllers: [PrivacyController],
  providers: [PrivacyService, PrivacyRepository, PrismaService, JwtAuthGuard],
  exports: [PrivacyService],
})
export class PrivacyModule {}
