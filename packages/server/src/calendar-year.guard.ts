import { CanActivate, ExecutionContext, Injectable, BadRequestException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class CalendarYearGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const year = req.params.year;

    const currentYear = new Date().getFullYear();
    const lowerLimit = 1920;
    const upperLimit = currentYear + 10;

    if (!/^[0-9]+$/.test(year)) {
      throw new BadRequestException(`${year} is not a valid year`);
    }

    if (+year <= lowerLimit || +year >= upperLimit) {
      throw new BadRequestException(`${year} is not a valid year. Must be before ${upperLimit} and after ${lowerLimit}`);
    }

    return true;
  }
}
