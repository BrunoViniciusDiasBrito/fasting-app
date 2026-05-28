import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConsentController } from './controller/consent.controller';
import { ConsentService } from './service/consent.service';
import { ConsentRepository } from './repository/consent.repository';
import { PrismaService } from '../../shared/database/prisma.service';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';

@Module({
  imports: [JwtModule.register({})],
  controllers: [ConsentController],
  providers: [ConsentService, ConsentRepository, PrismaService, JwtAuthGuard],
  exports: [ConsentService],
})
export class ConsentModule {}
