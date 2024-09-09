import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Logger } from '@nestjs/common';
import * as dayjs from 'dayjs'

const currentDate = dayjs().format('DD/MM/YYYY')

@Injectable()
export class
  LoggingMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    this.logger.log(`[${currentDate}] ${req.method} ${req.path}`);

    res.on('finish', () => {
      const duration = Date.now() - start;
      this.logger.log(`[${currentDate}] ${req.method} ${req.path} - status:${res.statusCode} ${duration}ms`);
    });

    next();
  }
}