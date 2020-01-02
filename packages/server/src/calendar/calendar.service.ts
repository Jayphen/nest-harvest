import { Injectable } from '@nestjs/common';

export interface WorkDays {
  month: number;
  monthName: string;
  year: number;
  workDays: number;
  workHours: number;
  isCurrentMonth: boolean;
}

@Injectable()
export class CalendarService {
  getMonths(year: number): WorkDays[] {
    const today = new Date();
    const months: WorkDays[] = [];

    for (let index = 0; index < 12; index++) {
      const date = new Date(year, index, 1);
      const workDays = this.workDaysInMonth(year, index);

      months.push({
        month: index,
        year,
        monthName: date.toLocaleString('en-GB', { month: 'long' }),
        workDays,
        workHours: workDays * 6,
        isCurrentMonth: today.getMonth() === index,
      });
    }

    return months;
  }

  workDaysInMonth(year: number, month: number): number {
    const days = this.daysInMonth(year, month);

    let workDays = 0;

    for (let index = 0; index < days; index++) {
      if (this.isWeekDay(year, month, index)) {
        workDays++;
      }
    }

    return workDays;
  }

  workDaysPassed(year: number, month: number, day: number): { days: number; hours: number } {
    let workDaysPassed = 0;

    for (let index = 0; index < day; index++) {
      if (this.isWeekDay(year, month, index)) {
        workDaysPassed++;
      }
    }

    return { days: workDaysPassed, hours: workDaysPassed * 6 };
  }

  daysInMonth(year: number, month: number): number {
    // 0 as the day gets the last day of the previous month
    const date = new Date(year, month + 1, 0).getDate();

    return date;
  }

  isWeekDay(year: number, month: number, day: number): boolean {
    const givenDay = new Date(year, month, day + 1);
    const d = givenDay.getDay();

    return d > 0 && d < 6;
  }
}
