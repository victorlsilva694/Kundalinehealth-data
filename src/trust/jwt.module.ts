import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TrustGuard } from './trust.guard';

@Module({
  imports: [
    JwtAppModule,
    JwtModule.register({
      secret: 'asndnashjdajskdnjasndjkasndjksa',
    }),
  ],
  providers: [TrustGuard],
  exports: [JwtModule],
})
export class JwtAppModule {}