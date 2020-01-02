import { Test, TestingModule } from '@nestjs/testing';
import { CalendarService } from './calendar.service';

describe('CalendarService', () => {
  let service: CalendarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalendarService],
    }).compile();

    service = module.get<CalendarService>(CalendarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the correct days per month', () => {
    expect(service.workDaysInMonth(2019, 0)).toBe(23);
    expect(service.workDaysInMonth(2019, 1)).toBe(20);
    expect(service.workDaysInMonth(2019, 2)).toBe(21);
  });
});
