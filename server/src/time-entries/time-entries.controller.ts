import { Controller, Get, Param } from '@nestjs/common';
import { TimeEntriesService } from './time-entries.service';

@Controller('time-entries')
export class TimeEntriesController {
  constructor(private readonly entriesService: TimeEntriesService) {}

  @Get(':month/:year')
  async getEntries(@Param() params): Promise<string> {
    const res = await this.entriesService.getEntriesForMonth(params.year, params.month);

    return res.data.time_entries;
  }
}
