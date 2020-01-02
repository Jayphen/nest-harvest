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

  async getEntriesForMonth(year: string, month: string) {
    const lastDay = this.calendarService.daysInMonth(+year, +month - 1);

    return await this.httpService
      .get<{ time_entries: TimeEntry[] }>(API + ENDPOINT, {
        headers: this.headers,
        params: { client_id: this.configService.get<string>('HARVEST_CLIENT_ID'), from: `${year}-${month}-01`, to: `${year}-${month}-${lastDay}` },
      })
      .toPromise();
  }
}

export interface TimeEntry {
  id: number;
  spent_date: string;
  user: {
    id: number;
    name: string;
  };
  hours: number;
  notes: string;
}
