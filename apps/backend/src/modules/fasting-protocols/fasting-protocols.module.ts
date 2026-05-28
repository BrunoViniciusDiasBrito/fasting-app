import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { FastingProtocolsController } from './controller/fasting-protocols.controller';
import { FastingProtocolsService } from './service/fasting-protocols.service';
import { FastingProtocolsRepository } from './repository/fasting-protocols.repository';
import { PrismaService } from '../../shared/database/prisma.service';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';

@Module({
  imports: [JwtModule.register({})],
  controllers: [FastingProtocolsController],
  providers: [FastingProtocolsService, FastingProtocolsRepository, PrismaService, JwtAuthGuard],
})
export class FastingProtocolsModule {}
