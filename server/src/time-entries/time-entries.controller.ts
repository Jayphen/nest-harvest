import { Controller, Get, Param } from '@nestjs/common';
import { TimeEntriesService, TimeEntry } from './time-entries.service';

@Controller('time-entries')
export class TimeEntriesController {
  constructor(private readonly entriesService: TimeEntriesService) {}

  @Get(':month/:year')
  async getEntries(@Param() params): Promise<TimeEntry[]> {
    const res = await this.entriesService.getEntriesForMonth(params.year, params.month);

    return res.data.time_entries;
  }

  @Get('total/:month/:year')
  async getTotalTimeForMonth(@Param() params): Promise<number> {
    const res = await this.entriesService.getEntriesForMonth(params.year, params.month);

    return res.data.time_entries.reduce((acc, curr) => acc + curr.hours, 0);
  }
}
