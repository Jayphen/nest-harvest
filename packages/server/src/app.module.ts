import { Module, HttpModule, CacheModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CalendarController } from './calendar/calendar.controller';
import { CalendarService } from './calendar/calendar.service';
import { ConfigModule } from '@nestjs/config';
import { TimeEntriesController } from './time-entries/time-entries.controller';
import { TimeEntriesService } from './time-entries/time-entries.service';

@Module({
  imports: [HttpModule, ConfigModule.forRoot(), CacheModule.register({ ttl: 90 })],
  controllers: [AppController, CalendarController, TimeEntriesController],
  providers: [AppService, CalendarService, TimeEntriesService],
})
export class AppModule {}
