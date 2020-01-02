import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CalendarService } from 'src/calendar/calendar.service';

const API = 'https://api.harvestapp.com';
const ENDPOINT = '/v2/time_entries';

@Injectable()
export class TimeEntriesService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly calendarService: CalendarService,
  ) {}

  headers = {
    'User-Agent': 'Nestjs',
    Authorization: 'Bearer ' + this.configService.get<string>('HARVEST_TOKEN'),
    'Harvest-Account-ID': this.configService.get<string>('HARVEST_ID'),
  };

  async getEntriesForMonth(year: string, month: string): Promise<any> {
    const lastDay = this.calendarService.daysInMonth(+year, +month - 1);

    try {
      return await this.httpService
        .get(API + ENDPOINT, {
          headers: this.headers,
          params: { client_id: this.configService.get<string>('HARVEST_CLIENT_ID'), from: `${year}-${month}-01`, to: `${year}-${month}-${lastDay}` },
        })
        .toPromise();
    } catch (e) {
      console.log(e);
      return 'Something went wrong';
    }
  }
}
