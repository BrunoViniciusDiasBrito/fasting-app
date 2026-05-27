import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { PasswordService } from '../../shared/crypto/password.service';
import { JwtTokenService } from '../../shared/auth/jwt-token.service';
import { AuthRepository } from './repository/auth.repository';
import { PrismaService } from '../../shared/database/prisma.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, PasswordService, JwtTokenService, AuthRepository, PrismaService],
  exports: [AuthService],
})
export class AuthModule {}
