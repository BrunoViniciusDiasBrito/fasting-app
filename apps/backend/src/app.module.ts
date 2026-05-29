import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ConsentModule } from './modules/consent/consent.module';
import { PrivacyModule } from './modules/privacy/privacy.module';
import { FastingProtocolsModule } from './modules/fasting-protocols/fasting-protocols.module';
import { FastingSessionsModule } from './modules/fasting-sessions/fasting-sessions.module';
import { RemindersModule } from './modules/reminders/reminders.module';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';
import { AdsModule } from './modules/ads/ads.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '../../.env'],
    }),
    AuthModule,
    UsersModule,
    ConsentModule,
    PrivacyModule,
    FastingProtocolsModule,
    FastingSessionsModule,
    RemindersModule,
    SubscriptionsModule,
    AdsModule,
  ],
})
export class AppModule {}
