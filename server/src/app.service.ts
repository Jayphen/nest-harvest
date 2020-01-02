import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const options = {
  protocol: 'https:',
  hostname: 'api.harvestapp.com',
  path: '/v2/time_entries',
  headers: {},
};

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {}

  headers = {
    'User-Agent': 'Node.js Harvest API Sample',
    Authorization: 'Bearer ' + this.configService.get<string>('HARVEST_TOKEN'),
    'Harvest-Account-ID': this.configService.get<string>('HARVEST_ID'),
  };

  async getHello(): Promise<any> {
    try {
      const res = await this.httpService
        .get(options.protocol + '//' + options.hostname + options.path, {
          headers: this.headers,
          params: { client_id: this.configService.get<string>('HARVEST_CLIENT_ID') },
        })
        .toPromise();
      return res;
    } catch (e) {
      console.log(e);
      return 'Something went wrong';
    }
  }
}
