import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ConsentModule } from './modules/consent/consent.module';
import { PrivacyModule } from './modules/privacy/privacy.module';
import { FastingProtocolsModule } from './modules/fasting-protocols/fasting-protocols.module';
import { FastingSessionsModule } from './modules/fasting-sessions/fasting-sessions.module';

@Module({
  imports: [AuthModule, UsersModule, ConsentModule, PrivacyModule, FastingProtocolsModule, FastingSessionsModule],
})
export class AppModule {}
