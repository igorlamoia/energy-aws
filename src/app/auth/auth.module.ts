import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Env } from 'src/core/env.validation';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService<Env, true>) => {
        const privateKey = config.get<string>('PRIVATE_KEY', { infer: true });
        const publicKey = config.get<string>('PUBLIC_KEY', { infer: true });
        return {
          privateKey: Buffer.from(privateKey, 'base64'),
          publicKey: Buffer.from(publicKey, 'base64'),
          signOptions: {
            algorithm: 'RS256',
            expiresIn: '1h',
          },
        };
      },
      global: true,
    }),
  ],
})
export class AuthModule {}
