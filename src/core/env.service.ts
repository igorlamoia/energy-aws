import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { Env } from './env.validation';

@Injectable()
export class EnvService {
  constructor(private configService: ConfigService<Env, true>) {}

  get<T extends keyof Env>(key: T) {
    return this.configService.get(key, { infer: true });
  }
}
