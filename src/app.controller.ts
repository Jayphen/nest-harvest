import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    const res = await this.appService.getHello();

    console.log(res.data.invoices.reduce((acc, curr) => acc + curr.amount, 0));

    return 'got invoices';
  }
}
