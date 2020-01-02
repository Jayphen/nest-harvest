import { Controller, Get, Param, UseInterceptors, CacheInterceptor } from '@nestjs/common';
import { TimeEntriesService, TimeEntry } from './time-entries.service';

@Controller('time-entries')
@UseInterceptors(CacheInterceptor)
export class TimeEntriesController {
  constructor(private readonly entriesService: TimeEntriesService) {}

  @Get('total/:month/:year')
  async getTotalTimeForMonth(@Param() params): Promise<number> {
    const res = await this.entriesService.getEntriesForMonth(params.year, params.month);

    return res.data.time_entries.reduce((acc, curr) => acc + curr.hours, 0);
  }

  @Get('totals/:year')
  async getTotalTimesForYear(@Param() params): Promise<number[]> {
    const promises = [];

    for (let index = 0; index < 12; index++) {
      promises.push(this.getTotalTimeForMonth({ year: params.year, month: (index + 1).toString().padStart(2, '0') }));
    }

    return Promise.all(promises);
  }

  @Get(':month/:year')
  async getEntries(@Param() params): Promise<TimeEntry[]> {
    const res = await this.entriesService.getEntriesForMonth(params.year, params.month);

    return res.data.time_entries;
  }
}
