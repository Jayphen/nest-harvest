import { Controller, Get, Param, UseGuards, UseInterceptors, CacheInterceptor, CacheTTL } from '@nestjs/common';
import { CalendarYearGuard } from './calendar-year.guard';
import { CalendarService, WorkDays } from './calendar.service';

@Controller('calendar')
@UseInterceptors(CacheInterceptor)
@CacheTTL(86400)
export class CalendarController {
  constructor(private readonly calService: CalendarService) {}

  @Get()
  getThisYearsMonths(): WorkDays[] {
    const today = new Date();
    const year = today.getFullYear();
    const data = this.calService.getMonths(year);

    return data;
  }

  @Get('days-passed')
  getDaysPassed(): { days: number; hours: number } {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();

    const data = this.calService.workDaysPassed(year, month, day);

    return data;
  }

  @Get(':year')
  @UseGuards(CalendarYearGuard)
  getMonths(@Param('year') year): WorkDays[] {
    const data = this.calService.getMonths(year);

    return data;
  }
}
