import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ConsentModule } from './modules/consent/consent.module';
import { PrivacyModule } from './modules/privacy/privacy.module';

@Module({
  imports: [AuthModule, UsersModule, ConsentModule, PrivacyModule],
})
export class AppModule {}
