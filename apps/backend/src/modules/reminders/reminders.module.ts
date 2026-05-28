import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RemindersController } from './controller/reminders.controller';
import { RemindersService } from './service/reminders.service';
import { RemindersRepository } from './repository/reminders.repository';
import { PrismaService } from '../../shared/database/prisma.service';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';

@Module({
  imports: [JwtModule.register({})],
  controllers: [RemindersController],
  providers: [RemindersService, RemindersRepository, PrismaService, JwtAuthGuard],
})
export class RemindersModule {}
