import { Injectable } from '@nestjs/common';

export interface WorkDays {
  month: number;
  monthName: string;
  year: number;
  workDays: number;
}

@Injectable()
export class CalendarService {
  getMonths(year: number): WorkDays[] {
    const months: WorkDays[] = [];

    for (let index = 0; index < 12; index++) {
      const date = new Date(year, index, 1);

      months.push({
        month: index,
        year,
        monthName: date.toLocaleString('default', { month: 'long' }),
        workDays: this.workDaysInMonth(year, index),
      });
    }

    return months;
  }

  workDaysInMonth(year: number, month: number): number {
    const days = this.daysInMonth(year, month); //?

    let workDays = 0;

    for (let index = 0; index < days; index++) {
      if (this.isWeekDay(year, month, index)) {
        workDays++;
      }
    }

    return workDays;
  }

  daysInMonth(year: number, month: number): number {
    // 0 as the day gets the last day of the previous month
    const date = new Date(year, month + 1, 0).getDate();

    return date;
  }

  isWeekDay(year: number, month: number, day: number): boolean {
    const d = new Date(year, month, day + 1).getDay();

    return d > 0 && d < 6;
  }
}
