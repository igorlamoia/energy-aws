import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  getHealth(): { message: string; data: any } {
    return {
      message: 'Health check successful',
      data: this.appService.health(),
    };
  }
}
