import { Test, TestingModule } from '@nestjs/testing';
import { TimeEntriesController } from './time-entries.controller';

describe('TimeEntries Controller', () => {
  let controller: TimeEntriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimeEntriesController],
    }).compile();

    controller = module.get<TimeEntriesController>(TimeEntriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
